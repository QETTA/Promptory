import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero } from "@/components/marketing/core-marketing-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import {
  actionTypePolicies,
  buyerRoles,
  implementationGuardrails,
  legacyPackageRedirectMap,
  packageTierDetails,
  packageTierMap,
  packageTiers,
  pilotChecklist,
  type PackageTierSlug,
  workflowStages,
} from "@/lib/request-to-resolution-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return packageTiers.map((tier) => ({ slug: tier.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug in legacyPackageRedirectMap) {
    return {
      title: "Product — Promptory",
      description: "Promptory의 현재 product packaging과 request-to-resolution package 구조를 확인하세요.",
    };
  }

  const tier = packageTierMap[slug as PackageTierSlug];

  if (!tier) {
    return {
      title: "Package not found — Promptory",
    };
  }

  return {
    title: `${tier.name} — Promptory`,
    description: tier.summary,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug in legacyPackageRedirectMap) {
    permanentRedirect(legacyPackageRedirectMap[slug as keyof typeof legacyPackageRedirectMap]);
  }

  const tier = packageTierMap[slug as PackageTierSlug];

  if (!tier) {
    notFound();
  }

  const detail = packageTierDetails[tier.slug];

  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow={detail.eyebrow}
        title={`${tier.name} package`}
        description={detail.description}
        actions={
          <>
            <CTAButton href={detail.primaryCta.href} size="lg">
              {detail.primaryCta.label}
            </CTAButton>
            <CTAButton href={detail.secondaryCta.href} variant="outline" size="lg">
              {detail.secondaryCta.label}
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                Commercial shape
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">
                {tier.commercial}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                Best fit
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{tier.fit}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                Success lens
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{detail.successNote}</p>
            </div>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="What ships"
        title={detail.title}
        description={tier.summary}
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
              Included by default
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
              Fit signals
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.fitSignals.map((signal) => (
                <li key={signal}>• {signal}</li>
              ))}
            </ul>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Workflow spine"
        title={<>모든 package는 request-to-resolution spine을 공유합니다</>}
        description="차이는 디자인이 아니라 범위와 guardrail, approval 밀도, 운영 cadence에 있습니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {workflowStages.map((stage) => (
            <BrandCard key={stage.step} className="h-full border border-[var(--line)] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-50)] text-sm font-semibold text-[var(--brand-700)]">
                {stage.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{stage.description}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Scope notes"
        title={<>좋은 package는 범위를 줄이는 데서 시작합니다</>}
        description="패키징은 기능 묶음이 아니라 buyer, approver, system-of-record 경계를 합의하는 방식입니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
              Scope notes
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.scopeNotes.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
              Pilot checklist
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {pilotChecklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Governance"
        title={<>실행 package일수록 approval과 policy가 먼저 보여야 합니다</>}
        description="Starter부터 Enterprise까지 read, write, admin action을 같은 규칙으로 다루지 않는 것이 기본 원칙입니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 xl:grid-cols-3">
          {actionTypePolicies.map((policy) => (
            <BrandCard key={policy.action} className="h-full border border-[var(--line)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                {policy.action}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">
                {policy.policy}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{policy.rationale}</p>
            </BrandCard>
          ))}
        </div>

        <MarketingInsetCallout
          eyebrow="Guardrails"
          title="Private와 Enterprise에서는 boundary와 delegated scope 설계가 더 중요합니다"
          body={implementationGuardrails.join(" ")}
        />
      </BrandSection>

      <BrandSection
        eyebrow="Buying group"
        title={<>좋은 package는 buyer와 approver가 처음부터 같이 보입니다</>}
        description="실무 챔피언만 있는 파일럿은 쉽게 막히고, 승인자와 기술 승인자가 함께 들어와야 request-to-resolution 구조가 열립니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {buyerRoles.map((role) => (
            <BrandCard key={role.title} className="h-full border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{role.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{role.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            지금 필요한 건 package 이름이 아니라, 어떤 요청 유형을 가장 먼저 닫을지에 대한 합의입니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            {tier.name}는 범위를 설명하는 상업 단위입니다. 실제 구매 결정을 빠르게 만드는 것은 Deal Desk,
            People Ops, IT Access, Finance & Procurement 중 어느 workflow를 proof로 고를지입니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={detail.primaryCta.href} size="lg">
              {detail.primaryCta.label}
            </CTAButton>
            <CTAButton href="/solutions" variant="outline" size="lg">
              action pack 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
