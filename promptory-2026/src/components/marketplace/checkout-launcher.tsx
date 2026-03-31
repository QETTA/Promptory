"use client";

import { useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";

type TossPaymentMethod = "CARD";

type TossPaymentRequest = {
  amount: {
    currency: "KRW";
    value: number;
  };
  card: {
    flowMode: "DEFAULT";
    useAppCardOnly: boolean;
    useCardPoint: boolean;
    useEscrow: boolean;
  };
  customerEmail?: string;
  customerName?: string;
  failUrl: string;
  method: TossPaymentMethod;
  orderId: string;
  orderName: string;
  successUrl: string;
};

type TossPaymentsFactory = {
  payment: (options: { customerKey: string }) => {
    requestPayment: (request: TossPaymentRequest) => Promise<unknown>;
  };
};

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => TossPaymentsFactory;
  }
}

type CheckoutResponse =
  | {
      error?: string;
      ok?: false;
    }
  | {
      method: "dev_stub";
      mode: "dev_stub";
      ok: true;
      orderId: string;
      redirectUrl: string;
    }
  | {
      amount: number;
      customerEmail?: string;
      customerKey: string;
      customerName?: string;
      failUrl: string;
      method: "toss";
      mode: "toss";
      ok: true;
      orderId: string;
      orderName: string;
      successUrl: string;
    };

type TossPaymentWindowError = {
  code?: string;
  message?: string;
};

function getPaymentErrorDetails(error: unknown) {
  if (error && typeof error === "object") {
    const code = "code" in error && typeof error.code === "string" ? error.code : undefined;
    const message = "message" in error && typeof error.message === "string" ? error.message : undefined;
    return { code, message };
  }

  return {
    code: undefined,
    message: error instanceof Error ? error.message : undefined,
  };
}

function isCanceledTossPayment(error: TossPaymentWindowError) {
  return (
    error.code === "PAY_PROCESS_CANCELED" ||
    error.code === "PAY_PROCESS_ABORTED" ||
    error.message === "취소되었습니다."
  );
}

export function CheckoutLauncher({
  orderId,
  tossClientKey,
}: {
  orderId: string;
  tossClientKey: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const payload = (await response.json()) as CheckoutResponse;

      if (!response.ok || !payload.ok) {
        const errorMessage = "error" in payload ? payload.error : undefined;
        throw new Error(errorMessage ?? "결제를 준비하지 못했습니다.");
      }

      if (payload.mode === "dev_stub") {
        window.location.href = payload.redirectUrl;
        return;
      }

      const tossPaymentsFactory = window.TossPayments;

      if (!tossPaymentsFactory) {
        throw new Error("토스 결제 SDK가 아직 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      }

      const tossPayments = tossPaymentsFactory(tossClientKey);
      const payment = tossPayments.payment({ customerKey: payload.customerKey });

      await payment.requestPayment({
        amount: {
          currency: "KRW",
          value: payload.amount,
        },
        card: {
          flowMode: "DEFAULT",
          useAppCardOnly: false,
          useCardPoint: false,
          useEscrow: false,
        },
        customerEmail: payload.customerEmail,
        customerName: payload.customerName,
        failUrl: payload.failUrl,
        method: "CARD",
        orderId: payload.orderId,
        orderName: payload.orderName,
        successUrl: payload.successUrl,
      });
    } catch (checkoutError) {
      const paymentError = getPaymentErrorDetails(checkoutError);

      if (isCanceledTossPayment(paymentError)) {
        const params = new URLSearchParams({
          code: paymentError.code ?? "PAY_PROCESS_CANCELED",
          message: paymentError.message ?? "결제가 취소되었습니다.",
          orderId,
        });
        window.location.href = `/payments/fail?${params.toString()}`;
        return;
      }

      setError(paymentError.message ?? "결제를 시작할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={() => setError("토스 결제 SDK를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요.")}
      />
      <Button onClick={handleCheckout} className="w-full" size="lg" disabled={loading || !sdkReady}>
        {loading ? "결제창 준비 중..." : sdkReady ? "토스로 결제하기" : "결제 SDK 준비 중..."}
      </Button>
      <p className="text-xs leading-5 text-[var(--slate-500)]">
        토스 표준 결제창이 열리면 카드와 간편결제를 같은 흐름에서 바로 진행할 수 있습니다.
      </p>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
