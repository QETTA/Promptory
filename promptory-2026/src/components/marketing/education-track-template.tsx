import type { Metadata } from "next";

import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero } from "@/components/marketing/core-marketing-primitives";
import { CTAButton } from "@/components/ui/cta-button";
import {
  educationTrackDetails,
} from "@/lib/t05-marketing-content";
import {
  educationTrackMap,
  type EducationTrackSlug,
} from "@/lib/request-to-resolution-content";

export function getEducationTrackMetadata(slug: EducationTrackSlug): Metadata {
  const track = educationTrackMap[slug];

  return {
    title: `${track.title} — Promptory Education`,
    description: track.summary,
  };
}

export function EducationTrackTemplate({ slug }: { slug: EducationTrackSlug }) {
  const track = educationTrackMap[slug];
  const detail = educationTrackDetails[slug];

  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow={detail.heroEyebrow}
        title={track.title}
        description={track.summary}
        actions={
          <>
            <CTAButton href={`/contact?type=education&plan=${slug}`} size="lg">
              이 트랙 문의하기
            </CTAButton>
            <CTAButton href="/education" variant="outline" size="lg">
              전체 교육 카테고리 보기
            </CTAButton>
          </>
        }
        aside={
          <BrandCard className="space-y-5 border border-[var(--line)] bg-white/90">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Format</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{track.format}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Best for</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{track.bestFor}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Operator note</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{detail.operatorNote}</p>
            </div>
          </BrandCard>
        }
      />

      <BrandSection
        eyebrow="Fit signals"
        title={<>이런 상황이라면 이 트랙이 잘 맞습니다</>}
        description="교육은 기술 설명보다 문제 언어로 읽혀야 합니다. 어떤 상황에서 이 트랙을 고르면 좋은지 먼저 확인합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Choose this when</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {track.fitSignals.map((signal) => (
                <li key={signal}>• {signal}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">What this track avoids</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              <li>• 툴 이름만 배우고 끝나는 강의</li>
              <li>• 내 업무와 상관없는 추상적인 AI 설명</li>
              <li>• 교육과 실행이 끊겨서 다음 단계가 안 보이는 상태</li>
            </ul>
          </BrandCard>
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="How it runs"
        title={<>이 트랙은 이런 순서로 진행합니다</>}
        description="입문형이든 팀 워크숍이든, 결국 핵심은 문제를 구조화하고 바로 다음 실행으로 이어지게 만드는 것입니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {detail.agenda.map((item, index) => (
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
        eyebrow="What you leave with"
        title={<>끝나고 나면 손에 남는 산출물이 있어야 합니다</>}
        description="교육 category도 결국 다음 액션으로 연결되어야 의미가 있습니다. Promptory 교육 트랙은 결과물을 남기는 구조로 설계합니다."
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <BrandCard className="h-full border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Outcomes</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {detail.leaveWith.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <MarketingInsetCallout
            eyebrow="Next move"
            title="교육은 끝이 아니라 다음 선택을 더 쉽게 만드는 단계입니다"
            body={detail.nextStep}
          />
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Bridge to product</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            이 교육 트랙이 맞는지 확인한 뒤에는, Starter pack이나 팀 파일럿으로 자연스럽게 이어지면 됩니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            Promptory의 교육 카테고리는 본제품을 대체하지 않습니다. 진단과 실습으로 문제를 명확히 하고, fit가 확인되면 action pack과 internal app pilot로 확장합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={`/contact?type=education&plan=${slug}`} size="lg">
              이 트랙으로 문의하기
            </CTAButton>
            <CTAButton href="/pricing" variant="outline" size="lg">
              제품 패키지 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
