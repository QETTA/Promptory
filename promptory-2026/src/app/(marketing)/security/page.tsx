import type { Metadata } from "next";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  InlineCallout,
  MarketingHeroFrame,
  PolicyMatrix,
  SectionIntro,
  SimpleChecklist,
} from "@/components/marketing/request-to-resolution-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import { actionTypePolicies, securityPrinciples } from "@/lib/request-to-resolution-content";

export const metadata: Metadata = {
  title: "Security — Promptory",
  description:
    "Promptory는 원문 최소 보관, 역할별 권한, 사람 승인, audit-by-default 원칙으로 사내 agent를 설계합니다.",
};

const deploymentNotes = [
  "첫 배포는 고객사별 internal Slack app을 기본값으로 둡니다.",
  "민감 액션은 approval required, 만료일, 사유, 영향 범위를 기본 필드로 둡니다.",
  "검색 결과는 권한 필터와 source links의 교집합만 노출합니다.",
  "운영자는 audit log와 trace를 분리해서 봐야 합니다.",
];

export default function SecurityPage() {
  return (
    <main className="bg-[var(--surface-1)] text-[var(--ink-primary)]">
      <MarketingHeroFrame
        eyebrow="Security & data privacy"
        title={<>보안 메시지는 더 똑똑함이 아니라,<br />더 통제 가능함이어야 합니다</>}
        description="Promptory는 원문 비저장, 실시간 재조회, 역할별 권한, 사람 승인, 감사 로그 기본 제공을 제품 기본값으로 둡니다. Trust by architecture, not by promise가 원칙입니다."
        actions={(
          <>
            <CTAButton href="/architecture" size="lg">아키텍처 보기</CTAButton>
            <CTAButton href="/contact?type=package&plan=private" variant="outline" size="lg">보안 범위 문의</CTAButton>
          </>
        )}
        aside={
          <BrandCard className="space-y-4 rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Security summary</p>
            <div className="space-y-3">
              {[
                ["원문 비저장", "필요 시 실시간 재조회"],
                ["역할별 권한", "read / write / admin 분리"],
                ["사람 승인", "민감 작업은 human in the loop"],
                ["감사 기본값", "trace + audit + expiry"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink-primary)]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--ink-tertiary)]">{body}</p>
                </div>
              ))}
            </div>
          </BrandCard>
        }
        caption="자동화하되 통제권은 IT와 운영팀에 남기고, side-effect는 항상 설명 가능하고 감사 가능해야 합니다."
      />

      <BrandSection
        eyebrow="Security principles"
        title="보안과 데이터 보관 원칙"
        description="민감한 내부 agent는 기능보다 guardrail이 먼저 설계되어야 합니다."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {securityPrinciples.map((principle) => (
            <BrandCard key={principle.title} className="space-y-4 rounded-[1.75rem] p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Core principle</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{principle.title}</h2>
              </div>
              <p className="text-sm leading-6 text-[var(--ink-tertiary)]">{principle.body}</p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--ink-tertiary)]">
                {principle.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Action boundaries"
        title="READ / WRITE / ADMIN은 같은 규칙으로 다루지 않습니다"
        description="Slack agent는 문맥 인지와 실행을 같이 하지만, 실제 서비스 품질은 액션 타입별 정책에서 갈립니다."
        tone="muted"
      >
        <PolicyMatrix items={actionTypePolicies.map((item) => ({ ...item }))} />
      </BrandSection>

      <BrandSection
        eyebrow="Deployment notes"
        title="초기 GTM과 보안 게이트를 같이 생각해야 합니다"
        description="첫 판매는 internal app이 가장 현실적이고, private deployment와 customer-controlled infra는 그 다음 단계에서 검토하는 편이 안전합니다."
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <BrandCard className="rounded-[1.75rem] p-6">
            <SectionIntro
              eyebrow="Internal-app first"
              title="초기 배포는 public marketplace보다 고객사별 internal app이 낫습니다"
              description="Slack 표면, MCP 사용 범위, 보안 검토, human approval 구조를 빠르게 맞추려면 internal-first가 가장 현실적입니다."
            />
            <div className="mt-6">
              <SimpleChecklist items={deploymentNotes} />
            </div>
          </BrandCard>
          <BrandCard className="rounded-[1.75rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">What security wants to hear</p>
            <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--ink-tertiary)]">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                “원문을 복제 저장하지 않고, 필요한 시점에 source-of-truth에서 다시 읽습니다.”
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                “권한은 LLM이 아니라 policy layer가 검증하고, delegated token을 우선 사용합니다.”
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                “민감한 쓰기 작업은 preview, approval, expiry, audit를 기본값으로 둡니다.”
              </div>
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection tone="muted" className="pb-20 sm:pb-24">
        <InlineCallout
          title="보안팀이 납득할 수 있는 agent여야 운영팀도 안심하고 씁니다"
          body="Promptory는 사람 승인, 권한 모델, audit-by-default가 없는 자율 agent를 권하지 않습니다. 실무에선 똑똑한 것보다 안전한 것이 먼저입니다."
          actions={(
            <>
              <CTAButton href="/pilot">파일럿 설계 보기</CTAButton>
              <CTAButton href="/contact?type=package&plan=private" variant="outline">보안 미팅 요청</CTAButton>
            </>
          )}
        />
      </BrandSection>
    </main>
  );
}
