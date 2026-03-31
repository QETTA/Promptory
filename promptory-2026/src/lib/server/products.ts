import { hasPublicEnv } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { slugify } from "@/lib/slug";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { OrderRow, ProductRow, ProfileRow } from "@/lib/supabase/types";

export interface ProductWithSeller extends ProductRow {
  seller: Pick<ProfileRow, "display_name" | "id"> | null;
}

export interface SellerProductSummary extends ProductRow {
  orderIntentCount: number;
  pendingOrderCount: number;
}

export interface PublishedProductQueryOptions {
  category?: string;
  includeDemo?: boolean;
  limit?: number;
  q?: string;
  sort?: "interest" | "latest";
}

const publicDemoPattern = /smoke|draft|test|demo/i;

export function isPublicDemoishProduct(product: Pick<ProductRow, "description" | "title"> & { seller?: Pick<ProfileRow, "display_name"> | null }) {
  return (
    publicDemoPattern.test(product.title) ||
    publicDemoPattern.test(product.description) ||
    Boolean(product.seller?.display_name && publicDemoPattern.test(product.seller.display_name))
  );
}

function normalizeProduct(product: ProductRow): ProductRow {
  return {
    ...product,
    keywords: Array.isArray(product.keywords) ? product.keywords : [],
    preview_points: Array.isArray(product.preview_points) ? product.preview_points : [],
  };
}

async function attachSellers(products: ProductRow[]): Promise<ProductWithSeller[]> {
  if (products.length === 0) {
    return [];
  }

  if (!getServerEnvStatus().hasSupabaseServiceRole) {
    return products.map((product) => ({
      ...normalizeProduct(product),
      seller: null,
    }));
  }

  const sellerIds = Array.from(new Set(products.map((product) => product.seller_id)));
  const supabase = createAdminSupabaseClient();
  const { data: sellers, error } = await supabase
    .from("profiles")
    .select("id, display_name")
    .in("id", sellerIds)
    .overrideTypes<Array<Pick<ProfileRow, "display_name" | "id">>>();

  if (error) {
    throw new Error(`판매자 정보를 불러오지 못했습니다. ${error.message}`);
  }

  const sellerMap = new Map((sellers ?? []).map((seller) => [seller.id, seller]));

  return products.map((product) => ({
    ...normalizeProduct(product),
    seller: sellerMap.get(product.seller_id) ?? null,
  }));
}

function attachSellerOrderCounts(
  products: ProductRow[],
  orders: Array<Pick<OrderRow, "product_id" | "status">>,
): SellerProductSummary[] {
  const counts = new Map<string, { orderIntentCount: number; pendingOrderCount: number }>();

  for (const order of orders) {
    const current = counts.get(order.product_id) ?? { orderIntentCount: 0, pendingOrderCount: 0 };
    current.orderIntentCount += 1;

    if (order.status === "pending_payment") {
      current.pendingOrderCount += 1;
    }

    counts.set(order.product_id, current);
  }

  return products.map((product) => {
    const count = counts.get(product.id) ?? { orderIntentCount: 0, pendingOrderCount: 0 };

    return {
      ...product,
      orderIntentCount: count.orderIntentCount,
      pendingOrderCount: count.pendingOrderCount,
    };
  });
}

async function attachPublishedOrderCounts(
  products: ProductRow[],
): Promise<Array<ProductWithSeller & { orderIntentCount: number; pendingOrderCount: number }>> {
  const productsWithSeller = await attachSellers(products);

  if (products.length === 0 || !getServerEnvStatus().hasSupabaseServiceRole) {
    return productsWithSeller.map((product) => ({
      ...product,
      orderIntentCount: 0,
      pendingOrderCount: 0,
    }));
  }

  const productIds = products.map((product) => product.id);
  const supabase = createAdminSupabaseClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("product_id, status")
    .in("product_id", productIds)
    .overrideTypes<Array<Pick<OrderRow, "product_id" | "status">>>();

  if (error) {
    throw new Error(`실행 팩별 주문 반응을 불러오지 못했습니다. ${error.message}`);
  }

  const counts = new Map<string, { orderIntentCount: number; pendingOrderCount: number }>();

  for (const order of orders ?? []) {
    const current = counts.get(order.product_id) ?? { orderIntentCount: 0, pendingOrderCount: 0 };
    current.orderIntentCount += 1;

    if (order.status === "pending_payment") {
      current.pendingOrderCount += 1;
    }

    counts.set(order.product_id, current);
  }

  return productsWithSeller.map((product) => {
    const count = counts.get(product.id) ?? { orderIntentCount: 0, pendingOrderCount: 0 };

    return {
      ...product,
      orderIntentCount: count.orderIntentCount,
      pendingOrderCount: count.pendingOrderCount,
    };
  });
}

