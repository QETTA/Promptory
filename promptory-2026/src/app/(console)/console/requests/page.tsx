import type { Metadata } from "next";

import { CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleRequestsTable } from "@/components/console/console-requests-table";
import {
  ConsoleBulletList,
  ConsoleLinkButton,
  ConsoleToneBadge,
} from "@/components/console/console-primitives";
import { consoleRequests } from "@/lib/console/request-data";

export const metadata: Metadata = {
  title: "Requests — Promptory Console",
};

export default function ConsoleRequestsPage() {
  const openRequests = consoleRequests.filter((request) => request.statusTone !== "success");

  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Requests"
        title="전체 요청 큐"
        description="직원이 Slack에서 시작한 요청을 pack, approver, system write 기준으로 나열합니다. 이 표면은 검색 결과가 아니라 실행 직전 상태를 보는 콘솔입니다."
        actions={(
          <>
            <ConsoleToneBadge tone="brand">live queue {openRequests.length}</ConsoleToneBadge>
            <ConsoleLinkButton href="/console/approvals" tone="secondary">approval queue</ConsoleLinkButton>
          </>
        )}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_340px]">
        <CatalystShellCard title="Requests table" description="mock data 기준으로 요청, approver, due, system write를 함께 봅니다.">
          <ConsoleRequestsTable rows={consoleRequests} />
        </CatalystShellCard>

        <div className="space-y-6">
          <CatalystShellCard title="Queue notes" description="request-to-resolution에서 운영자가 먼저 보는 기준입니다.">
            <ConsoleBulletList
              items={[
                "statusTone warning / danger 요청부터 replay 또는 approval follow-up",
                "source links가 적은 요청은 policy cited answer rate가 낮을 가능성이 큼",
                "pack과 destination을 같이 보면 connector 병목과 approval 병목을 분리할 수 있음",
              ]}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Pack mix" description="현재 콘솔에서 다루는 대표 pack 분포입니다.">
            <div className="space-y-3">
              {[
                ["Deal Desk", 1],
                ["People Ops", 1],
                ["IT Access", 1],
                ["Support / CX", 2],
              ].map(([label, count]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                  <span className="text-sm font-medium text-[var(--ink-primary)]">{label}</span>
                  <span className="text-sm text-[var(--ink-secondary)]">{count}건</span>
                </div>
              ))}
            </div>
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
