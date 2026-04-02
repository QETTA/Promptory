import type { Metadata } from "next";

import { SectionHeading } from "@/components/marketing/SectionHeading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { PageContainer, PageSection } from "@/components/ui/page-container";
import { gradients } from "@/components/ui/patterns";
import { packageTiers } from "@/lib/request-to-resolution-content";

export const metadata: Metadata = {
  title: "Product - Promptory",
  description:
    "Slack 안에서 요청을 받고, 근거를 찾고, 승인 받고, 시스템에 실제로 반영하는 request-to-resolution 패키지를 소개합니다.",
};

const productPillars = [
  {
    title: "Slack-first",
    body: "App Home, DM, shortcuts, approval card로 요청 접수와 결과 회신을 Slack 안에서 끝냅니다.",
  },
  {
    title: "Approval-driven",
    body: "중요한 결정은 승인 카드와 human-in-the-loop를 통해 안전하게 통제합니다.",
  },
  {
    title: "Action-ready",
    body: "정책 확인에서 끝나지 않고 Jira, CRM, IAM, ERP 같은 시스템 반영까지 한 흐름으로 닫습니다.",
  },
];

export default function PackagesPage() {
  return (
    <div className="pb-16">
      <PageSection className={`${gradients.hero} border-b border-[var(--line)]`}>
        <PageContainer>
          <AnimatedSection className="mx-auto max-w-4xl text-center">
            <Badge className="mx-auto">Product</Badge>
            <h1 className="poster-title mt-4 text-[var(--slate-950)]">
              검색을 넘어서,
              <br />
              승인과 실행까지 끝내는 패키지
            </h1>
            <p className="body-copy-xl mx-auto mt-4 max-w-3xl text-[var(--slate-600)]">
              Promptory는 Slack 안에서 요청을 받고, 근거를 찾고, 승인 받고, 시스템에 실제로
              반영하는 request-to-resolution package를 만듭니다. 단순 검색봇이 아니라 실행형
              workflow를 파는 제품입니다.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/solutions" size="lg">
                action pack 보기
              </CTAButton>
              <CTAButton href="/pilot" variant="outline" size="lg">
                파일럿 범위 보기
              </CTAButton>
            </div>
          </AnimatedSection>
        </PageContainer>
      </PageSection>

      <PageSection className="py-12 sm:py-16">
        <PageContainer>
          <SectionHeading
            eyebrow="Product definition"
            title="Slack UI + Agent + MCP + Policy"
            body="Slack은 입구와 승인 채널, Agent는 판단 엔진, MCP는 연결 표준, Policy는 안전장치 역할을 맡습니다."
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {productPillars.map((pillar, index) => (
              <AnimatedSection key={pillar.title} delay={index * 0.08}>
                <Card variant="strong" className="h-full p-6">
                  <h2 className="text-xl font-semibold text-[var(--slate-950)]">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">{pillar.body}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      <PageSection className="bg-slate-50 py-12 sm:py-16">
        <PageContainer>
          <SectionHeading
            eyebrow="Packaging"
            title="Seat 과금이 아니라 실행 패키지로 팝니다"
            body="초기에는 internal app 기반의 Starter와 Department가 현실적이고, 이후 Private와 Enterprise로 확장합니다."
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packageTiers.map((tier, index) => (
              <AnimatedSection key={tier.name} delay={index * 0.08}>
                <Card variant={tier.name === "Department" ? "heroBright" : "strong"} className="h-full p-6">
                  <Badge variant={tier.name === "Department" ? "default" : "neutral"} className="w-fit">
                    {tier.badge}
                  </Badge>
                  <h2 className="mt-4 text-xl font-semibold text-[var(--slate-950)]">{tier.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">{tier.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slate-500)]">
                    {tier.fit}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--slate-600)]">
                    {tier.features.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <CTAButton href={`/packages/${tier.slug}`} variant="outline" className="w-full">
                      {tier.name} 상세 보기
                    </CTAButton>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      <PageSection className="py-12 sm:py-16">
        <PageContainer size="narrow">
          <Card variant="tint" className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-[var(--slate-950)]">
              첫 제품은 넓게 가지 않습니다
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
              Deal Desk approval, People Ops request, IT access 같은 승인 중심 workflow부터
              좁게 검증하고, 이후 다른 부서와 vertical로 확장합니다.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/solutions" size="lg">
                부서형 pack 보기
              </CTAButton>
              <CTAButton href="/industries" variant="outline" size="lg">
                산업군 playbook 보기
              </CTAButton>
            </div>
          </Card>
        </PageContainer>
      </PageSection>
    </div>
  );
}
