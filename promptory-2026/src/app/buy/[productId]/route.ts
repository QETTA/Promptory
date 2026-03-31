import { NextResponse } from "next/server";

import { buildLoginHref } from "@/lib/auth-redirect";
import { createOrder } from "@/lib/server/orders";
import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { getProductById } from "@/lib/server/products";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ productId: string }> },
) {
  const { productId } = await context.params;
  const url = new URL(request.url);

  if (!hasSellerWriteRuntime()) {
    return NextResponse.redirect(new URL("/setup", url));
  }

  const product = await getProductById(productId);
  const productHref = product?.slug ? `/products/${product.slug}` : "/products";

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(buildLoginHref(`/buy/${productId}`), url));
  }

  if (!product || product.status !== "published") {
    return NextResponse.redirect(new URL("/products", url));
  }

  if (product.seller_id === user.id) {
    return NextResponse.redirect(new URL(productHref, url));
  }

  const order = await createOrder({
    amountKrw: product.price_krw,
    buyerId: user.id,
    productId: product.id,
    sellerId: product.seller_id,
  });

  return NextResponse.redirect(new URL(`/checkout/${order.id}`, url));
}
