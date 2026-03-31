import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { formatDate } from "@/lib/format";
import type { OptimizationRunRow } from "@/lib/supabase/types";

export function OptimizationRunCard({
  run,
}: {
  run: OptimizationRunRow;
}) {
  return (
    <Card variant="strong" className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="section-kicker text-[var(--brand-700)]">Saved Run</p>
            <Badge variant="neutral">{formatDate(run.updated_at)}</Badge>
          </div>
          <h3 className="mt-3 text-[1.02rem] font-semibold text-[var(--slate-950)]">{run.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">
            {run.summary_note ?? "현재 답변 축과 URL 상태를 다시 열 수 있게 저장한 진단입니다."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="neutral">{run.channel_label}</Badge>
            {run.focus_title ? <Badge variant="neutral">{run.focus_title}</Badge> : null}
            {run.recommended_category ? <Badge variant="neutral">{run.recommended_category}</Badge> : null}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]">Source URL</p>
          <p className="mt-2 break-all text-xs leading-6 text-[var(--slate-600)]">{run.raw_url}</p>
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-[220px]">
          <CTAButton href={`/optimize${run.query_string}`} variant="outline">
            다시 열기
          </CTAButton>
          {run.recommended_category ? (
            <CTAButton href={`/products?category=${encodeURIComponent(run.recommended_category)}&sort=interest`} variant="outline">
              실행 팩 보기
            </CTAButton>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
