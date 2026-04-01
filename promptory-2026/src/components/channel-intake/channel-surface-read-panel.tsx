import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

export function ChannelSurfaceReadPanel({ surface }: { surface: ChannelSurfaceRead }) {
  return (
    <Card variant="strong" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <p className="section-kicker text-[var(--slate-500)]">Surface Read</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{surface.statusLabel}</Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{surface.statusReason}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-4">
          <p className="text-xs font-semibold text-[var(--slate-500)]">Headline</p>
          <p className="mt-2 text-base font-semibold text-[var(--slate-950)]">
            {surface.headline ?? "아직 뚜렷한 제목을 읽지 못했습니다."}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">
            {surface.description ?? "공개 설명 문구가 제한적이라, 다음 단계에서 브라우저 기반 읽기가 더 필요할 수 있습니다."}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-4">
          <p className="text-xs font-semibold text-[var(--slate-500)]">Action Signals</p>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-[var(--slate-700)]">
            {surface.actionSignals.length > 0 ? (
              surface.actionSignals.map((signal) => (
                <p key={signal} className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">
                  {signal}
                </p>
              ))
            ) : (
              <p className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">
                지금 바로 보이는 페이지 안에서는 행동으로 이어지는 문장이 아직 많지 않았습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-3">
          <p className="text-xs font-semibold text-[var(--slate-500)]">Notes</p>
          <div className="mt-2 grid gap-2 text-sm leading-6 text-[var(--slate-700)]">
            {surface.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>

        {surface.browserFollowupNeeded ? (
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
            <p className="text-xs font-semibold text-[var(--brand-700)]">Browser Follow-up</p>
            <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">
              {surface.browserFollowupReason ?? "지금 바로 보이는 정보만으로는 실제 첫 화면과 펼침 뒤 문장까지 다 확인하기 어렵습니다."}
            </p>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-[var(--slate-700)]">
              {surface.browserFollowupPoints.map((point) => (
                <p key={point} className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">
                  {point}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
