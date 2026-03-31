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
import styles from "./product-card.module.css";

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
        styles.card,
        compact ? styles.compact : "",
      )}
    >
      <div className={styles.badges}>
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
            styles.thumbnail,
            compact ? styles.thumbnailCompact : styles.thumbnailDefault,
          )}
        />
      ) : null}

      <div className={styles.body}>
        <p className={cn("section-kicker", styles.eyebrow)}>실행 팩</p>
        <Link href={`/products/${product.slug}`} className={styles.title}>
          {product.title}
        </Link>
        <p className={styles.preview}>
          {preview}
        </p>
        <p className={styles.description}>
          {product.description}
        </p>
        {matchNote ? (
          <div className={styles.matchNote}>
            {matchNote}
          </div>
        ) : null}

        <div className={styles.meta}>
          <div className={styles.metaItem}>판매자 {sellerName}</div>
          <div className={styles.metaItem}>업데이트 {formatDate(product.updated_at)}</div>
        </div>

        <div
          className={cn(
            styles.footer,
            purchaseRail ? styles.footerPurchase : styles.footerDefault,
          )}
        >
          <div>
            <p className={cn("section-kicker", styles.priceEyebrow)}>가격</p>
            <p className={styles.price}>
              {formatKrw(product.price_krw)}
            </p>
          </div>
          {purchaseRail ? (
            <div className={styles.purchaseActions}>
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
