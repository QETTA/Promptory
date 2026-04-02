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
        title="Audit / trace placeholder"
        description="audit log와 model trace는 목적이 다르므로 분리 기록합니다. 이 화면은 사용자 행위와 system write 관점의 audit shell입니다."
        actions={<ConsoleLinkButton href="/console/reports" tone="secondary">ops report</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_340px]">
        <CatalystShellCard title="Audit events" description="trace storage나 export API는 아직 연결하지 않았고, mock events로 구조만 보여줍니다.">
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
                "공용 관리자 토큰으로 사용자 액션을 대행하지 않음",
              ]}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Export placeholder" description="enterprise hardening 단계에서 audit export와 customer VPC 대응을 붙입니다.">
            <p className="text-sm leading-6 text-[var(--ink-secondary)]">
              이 페이지는 shell만 제공하며 실제 export 버튼, object storage, retention policy는 T07 / T08 이후
              정리합니다.
            </p>
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
