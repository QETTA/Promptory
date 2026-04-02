import type { Metadata } from "next";

import {
  CatalystPageHeader,
  CatalystShellCard,
} from "@/components/console/template-foundation";
import { ConsoleKpiGrid } from "@/components/console/console-kpi-grid";
import { ConsoleRequestsTable } from "@/components/console/console-requests-table";
import {
  ConsoleBulletList,
  ConsoleInsightCard,
  ConsoleLinkButton,
  ConsoleToneBadge,
} from "@/components/console/console-primitives";
import { consoleApprovals } from "@/lib/console/approval-data";
import { consoleDashboardStats, consoleHighlights, consoleReports } from "@/lib/console/dashboard-data";
import { consoleConnectors } from "@/lib/console/governance-data";
import { consoleRequests } from "@/lib/console/request-data";
import { consoleRuns } from "@/lib/console/run-data";

export const metadata: Metadata = {
  title: "Console — Promptory",
  description: "Promptory internal app console shell with requests, approvals, runs, connectors, and audit mock views.",
};

export default function ConsoleDashboardPage() {
  const failedRuns = consoleRuns.filter((run) => run.statusTone === "danger" || run.statusTone === "warning");

  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Console MVP"
        title="Request-to-resolution 운영 콘솔"
        description="approval-driven internal app의 운영 표면입니다. 직원은 Slack에서 요청하고, 운영자는 여기서 병목과 connector 상태를 보고, 관리자와 보안팀은 정책과 audit를 확인합니다."
        actions={(
          <>
            <ConsoleLinkButton href="/console/requests">request queue</ConsoleLinkButton>
            <ConsoleLinkButton href="/console/reports" tone="secondary">exec brief</ConsoleLinkButton>
          </>
        )}
      />

      <ConsoleKpiGrid stats={consoleDashboardStats} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
        <ConsoleInsightCard
          title="최근 요청"
          description="Slack App Home / Assistant thread / approval card 흐름을 mock data로 보여주는 목록입니다."
          actions={<ConsoleLinkButton href="/console/requests" tone="secondary">요청 queue 보기</ConsoleLinkButton>}
        >
          <ConsoleRequestsTable rows={consoleRequests.slice(0, 4)} />
        </ConsoleInsightCard>

        <div className="space-y-6">
          <ConsoleInsightCard
            title="승인 대기 큐"
            description="사람 승인 없이는 side-effect를 실행하지 않는 흐름을 기본값으로 둡니다."
            actions={<ConsoleLinkButton href="/console/approvals" tone="secondary">approval queue</ConsoleLinkButton>}
          >
            <div className="space-y-3">
              {consoleApprovals.slice(0, 3).map((approval) => (
                <div key={approval.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--ink-primary)]">{approval.title}</p>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">{approval.pack} · requester {approval.requester}</p>
                    </div>
                    <ConsoleToneBadge tone={approval.risk === "high" ? "danger" : approval.risk === "medium" ? "warning" : "success"}>
                      risk {approval.risk}
                    </ConsoleToneBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-secondary)]">{approval.detail}</p>
                  <p className="mt-3 text-xs font-medium text-[var(--ink-tertiary)]">due {approval.dueAt}</p>
                </div>
              ))}
            </div>
          </ConsoleInsightCard>

          <ConsoleInsightCard title="Top failures" description="운영 대시보드는 실패 구간을 바로 보여줘야 합니다.">
            <ConsoleBulletList items={consoleHighlights[0].items} />
          </ConsoleInsightCard>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <CatalystShellCard
          title="Connector snapshot"
          description="Slack은 UI, 진짜 제품은 connector / policy / audit 계층입니다."
          actions={<ConsoleLinkButton href="/console/connectors" tone="secondary">manage connectors</ConsoleLinkButton>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {consoleConnectors.slice(0, 6).map((connector) => (
              <div key={connector.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--ink-primary)]">{connector.name}</p>
                    <p className="mt-1 text-sm text-[var(--ink-secondary)]">{connector.scope}</p>
                  </div>
                  <ConsoleToneBadge tone={connector.statusTone}>{connector.status}</ConsoleToneBadge>
                </div>
                <p className="mt-3 text-sm text-[var(--ink-secondary)]">{connector.note}</p>
                <p className="mt-3 text-xs font-medium text-[var(--ink-tertiary)]">{connector.mode} · last sync {connector.lastSync}</p>
              </div>
            ))}
          </div>
        </CatalystShellCard>

        <div className="space-y-6">
          <ConsoleInsightCard
            title="Replay / failed runs"
            description="runtime failure는 console에서 triage하고, T07 runtime scaffold에서 실제 replay hook을 연결합니다."
            actions={<ConsoleLinkButton href="/console/runs" tone="secondary">runs 보기</ConsoleLinkButton>}
          >
            <div className="space-y-3">
              {failedRuns.slice(0, 3).map((run) => (
                <div key={run.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--ink-primary)]">{run.workflow}</p>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">request {run.requestId}</p>
                    </div>
                    <ConsoleToneBadge tone={run.statusTone}>{run.status}</ConsoleToneBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-secondary)]">{run.note}</p>
                  <p className="mt-3 text-xs font-medium text-[var(--ink-tertiary)]">{run.duration} · {run.retryPolicy}</p>
                </div>
              ))}
            </div>
          </ConsoleInsightCard>

          <ConsoleInsightCard
            title="Report pack"
            description="exec / ops / rollout report를 같은 콘솔 안에서 재사용합니다."
            actions={<ConsoleLinkButton href="/console/reports" tone="secondary">reports</ConsoleLinkButton>}
          >
            <div className="space-y-3">
              {consoleReports.map((report) => (
                <div key={report.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="font-semibold text-[var(--ink-primary)]">{report.title}</p>
                  <p className="mt-1 text-sm text-[var(--ink-secondary)]">{report.audience} · {report.cadence}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-secondary)]">{report.summary}</p>
                </div>
              ))}
            </div>
          </ConsoleInsightCard>
        </div>
      </div>
    </div>
  );
}
