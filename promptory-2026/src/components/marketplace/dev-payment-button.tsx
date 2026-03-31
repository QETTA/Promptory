"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function DevPaymentButton({
  orderId,
  size = "lg",
  variant = "default",
}: {
  orderId: string;
  size?: "default" | "lg" | "sm";
  variant?: "default" | "ghost" | "outline" | "subtle";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleComplete() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments/dev-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; redirectUrl?: string }
        | null;

      if (!response.ok || !payload?.redirectUrl) {
        throw new Error(payload?.error ?? "개발용 결제 완료 처리에 실패했습니다.");
      }

      router.push(payload.redirectUrl);
      router.refresh();
    } catch (completeError) {
      setError(
        completeError instanceof Error
          ? completeError.message
          : "개발용 결제 완료 처리에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleComplete} className="w-full" size={size} variant={variant} disabled={loading}>
        {loading ? "개발용 결제 처리 중..." : "개발용 결제 완료"}
      </Button>
      <p className="text-xs leading-5 text-[var(--slate-500)]">
        실제 결제 없이 paid 상태로 전환해 구매 후 라이브러리 흐름을 검증합니다.
      </p>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
