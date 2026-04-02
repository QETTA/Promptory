import type { Metadata } from "next";

import { CatalystDataTable, CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton, ConsoleToneBadge } from "@/components/console/console-primitives";
import { consoleAuditTrail } from "@/lib/console/mock-data";

export const metadata: Metadata = {
  title: "Audit — Promptory Console",
};

export default function ConsoleAuditPage() {
  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Audit"
        title="Audit log / decision trace"
        description="audit log와 model trace는 목적이 다르므로 분리 기록합니다. 이 화면은 승인 근거, 사용자 행위, system write 결과를 감사 관점에서 보는 shell입니다."
        actions={<ConsoleLinkButton href="/console/reports" tone="secondary">ops report</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_340px]">
        <CatalystShellCard title="Audit events" description="실제 export API는 아직 연결하지 않았지만, 어떤 decision과 side-effect를 남겨야 하는지는 지금 화면에서 먼저 고정합니다.">
          <CatalystDataTable
            rows={consoleAuditTrail}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "actor",
                header: "Actor",
              },
              {
                key: "event",
                header: "Event",
                render: (row) => (
                  <div>
                    <p className="font-semibold text-[var(--ink-primary)]">{row.event}</p>
                    <p className="text-xs text-[var(--ink-tertiary)]">target {row.target}</p>
                  </div>
                ),
              },
              {
                key: "outcome",
                header: "Outcome",
                render: (row) => <ConsoleToneBadge tone={row.outcomeTone}>{row.outcome}</ConsoleToneBadge>,
              },
              {
                key: "at",
                header: "At",
              },
              {
                key: "detail",
                header: "Detail",
              },
            ]}
          />
        </CatalystShellCard>

        <div className="space-y-6">
          <CatalystShellCard title="Audit rules" description="콘솔에는 최소한 아래 원칙이 보여야 운영팀과 보안팀이 안심합니다.">
            <ConsoleBulletList
              items={[
                "사용자 행위는 audit log, 모델 / 도구 경로는 trace로 분리 저장",
                "approval required 액션은 사유, 만료일, 영향 범위를 함께 기록",
                "system write 이벤트에는 request id와 idempotency 단서를 함께 남김",
                "공용 관리자 토큰으로 사용자 액션을 대행하지 않음",
              ]}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Retention & export readiness" description="enterprise hardening 전에도 retention owner, export 경계, reviewer handoff는 먼저 정의해 두는 편이 안전합니다.">
            <p className="text-sm leading-6 text-[var(--ink-secondary)]">
              현재는 shell만 제공하지만, export button, object storage, retention policy를 붙일 때도 audit record
              구조는 그대로 재사용할 수 있도록 설계했습니다.
            </p>
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
