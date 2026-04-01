"use client";

import { DownloadButton } from "../account/download-button";
import { CTAButton } from "./cta-button";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface DownloadCardProps {
  order: {
    id: string;
    created_at: string;
    product?: {
      title?: string;
      slug?: string;
      updated_at?: string;
      file_path?: string | null;
    } | null;
  };
  variant?: "ready" | "waiting";
}

export function DownloadCard({ order, variant = "ready" }: DownloadCardProps) {
  const isReady = variant === "ready";
  const productTitle = order.product?.title ?? "제품 정보 없음";
  const hasProductSlug = Boolean(order.product?.slug);

  return (
    <article
      className={cn(
        "rounded-2xl border p-5 transition-shadow hover:shadow-sm",
        isReady
          ? "border-[var(--line-strong)] bg-[var(--surface-1)]"
          : "border-[var(--line)] bg-[var(--surface-2)]"
      )}
      aria-label={isReady ? `다운로드 가능: ${productTitle}` : `파일 준비 중: ${productTitle}`}
    >
      {isReady ? (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[var(--slate-950)]">
              {productTitle}
            </h3>
            <p className="text-sm leading-6 text-[var(--slate-600)]">
              주문일 {formatDate(order.created_at)}
              {order.product?.updated_at && (
                <>
                  {" "}· 업데이트 {formatDate(order.product.updated_at)}
                </>
              )}
            </p>
            <p className="text-sm leading-6 text-[var(--slate-700)]">
              가이드를 다시 보고, 실행 파일을 받아 바로 시작할 수 있습니다.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-[220px]">
            <DownloadButton orderId={order.id} />
            {hasProductSlug && (
              <CTAButton
                href={`/products/${order.product?.slug}`}
                variant="outline"
                aria-label={`${productTitle} 상세 보기`}
              >
                실행 팩 보기
              </CTAButton>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-[var(--slate-950)]">
            {productTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">
            주문일 {formatDate(order.created_at)} · 판매자가 실행 파일을 아직 올리지 않았습니다.
          </p>
          {hasProductSlug && (
            <div className="mt-4">
              <CTAButton
                href={`/products/${order.product?.slug}`}
                variant="outline"
                size="sm"
                aria-label={`${productTitle} 다시 보기`}
              >
                실행 팩 다시 보기
              </CTAButton>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