export async function getPublishedProducts(
  options: PublishedProductQueryOptions = {},
): Promise<ProductWithSeller[]> {
  if (!hasPublicEnv()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .overrideTypes<ProductRow[]>();

  if (error) {
    throw new Error(`공개 실행 팩을 불러오지 못했습니다. ${error.message}`);
  }

  const normalizedCategory = options.category?.trim().toLowerCase();
  const normalizedQuery = options.q?.trim().toLowerCase();
  const sort = options.sort ?? "latest";
  const includeDemo = options.includeDemo ?? false;
  let products = data ?? [];
  products = products.map(normalizeProduct);

  if (normalizedCategory) {
    products = products.filter((product) => product.category.trim().toLowerCase() === normalizedCategory);
  }

  if (normalizedQuery) {
    products = products.filter((product) => {
      const haystack = [
        product.title,
        product.description,
        product.category,
        ...(product.keywords ?? []),
        ...(product.preview_points ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }

  if (sort === "interest") {
    const productsWithCounts = await attachPublishedOrderCounts(products);
    const sorted = productsWithCounts.sort((a, b) => {
      if (b.pendingOrderCount !== a.pendingOrderCount) {
        return b.pendingOrderCount - a.pendingOrderCount;
      }

      if (b.orderIntentCount !== a.orderIntentCount) {
        return b.orderIntentCount - a.orderIntentCount;
      }

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const visible = includeDemo ? sorted : sorted.filter((product) => !isPublicDemoishProduct(product));
    return options.limit ? visible.slice(0, options.limit) : visible;
  }

  const productsWithSeller = await attachSellers(products);
  const visible = includeDemo ? productsWithSeller : productsWithSeller.filter((product) => !isPublicDemoishProduct(product));
  return options.limit ? visible.slice(0, options.limit) : visible;
}

export async function getPublishedProductBySlug(slug: string): Promise<ProductWithSeller | null> {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()
    .overrideTypes<ProductRow | null>();

  if (error) {
    throw new Error(`실행 팩 상세를 불러오지 못했습니다. ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const typedProduct = data as ProductRow;
  const [product] = await attachSellers([normalizeProduct(typedProduct)]);

  if (!product || isPublicDemoishProduct(product)) {
    return null;
  }

  return product;
}

export async function getRelatedPublishedProducts(
  currentProductId: string,
  category: string,
  limit = 3,
): Promise<ProductWithSeller[]> {
  const products = await getPublishedProducts({ category, sort: "interest" });

  return products.filter((product) => product.id !== currentProductId).slice(0, limit);
}

export async function getSellerProducts(sellerId: string): Promise<ProductRow[]> {
  if (!hasPublicEnv()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false })
    .overrideTypes<ProductRow[]>();

  if (error) {
    throw new Error(`내 실행 팩을 불러오지 못했습니다. ${error.message}`);
  }

  return (data ?? []).map(normalizeProduct);
}

export async function getSellerProductSummaries(sellerId: string): Promise<SellerProductSummary[]> {
  const products = await getSellerProducts(sellerId);

  if (products.length === 0) {
    return [];
  }

  if (!getServerEnvStatus().hasSupabaseServiceRole) {
    return products.map((product) => ({
      ...product,
      orderIntentCount: 0,
      pendingOrderCount: 0,
    }));
  }

  const productIds = products.map((product) => product.id);
  const supabase = createAdminSupabaseClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("product_id, status")
    .eq("seller_id", sellerId)
    .in("product_id", productIds)
    .overrideTypes<Array<Pick<OrderRow, "product_id" | "status">>>();

  if (error) {
    throw new Error(`실행 팩별 주문 반응을 불러오지 못했습니다. ${error.message}`);
  }

  return attachSellerOrderCounts(products, orders ?? []);
}

export async function getSellerProductById(productId: string, sellerId: string): Promise<ProductRow | null> {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("seller_id", sellerId)
    .maybeSingle()
    .overrideTypes<ProductRow | null>();

  if (error) {
    throw new Error(`실행 팩 정보를 불러오지 못했습니다. ${error.message}`);
  }

  return data ? normalizeProduct(data as ProductRow) : null;
}

export async function getProductById(productId: string): Promise<ProductRow | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle()
    .overrideTypes<ProductRow | null>();

  if (error) {
    throw new Error(`실행 팩 정보를 불러오지 못했습니다. ${error.message}`);
  }

  return data ? normalizeProduct(data as ProductRow) : null;
}

export async function resolveUniqueSlug(title: string, currentProductId?: string): Promise<string> {
  const supabase = createAdminSupabaseClient();
  const baseSlug = slugify(title);
  let candidate = baseSlug;
  let index = 1;

  for (;;) {
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle()
      .overrideTypes<{ id: string } | null>();

    if (error) {
      throw new Error(`슬러그 중복 여부를 확인하지 못했습니다. ${error.message}`);
    }

    if (!data || data.id === currentProductId) {
      return candidate;
    }

    index += 1;
    candidate = `${baseSlug}-${index}`;
  }
}
