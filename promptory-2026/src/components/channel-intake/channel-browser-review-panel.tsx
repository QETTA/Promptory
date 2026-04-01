import { Card } from "@/components/ui/card";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

export function ChannelBrowserReviewPanel({
  brief,
  parsed,
  snapshot,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface: ChannelSurfaceRead;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  if (!summary.browserReviewHeadline || summary.browserReviewCards.length === 0) {
    return null;
  }

  return (
    <Card variant="strong" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <p className="section-kicker text-[var(--brand-700)]">Browser Review</p>
          <h3 className="mt-2 text-[1.1rem] font-semibold tracking-tight text-[var(--slate-950)]">
            {summary.browserExecutionHeadline ?? summary.browserReviewHeadline}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">
            {summary.browserExecutionBody ?? summary.browserReviewBody}
          </p>
        </div>

        {summary.browserOpenUrl ? (
          <a
            href={summary.browserOpenUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--brand-600)] px-4 py-2 text-sm font-semibold text-[var(--brand-700)]"
          >
            실제 채널 열기
          </a>
        ) : null}
      </div>

      {summary.browserMemoTemplate ? (
        <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-6 text-[var(--slate-950)] whitespace-pre-wrap">
          {summary.browserMemoTemplate}
        </div>
      ) : null}

      {summary.browserExecutionSteps.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summary.browserExecutionSteps.map((step) => (
            <div key={step.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--slate-500)]">{step.title}</p>
              {step.emphasis ? <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{step.emphasis}</p> : null}
              <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{step.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {summary.browserReviewCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-4">
            <p className="text-xs font-semibold text-[var(--slate-500)]">{card.title}</p>
            {card.emphasis ? <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{card.emphasis}</p> : null}
            <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{card.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
