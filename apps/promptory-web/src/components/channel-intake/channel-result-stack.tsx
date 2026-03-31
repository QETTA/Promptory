import { ProductCard } from "@/components/marketplace/product-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyActionButton } from "@/components/ui/copy-action-button";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { optimizeResultLabelCopy } from "@/lib/optimize-copy";
import { optimizeRailCopy } from "@/lib/optimize-copy";
import type { OptimizationBriefSummary } from "@/lib/optimization-brief";
import type { OptimizeRailPlan } from "@/lib/optimize-rail";
import type { ProductWithSeller } from "@/lib/server/products";
import styles from "./channel-result-stack.module.css";

export function ChannelResultStack({
  isComplete,
  railPlan,
  railProducts,
  summary,
}: {
  isComplete: boolean;
  railPlan: OptimizeRailPlan;
  railProducts: ProductWithSeller[];
  summary: OptimizationBriefSummary;
}) {
  const primaryModule = summary.recommendedModules[0];

  return (
    <div className={styles.root}>
      <Card variant="heroBright" className={styles.summaryCard}>
        <div>
          <div className={styles.summaryTop}>
            <div className={styles.summaryCopy}>
              <p className={cn("section-kicker", styles.eyebrow)}>{optimizeResultLabelCopy.resultStackKicker}</p>
              <h3 className={styles.headline}>
                {summary.diagnosisHeadline}
              </h3>
              <p className={styles.body}>{summary.diagnosisBody}</p>
            </div>
            <div className={styles.badges}>
              <Badge>{isComplete ? optimizeResultLabelCopy.runStateDone : optimizeResultLabelCopy.runStateDraft}</Badge>
              <Badge variant="neutral">{railPlan.categoryLabel}</Badge>
              {primaryModule ? <Badge variant="neutral">{primaryModule.title}</Badge> : null}
            </div>
          </div>

          <div className={styles.columns}>
            <div className={cn(styles.columnCard, styles.columnWhite)}>
              <p className={styles.columnLabel}>{optimizeResultLabelCopy.resultStackSection}</p>
              <div className={styles.stackList}>
                {summary.diagnosisCards.slice(0, 3).map((card) => (
                  <div key={card.title} className={styles.stackItem}>
                    <div className={styles.stackTop}>
                      <p className={styles.columnLabel}>{card.title}</p>
                      {card.emphasis ? <p className={styles.eyebrow}>{card.emphasis}</p> : null}
                    </div>
                    <p className={styles.stackBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(styles.columnCard, styles.columnWhite)}>
              <p className={styles.columnLabel}>{optimizeResultLabelCopy.recommendedStackSection}</p>
              <div className={styles.stackList}>
                {summary.recommendedModules.slice(0, 4).map((module) => (
                  <div key={module.title} className={styles.stackItem}>
                    <p className={styles.stackTitle}>{module.title}</p>
                    <p className={styles.stackBody}>{module.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(styles.columnCard, styles.columnMuted)}>
              <p className={styles.columnLabel}>{optimizeResultLabelCopy.applyDraftSection}</p>
              <div className={styles.stackList}>
                {summary.copyDrafts.slice(0, 2).map((draft) => (
                  <div key={draft.title} className={styles.stackItem}>
                    <div className={styles.stackTop}>
                      <p className={styles.stackTitle}>{draft.title}</p>
                      <CopyActionButton
                        label={optimizeResultLabelCopy.copyDraftActionLabel}
                        size="sm"
                        variant="subtle"
                        text={draft.draft}
                        successTitle={optimizeResultLabelCopy.applyDraftCopySuccess}
                        successDescription={`${draft.title} 문장을 바로 붙여 넣을 수 있습니다.`}
                      />
                    </div>
                    <p className={styles.stackBody}>{draft.draft}</p>
                    <p className={styles.stackMetaLabel}>붙일 위치</p>
                    <p className={styles.stackBody}>{draft.placement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card variant="strong" className={styles.railCard}>
        <p className={cn("section-kicker", styles.eyebrow)}>{optimizeResultLabelCopy.orderRailKicker}</p>
        <div className={styles.railGrid}>
          <div>
            <h4 className={styles.railTitle}>{railPlan.title}</h4>
            <p className={styles.railBody}>{railPlan.body}</p>
            <div className={styles.railBadges}>
              {railPlan.focusBadges.map((badge) => (
                <Badge key={badge} variant="neutral">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className={styles.railActions}>
            <CTAButton
              href={railPlan.primaryHref}
              telemetryEventName={optimizeRailCopy.telemetryEvent}
              telemetryPayload={{ href: railPlan.primaryHref, railCategory: railPlan.category, railLabel: "primary" }}
              size="lg"
            >
              {railPlan.primaryLabel}
            </CTAButton>
            <CTAButton
              href={railPlan.secondaryHref}
              telemetryEventName={optimizeRailCopy.telemetryEvent}
              telemetryPayload={{ href: railPlan.secondaryHref, railCategory: railPlan.category, railLabel: "secondary" }}
              variant="outline"
              size="lg"
            >
              {railPlan.secondaryLabel}
            </CTAButton>
          </div>
        </div>
      </Card>

      {railProducts.length > 0 ? (
        <details className={styles.details}>
          <summary className={styles.detailsSummary}>
            {optimizeResultLabelCopy.relatedRailSummaryLabel(railProducts.length)}
          </summary>
          <div className={styles.productsGrid}>
            {railProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
                actionMode="detail-and-purchase"
              />
            ))}
          </div>
        </details>
      ) : (
        <Card variant="tint" className={styles.emptyRail}>
          {railPlan.emptyBody}
        </Card>
      )}
    </div>
  );
}
