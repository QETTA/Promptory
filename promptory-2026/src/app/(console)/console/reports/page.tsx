import type { Metadata } from "next";

import { CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton } from "@/components/console/console-primitives";
import { consoleReports } from "@/lib/console/mock-data";

export const metadata: Metadata = {
  title: "Reports — Promptory Console",
};

export default function ConsoleReportsPage() {
  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Reports"
        title="Exec / ops / rollout report shell"
        description="질문 수보다 해결 속도와 approval turnaround를 보는 제품이므로, report도 request-to-resolution 관점으로 구성합니다."
        actions={<ConsoleLinkButton href="/console" tone="secondary">dashboard</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {consoleReports.map((report) => (
          <CatalystShellCard
            key={report.id}
            title={report.title}
            description={`${report.audience} · ${report.cadence}`}
          >
            <p className="text-sm leading-6 text-[var(--ink-secondary)]">{report.summary}</p>
            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <ConsoleBulletList items={report.highlights} />
            </div>
          </CatalystShellCard>
        ))}
      </div>

      <CatalystShellCard title="Report design rules" description="MVP report는 예쁘기보다 operationally useful 해야 합니다.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Speed</p>
            <div className="mt-3">
              <ConsoleBulletList items={["Median time to resolution", "Approval turnaround time", "예외 종료 시간"]} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Automation</p>
            <div className="mt-3">
              <ConsoleBulletList items={["Auto-resolution rate", "Approval-assisted completion rate", "Human escalation rate"]} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Risk / value</p>
            <div className="mt-3">
              <ConsoleBulletList items={["Policy-cited answer rate", "전문가 절감 시간", "Connector hotspot / rework rate"]} />
            </div>
          </div>
        </div>
      </CatalystShellCard>
    </div>
  );
}
