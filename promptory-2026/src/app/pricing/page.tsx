import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageContainer, PageSection } from "@/components/ui/page-container";
import { gradients, layouts } from "@/components/ui/patterns";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "가격 안내 - 프롬프토리",
  description: "Quick Audit Pack부터 Core Package, Growth Package까지 팀 규모와 필요에 맞는 맞춤형 Slack Agent 패키지 가격을 확인하세요.",
};

const tiers = [
  {
    name: "Quick Audit Pack",
    price: "4.9",
    priceRange: "4.9 ~ 9.9",
    period: "만원 (일회성)",
    description: "한 번의 URL 진단으로 핵심 병목과 개선 방향을 파악하는 진단형 패키지",
    features: [
      "사이트/채널 URL 기준 진단",
      "경쟁사 3사 비교표",
      "전환 CTA 초안 3개",
      "보고용 요약 (1페이지)",
      "Slack 결과 공유",
      "7일간 App Home 저장",
    ],
    cta: "Quick Audit 신청",
    href: "/contact?type=quick_audit",
    highlighted: false,
    badge: "입문",
  },
  {
    name: "Core Package",
    price: "79",
    priceRange: "79 ~ 99",
    period: "만원/월",
    setup: "세팅비 300~500만원 (일회성)",
    description: "팀의 반복 진단/초안 업무를 Slack 안에서 자동화하는 기본 패키지",
    features: [
      "Agent 1종 선택 (Website Diagnosis / Campaign Brief / Korea Local Ops)",
      "무제한 URL 진단 및 초안 생성",
      "팀 맞춤 질문 흐름 세팅",
      "Slack DM/채널/모달 연동",
      "결과 저장 및 App Home 관리",
      "KR/EN 언어 옵션",
      "이메일 기술 지원",
    ],
    cta: "Core Package 문의",
    href: "/contact?type=package&plan=core",
    highlighted: true,
    badge: "추천",
  },
  {
    name: "Growth / Multi-flow",
    price: "149",
    priceRange: "149 ~ 249",
    period: "만원/월",
    setup: "세팅비 700~1200만원 (일회성)",
    description: "복수 에이전트 연계와 고급 워크플로우가 필요한 성중 기업용",
    features: [
      "Agent 2~3종 동시 운용",
      "에이전트 간 연계 워크플로우",
      "고급 출력 템플릿 커스터마이징",
      "우선 기술 지원 (Slack/화상)",
      "월간 사용 리포트 제공",
      "API 연동 옵션 (HubSpot, Notion, Airtable)",
      "전담 성공 매니저 배정",
    ],
    cta: "Growth Package 문의",
    href: "/contact?type=package&plan=growth",
    highlighted: false,
    badge: "기업",
  },
];

const addons = [
  {
    name: "Additional Agent",
    price: "40만원/월",
    description: "Core/Growth 패키지에 에이전트 1종 추가",
  },
  {
    name: "Custom Template",
    price: "60만원/월",
    description: "팀 전용 출력 템플릿 추가 제작 및 유지보수",
  },
  {
    name: "CRM Integration",
    price: "별도 문의",
    description: "HubSpot, Salesforce, Notion 등 외부 시스템 연동",
  },
];

const faqs = [
  {
    q: "Quick Audit과 Core Package의 차이는 무엇인가요?",
    a: "Quick Audit은 한 번의 URL 진단으로 병목과 개선 방향을 파악하는 일회성 진단입니다. Core Package는 Slack에 에이전트를 설치해 팀의 반복 업무를 지속적으로 자동화하는 구독형 패키지입니다.",
  },
  {
    q: "세팅비에는 어떤 것이 포함되나요?",
    a: "팀 인터뷰, Slack 워크스페이스 연동, 에이전트 흐름 설계, 테스트 및 세팅, 초기 교육이 포함됩니다. 일반적으로 2~4주 소요됩니다.",
  },
  {
    q: "월 요금은 사용자 수 기준인가요?",
    a: "아닙니다. 팀 단위 요금제로, 한 팀 내에서 에이전트를 사용하는 인원 수와 상관없이 동일한 요금이 적용됩니다.",
  },
  {
    q: "연간 계약 시 할인이 있나요?",
    a: "네, 연간 선납 시 2개월 무료 혜택이 있습니다. (12개월 요금으로 14개월 이용)",
  },
  {
    q: "데모는 무료인가요?",
    a: "네, Quick Audit 형태의 데모는 무료로 제공됩니다. 회사 URL을 보내주시면 실제 진단 예시를 보여드립니다.",
  },
];

