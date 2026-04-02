import type { Metadata } from "next";

import { CTAButton } from "@/components/ui/cta-button";
import { BrandCard, BrandSection } from "@/components/marketing/template-foundation";
import { MarketingInsetCallout, MarketingPageHero, MarketingActionLink } from "@/components/marketing/core-marketing-primitives";
import { educationTracks } from "@/lib/request-to-resolution-content";
import { educationJourney, educationTargetCards } from "@/lib/t05-marketing-content";

export const metadata: Metadata = {
  title: "Education — Promptory",
  description:
    "직장인과 소규모 팀이 반복 업무, 요청, 승인, 보고 흐름을 줄일 수 있도록 돕는 AI 업무자동화 실습·진단 카테고리입니다.",
};

export default function EducationPage() {
  return (
    <div className="bg-white pb-20">
      <MarketingPageHero
        eyebrow="AI 업무자동화 실습·진단"
        title={<>배우고 끝나는 강의보다, 내 업무 하나를 줄이는 실습이 더 잘 남습니다</>}
        description="Promptory Education은 Slack·ChatGPT·n8n·Google Sheets를 도구로 삼되, 핵심은 ‘어떤 반복 업무를 줄일 것인가’에 둡니다. 교육 카테고리는 본제품을 대체하는 것이 아니라, fit를 확인하고 Starter pack으로 이어지는 front-end lane입니다."
        actions={
          <>
            <CTAButton href="/contact?type=education" size="lg">
              교육 / 진단 문의하기
            </CTAButton>
            <CTAButton href="/pricing" variant="outline" size="lg">
              제품 패키지 보기
            </CTAButton>
          </>
        }
        aside={
          <MarketingInsetCallout
            eyebrow="Education as entry lane"
            title="Slack을 앞세우기보다, 반복 업무와 승인 병목을 앞세웁니다"
            body="사용자는 MCP나 agent architecture를 사고 싶어 하지 않습니다. 대신 반복 업무가 줄어들고, 요청·승인·보고가 빨라지는 실습을 원합니다."
          />
        }
      />

      <BrandSection
        eyebrow="Tracks"
        title={<>세 가지 entry track으로 나눕니다</>}
        description="입문형 진단, 개인 실습, 팀 워크숍은 목적이 다릅니다. 교육 category page에서는 먼저 어떤 entry product가 맞는지 쉽게 읽히는 것이 중요합니다."
        width="wide"
      >
        <div className="grid gap-5 xl:grid-cols-3">
          {educationTracks.map((track) => (
            <BrandCard key={track.slug} className="flex h-full flex-col gap-5 border border-[var(--line)] bg-white p-6 sm:p-7">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{track.format}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{track.title}</h2>
                <p className="text-sm leading-7 text-[var(--ink-secondary)]">{track.summary}</p>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">Best for</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{track.bestFor}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">You leave with</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--ink-secondary)]">
                  {track.outcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <MarketingActionLink href={`/education/${track.slug}`}>트랙 상세 보기</MarketingActionLink>
                <MarketingActionLink href={`/contact?type=education&plan=${track.slug}`} tone="secondary">
                  이 트랙 문의하기
                </MarketingActionLink>
              </div>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Who this is for"
        title={<>교육 카테고리는 이런 사람과 팀에 맞습니다</>}
        description="직장인 전체를 넓게 부르기보다, 반복 요청과 승인 병목을 직접 체감하는 역할로 좁혀 잡는 편이 전환이 훨씬 좋습니다."
        tone="muted"
        width="wide"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {educationTargetCards.map((item) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection
        eyebrow="Journey"
        title={<>진단 → 실습 → 팀 워크숍 → Starter pack 순서가 가장 자연스럽습니다</>}
        description="교육 category는 리드 수집과 fit 검증을 위한 front-end입니다. 효과가 보이면 제품형 pilot로 넘어갈 수 있어야 합니다."
        width="wide"
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {educationJourney.map((item, index) => (
            <BrandCard key={item.title} className="h-full border border-[var(--line)] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-50)] text-sm font-semibold text-[var(--brand-700)]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
            </BrandCard>
          ))}
        </div>
      </BrandSection>

      <BrandSection tone="dark" width="wide" className="pb-24">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Next step</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            교육 카테고리는 “툴 설명”이 아니라 “문제를 명확히 하고 다음 액션을 정하는 단계”로 읽혀야 합니다.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/80">
            진단과 실습으로 fit가 확인되면, 그다음은 팀 파일럿과 action pack 설계로 넘어가면 됩니다. Promptory Education은 그 전환을 더 부드럽게 만드는 entry lane입니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href="/contact?type=education" size="lg">
              교육 / 진단 문의하기
            </CTAButton>
            <CTAButton href="/packages" variant="outline" size="lg">
              제품 개요 보기
            </CTAButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}
