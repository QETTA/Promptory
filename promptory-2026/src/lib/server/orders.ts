import { hasPublicEnv } from "@/lib/env/public";
import { getPaymentsMode, getServerEnvStatus } from "@/lib/env/server";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { OrderRow, ProductRow } from "@/lib/supabase/types";

export interface OrderWithProduct extends OrderRow {
  product: ProductRow | null;
}

export function isReusableOrderStatus(status: OrderRow["status"]) {
  return status === "draft" || status === "pending_payment";
}

function getPendingPaymentProvider() {
  const paymentMode = getPaymentsMode();

  if (paymentMode === "disabled") {
    return "disabled";
  }

  if (paymentMode === "dev_stub") {
    return "dev_stub";
  }

  return "toss";
}

async function attachProducts(orders: OrderRow[]): Promise<OrderWithProduct[]> {
  if (orders.length === 0) {
    return [];
  }

  if (!getServerEnvStatus().hasSupabaseServiceRole) {
    return orders.map((order) => ({
      ...order,
      product: null,
    }));
  }

  const productIds = Array.from(new Set(orders.map((order) => order.product_id)));
  const supabase = createAdminSupabaseClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds)
    .overrideTypes<ProductRow[]>();

  if (error) {
    throw new Error(`주문 상품을 불러오지 못했습니다. ${error.message}`);
  }

  const productMap = new Map((products ?? []).map((product) => [product.id, product]));

  return orders.map((order) => ({
    ...order,
    product: productMap.get(order.product_id) ?? null,
  }));
}

export async function getReusableOrderForBuyerProduct(params: {
  buyerId: string;
  productId: string;
}): Promise<OrderRow | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("buyer_id", params.buyerId)
    .eq("product_id", params.productId)
    .in("status", ["draft", "pending_payment"])
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .overrideTypes<OrderRow[]>();

  if (error) {
    throw new Error(`기존 주문을 확인하지 못했습니다. ${error.message}`);
  }

  return data?.[0] ?? null;
}

export async function createOrder(params: {
  amountKrw: number;
  buyerId: string;
  productId: string;
  sellerId: string;
}): Promise<OrderRow> {
  const supabase = createAdminSupabaseClient();
  const reusableOrder = await getReusableOrderForBuyerProduct({
    buyerId: params.buyerId,
    productId: params.productId,
  });

  if (reusableOrder) {
    if (reusableOrder.status === "pending_payment") {
      return reusableOrder;
    }

    const { data, error } = await supabase
      .from("orders")
      .update({
        amount_krw: params.amountKrw,
        payment_provider: getPendingPaymentProvider(),
        payment_reference: null,
        seller_id: params.sellerId,
        status: "pending_payment",
        updated_at: new Date().toISOString(),
      })
      .eq("id", reusableOrder.id)
      .select("*")
      .single()
      .overrideTypes<OrderRow>();

    if (error) {
      throw new Error(`기존 주문 상태를 갱신하지 못했습니다. ${error.message}`);
    }

    return data;
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      amount_krw: params.amountKrw,
      buyer_id: params.buyerId,
      payment_provider: getPendingPaymentProvider(),
      product_id: params.productId,
      seller_id: params.sellerId,
      status: "pending_payment",
    })
    .select("*")
    .single()
    .overrideTypes<OrderRow>();

  if (error) {
    throw new Error(`주문을 생성하지 못했습니다. ${error.message}`);
  }

  return data;
}

export async function getBuyerOrders(buyerId: string): Promise<OrderWithProduct[]> {
  if (!hasPublicEnv()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("buyer_id", buyerId)
    .order("created_at", { ascending: false })
    .overrideTypes<OrderRow[]>();

  if (error) {
    throw new Error(`주문 내역을 불러오지 못했습니다. ${error.message}`);
  }

  return attachProducts(data ?? []);
}

export async function getOrderForBuyer(orderId: string, buyerId: string): Promise<OrderWithProduct | null> {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("buyer_id", buyerId)
    .maybeSingle()
    .overrideTypes<OrderRow | null>();

  if (error) {
    throw new Error(`주문 정보를 불러오지 못했습니다. ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const typedOrder = data as OrderRow;
  const [order] = await attachProducts([typedOrder]);
  return order ?? null;
}

export async function getPaidLibrary(buyerId: string): Promise<OrderWithProduct[]> {
  const orders = await getBuyerOrders(buyerId);
  return orders.filter((order) => order.status === "paid" && order.product !== null);
}

export async function getOrderById(orderId: string): Promise<OrderRow | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle()
    .overrideTypes<OrderRow | null>();

  if (error) {
    throw new Error(`주문을 찾지 못했습니다. ${error.message}`);
  }

  return (data as OrderRow | null) ?? null;
}

export async function updateOrderStatus(
  orderId: string,
  patch: Partial<Pick<OrderRow, "payment_provider" | "payment_reference" | "status">>,
): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("orders")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(`주문 상태를 갱신하지 못했습니다. ${error.message}`);
  }
}