export default function PricingPage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <PageSection className={cn(gradients.hero, layouts.section)}>
        <PageContainer>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Transparent Pricing</Badge>
            <h1 className="poster-title text-[var(--slate-950)] break-keep">
              팀 규모와 필요에 맞는<span className="gradient-text"> 맞춤형 패키지</span>
            </h1>
            <p className="body-copy-xl mt-4 text-[var(--slate-600)]">
              Quick Audit으로 시작해서 Core Package로 확장하세요. 투명한 가격, 확실한 가치.
            </p>
          </AnimatedSection>
        </PageContainer>
      </PageSection>

      {/* Pricing Cards */}
      <PageSection className="py-12 sm:py-16">
        <PageContainer size="wide">
          <div className="grid gap-6 lg:grid-cols-3 items-stretch">
            {tiers.map((tier, index) => (
              <AnimatedSection key={tier.name} delay={index * 0.1} className="h-full">
                <Card
                  variant={tier.highlighted ? "heroBright" : "strong"}
                  className={`p-6 sm:p-8 flex flex-col h-full relative ${
                    tier.highlighted ? "ring-2 ring-[var(--brand-500)] ring-offset-2" : ""
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={tier.highlighted ? "default" : "neutral"}>
                      {tier.badge}
                    </Badge>
                    {tier.highlighted && (
                      <span className="rounded-full bg-[var(--brand-50)] px-2 py-1 text-xs font-medium text-[var(--brand-600)]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Header */}
                  <h2 className="text-xl font-bold text-[var(--slate-950)]">{tier.name}</h2>
                  <p className="mt-2 text-sm text-[var(--slate-600)]">{tier.description}</p>

                  {/* Price */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[var(--slate-950)] sm:text-4xl">
                        ₩{tier.priceRange}
                      </span>
                      <span className="text-sm text-[var(--slate-500)]">{tier.period}</span>
                    </div>
                    {tier.setup && (
                      <p className="mt-1 text-xs text-[var(--slate-500)]">{tier.setup}</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <CTAButton
                      href={tier.href}
                      variant={tier.highlighted ? "default" : "outline"}
                      className={tier.highlighted ? "btn-shine w-full" : "w-full hover:bg-[var(--surface-2)]"}
                      telemetryEventName="pricing_cta_clicked"
                      telemetryPayload={{ tier: tier.name }}
                    >
                      {tier.cta}
                    </CTAButton>
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-[var(--line)]" />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="section-kicker mb-3 text-[var(--slate-500)]">
                      포함 사항
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-500)]" />
                          <span className="text-sm text-[var(--slate-600)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Add-ons Section */}
      <PageSection className="py-12 sm:py-16 bg-slate-50">
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title text-[var(--slate-950)]">Add-on Packages</h2>
            <p className="mt-2 text-sm text-[var(--slate-600)]">
              필요에 따라 추가하는 확장 옵션
            </p>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-3">
            {addons.map((addon, index) => (
              <AnimatedSection key={addon.name} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover h-full">
                  <h3 className="font-semibold text-[var(--slate-950)]">{addon.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--brand-600)]">{addon.price}</p>
                  <p className="mt-2 text-xs text-[var(--slate-600)]">{addon.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Revenue Funnel Explanation */}
      <PageSection className="py-12 sm:py-16">
        <PageContainer size="narrow">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title text-[var(--slate-950)]">도입 흐름</h2>
            <p className="mt-2 text-sm text-[var(--slate-600)]">
              Quick Audit으로 검증하고, Core Package로 확장하는 3단계 접근
            </p>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Quick Audit",
                desc: "URL 기반 진단으로 효과 검증",
                price: "₩4.9~9.9만",
              },
              {
                step: "02",
                title: "Core Package",
                desc: "Slack 에이전트 설치 및 월간 구독",
                price: "₩79~99만/월",
              },
              {
                step: "03",
                title: "Upsell Modules",
                desc: "추가 에이전트 및 고급 기능 확장",
                price: "Add-on 별도",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <Card variant="strong" className="p-5 text-center card-hover">
                  <span className="text-2xl font-bold text-[var(--brand-200)]">{item.step}</span>
                  <h3 className="mt-2 font-semibold text-[var(--slate-950)]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--slate-600)]">{item.desc}</p>
                  <p className="mt-2 text-xs font-medium text-[var(--brand-600)]">{item.price}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* FAQ Section */}
      <PageSection className="py-12 sm:py-16 bg-slate-50">
        <PageContainer size="narrow">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title text-[var(--slate-950)]">자주 묻는 질문</h2>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Card variant="tint" className="p-5 card-hover">
                  <h3 className="text-sm font-semibold text-[var(--slate-950)]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--slate-600)]">{faq.a}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* CTA Section */}
      <PageSection className={cn(layouts.section, "relative overflow-hidden")}>
        <div className={cn("absolute inset-0", gradients.pricing)} />
        <PageContainer className="relative" size="narrow">
          <div className="text-center">
            <AnimatedSection>
              <h2 className="section-title text-[var(--slate-950)] break-keep">
                아직 어떤 패키지가 적합한지 망설이고 계신가요?
              </h2>
              <p className="body-copy-lg mx-auto mt-4 max-w-2xl text-[var(--slate-600)]">
                Quick Audit으로 시작해서 직접 경험해보세요. 회사 URL만으로 진단 예시를 무료로 받아보실 수 있습니다.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 px-2 sm:px-0">
                <CTAButton
                  href="/contact?type=quick_audit"
                  size="lg"
                  className="btn-shine hover:scale-105 transition-transform w-full sm:w-auto justify-center"
                  telemetryEventName="pricing_bottom_cta_clicked"
                  telemetryPayload={{ type: "quick_audit" }}
                >
                  무료 Quick Audit 받기
                </CTAButton>
                <CTAButton
                  href="/contact?type=demo"
                  variant="outline"
                  size="lg"
                  className="hover-lift w-full sm:w-auto justify-center"
                  telemetryEventName="pricing_bottom_cta_clicked"
                  telemetryPayload={{ type: "demo" }}
                >
                  전체 데모 요청
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </PageContainer>
      </PageSection>
    </div>
  );
}
