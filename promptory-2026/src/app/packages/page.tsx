import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Metadata } from "next";
import { PriceBadge } from "@/components/ui/price-badge";

export const metadata: Metadata = {
  title: "패키지 목록 - 프롬프토리",
  description: "팀의 반복되는 진단, 비교, 초안 작업을 패키지로 붙입니다. Website Diagnosis, Campaign Brief, Korea Local Ops Agent.",
};

const packages = [
  {
    slug: "website-diagnosis-agent",
    title: "Website Diagnosis Agent",
    description: "사이트 URL을 읽고 핵심 병목, 경쟁사 비교, CTA 초안, 보고용 요약까지 만듭니다",
    footer: "사이트 진단 · 전환 문구 · 보고 초안",
    useCase: "사이트 진단",
    teamType: "중소기업 팀",
    color: "blue",
    icon: "🔍",
    price: "₩79만/월",
    setupPrice: "세팅비 ₩300~500만",
  },
  {
    slug: "campaign-brief-agent",
    title: "Campaign Brief Agent",
    description: "회의 메모, 링크, 기존 자료를 바탕으로 브리프, 메시지 방향, 액션 리스트를 정리합니다",
    footer: "브리프 생성 · 카피 초안 · 실행 정리",
    useCase: "브리프 생성",
    teamType: "중소기업 팀",
    color: "emerald",
    icon: "📋",
    price: "₩79만/월",
    setupPrice: "세팅비 ₩300~500만",
  },
  {
    slug: "korea-local-ops-agent",
    title: "Korea Local Ops Agent",
    description: "한국 채널을 진단하고 KR/EN summary와 HQ 공유용 action memo를 만듭니다",
    footer: "Korea scan · KR/EN summary · HQ memo",
    useCase: "보고 정리",
    teamType: "외국계 한국지사",
    color: "indigo",
    icon: "🌏",
    price: "₩79만/월",
    setupPrice: "세팅비 ₩300~500만",
  },
];

const useCases = [
  { label: "사이트 진단", value: "사이트 진단" },
  { label: "브리프 생성", value: "브리프 생성" },
  { label: "보고 정리", value: "보고 정리" },
  { label: "KR/EN summary", value: "KR/EN summary" },
];

const teamTypes = [
  { label: "중소기업 팀", value: "중소기업 팀" },
  { label: "외국계 한국지사", value: "외국계 한국지사" },
];

export default function PackagesPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-brand-50/20 to-indigo-50/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="section-kicker mb-2 text-[var(--brand-600)]">Slack Agent Packages</p>
            <h1 className="poster-title text-[var(--slate-950)]">
              반복되는 진단, 비교, 초안 작업을
              <br />
              <span className="gradient-text">패키지로 붙입니다</span>
            </h1>
            <p className="body-copy-xl mt-4 text-[var(--slate-600)]">
              프롬프토리는 범용 챗봇을 파는 게 아니라
              팀의 실무 흐름에 맞춘 Slack agent 패키지를 제안합니다
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="section-kicker mb-2 text-[var(--slate-500)]">Use case</p>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((uc) => (
                    <Badge key={uc.value} variant="neutral" className="cursor-pointer transition-colors hover:border-[var(--brand-200)] hover:bg-[var(--brand-50)]">
                      {uc.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="section-kicker mb-2 text-[var(--slate-500)]">Team type</p>
                <div className="flex flex-wrap gap-2">
                  {teamTypes.map((tt) => (
                    <Badge key={tt.value} variant="neutral" className="cursor-pointer transition-colors hover:border-[var(--brand-200)] hover:bg-[var(--brand-50)]">
                      {tt.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <AnimatedSection key={pkg.slug} delay={index * 0.1}>
                <Card variant="strong" className="p-6 flex flex-col card-hover h-full group">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="default" className="text-[10px]">{pkg.useCase}</Badge>
                    <Badge variant="neutral" className="text-[10px]">{pkg.teamType}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{pkg.icon}</span>
                    <h2 className="text-lg font-semibold text-[var(--slate-950)]">{pkg.title}</h2>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--slate-600)]">{pkg.description}</p>
                  
                  {/* Price Badge */}
                  <div className="mt-4">
                    <PriceBadge price={pkg.price} setupPrice={pkg.setupPrice} />
                  </div>
                  
                  <p className="body-copy-xs mt-3 text-[var(--slate-500)]">{pkg.footer}</p>
                  <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-4">
                    <CTAButton 
                      href={`/packages/${pkg.slug}`} 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:scale-[1.02] transition-transform"
                    >
                      상세 보기
                    </CTAButton>
                    <CTAButton 
                      href={`/contact?type=package&slug=${pkg.slug}`}
                      size="sm"
                      className="btn-shine w-full"
                      telemetryEventName="package_estimate_clicked"
                      telemetryPayload={{ package: pkg.slug }}
                    >
                      견적 요청하기
                    </CTAButton>
                  </div>
                  <p className="body-copy-xs mt-3 text-center text-[var(--slate-400)]">
                    맞춤 세팅 포함 · Slack DM/채널/모달 지원 · 저장 후 이어보기
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.3}>
            <Card variant="tint" className="p-8 card-hover">
              <h2 className="text-xl font-bold text-[var(--slate-950)]">
                어떤 패키지가 우리 팀에 맞을지 unsure하신가요?
              </h2>
              <p className="mt-2 text-sm text-[var(--slate-600)]">
                회사 URL이나 현재 업무 상황을 보내주시면 적합한 패키지를 추천해드립니다
              </p>
              <div className="mt-6">
                <CTAButton href="/contact" className="btn-shine hover:scale-105 transition-transform">
                  데모 요청하기
                </CTAButton>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
