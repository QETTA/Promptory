import type { Metadata } from "next";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  InlineCallout,
  MarketingHeroFrame,
  PricingTierCard,
  SectionIntro,
  SimpleChecklist,
} from "@/components/marketing/request-to-resolution-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import { packageTiers, pricingPrinciples } from "@/lib/request-to-resolution-content";

export const metadata: Metadata = {
  title: "패키징 — Promptory",
  description:
    "Promptory는 seat 과금이 아니라 action pack과 private deployment 중심의 실행 패키지로 판매합니다.",
};

const includedByDefault = [
  "Slack surfaces 설계 — App Home, Assistant thread, modal, approval card",
  "request-to-resolution workflow 설계 — 요청/검증/승인/실행/결과 회신",
  "정책·권한 기본 모델 — read/write/admin 경계와 approval rules",
  "운영 리포트 — 처리시간, approval turnaround, failed run 원인",
];

const notPricedAsSeats = [
  "검색 기능만 따로 떼어 seat 과금하지 않습니다.",
  "첫 계약은 보통 한 부서·한 workflow 범위로 시작합니다.",
  "private deployment와 custom connector는 별도 범위로 올라갑니다.",
  "장기 계약은 부서 pack 확대와 운영 고도화 기준으로 설계합니다.",
];

export default function PricingPage() {
  return (
    <main className="bg-[var(--surface-1)] text-[var(--ink-primary)]">
      <MarketingHeroFrame
        eyebrow="Pricing & packaging"
        title={<>Seat 과금이 아니라,<br />실행 패키지로 판매합니다</>}
        description="검색과 요약은 번들될 수 있지만, 승인·실행·연결·운영은 패키지화할 수 있습니다. Promptory는 부서형 action pack과 private deployment를 중심으로 가격을 설계합니다."
        actions={(
          <>
            <CTAButton href="/contact?type=department&plan=department" size="lg">패키지 상담</CTAButton>
            <CTAButton href="/pilot" variant="outline" size="lg">파일럿 범위 보기</CTAButton>
          </>
        )}
        aside={
          <BrandCard className="space-y-5 rounded-[2rem] p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Pricing philosophy</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">운영 병목 제거 단가로 봅니다</h2>
            </div>
            <div className="space-y-4 text-sm leading-6 text-[var(--ink-tertiary)]">
              {pricingPrinciples.map((principle) => (
                <div key={principle.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="font-semibold text-[var(--ink-primary)]">{principle.title}</p>
                  <p className="mt-1">{principle.body}</p>
                </div>
              ))}
            </div>
          </BrandCard>
        }
        caption="Starter → Department → Private → Enterprise 순으로 올라가며, 가격은 질문량이 아니라 workflow 범위와 운영 복잡도로 결정됩니다."
      />

      <BrandSection
        eyebrow="Package lineup"
        title="처음에는 4개의 패키지 레벨이면 충분합니다"
        description="도입 단계와 보안·운영 요구 수준에 따라 올라가도록 설계해야, 파일럿과 장기 확장을 하나의 제품 언어로 연결할 수 있습니다."
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {packageTiers.map((tier) => (
            <PricingTierCard key={tier.slug} tier={tier} />
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Always included"
        title="패키지에 항상 들어가야 하는 것"
        description="Promptory는 단순한 워크플로 자동화가 아니라, 승인과 감사가 가능한 내부 실행 레이어를 만드는 일입니다."
        tone="muted"
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <BrandCard className="rounded-[1.75rem] p-6">
            <SectionIntro
              eyebrow="Included in scope"
              title="Slack UI, workflow, policy, ops까지 같이 봅니다"
              description="실제 도입은 화면 몇 개를 만드는 일보다, 누가 요청하고 누가 승인하며 어떤 시스템을 언제 업데이트할지 정하는 일에 가깝습니다."
            />
            <div className="mt-6">
              <SimpleChecklist items={includedByDefault} />
            </div>
          </BrandCard>
          <BrandCard className="rounded-[1.75rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Why not seats</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">검색 seat가 아니라 action pack economics</h3>
            <div className="mt-5 space-y-3 text-sm leading-6 text-[var(--ink-tertiary)]">
              {notPricedAsSeats.map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="How to buy"
        title="보통은 이렇게 범위를 잡습니다"
        description="가격표를 세분화하기보다, 첫 workflow와 운영 모델을 빠르게 합의하는 편이 실제 수주와 도입에 더 유리합니다."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "1. 부서와 buyer 선정",
              body: "Sales Ops, People Ops, IT Ops처럼 반복 운영 업무를 직접 겪는 팀을 먼저 고릅니다.",
            },
            {
              title: "2. 요청 유형 1개 선정",
              body: "할인 승인, 출장 승인, 접근 권한처럼 예외 처리와 승인 규칙이 명확한 workflow를 고릅니다.",
            },
            {
              title: "3. KPI와 ops cadence 합의",
              body: "pilot 동안 어떤 숫자를 보고 어떤 failed case를 replay할지 미리 정합니다.",
            },
          ].map((item) => (
            <BrandCard key={item.title} className="rounded-[1.75rem] p-6">
              <h3 className="text-lg font-semibold text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-tertiary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="muted" className="pb-20 sm:pb-24">
        <InlineCallout
          title="Starter로 검증하고 Department로 확장하는 구조가 가장 현실적입니다"
          body="초기에는 한 부서의 request-to-resolution 흐름 하나만 닫고, 성과가 보이면 2~3개 action pack으로 확장하는 방식이 가장 매출 확률이 높습니다."
          actions={
            <>
              <CTAButton href="/contact?type=starter&plan=starter">Starter 범위 문의</CTAButton>
              <CTAButton href="/contact?type=department&plan=department" variant="outline">Department 상담</CTAButton>
            </>
          }
        />
      </BrandSection>
    </main>
  );
}
