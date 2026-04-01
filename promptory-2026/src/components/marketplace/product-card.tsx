import Link from "next/link";

import { PurchaseButton } from "@/components/marketplace/purchase-button";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { formatKrw } from "@/lib/currency";
import { formatDate } from "@/lib/format";
import { getPrimaryPreviewPoint } from "@/lib/promptory-product-copy";
import { getCategoryLabel, getProductTypeLabel, getSellerDisplayName } from "@/lib/promptory-display";
import type { ProductWithSeller } from "@/lib/server/products";

interface ProductCardProps {
  actionMode?: "detail" | "detail-and-purchase";
  matchNote?: string;
  product: ProductWithSeller;
  variant?: "default" | "compact";
}

export function ProductCard({ actionMode = "detail", matchNote, product, variant = "default" }: ProductCardProps) {
  const preview = getPrimaryPreviewPoint(product.preview_points ?? []);
  const sellerName = getSellerDisplayName(product.seller?.display_name);
  const categoryLabel = getCategoryLabel(product.category);
  const typeLabel = getProductTypeLabel(product.product_type);
  const compact = variant === "compact";
  const keywords = product.keywords ?? [];
  const purchaseRail = actionMode === "detail-and-purchase";

  return (
    <article
      className={cn(
        "ui-card-default flex h-full flex-col overflow-hidden rounded-2xl",
        compact ? "p-3.5" : "p-4 sm:p-5",
      )}
    >
      <div className="flex flex-wrap gap-2">
        <Badge>{categoryLabel}</Badge>
        <Badge variant="neutral">{typeLabel}</Badge>
        <Badge variant="neutral">설치 {product.setup_minutes}분</Badge>
        {keywords.slice(0, 2).map((keyword) => (
          <Badge key={keyword} variant="neutral">
            {keyword}
          </Badge>
        ))}
      </div>

      {product.thumbnail_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.thumbnail_url}
          alt={product.title}
          className={cn(
            "mt-4 w-full rounded-xl border border-[var(--line)] object-cover",
            compact ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
        />
      ) : null}

      <div className="mt-4 flex flex-1 flex-col">
        <p className="section-kicker text-[var(--brand-700)]">실행 팩</p>
        <Link href={`/products/${product.slug}`} className="text-[1.08rem] font-semibold leading-6 text-[var(--slate-950)]">
          {product.title}
        </Link>
        <p className="mt-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm leading-6 text-[var(--slate-800)]">
          {preview}
        </p>
        <p className={cn("mt-3 text-sm leading-6 text-[var(--slate-600)]", compact ? "line-clamp-2" : "line-clamp-2")}>
          {product.description}
        </p>
        {matchNote ? (
          <div className="mt-3 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-50)] px-3 py-3 text-sm leading-6 text-[var(--brand-800)]">
            {matchNote}
          </div>
        ) : null}

        <div className="mt-4 grid gap-2 border-t border-[var(--line)] pt-3.5 text-sm leading-6 text-[var(--slate-600)]">
          <div className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">판매자 {sellerName}</div>
          <div className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">업데이트 {formatDate(product.updated_at)}</div>
        </div>

        <div
          className={cn(
            "mt-4 gap-3 border-t border-[var(--line)] pt-3.5",
            purchaseRail ? "grid" : "flex items-end justify-between",
          )}
        >
          <div>
            <p className="section-kicker text-[var(--slate-500)]">가격</p>
            <p className="mt-1 text-[1.25rem] font-semibold tracking-tight text-[var(--slate-950)]">
              {formatKrw(product.price_krw)}
            </p>
          </div>
          {purchaseRail ? (
            <div className="grid gap-2">
              <CTAButton
                href={`/products/${product.slug}`}
                telemetryEventName="execution_pack_clicked"
                telemetryPayload={{ productId: product.id, rail: "detail", slug: product.slug }}
                variant="outline"
                size={compact ? "sm" : "default"}
              >
                연결 흐름 보기
              </CTAButton>
              <PurchaseButton
                productId={product.id}
                label="바로 주문하기"
                redirectTo={`/products/${product.slug}`}
                showHelperText={false}
                size={compact ? "sm" : "default"}
              />
            </div>
          ) : (
            <CTAButton
              href={`/products/${product.slug}`}
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ productId: product.id, rail: "detail", slug: product.slug }}
              size={compact ? "sm" : "default"}
            >
              연결 흐름 보기
            </CTAButton>
          )}
        </div>
      </div>
    </article>
  );
}
