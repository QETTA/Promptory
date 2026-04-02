import type { Metadata } from "next";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero, MarketingActionLink } from "@/components/marketing/core-marketing-primitives";
import { industryPlaybooks } from "@/lib/request-to-resolution-content";
import { industryExtensionCards, industryWhyCards } from "@/lib/t05-marketing-content";

export const metadata: Metadata = {
  title: "Industries — Promptory",
  description:
    "투자사, 의료, SaaS / IT, 제조, 리테일 / eCommerce, 물류 / 유통까지 vertical별 request-to-resolution playbook을 확인하세요.",
};

export default function IndustriesPage() {
  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow="Vertical playbooks"
        title={<>산업군별로 buyer와 approval rule이 달라집니다</>}
        description="Promptory는 모든 산업군에 같은 챗봇을 파는 대신, vertical마다 가장 반복적이고 승인 중심인 workflow를 먼저 닫는 playbook으로 접근합니다. industry page의 역할은 ‘누가 사고, 어떤 pack으로 시작하며, 무엇을 KPI로 증명할지’를 바로 보여주는 것입니다."
        actions={
          <>
            <CTAButton href="/pilot" size="lg">
              파일럿 설계 보기
            </CTAButton>
            <CTAButton href="/contact?type=pilot" variant="outline" size="lg">
              산업별 상담 요청
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">How to choose a vertical</p>
            <ul className="space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              <li>• 업무량이 많고 예외가 반복되는가</li>
              <li>• 승인 규칙과 증빙 수집이 필요한가</li>
              <li>• 실행 결과가 외부 시스템에 남아야 하는가</li>
              <li>• buyer와 champion이 명확한가</li>
            </ul>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="Portfolio"
        title={<>6개 대표 vertical부터 시작합니다</>}
        description="각 산업군은 서로 다른 value chain을 갖지만, 첫 파일럿은 반복적 예외 처리 + 승인 + 시스템 반영이 있는 부서에서 가장 잘 작동합니다."
        width="wide"
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {industryPlaybooks.map((playbook) => (
            <BrandCard key={playbook.slug} className="flex h-full flex-col gap-5 border border-[var(--line)] bg-white p-6 sm:p-7">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{playbook.shortTitle}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{playbook.title}</h2>
                <p className="text-sm leading-7 text-[var(--ink-secondary)]">{playbook.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Champion</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{playbook.champion}</p>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">First pack</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{playbook.firstPack}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Core connectors</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {playbook.systems.map((system) => (
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
                  {playbook.kpis.map((kpi) => (
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
                <MarketingActionLink href={`/industries/${playbook.slug}`}>playbook 상세 보기</MarketingActionLink>
                <MarketingActionLink href={`/contact?type=pilot&slug=${playbook.slug}`} tone="secondary">
                  이 vertical 상담하기
                </MarketingActionLink>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Why vertical"
        title={<>왜 산업군별·부서별 시나리오로 팔아야 하는가</>}
        description="산업군 page는 generic AI 이야기를 반복하는 곳이 아니라, vertical-specific buyer와 KPI가 왜 중요한지 납득시키는 곳입니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {industryWhyCards.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>

        <MarketingInsetCallout
          eyebrow="Selling note"
          title="Generic bot이 아니라 ‘이 승인 흐름을 6주 안에 닫겠습니다’로 제안해야 합니다"
          body="vertical page의 목적은 기능 소개가 아니라 buyer가 자기 산업의 병목을 바로 떠올리게 만드는 것입니다. 그래서 champion, first pack, connector, KPI가 함께 보여야 합니다."
        />
      </BrandSection>

      <BrandSection
        eyebrow="Extensions"
        title={<>보험, 공공, 제약·바이오, 건설·부동산도 같은 프레임으로 확장할 수 있습니다</>}
        description="처음에는 6개 대표 vertical로 시작하되, buyer와 approval rule을 바꾸면 다른 산업군으로도 같은 engine을 확장할 수 있습니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {industryExtensionCards.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            좋은 첫 vertical은 “반복적 예외 처리 흐름이 명확하고, 승인과 시스템 반영이 같이 보이는 부서”입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            어느 산업군이든 핵심은 같습니다. buyer와 blocker가 분명하고, 4~8주 안에 처리 리드타임이나 예외 종료시간을 증명할 수 있는 흐름을 먼저 고르면 됩니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href="/contact?type=pilot" size="lg">
              vertical 파일럿 논의하기
            </CTAButton>
            <CTAButton href="/solutions" variant="outline" size="lg">
              solution pack 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
