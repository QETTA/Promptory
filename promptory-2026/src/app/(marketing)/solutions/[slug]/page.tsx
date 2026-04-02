import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero } from "@/components/marketing/core-marketing-primitives";
import { MarketingActionLink } from "@/components/marketing/core-marketing-primitives";
import {
  industryPlaybookMap,
  solutionPackMap,
  solutionPacks,
  type SolutionSlug,
} from "@/lib/request-to-resolution-content";
import { solutionPageDetails } from "@/lib/t05-marketing-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutionPacks.map((pack) => ({ slug: pack.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pack = solutionPackMap[slug as SolutionSlug];

  if (!pack) {
    return {
      title: "Solution not found — Promptory",
    };
  }

  return {
    title: `${pack.title} — Promptory`,
    description: pack.summary,
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pack = solutionPackMap[slug as SolutionSlug];

  if (!pack) {
    notFound();
  }

  const detail = solutionPageDetails[pack.slug];
  const relatedIndustries = detail.relatedIndustries.map((industrySlug) => industryPlaybookMap[industrySlug]);

  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow={pack.shortTitle}
        title={pack.title}
        description={pack.summary}
        actions={
          <>
            <CTAButton href={`/contact?type=department&slug=${pack.slug}&plan=department`} size="lg">
              이 pack 상담하기
            </CTAButton>
            <CTAButton href="/pilot" variant="outline" size="lg">
              파일럿 범위 보기
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Buyer</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{pack.audience}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">First workflow</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{pack.firstWorkflow}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Core KPI</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pack.kpis.map((kpi) => (
                  <span
                    key={kpi}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                  >
                    {kpi}
                  </span>
                ))}
              </div>
            </div>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="Operator lens"
        title={<>이 pack은 이런 병목을 겨냥합니다</>}
        description={detail.operatorLens}
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Fit signals</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.fitSignals.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Required roles</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.requiredRoles.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Request to resolution"
        title={<>이 pack이 실제로 닫는 흐름</>}
        description="Solution detail page는 기능 목록보다 end-to-end 흐름이 먼저 보이도록 설계해야 합니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {pack.steps.map((step, index) => (
            <BrandCard key={step} className="h-full border border-[var(--line)] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-50)] text-sm font-semibold text-[var(--brand-700)]">
                {index + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-secondary)]">{step}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="What ships"
        title={<>이 pack을 열면 함께 들어가는 기본 산출물</>}
        description="각 pack은 Slack surface, approval card, system reflection, ops instrumentation을 같이 보냅니다. 기능보다 운영 가능한 구조가 중요합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Deliverables</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">What usually comes next</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.nextMoves.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>
        </div>

        <MarketingInsetCallout
          eyebrow="Pilot note"
          title={detail.headline}
          body="처음부터 pack을 넓게 열기보다 요청자 1그룹, 승인자 1그룹, 핵심 시스템 몇 개만 붙여 proof KPI를 만드는 편이 가장 안전합니다."
        />
      </BrandSection>

      <BrandSection
        eyebrow="Where this pack wins first"
        title={<>이 pack이 특히 잘 맞는 산업군</>}
        description="Solution pack은 공통 엔진이지만 buyer 언어와 KPI는 산업군별로 다르게 읽혀야 합니다. 관련 vertical playbook을 같이 보면 scope를 자르기 쉽습니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {relatedIndustries.map((industry) => (
            <BrandCard key={industry.slug} className="flex h-full flex-col gap-4 border border-[var(--line)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{industry.shortTitle}</p>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{industry.title}</h3>
              <p className="text-sm leading-7 text-[var(--ink-secondary)]">{industry.summary}</p>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">First pack</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{industry.firstPack}</p>
              </div>
              <div className="mt-auto">
                <MarketingActionLink href={`/industries/${industry.slug}`}>vertical playbook 보기</MarketingActionLink>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {pack.shortTitle} pack의 핵심은 답변이 아니라, 승인 후 system of record까지 닫히는 경험입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            buyer와 approval gate가 이미 선명하다면, 이 pack은 4~6주 안에 proof를 만들기 가장 좋은 후보입니다. 지금 범위를 좁게 잡고 작은 파일럿으로 먼저 숫자를 만들면 됩니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={`/contact?type=department&slug=${pack.slug}&plan=department`} size="lg">
              이 pack 파일럿 논의하기
            </CTAButton>
            <CTAButton href="/pricing" variant="outline" size="lg">
              패키징 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
