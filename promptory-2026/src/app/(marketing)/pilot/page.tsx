import type { Metadata } from "next";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  InlineCallout,
  MarketingHeroFrame,
  MetricStrip,
  PilotPhaseRail,
  SectionIntro,
  SimpleChecklist,
} from "@/components/marketing/request-to-resolution-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import {
  buyerRoles,
  pilotChecklist,
  pilotPhases,
  pilotSuccessMetrics,
} from "@/lib/request-to-resolution-content";

export const metadata: Metadata = {
  title: "Pilot — Promptory",
  description:
    "한 부서, 한 요청 유형, 세 개 도구로 시작하는 Promptory pilot 설계와 30/60/90 롤아웃 원칙을 설명합니다.",
};

export default function PilotPage() {
  return (
    <main className="bg-[var(--surface-1)] text-[var(--ink-primary)]">
      <MarketingHeroFrame
        eyebrow="Pilot design"
        title={<>작게 시작해서 증명하고,<br />그 다음 확장합니다</>}
        description="좋은 파일럿은 기능 데모가 아니라, 한 부서의 반복 예외 처리 흐름을 끝까지 닫는 것입니다. 한 부서, 한 요청 유형, 세 개 도구로 시작하면 실패 확률이 가장 낮습니다."
        actions={(
          <>
            <CTAButton href="/contact?type=package&plan=starter" size="lg">2주 파일럿 범위 논의</CTAButton>
            <CTAButton href="/pricing" variant="outline" size="lg">패키지 보기</CTAButton>
          </>
        )}
        aside={
          <BrandCard className="rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Pilot default</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--ink-tertiary)]">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">Internal Slack app + human approval + audit log</div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">한 부서 · 한 workflow · 2~3개 도구 연결</div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">주간 ops review + failed case replay + policy tuning</div>
            </div>
          </BrandCard>
        }
        caption="공개 설치보다 customer-specific internal app이 더 현실적이고, approval-driven flow가 운영 신뢰를 더 빨리 쌓습니다."
      />

      <BrandSection
        eyebrow="30 / 60 / 90"
        title="첫 90일 로드맵"
        description="파일럿은 launch보다 measurement와 운영 cadence를 같이 포함해야 다음 단계로 올라갈 수 있습니다."
      >
        <PilotPhaseRail items={pilotPhases} />
      </BrandSection>

      <BrandSection
        eyebrow="What good looks like"
        title="파일럿은 이런 숫자를 남겨야 합니다"
        description="답변량이 아니라 해결률, 승인 리드타임, 사람 개입 비율, escalation 흐름을 보아야 진짜 성과가 잡힙니다."
        tone="muted"
      >
        <MetricStrip items={pilotSuccessMetrics} />
      </BrandSection>

      <BrandSection
        eyebrow="Pilot checklist"
        title="첫 scope를 자를 때 보는 기준"
        description="좋은 파일럿 주제는 반복 예외가 있고, 승인 규칙이 있고, 외부 시스템에 상태가 남아야 하는 흐름입니다."
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <BrandCard className="rounded-[1.75rem] p-6">
            <SectionIntro
              eyebrow="Scope discipline"
              title="첫 파일럿은 반드시 좁아야 합니다"
              description="전사 공통 agent를 먼저 만들거나, 모든 시스템을 한 번에 연결하거나, 감사 없이 자율 실행을 허용하면 파일럿이 길어지고 위험도 커집니다."
            />
            <div className="mt-6">
              <SimpleChecklist items={[...pilotChecklist]} />
            </div>
          </BrandCard>
          <BrandCard className="rounded-[1.75rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Recommended first workflows</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--ink-tertiary)]">
              {[
                ["Sales Ops", "할인 승인 / Deal Desk"],
                ["People Ops", "출장 승인 / 계정 생성 요청"],
                ["IT Ops", "DB / SaaS 접근 권한 요청"],
                ["Finance Ops", "구매 요청 / vendor exception"],
              ].map(([team, workflow]) => (
                <div key={team} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink-primary)]">{team}</p>
                  <p className="mt-1">{workflow}</p>
                </div>
              ))}
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Who needs to say yes"
        title="기능 판매가 아니라 조직 통과 사업입니다"
        description="비즈니스 챔피언이 먼저 움직이고, 기술 승인자와 보안 게이트가 빠르게 합류해야 파일럿이 실제로 열립니다."
        tone="muted"
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {buyerRoles.map((role) => (
            <BrandCard key={role.title} className="rounded-[1.75rem] p-6">
              <h3 className="text-lg font-semibold text-[var(--ink-primary)]">{role.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-tertiary)]">{role.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="muted" className="pb-20 sm:pb-24">
        <InlineCallout
          title="첫 목표는 유료 파일럿을 여는 것, 그 다음은 ops 숫자를 남기는 것입니다"
          body="Starter 패키지는 MVP가 아닙니다. Starter는 챔피언과 승인자를 설득하고, 운영 숫자를 남기고, 다음 부서 확장의 근거를 만드는 범위입니다."
          actions={(
            <>
              <CTAButton href="/contact?type=package&plan=starter">파일럿 신청</CTAButton>
              <CTAButton href="/security" variant="outline">보안 원칙 보기</CTAButton>
            </>
          )}
        />
      </BrandSection>
    </main>
  );
}
