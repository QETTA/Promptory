import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero, MarketingActionLink } from "@/components/marketing/core-marketing-primitives";
import {
  industryPlaybookMap,
  industryPlaybooks,
  solutionPackMap,
  type IndustrySlug,
} from "@/lib/request-to-resolution-content";
import { industryPageDetails } from "@/lib/t05-marketing-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industryPlaybooks.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const playbook = industryPlaybookMap[slug as IndustrySlug];

  if (!playbook) {
    return {
      title: "Industry not found — Promptory",
    };
  }

  return {
    title: `${playbook.title} — Promptory`,
    description: playbook.summary,
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const playbook = industryPlaybookMap[slug as IndustrySlug];

  if (!playbook) {
    notFound();
  }

  const detail = industryPageDetails[playbook.slug];
  const recommendedPacks = playbook.recommendedSolutions.map((solutionSlug) => solutionPackMap[solutionSlug]);

  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow={playbook.shortTitle}
        title={playbook.title}
        description={playbook.summary}
        actions={
          <>
            <CTAButton href={`/contact?type=pilot&slug=${playbook.slug}`} size="lg">
              이 vertical 상담하기
            </CTAButton>
            <CTAButton href="/solutions" variant="outline" size="lg">
              관련 pack 보기
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Champion</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{playbook.champion}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">First pack</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{playbook.firstPack}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Gate</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{detail.gate}</p>
            </div>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="Why this vertical"
        title={<>이 vertical에서 agent 가치가 빨리 드러나는 이유</>}
        description="vertical detail page는 산업 구조를 설명하는 데서 끝나지 않고, 왜 request-to-resolution이 이 산업에서 특히 유효한지 보여줘야 합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {playbook.whyItFits.map((item) => (
            <BrandCard key={item} className="h-full border border-[var(--line)] bg-white p-6">
              <p className="text-sm leading-7 text-[var(--ink-secondary)]">{item}</p>
            </BrandCard>
          ))}
        </div>

        <MarketingInsetCallout
          eyebrow="Rollout note"
          title={detail.flagshipTitle}
          body={detail.rolloutNote}
        />
      </BrandSection>

      <BrandSection
        eyebrow="Buyer map"
        title={<>이 산업군에서 먼저 만나는 buyer와 workflow</>}
        description="좋은 vertical page는 실제 buyer가 자기 팀의 요청 흐름을 바로 떠올릴 수 있게 만들어야 합니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {detail.buyerScenarios.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Buyer</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Flagship flow"
        title={<>첫 파일럿에서 가장 설득력 있는 대표 흐름</>}
        description="industry 파일럿은 기능 데모보다 한 workflow를 끝까지 닫는 경험이 중요합니다. 아래 대표 흐름은 그 vertical의 첫 proof candidate로 보기 좋습니다."
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-5">
          {detail.flagshipSteps.map((item, index) => (
            <BrandCard key={item} className="h-full border border-[var(--line)] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-50)] text-sm font-semibold text-[var(--brand-700)]">
                {index + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-secondary)]">{item}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Recommended pack mix"
        title={<>이 vertical에서 함께 보기 좋은 공통 pack 조합</>}
        description="vertical-specific workflow 위에 공통 action pack 하나를 얹으면 도입 체감이 훨씬 커집니다. 그래서 playbook page에서는 vertical과 solution을 같이 보여주는 편이 좋습니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {recommendedPacks.map((pack) => (
            <BrandCard key={pack.slug} className="flex h-full flex-col gap-4 border border-[var(--line)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Recommended pack</p>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{pack.title}</h3>
              <p className="text-sm leading-7 text-[var(--ink-secondary)]">{pack.summary}</p>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Entry point</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{pack.entryPoint}</p>
              </div>
              <div className="mt-auto">
                <MarketingActionLink href={`/solutions/${pack.slug}`}>pack 상세 보기</MarketingActionLink>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Proof KPI"
        title={<>첫 파일럿에서 확인할 숫자와 gate</>}
        description="vertical page는 ROI를 과장하기보다 어떤 지표로 first proof를 볼 것인지 명확하게 보여주는 편이 더 신뢰를 줍니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Primary KPI</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {playbook.kpis.map((kpi) => (
                <span
                  key={kpi}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                >
                  {kpi}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--ink-secondary)]">{detail.extensionNote}</p>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Gate and connectors</p>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-secondary)]">
              보안 / 검토 게이트는 <span className="font-medium text-[var(--ink-primary)]">{detail.gate}</span> 중심으로 잡고, 아래 커넥터 범위 안에서 파일럿을 자르는 편이 가장 현실적입니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {playbook.systems.map((system) => (
                <span
                  key={system}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                >
                  {system}
                </span>
              ))}
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {playbook.shortTitle} vertical의 핵심은 “무엇이 가능하냐”가 아니라, “어느 요청 흐름을 먼저 닫을 수 있느냐”입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            champion, gate, first pack, proof KPI까지 보였다면 파일럿 범위를 자를 준비가 된 것입니다. 이제 한 workflow와 소수 connector만 고르면 됩니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={`/contact?type=pilot&slug=${playbook.slug}`} size="lg">
              이 vertical 파일럿 논의하기
            </CTAButton>
            <CTAButton href="/pilot" variant="outline" size="lg">
              공통 rollout 구조 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
