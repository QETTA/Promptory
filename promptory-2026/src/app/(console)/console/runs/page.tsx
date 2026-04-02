import type { Metadata } from "next";
import Link from "next/link";

import { CatalystDataTable, CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton, ConsoleToneBadge } from "@/components/console/console-primitives";
import { consoleRuns } from "@/lib/console/mock-data";

export const metadata: Metadata = {
  title: "Runs — Promptory Console",
};

export default function ConsoleRunsPage() {
  const failedRuns = consoleRuns.filter((run) => run.statusTone === "danger" || run.statusTone === "warning");

  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Runs"
        title="Workflow runs / failed runs"
        description="Slack surface 뒤에서 도는 durable workflow를 보는 화면입니다. 승인 대기, 지연, 실패를 runtime 관점에서 triage합니다."
        actions={<ConsoleLinkButton href="/console/audit" tone="secondary">audit 보기</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_340px]">
        <CatalystShellCard title="Run table" description="Temporal / retry / replay shell · 실제 replay action은 T07에서 연결">
          <CatalystDataTable
            rows={consoleRuns}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "workflow",
                header: "Workflow",
                render: (row) => (
                  <div className="space-y-1">
                    <p className="font-semibold text-[var(--ink-primary)]">{row.workflow}</p>
                    <Link href={`/console/requests/${row.requestId}`} className="text-xs text-[var(--brand-700)] hover:text-[var(--brand-800)]">
                      request {row.requestId}
                    </Link>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (row) => <ConsoleToneBadge tone={row.statusTone}>{row.status}</ConsoleToneBadge>,
              },
              {
                key: "duration",
                header: "Duration",
                render: (row) => (
                  <div>
                    <p className="font-medium text-[var(--ink-primary)]">{row.duration}</p>
                    <p className="text-xs text-[var(--ink-tertiary)]">started {row.startedAt}</p>
                  </div>
                ),
              },
              {
                key: "retryPolicy",
                header: "Retry policy",
              },
              {
                key: "owner",
                header: "Owner",
              },
            ]}
          />
        </CatalystShellCard>

        <div className="space-y-6">
          <CatalystShellCard title="Failed / delayed" description="현재 가장 먼저 봐야 할 runtime 문제입니다.">
            <div className="space-y-3">
              {failedRuns.map((run) => (
                <div key={run.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--ink-primary)]">{run.workflow}</p>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">{run.note}</p>
                    </div>
                    <ConsoleToneBadge tone={run.statusTone}>{run.status}</ConsoleToneBadge>
                  </div>
                </div>
              ))}
            </div>
          </CatalystShellCard>

          <CatalystShellCard title="Replay rules" description="run page는 structure 문제와 connector 문제를 구분하는 데 씁니다.">
            <ConsoleBulletList
              items={[
                "connector degraded면 동일 pack의 다른 request도 함께 점검",
                "manual replay 전 audit event와 side-effect 중복 여부를 먼저 확인",
                "idempotency key와 expiry rule이 없는 write는 재실행하지 않음",
              ]}
            />
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
