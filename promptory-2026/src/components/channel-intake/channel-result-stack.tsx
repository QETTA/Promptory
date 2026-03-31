import { ProductCard } from "@/components/marketplace/product-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyActionButton } from "@/components/ui/copy-action-button";
import { CTAButton } from "@/components/ui/cta-button";
import type { OptimizationBriefSummary } from "@/lib/optimization-brief";
import type { OptimizeRailPlan } from "@/lib/optimize-rail";
import type { ProductWithSeller } from "@/lib/server/products";

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
    <div className="grid gap-4">
      <Card variant="heroBright" className="overflow-hidden p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker text-[var(--brand-700)]">Result Stack</p>
              <h3 className="mt-2 text-[1.3rem] font-semibold tracking-tight text-[var(--slate-950)]">
                {summary.diagnosisHeadline}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{summary.diagnosisBody}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{isComplete ? "질문 완료" : "임시 진단"}</Badge>
              <Badge variant="neutral">{railPlan.categoryLabel}</Badge>
              {primaryModule ? <Badge variant="neutral">{primaryModule.title}</Badge> : null}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-4">
              <p className="text-xs font-semibold text-[var(--slate-500)]">Diagnosis</p>
              <div className="mt-3 grid gap-3">
                {summary.diagnosisCards.slice(0, 3).map((card) => (
                  <div key={card.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-3 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-semibold text-[var(--slate-500)]">{card.title}</p>
                      {card.emphasis ? <p className="text-xs font-semibold text-[var(--brand-700)]">{card.emphasis}</p> : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-1)] px-4 py-4">
              <p className="text-xs font-semibold text-[var(--slate-500)]">Recommended Stack</p>
              <div className="mt-3 grid gap-3">
                {summary.recommendedModules.slice(0, 4).map((module) => (
                  <div key={module.title} className="rounded-xl border border-[var(--line)] bg-white px-3 py-3">
                    <p className="text-sm font-semibold text-[var(--slate-950)]">{module.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{module.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-4">
              <p className="text-xs font-semibold text-[var(--slate-500)]">Apply Draft</p>
              <div className="mt-3 grid gap-3">
                {summary.copyDrafts.slice(0, 2).map((draft) => (
                  <div key={draft.title} className="rounded-xl border border-[var(--line)] bg-white px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--slate-950)]">{draft.title}</p>
                      <CopyActionButton
                        label="복사"
                        size="sm"
                        variant="subtle"
                        text={draft.draft}
                        successTitle="초안을 복사했습니다"
                        successDescription={`${draft.title} 문장을 바로 붙여 넣을 수 있습니다.`}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{draft.draft}</p>
                    <p className="mt-3 text-xs font-medium text-[var(--slate-500)]">붙일 위치</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--slate-700)]">{draft.placement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card variant="strong" className="p-5">
        <p className="section-kicker text-[var(--brand-700)]">Order Rail</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <h4 className="text-base font-semibold text-[var(--slate-950)]">{railPlan.title}</h4>
            <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{railPlan.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {railPlan.focusBadges.map((badge) => (
                <Badge key={badge} variant="neutral">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <CTAButton
              href={railPlan.primaryHref}
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ href: railPlan.primaryHref, railCategory: railPlan.category, railLabel: "primary" }}
              size="lg"
            >
              {railPlan.primaryLabel}
            </CTAButton>
            <CTAButton
              href={railPlan.secondaryHref}
              telemetryEventName="execution_pack_clicked"
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
        <details className="group rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-1)] px-5 py-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--slate-950)]">
            관련 실행 팩 {railProducts.length}개 보기
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
        <Card variant="tint" className="p-5 text-sm leading-6 text-[var(--slate-700)]">
          {railPlan.emptyBody}
        </Card>
      )}
    </div>
  );
}
