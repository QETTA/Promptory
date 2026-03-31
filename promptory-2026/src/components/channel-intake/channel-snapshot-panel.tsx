import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ChannelSnapshot, SnapshotCheckStatus } from "@/lib/channel-snapshot";

function getStatusLabel(status: SnapshotCheckStatus) {
  switch (status) {
    case "pass":
      return "준비됨";
    case "warn":
      return "보정 필요";
    default:
      return "검토 필요";
  }
}

function getStatusVariant(status: SnapshotCheckStatus) {
  switch (status) {
    case "pass":
      return "success" as const;
    case "warn":
      return "warning" as const;
    default:
      return "danger" as const;
  }
}

function getReadinessStatus(snapshot: ChannelSnapshot): SnapshotCheckStatus {
  if (snapshot.readyLabel === "다음 단계 진행 가능") {
    return "pass";
  }

  if (snapshot.readyLabel === "주소 보완 필요") {
    return "warn";
  }

  return "fail";
}

export function ChannelSnapshotPanel({ snapshot }: { snapshot: ChannelSnapshot }) {
  const readinessStatus = getReadinessStatus(snapshot);

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_320px]">
        <Card variant="strong" className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-kicker text-[var(--brand-700)]">Read State</p>
              <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">
                지금 이 주소로 어디까지 읽을 수 있는지 먼저 고정합니다
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{snapshot.readyReason}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>{snapshot.kindLabel}</Badge>
              <Badge variant="neutral">{snapshot.supportLabel}</Badge>
              <Badge variant={getStatusVariant(readinessStatus)} className="px-2.5 py-1 text-[11px] font-medium tracking-[-0.01em]">
                {snapshot.readyLabel}
              </Badge>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
              <p className="section-kicker text-[var(--slate-500)]">Host</p>
              <p className="mt-1 text-sm font-semibold text-[var(--slate-950)]">{snapshot.hostLabel}</p>
            </div>
            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
              <p className="section-kicker text-[var(--slate-500)]">{snapshot.pathLabel}</p>
              <p className="mt-1 truncate text-sm font-semibold text-[var(--slate-950)]">{snapshot.pathValue}</p>
            </div>
            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
              <p className="section-kicker text-[var(--slate-500)]">{snapshot.identifierLabel}</p>
              <p className="mt-1 truncate text-sm font-semibold text-[var(--slate-950)]">
                {snapshot.identifier ?? "추가 확인 필요"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
            <p className="section-kicker text-[var(--slate-500)]">Normalized URL</p>
            <p className="mt-1 break-all text-sm leading-6 text-[var(--slate-700)]">{snapshot.normalizedUrl}</p>
          </div>
        </Card>

        <Card variant="heroBright" className="p-5 sm:p-6">
          <p className="section-kicker text-[var(--brand-700)]">Confidence Rail</p>
          <h3 className="mt-2 text-[1.05rem] font-semibold tracking-tight text-[var(--slate-950)]">
            {snapshot.confidenceLabel} 확신도로 읽고 있습니다
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{snapshot.confidenceReason}</p>

          <div className="mt-4 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
            <p className="section-kicker text-[var(--slate-500)]">Next Surface</p>
            <p className="mt-1 text-sm leading-6 text-[var(--slate-800)]">{snapshot.surfaceHint}</p>
          </div>

          <div className="mt-4 grid gap-2">
            {snapshot.checks.slice(0, 2).map((check) => (
              <div
                key={check.label}
                className="flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3"
              >
                <p className="text-sm font-medium text-[var(--slate-800)]">{check.label}</p>
              <span
                  className="shrink-0"
              >
                  <Badge variant={getStatusVariant(check.status)} className="px-2 py-1 text-[11px] font-medium">
                    {getStatusLabel(check.status)}
                  </Badge>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {snapshot.checks.map((check) => (
          <div
            key={check.label}
            className="rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface-1)] px-4 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[var(--slate-950)]">{check.label}</p>
              <span
                className="shrink-0"
              >
                <Badge variant={getStatusVariant(check.status)} className="px-2 py-1 text-[11px] font-medium">
                  {getStatusLabel(check.status)}
                </Badge>
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{check.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">What We Know</p>
          <div className="mt-3 grid gap-3">
            {snapshot.summaryPoints.map((point) => (
              <div key={point} className="flex gap-3 text-sm leading-6 text-[var(--slate-700)]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">What To Read Next</p>
          <div className="mt-3 grid gap-3">
            {snapshot.nextSignals.map((point) => (
              <div key={point} className="flex gap-3 text-sm leading-6 text-[var(--slate-700)]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--slate-400)]" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
