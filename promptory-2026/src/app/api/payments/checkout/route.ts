import { NextResponse } from "next/server";

import { getPublicEnvStatus } from "@/lib/env/public";
import { jsonError } from "@/lib/http";
import { getPromptoryCheckoutCapability } from "@/lib/payments-capability";
import { getUserDisplayLabel } from "@/lib/server/auth";
import { getOrderForBuyer } from "@/lib/server/orders";
import { createOrderCheckout } from "@/lib/server/payments";
import { getServerEnvStatus } from "@/lib/env/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validations/order";

export async function POST(request: Request) {
  const checkoutCapability = getPromptoryCheckoutCapability({
    publicStatus: getPublicEnvStatus(),
    serverStatus: getServerEnvStatus(),
  });

  if (!checkoutCapability.canCheckout) {
    switch (checkoutCapability.blockReason) {
      case "missing_public_env":
      case "missing_service_role":
        return jsonError("결제를 시작하려면 공개 Supabase env와 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.", 503);
      case "payments_disabled":
        return jsonError("지금은 결제 기능이 비활성화되어 있습니다.", 503);
      case "missing_toss_secret":
        return jsonError("toss 모드에서는 TOSS_SECRET_KEY가 필요합니다.", 503);
      case "missing_toss_client_key":
        return jsonError("toss 모드에서는 NEXT_PUBLIC_TOSS_CLIENT_KEY가 필요합니다.", 503);
      default:
        return jsonError("결제 환경을 확인하지 못했습니다.", 503);
    }
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
    return jsonError(parsed.error.issues[0]?.message ?? "결제 요청이 올바르지 않습니다.", 400);
  }

  const order = await getOrderForBuyer(parsed.data.orderId, user.id);

  if (!order) {
    return jsonError("주문을 찾지 못했습니다.", 404);
  }

  const customerName = await getUserDisplayLabel(user);
  const session = await createOrderCheckout({
    customerEmail: user.email ?? undefined,
    customerKey: user.id,
    customerName,
    orderId: order.id,
  });
  return NextResponse.json({ ...session, mode: checkoutCapability.paymentMode, ok: true });
}
