import type { Metadata } from "next";
import Link from "next/link";

import { CatalystDataTable, CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton, ConsoleToneBadge } from "@/components/console/console-primitives";
import { consoleApprovals } from "@/lib/console/mock-data";

export const metadata: Metadata = {
  title: "Approvals — Promptory Console",
};

export default function ConsoleApprovalsPage() {
  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Approvals"
        title="승인 대기 큐"
        description="답변형 UX 뒤에 approval-driven workflow를 숨기지 않고 드러내는 콘솔입니다. risk, due, impact를 한 화면에서 보고 승인 카드 우선순위를 정합니다."
        actions={<ConsoleLinkButton href="/console/requests" tone="secondary">requests 보기</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_340px]">
        <CatalystShellCard title="Approval queue" description="mock queue · actual approve / reject actions are intentionally disabled in T06">
          <CatalystDataTable
            rows={consoleApprovals}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "title",
                header: "Request",
                render: (row) => (
                  <div className="space-y-1">
                    <Link href={`/console/requests/${row.requestId}`} className="font-semibold text-[var(--ink-primary)] hover:text-[var(--brand-700)]">
                      {row.title}
                    </Link>
                    <p className="text-xs text-[var(--ink-tertiary)]">{row.pack} · requester {row.requester}</p>
                  </div>
                ),
              },
              {
                key: "approver",
                header: "Approver",
                render: (row) => <span className="font-medium text-[var(--ink-primary)]">{row.approver}</span>,
              },
              {
                key: "risk",
                header: "Risk",
                render: (row) => (
                  <ConsoleToneBadge tone={row.risk === "high" ? "danger" : row.risk === "medium" ? "warning" : "success"}>
                    {row.risk}
                  </ConsoleToneBadge>
                ),
              },
              {
                key: "recommendation",
                header: "Recommendation",
                render: (row) => <span className="text-sm text-[var(--ink-primary)]">{row.recommendation}</span>,
              },
              {
                key: "dueAt",
                header: "Due",
                render: (row) => (
                  <div>
                    <p className="font-medium text-[var(--ink-primary)]">{row.dueAt}</p>
                    <p className="text-xs text-[var(--ink-tertiary)]">submitted {row.submittedAt}</p>
                  </div>
                ),
              },
            ]}
          />
        </CatalystShellCard>

        <div className="space-y-6">
          <CatalystShellCard title="Approval design rules" description="T06은 UI shell만 만들고, 실제 승인 side-effect는 T07 runtime에서 연결합니다.">
            <ConsoleBulletList
              items={[
                "approval card에는 risk / impact / source links / 만료일이 함께 보여야 합니다.",
                "write/admin 액션은 preview + confirm 또는 approval required가 기본입니다.",
                "승인 사유, 승인자, 영향 범위는 trace와 audit에 분리 기록합니다.",
              ]}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Priority now" description="현재 queue에서 먼저 봐야 하는 승인들입니다.">
            <div className="space-y-3">
              {consoleApprovals.slice(0, 3).map((approval) => (
                <div key={approval.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--ink-primary)]">{approval.title}</p>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">{approval.impact}</p>
                    </div>
                    <ConsoleToneBadge tone={approval.risk === "high" ? "danger" : approval.risk === "medium" ? "warning" : "success"}>
                      {approval.risk}
                    </ConsoleToneBadge>
                  </div>
                </div>
              ))}
            </div>
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
