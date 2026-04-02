import type { Metadata } from "next";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  InlineCallout,
  LayerRail,
  MarketingHeroFrame,
  SectionIntro,
  SimpleChecklist,
  WorkflowRail,
} from "@/components/marketing/request-to-resolution-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import {
  architectureLayers,
  implementationGuardrails,
  recommendedStack,
  workflowStages,
} from "@/lib/request-to-resolution-content";

export const metadata: Metadata = {
  title: "Architecture — Promptory",
  description:
    "Slack UI, Agent Gateway, MCP Tool Mesh, Policy Layer, Durable Workflow로 이루어진 Promptory request-to-resolution architecture를 설명합니다.",
};

export default function ArchitecturePage() {
  return (
    <main className="bg-[var(--surface-1)] text-[var(--ink-primary)]">
      <MarketingHeroFrame
        eyebrow="Technical architecture"
        title={<>Slack은 UI,<br />진짜 제품은 뒤에 있습니다</>}
        description="에이전트 품질은 프롬프트만으로 결정되지 않습니다. Promptory는 Slack 표면 뒤에 Agent Gateway, MCP Tool Mesh, Temporal, Policy, Observability를 분리해 운영 가능한 구조로 설계합니다."
        actions={(
          <>
            <CTAButton href="/security" size="lg">보안 원칙 보기</CTAButton>
            <CTAButton href="/contact?type=package&plan=starter" variant="outline" size="lg">구조 상담</CTAButton>
          </>
        )}
        aside={<LayerRail items={architectureLayers.slice(0, 4)} />}
        caption="Slack 함수 타임아웃과 민감 액션의 리스크를 피하기 위해, 장기 실행과 승인은 외부 workflow 계층으로 내립니다."
      />

      <BrandSection
        eyebrow="Layered system"
        title="우리는 이렇게 책임을 나눕니다"
        description="Slack은 요청과 승인 UI, Agent는 판단과 상태, MCP는 도구 연결, Durable Workflow는 실제 실행, Policy는 브레이크입니다."
      >
        <LayerRail items={architectureLayers} />
      </BrandSection>

      <BrandSection
        eyebrow="Request-to-resolution flow"
        title="실제 업무는 이 순서로 닫힙니다"
        description="Slack 안에서 보이는 것은 intake와 approval이고, 뒤에서는 policy check와 workflow execution이 계속 돌아갑니다."
        tone="muted"
      >
        <WorkflowRail items={workflowStages} />
      </BrandSection>

      <BrandSection
        eyebrow="Recommended stack"
        title="2026 기준 가장 실전적인 조합"
        description="Slack edge, orchestration, durable execution, policy, data, observability를 분리해 도구를 조합하면 운영 난이도를 훨씬 낮출 수 있습니다."
      >
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {recommendedStack.map((item) => (
            <BrandCard key={item.title} className="rounded-[1.75rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Recommended layer</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-tertiary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Guardrails"
        title="MCP + Agent 운영에서 꼭 지켜야 하는 선"
        description="실무에서는 agent가 똑똑한가보다 실수해도 안전한가가 더 중요합니다."
        tone="muted"
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <BrandCard className="rounded-[1.75rem] p-6">
            <SectionIntro
              eyebrow="Best-practice"
              title="도메인, 권한, side-effect를 섞지 않습니다"
              description="하나의 서버에 모든 MCP를 몰아넣거나, 승인 없이 관리자 토큰으로 사용자 액션을 대행하면 운영 품질이 빠르게 무너집니다."
            />
            <div className="mt-6">
              <SimpleChecklist items={[...implementationGuardrails]} />
            </div>
          </BrandCard>
          <BrandCard className="rounded-[1.75rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Architecture shorthand</p>
            <div className="mt-4 space-y-4">
              {[
                ["Slack", "입구 · 승인 · 결과"],
                ["Agent", "상태 · 기억 · 재시도"],
                ["MCP", "도구 표준화"],
                ["System of Record", "Jira · Okta · CRM · ERP"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink-primary)]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-tertiary)]">{body}</p>
                </div>
              ))}
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection tone="muted" className="pb-20 sm:pb-24">
        <InlineCallout
          title="첫 MVP는 구조를 얇게, guardrail은 두껍게 가는 편이 맞습니다"
          body="처음부터 모든 시스템을 연결하는 대신, Slack assistant + App Home + 2개 custom MCP + Temporal + OpenFGA 정도의 얇은 구조로 시작해야 가장 빨리 검증할 수 있습니다."
          actions={(
            <>
              <CTAButton href="/pilot">MVP 범위 보기</CTAButton>
              <CTAButton href="/contact?type=package&plan=starter" variant="outline">아키텍처 상담</CTAButton>
            </>
          )}
        />
      </BrandSection>
    </main>
  );
}
