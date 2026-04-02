import type { Metadata } from "next";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import {
  MarketingActionLink,
  MarketingInsetCallout,
  MarketingPageHero,
} from "@/components/marketing/core-marketing-primitives";
import { resolveCampaignLandingContent } from "@/lib/campaign-landing-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = resolveCampaignLandingContent(slug);

  return {
    title: `${content.title} — Promptory`,
    description: content.description,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const content = resolveCampaignLandingContent(slug);

  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        actions={(
          <>
            <CTAButton href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </CTAButton>
            <CTAButton href={content.secondaryCta.href} variant="outline" size="lg">
              {content.secondaryCta.label}
            </CTAButton>
          </>
        )}
        aside={(
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Audience</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{content.audience}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Goal</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{content.goal}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">First workflow</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{content.firstWorkflow}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Proof metric</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{content.proofMetric}</p>
            </div>
          </BrandCard>
        )}
      />

      <BrandSection
        eyebrow="Campaign angle"
        title={<>이 랜딩에서 먼저 고정해야 할 메시지</>}
        description="광고나 파트너 유입 랜딩은 일반 소개 페이지보다 더 빨리 buyer fit과 proof scope를 보여줘야 합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Fit signals</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {content.fitSignals.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Landing checklist</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {content.landingChecklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>
        </div>

        <MarketingInsetCallout
          eyebrow="Campaign note"
          title={`${content.label} 유입에서는 이 메시지가 핵심입니다`}
          body={content.note}
        />
      </BrandSection>

      <BrandSection
        eyebrow="Workflow story"
        title={<>랜딩에서 보여줘야 할 request-to-resolution 흐름</>}
        description="캠페인 랜딩도 결국 첫 workflow를 얼마나 빨리 이해시키느냐가 핵심입니다. 아래 단계가 바로 buyer가 기대하는 end-to-end 경험입니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {content.workflowSteps.map((step, index) => (
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
        eyebrow="Proof block"
        title={<>이 랜딩이 증명해야 할 핵심 포인트</>}
        description="좋은 campaign page는 모든 기능을 나열하지 않습니다. proof를 만드는 포인트와 다음 클릭 경로만 선명하면 충분합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Proof points</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {content.proofPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Related paths</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {content.relatedLinks.map((link) => (
                <MarketingActionLink key={link.href} href={link.href} tone="secondary">
                  {link.label}
                </MarketingActionLink>
              ))}
            </div>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            campaign의 목적은 클릭을 모으는 것이 아니라, 맞는 buyer를 올바른 pilot scope로 연결하는 것입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            이 랜딩에서 buyer fit, 첫 workflow, proof KPI까지 이해됐다면 다음 단계는 명확합니다. 한 부서, 한 요청 유형, 소수 connector 범위로 빠르게 proof를 만들면 됩니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </CTAButton>
            <CTAButton href="/pilot" variant="outline" size="lg">
              공통 파일럿 구조 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
