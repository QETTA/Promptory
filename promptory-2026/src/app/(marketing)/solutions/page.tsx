import type { Metadata } from "next";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero } from "@/components/marketing/core-marketing-primitives";
import { MarketingActionLink } from "@/components/marketing/core-marketing-primitives";
import {
  solutionPacks,
} from "@/lib/request-to-resolution-content";
import {
  packDeliveryDefaults,
  solutionSelectionCriteria,
} from "@/lib/t05-marketing-content";

export const metadata: Metadata = {
  title: "Solutions — Promptory",
  description:
    "Deal Desk, People Ops, IT Access, Finance & Procurement처럼 승인과 시스템 반영이 분명한 부서형 action pack을 확인하세요.",
};

export default function SolutionsPage() {
  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow="Department action packs"
        title={<>모델이 아니라 부서형 workflow를 팝니다</>}
        description="Promptory는 범용 챗봇이 아니라 Deal Desk, People Ops, IT Access, Finance & Procurement처럼 승인 규칙과 시스템 반영이 분명한 pack으로 시작합니다. 구매 단위는 기능이 아니라 반복적인 request-to-resolution 흐름입니다."
        actions={
          <>
            <CTAButton href="/pilot" size="lg">
              파일럿 구조 보기
            </CTAButton>
            <CTAButton href="/contact?type=department&plan=department" variant="outline" size="lg">
              Department 상담 요청
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">What makes a good first pack</p>
            <ul className="space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              <li>• 반복량이 많고 예외가 자주 발생하는가</li>
              <li>• 승인자 판단에 근거와 정책이 필요한가</li>
              <li>• 결과가 CRM / Jira / IAM / ERP에 남아야 하는가</li>
              <li>• 4~6주 안에 KPI proof를 만들 수 있는가</li>
            </ul>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="Core packs"
        title={<>처음에는 pack 두세 개만 정확하게 닫습니다</>}
        description="부서형 pack은 질문을 받는 surface와 approval card, 시스템 반영, ops instrumentation을 한 덩어리로 묶어야 합니다. 그래서 넓게 펼치기보다 먼저 buyer가 선명한 pack부터 고릅니다."
        width="wide"
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {solutionPacks.map((pack) => (
            <BrandCard key={pack.slug} className="flex h-full flex-col gap-5 border border-[var(--line)] bg-white p-6 sm:p-7">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{pack.shortTitle}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{pack.title}</h2>
                <p className="text-sm leading-7 text-[var(--ink-secondary)]">{pack.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Buyer</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{pack.audience}</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Entry point</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{pack.entryPoint}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">First workflow</p>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-secondary)]">{pack.firstWorkflow}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Connected systems</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pack.systems.map((system) => (
                    <span
                      key={system}
                      className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Proof KPI</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pack.kpis.map((kpi) => (
                    <span
                      key={kpi}
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                    >
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <MarketingActionLink href={`/solutions/${pack.slug}`}>pack 상세 보기</MarketingActionLink>
                <MarketingActionLink href={`/contact?type=department&slug=${pack.slug}&plan=department`} tone="secondary">
                  이 pack 상담하기
                </MarketingActionLink>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Selection criteria"
        title={<>좋은 첫 pack은 범위가 작고 증명 가능한 흐름입니다</>}
        description="Solution page는 단순 기능 나열보다 어떤 workflow가 첫 pack으로 적합한지 읽히도록 설계해야 합니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {solutionSelectionCriteria.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="What ships in every pack"
        title={<>pack이란 결국 surface + approval + execution + ops를 같이 보내는 것입니다</>}
        description="Slack UI만 있어도 안 되고, backend execution만 있어도 제품이 아닙니다. 고객이 체감하는 건 end-to-end pack입니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {packDeliveryDefaults.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Default deliverable</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>

        <MarketingInsetCallout
          eyebrow="Packaging note"
          title="Starter는 한 pack, Department는 2~3 pack, Private는 배포 레일까지 포함합니다"
          body="Pack page가 많아 보이는 것이 중요한 게 아니라, buyer가 한 번에 이해하고 proof KPI를 합의할 수 있는 범위로 묶이는 것이 중요합니다."
        />
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            지금 필요한 건 pack 이름보다, 어떤 요청 유형을 6주 안에 닫을지에 대한 합의입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            Deal Desk, People Ops, IT Access, Finance & Procurement 중 현재 가장 반복적이고 승인 중심인 흐름 하나를 고르면 됩니다. 그 pack이 Promptory의 가장 좋은 시작점이 됩니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href="/contact?type=department&plan=department" size="lg">
              Department 상담하기
            </CTAButton>
            <CTAButton href="/industries" variant="outline" size="lg">
              산업별 playbook 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
