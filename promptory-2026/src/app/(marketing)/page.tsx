import type { Metadata } from "next";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  CompactLinkRow,
  CoreMarketingHero,
  FlowRail,
  HomeHeroGraphic,
  InsightGrid,
  MetricStrip,
  RoadmapPanels,
} from "@/components/marketing/core-marketing-sections";
import {
  actionPackHighlights,
  homeMetricCards,
  pilotRoadmap,
  requestResolutionFlow,
  searchExecutionGapCards,
} from "@/lib/core-marketing-content";

export const metadata: Metadata = {
  title: "Promptory — 승인과 실행까지 닫는 Slack internal agent package",
  description:
    "Slack 안에서 요청을 받고, 근거를 찾고, 승인 받고, Jira·CRM·IAM·ERP까지 반영하는 request-to-resolution package를 소개합니다.",
};

export default function HomePage() {
  return (
    <div className="pb-20">
      <CoreMarketingHero
        eyebrow="Internal Slack agent package"
        title={
          <>
            검색이 아니라 <span className="text-[var(--brand-700)]">실행이 남는</span>
            <br />
            Slack 에이전트를 만듭니다
          </>
        }
        description="Promptory는 Slack 안에서 요청을 받고, 근거를 찾고, 승인 받고, 실제 시스템까지 반영하는 approval-driven request-to-resolution package입니다."
        actions={[
          { href: "/pilot", label: "파일럿 범위 보기" },
          { href: "/packages", label: "Product 보기", variant: "outline" },
        ]}
        notes={["internal-app-first", "approval-driven", "action-ready"]}
      >
        <HomeHeroGraphic />
      </CoreMarketingHero>

      <MetricStrip items={homeMetricCards} />

      <BrandSection
        eyebrow="Market shift"
        title="검색은 번들되고, 실행은 아직 비어 있습니다"
        description="협업툴 안에서 검색과 요약은 기본 기능이 되어갑니다. 남는 자리는 승인과 시스템 반영까지 닫는 workflow 입니다."
      >
        <InsightGrid items={searchExecutionGapCards} columns={4} />
      </BrandSection>

      <BrandSection
        tone="muted"
        eyebrow="Core workflow"
        title="request → approval → resolution"
        description="답변형 UX와 승인형 workflow, 실행형 시스템 연동을 하나의 흐름으로 보이게 만들어야 실제 구매 이유가 생깁니다."
      >
        <FlowRail items={requestResolutionFlow} />
      </BrandSection>

      <BrandSection
        eyebrow="Action packs"
        title="처음부터 넓게 가지 않고, 부서형 pack부터 검증합니다"
        description="첫 MVP는 범용 챗봇이 아니라 반복적이고 승인 중심인 부서 workflow 하나를 끝까지 닫는 구조가 맞습니다."
        actions={<CTAButton href="/solutions">Solutions 보기</CTAButton>}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {actionPackHighlights.map((pack) => (
            <BrandCard key={pack.slug} className="h-full rounded-[1.8rem] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">{pack.audience}</p>
              <h3 className="mt-3 text-2xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{pack.title}</h3>
              <p className="mt-3 text-sm/7 text-[var(--ink-secondary)]">{pack.summary}</p>
              <div className="mt-5 rounded-[1.25rem] bg-[var(--surface-2)] px-4 py-3 text-sm/6 text-[var(--ink-secondary)]">
                {pack.workflow}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {pack.systems.map((system) => (
                  <span
                    key={system}
                    className="inline-flex rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                  >
                    {system}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <CTAButton href={`/solutions/${pack.slug}`} variant="outline">
                  pack 상세 보기
                </CTAButton>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        tone="muted"
        eyebrow="Rollout"
        title="작게 시작하고, 증명하고, 확장합니다"
        description="초기에는 internal app 기반으로 한 부서의 workflow를 검증하고, 그 다음에 정책·운영·배포를 단단하게 합니다."
      >
        <RoadmapPanels items={pilotRoadmap} />
        <BrandCard className="rounded-[1.8rem] p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">Best next step</p>
              <h3 className="mt-3 text-2xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">
                한 부서, 한 요청 유형, 세 개 안팎의 도구로 시작하세요
              </h3>
              <p className="mt-3 max-w-3xl text-sm/7 text-[var(--ink-secondary)]">
                좋은 파일럿은 기능 데모가 아니라 실제로 끝까지 닫히는 workflow 하나를 만드는 것입니다. 그 범위를 먼저 고정해야
                처리시간과 승인 리드타임을 비교할 수 있습니다.
              </p>
            </div>
            <CompactLinkRow
              links={[
                { href: "/pilot", label: "Pilot 보기" },
                { href: "/architecture", label: "Architecture" },
                { href: "/security", label: "Security" },
              ]}
            />
          </div>
        </BrandCard>
      </BrandSection>
    </div>
  );
}
