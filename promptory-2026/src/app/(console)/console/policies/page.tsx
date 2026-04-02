import type { Metadata } from "next";

import { CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import { ConsoleBulletList, ConsoleLinkButton, ConsoleToneBadge } from "@/components/console/console-primitives";
import { consolePolicies } from "@/lib/console/governance-data";

export const metadata: Metadata = {
  title: "Policies — Promptory Console",
};

export default function ConsolePoliciesPage() {
  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Policies"
        title="Role policy / approval rules"
        description="같은 agent라도 사용자 역할과 액션 타입에 따라 read, write, admin 허용 범위가 달라져야 합니다."
        actions={<ConsoleLinkButton href="/console/connectors" tone="secondary">connector scope</ConsoleLinkButton>}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {consolePolicies.map((policy) => (
          <CatalystShellCard
            key={policy.id}
            title={policy.role}
            description={`default scope · ${policy.defaultScope}`}
            actions={<ConsoleToneBadge tone={policy.role.includes("관리자") ? "danger" : policy.role.includes("매니저") ? "brand" : "neutral"}>{policy.defaultScope}</ConsoleToneBadge>}
          >
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Read</p>
                <div className="mt-3">
                  <ConsoleBulletList items={policy.readActions} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Write</p>
                <div className="mt-3">
                  <ConsoleBulletList items={policy.writeActions.length > 0 ? policy.writeActions : ["(none)"]} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Admin / guardrails</p>
                <div className="mt-3 space-y-4">
                  <ConsoleBulletList items={policy.adminActions.length > 0 ? policy.adminActions : ["(none)"]} />
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">Guardrails</p>
                    <div className="mt-3">
                      <ConsoleBulletList items={policy.guardrails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CatalystShellCard>
        ))}
      </div>
    </div>
  );
}
