import type { Metadata } from "next";

import { CatalystDataTable, CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton, ConsoleToneBadge } from "@/components/console/console-primitives";
import { consoleConnectors } from "@/lib/console/mock-data";

export const metadata: Metadata = {
  title: "Connectors — Promptory Console",
};

export default function ConsoleConnectorsPage() {
  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Connectors"
        title="MCP / system connectors"
        description="Slack MCP, knowledge MCP, action MCP를 한 화면에서 정리한 shell입니다. 연결 상태, scope, write gate를 같이 보여줍니다."
        actions={<ConsoleLinkButton href="/console/policies" tone="secondary">policy 보기</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_340px]">
        <CatalystShellCard title="Connector table" description="실제 credential / token management는 T07 runtime scaffold 이후에 연결됩니다.">
          <CatalystDataTable
            rows={consoleConnectors}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "name",
                header: "Connector",
                render: (row) => (
                  <div>
                    <p className="font-semibold text-[var(--ink-primary)]">{row.name}</p>
                    <p className="text-xs text-[var(--ink-tertiary)]">{row.scope}</p>
                  </div>
                ),
              },
              {
                key: "status",
                header: "Status",
                render: (row) => <ConsoleToneBadge tone={row.statusTone}>{row.status}</ConsoleToneBadge>,
              },
              {
                key: "mode",
                header: "Mode",
              },
              {
                key: "lastSync",
                header: "Last sync",
              },
              {
                key: "note",
                header: "Notes",
              },
            ]}
          />
        </CatalystShellCard>

        <div className="space-y-6">
          <CatalystShellCard title="Connector guardrails" description="MCP는 tool access 규약이고, approval / orchestration / policy는 별도 계층입니다.">
            <ConsoleBulletList
              items={[
                "도메인별 MCP 서버를 분리하고 read / write / admin tool을 나눕니다.",
                "기본값은 on-behalf-of user이고, 서비스 계정은 background job에만 허용합니다.",
                "search with permissions와 audit / trace 분리를 기본 정책으로 둡니다.",
              ]}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Next hardening" description="Enterprise hardening 전 연결 상태에서 확인할 항목입니다.">
            <ConsoleBulletList
              items={[
                "Slack MCP eligibility와 internal app distribution 확인",
                "connector별 short-lived token / expiry 정책 정의",
                "degraded connector에 대한 fallback queue와 manual replay 설계",
              ]}
            />
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
