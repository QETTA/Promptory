import { Card } from "@/components/ui/card";
import { CopyActionButton } from "@/components/ui/copy-action-button";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

export function ChannelCopyDraftPanel({
  brief,
  parsed,
  snapshot,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface?: ChannelSurfaceRead | null;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  return (
    <div className="grid gap-4">
      <Card variant="strong" className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="section-kicker text-[var(--brand-700)]">Apply Draft</p>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">
              {summary.copyDraftHeadline}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{summary.copyDraftBody}</p>
          </div>
          <CopyActionButton
            currentUrl
            label="진단 링크 복사"
            size="sm"
            variant="outline"
            successTitle="진단 링크를 복사했습니다"
            successDescription="현재 답변과 URL이 포함된 링크를 바로 공유할 수 있습니다."
          />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {summary.copyDrafts.map((draft) => (
          <div key={draft.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-kicker text-[var(--slate-500)]">{draft.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{draft.body}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[var(--brand-700)]">A Draft</p>
                  <CopyActionButton
                    label="A안 복사"
                    size="sm"
                    variant="subtle"
                    text={draft.draft}
                    successTitle="A안을 복사했습니다"
                    successDescription={`${draft.title}의 기본 초안을 복사했습니다.`}
                  />
                </div>
                <p className="mt-2 text-sm font-medium leading-6 text-[var(--slate-950)]">{draft.draft}</p>
              </div>

              {draft.alternateDraft ? (
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-[var(--brand-700)]">B Draft</p>
                    <CopyActionButton
                      label="B안 복사"
                      size="sm"
                      variant="subtle"
                      text={draft.alternateDraft}
                      successTitle="B안을 복사했습니다"
                      successDescription={`${draft.title}의 대안 초안을 복사했습니다.`}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium leading-6 text-[var(--slate-900)]">{draft.alternateDraft}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--slate-700)]">
              <div>
                <p className="text-xs font-semibold text-[var(--slate-500)]">Placement</p>
                <p className="mt-1">{draft.placement}</p>
              </div>
              {draft.experimentHint ? (
                <div>
                  <p className="text-xs font-semibold text-[var(--slate-500)]">Experiment</p>
                  <p className="mt-1">{draft.experimentHint}</p>
                </div>
              ) : null}
              {draft.compareHint ? (
                <div>
                  <p className="text-xs font-semibold text-[var(--slate-500)]">Compare</p>
                  <p className="mt-1">{draft.compareHint}</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
