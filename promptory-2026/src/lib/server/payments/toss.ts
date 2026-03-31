import { getTossServerEnv } from "@/lib/env/server";
import type {
  ConfirmPaymentInput,
  ConfirmPaymentResult,
  PaymentGateway,
} from "@/lib/server/payments/base";

const tossApiBaseUrl = "https://api.tosspayments.com";

function createAuthHeader(secretKey: string) {
  return `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`;
}

export class TossPaymentGateway implements PaymentGateway {
  async confirmPayment(input: ConfirmPaymentInput): Promise<ConfirmPaymentResult> {
    const env = getTossServerEnv();
    const response = await fetch(`${tossApiBaseUrl}/v1/payments/confirm`, {
      method: "POST",
      headers: {
        Authorization: createAuthHeader(env.TOSS_SECRET_KEY),
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        amount: input.amount,
        orderId: input.orderId,
        paymentKey: input.paymentKey,
      }),
      cache: "no-store",
    });

    const payload = (await response.json()) as {
      message?: string;
      method?: string | null;
      orderId?: string;
      paymentKey?: string;
      status?: string;
    };

    if (!response.ok || !payload.paymentKey || !payload.orderId || !payload.status) {
      throw new Error(payload.message ?? "토스 결제 승인에 실패했습니다.");
    }

    return {
      method: payload.method ?? null,
      orderId: payload.orderId,
      paymentKey: payload.paymentKey,
      status: payload.status,
    };
  }
}
