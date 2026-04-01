"use client";

import { CTAButton } from "./cta-button";
import { Badge } from "./badge";
import { formatKrw } from "@/lib/currency";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface OrderCardProps {
  order: {
    id: string;
    amount_krw: number;
    created_at: string;
    status: string;
    product?: {
      title?: string;
      category?: string;
      slug?: string;
    } | null;
  };
  paymentMode?: "toss" | "dev_stub" | "disabled";
  canCheckout?: boolean;
  variant?: "pending" | "history";
}

export function OrderCard({
  order,
  paymentMode = "disabled",
  canCheckout = false,
  variant = "pending",
}: OrderCardProps) {
  const isPending = variant === "pending";
  const productTitle = order.product?.title ?? "실행 팩 정보를 찾을 수 없습니다.";
  const category = order.product?.category ?? "실행 팩";
  const hasProductSlug = Boolean(order.product?.slug);

  return (
    <article
      className={cn(
        "rounded-2xl border p-5 transition-shadow hover:shadow-sm",
        isPending
          ? "border-[var(--line-strong)] bg-[var(--surface-1)]"
          : "border-[var(--line)] bg-[var(--surface-1)]"
      )}
      aria-label={`주문 ${productTitle}`}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--slate-500)]">
            <Badge variant={isPending ? "warning" : "neutral"} size="sm">
              {isPending
                ? paymentMode === "toss"
                  ? "결제 대기"
                  : "구매 흐름 확인"
                : "완료"}
            </Badge>
            <span className="text-[var(--slate-400)]">·</span>
            <span>{category}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[var(--slate-950)]">
            {productTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">
            {formatKrw(order.amount_krw)} · 주문일 {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          {isPending && canCheckout && (
            <CTAButton
              href={`/checkout/${order.id}`}
              size="default"
              aria-label={`${productTitle} 결제 진행`}
            >
              {paymentMode === "dev_stub" ? "checkout 열기" : "결제 진행하기"}
            </CTAButton>
          )}
          {hasProductSlug && (
            <CTAButton
              href={`/products/${order.product?.slug}`}
              variant="outline"
              size="sm"
              aria-label={`${productTitle} 상세 보기`}
            >
              실행 팩 보기
            </CTAButton>
          )}
        </div>
      </div>
    </article>
  );
}
