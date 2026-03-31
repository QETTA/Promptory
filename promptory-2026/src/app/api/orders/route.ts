import { NextResponse } from "next/server";

import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { createOrder } from "@/lib/server/orders";
import { getProductById } from "@/lib/server/products";
import { trackServerEvent } from "@/lib/server/telemetry";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createOrderSchema } from "@/lib/validations/order";

export async function POST(request: Request) {
  if (!hasSellerWriteRuntime()) {
    return jsonError("주문을 만들려면 공개 Supabase 설정과 서버 키가 필요합니다. /setup을 먼저 확인해 주세요.", 503);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return jsonError("로그인이 필요합니다.", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "주문 요청을 다시 확인해 주세요.", 400);
  }

  const product = await getProductById(parsed.data.productId);

  if (!product || product.status !== "published") {
    return jsonError("구매 가능한 공개 실행 팩을 찾지 못했습니다.", 404);
  }

  if (product.seller_id === user.id) {
    return jsonError("자신의 실행 팩은 구매할 수 없습니다.", 400);
  }

  const order = await createOrder({
    amountKrw: product.price_krw,
    buyerId: user.id,
    productId: product.id,
    sellerId: product.seller_id,
  });

  await trackServerEvent("order_created", {
    orderId: order.id,
    paymentMode: order.payment_provider,
    productId: product.id,
    userId: user.id,
  });

  return NextResponse.json({ ok: true, orderId: order.id, status: order.status });
}
