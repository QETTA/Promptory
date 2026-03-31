import { Card } from "@/components/ui/card";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

export function ChannelDiagnosisPreview({
  brief,
  parsed,
  surface,
  snapshot,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
  snapshot: ChannelSnapshot;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });
  const stateLabel = brief.isComplete ? "확정 readout" : "임시 readout";
  const surfaceHeadline = surface?.headline?.trim();
  const surfaceDescription = surface?.description?.trim();
  const surfaceSignals = surface?.actionSignals ?? [];

  return (
    <div className="grid gap-4">
      <Card variant="strong" className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="section-kicker text-[var(--brand-700)]">Diagnosis Readout</p>
            <p className="mt-2 text-xs font-medium text-[var(--slate-500)]">{stateLabel}</p>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">
              {summary.diagnosisHeadline}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{summary.diagnosisBody}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {summary.diagnosisCards.map((card) => (
            <div key={card.title} className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-1)] px-4 py-4">
              <p className="section-kicker text-[var(--slate-500)]">{card.title}</p>
              {card.emphasis ? (
                <p className="mt-2 text-base font-semibold text-[var(--slate-950)]">{card.emphasis}</p>
              ) : null}
              <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{card.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">Decision Trace</p>
          <div className="mt-3 grid gap-3">
            {summary.directionPoints.slice(0, 2).map((point) => (
              <div key={point} className="flex gap-3 text-sm leading-6 text-[var(--slate-700)]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">Next Read Queue</p>
          <div className="mt-3 grid gap-3">
            {summary.nextStepSignals.slice(0, 2).map((point) => (
              <div key={point} className="flex gap-3 text-sm leading-6 text-[var(--slate-700)]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--slate-400)]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {surfaceHeadline || surfaceDescription || surfaceSignals.length > 0 ? (
        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">Public Surface Match</p>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-[var(--slate-700)]">
            {surfaceHeadline ? (
              <div className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
                <p className="text-xs font-semibold text-[var(--slate-500)]">Headline</p>
                <p className="mt-1">{surfaceHeadline}</p>
              </div>
            ) : null}
            {surfaceDescription ? (
              <div className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
                <p className="text-xs font-semibold text-[var(--slate-500)]">Description</p>
                <p className="mt-1">{surfaceDescription}</p>
              </div>
            ) : null}
            {surfaceSignals.length > 0 ? (
              <div className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
                <p className="text-xs font-semibold text-[var(--slate-500)]">Action Signal</p>
                <p className="mt-1">{surfaceSignals.join(", ")}</p>
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
