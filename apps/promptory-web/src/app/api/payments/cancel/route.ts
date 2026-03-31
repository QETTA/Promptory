import { NextResponse } from "next/server";

import { jsonError } from "@/lib/http";
import { getOrderForBuyer } from "@/lib/server/orders";
import { cancelPromptoryPayment } from "@/lib/server/payments";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validations/order";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return jsonError("로그인이 필요합니다.", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "취소 요청이 올바르지 않습니다.", 400);
  }

  const order = await getOrderForBuyer(parsed.data.orderId, user.id);

  if (!order) {
    return jsonError("주문을 찾지 못했습니다.", 404);
  }

  await cancelPromptoryPayment(order.id);
  return NextResponse.json({ ok: true });
}
