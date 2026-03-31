"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { buildLoginHref } from "@/lib/auth-redirect";
import { cn } from "@/lib/cn";

export function PurchaseButton({
  className,
  disabled = false,
  label = "구매하기",
  productId,
  redirectTo = "/products",
  showHelperText = true,
  size = "lg",
}: {
  className?: string;
  disabled?: boolean;
  label?: string;
  productId: string;
  redirectTo?: string;
  showHelperText?: boolean;
  size?: "default" | "lg" | "sm";
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    if (disabled) {
      setError("구매를 시작하려면 먼저 /setup에서 Promptory 연결을 완료해 주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const payload = (await response.json()) as { error?: string; orderId?: string };

      if (response.status === 401) {
        router.push(buildLoginHref(`/buy/${productId}`));
        return;
      }

      if (!response.ok || !payload.orderId) {
        throw new Error(payload.error ?? "주문을 만들지 못했습니다.");
      }

      router.push(`/checkout/${payload.orderId}`);
      router.refresh();
    } catch (purchaseError) {
      setError(
        purchaseError instanceof Error
          ? purchaseError.message
          : "주문 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={handlePurchase} className={cn("w-full", className)} size={size} disabled={loading || disabled}>
        {loading ? "주문 생성 중..." : label}
      </Button>
      {showHelperText ? (
        <p className="text-xs leading-5 text-[var(--slate-500)]">
          주문을 만든 뒤 바로 checkout으로 이동해 결제와 구매 후 흐름을 이어갑니다.
        </p>
      ) : null}
      {error ? <p className="text-xs leading-5 text-rose-600">{error}</p> : null}
    </div>
  );
}
