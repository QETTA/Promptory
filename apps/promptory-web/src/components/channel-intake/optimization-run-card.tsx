import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { formatDate } from "@/lib/format";
import { optimizeResultLabelCopy } from "@/lib/optimize-copy";

import type { ReplaySafeOptimizationRun } from "@/features/optimize/domain/optimization-run-contract";

export function OptimizationRunCard({
  run,
}: {
  run: ReplaySafeOptimizationRun;
}) {
  return (
    <Card variant="strong" className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="section-kicker text-[var(--brand-700)]">{optimizeResultLabelCopy.savedRunKicker}</p>
            <Badge variant="neutral">{formatDate(run.updatedAt)}</Badge>
          </div>
          <h3 className="mt-3 text-[1.02rem] font-semibold text-[var(--slate-950)]">{run.derived.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">
            {run.derived.summaryNote ?? optimizeResultLabelCopy.savedRunFallbackSummary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="neutral">{run.channel.label}</Badge>
            {run.derived.focusTitle ? <Badge variant="neutral">{run.derived.focusTitle}</Badge> : null}
            {run.derived.recommendedCategory ? <Badge variant="neutral">{run.derived.recommendedCategory}</Badge> : null}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]">{optimizeResultLabelCopy.sourceUrlLabel}</p>
          <p className="mt-2 break-all text-xs leading-6 text-[var(--slate-600)]">{run.source.rawUrl}</p>
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-[220px]">
          <CTAButton href={`/optimize${run.state.queryString}`} variant="outline">
            {optimizeResultLabelCopy.openInQuery}
          </CTAButton>
          {run.derived.recommendedCategory ? (
            <CTAButton
              href={`/products?category=${encodeURIComponent(run.derived.recommendedCategory)}&sort=interest`}
              variant="outline"
            >
              {optimizeResultLabelCopy.relatedRailCta}
            </CTAButton>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
