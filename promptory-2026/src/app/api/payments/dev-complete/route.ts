import { NextResponse } from "next/server";

// Cloudflare Pages Static Export 설정
export const dynamic = "force-static";

import { getPaymentsMode } from "@/lib/env/server";
import { hasPaymentsRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { completeDevOrderPayment } from "@/lib/server/payments";
import { getOrderForBuyer } from "@/lib/server/orders";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validations/order";

export async function POST(request: Request) {
  if (!hasPaymentsRuntime()) {
    return jsonError("개발용 결제 완료를 쓰려면 공개 Supabase env와 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.", 503);
  }

  if (getPaymentsMode() !== "dev_stub") {
    return jsonError("개발용 결제 완료는 dev_stub 모드에서만 사용할 수 있습니다.", 403);
  }

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
    return jsonError(parsed.error.issues[0]?.message ?? "결제 완료 요청이 올바르지 않습니다.", 400);
  }

  const order = await getOrderForBuyer(parsed.data.orderId, user.id);

  if (!order) {
    return jsonError("주문을 찾지 못했습니다.", 404);
  }

  await completeDevOrderPayment(order.id);

  return NextResponse.json({
    ok: true,
    redirectUrl: `/payments/success?mode=dev_stub&orderId=${order.id}`,
  });
}
