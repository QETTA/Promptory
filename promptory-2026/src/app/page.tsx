import { WebsiteDiagnosisMock } from "@/components/slack/slack-mock";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection, StaggerContainer, FadeIn } from "@/components/ui/animated-section";
import { PageContainer, PageSection } from "@/components/ui/page-container";
import { heroSection, layouts, gradients, animations, delays, withDelay } from "@/components/ui/patterns";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "프롬프토리 - 맞춤형 Slack Agent Package",
  description: "Slack에 URL을내면, 진단부터 실행 초안까지 팀 대화 안에서 끝납니다. 홈페이지, 랜딩, 문서 링크를 읽고 비교표, 카피 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다.",
};

export default function HomePage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <PageSection className={heroSection.container}>
        {/* Animated background elements */}
        <div className={heroSection.decoration}>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        </div>

        <PageContainer className={cn("py-12 sm:py-16 lg:py-28", heroSection.content.replace(layouts.centered, ""))}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left: Text */}
            <AnimatedSection direction="left" className="flex flex-col gap-5">
              <Badge className={cn("w-fit", animations.fadeInUp)}>Custom Slack Agent Package</Badge>
              <h1 className={cn("text-[1.75rem] font-bold leading-snug tracking-tight text-slate-950 sm:text-4xl lg:text-5xl word-break-keep", withDelay("fadeInUp", 1))}>
                Slack에 URL을 내면,
                <br />
                <span className="gradient-text">진단부터 실행 초안까지</span>&#8203;
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>팀 대화 안에서 끝납니다
              </h1>
              <p className={cn("text-sm leading-7 text-slate-600 sm:text-base max-w-xl", withDelay("fadeInUp", 2))}>
                프롬프토리는 홈페이지, 랜딩, 문서 링크를 읽고 몇 가지 질문으로 목표를 고정한 뒤 비교표, 카피 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다.
              </p>
              <div className={cn("flex flex-col sm:flex-row gap-3 pt-2", withDelay("fadeInUp", 3))}>
                <CTAButton href="/pricing" size="lg" className="btn-shine hover:scale-105 transition-transform w-full sm:w-auto justify-center">
                  가격 보기
                </CTAButton>
                <CTAButton href="/contact" variant="outline" size="lg" className="hover-lift w-full sm:w-auto justify-center">
                  데모 요청하기
                </CTAButton>
              </div>
              <p className={cn("text-xs text-slate-500 pt-1", withDelay("fadeInUp", 4))}>
                맞춤 세팅 · Slack DM/채널/모달 · 저장 후 이어보기
              </p>
            </AnimatedSection>

            {/* Right: Slack Mock */}
            <AnimatedSection direction="right" delay={0.3} className="flex justify-center lg:justify-end">
              <div className="animate-float w-full max-w-sm mx-auto lg:max-w-none" style={{ animationDuration: "4s" }}>
                <WebsiteDiagnosisMock />
              </div>
            </AnimatedSection>
          </div>
        </PageContainer>
      </PageSection>

      {/* Target Audience Section */}
      <PageSection className={layouts.section}>
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">Built for teams with too much to draft</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2 break-keep">
              자료는 많은데, 초안과 비교가 계속 밀리는 팀에게 맞습니다
            </h2>
          </AnimatedSection>

          <div className={cn(layouts.cardGrid, "md:grid-cols-2")}>
            <AnimatedSection delay={0.1}>
              <Card variant="strong" className="p-6 sm:p-8 card-hover h-full">
                <div className="flex flex-col gap-4 h-full">
                  <Badge variant="neutral">한국 B2B 중소기업 팀</Badge>
                  <p className="text-sm leading-7 text-slate-600">
                    홈페이지와 채널은 있는데
                    마케팅·기획 인력이 적어서
                    비교표, 카피 초안, 보고 정리가 자주 밀리는 팀
                  </p>
                  <div className="mt-auto pt-4">
                    <CTAButton href="/packages" variant="outline" size="sm" className="w-full hover:scale-[1.02] transition-transform">
                      중소기업용 패키지 보기
                    </CTAButton>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="strong" className="p-6 sm:p-8 card-hover h-full">
                <div className="flex flex-col gap-4 h-full">
                  <Badge variant="neutral">외국계 한국지사 팀</Badge>
                  <p className="text-sm leading-7 text-slate-600">
                    한국 시장용 채널 진단과
                    본사 공유용 KR/EN 정리를
                    동시에 빠르게 해야 하는 팀
                  </p>
                  <div className="mt-auto pt-4">
                    <CTAButton href="/packages/korea-local-ops-agent" variant="outline" size="sm" className="w-full hover:scale-[1.02] transition-transform">
                      외국계 팀용 패키지 보기
                    </CTAButton>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </PageContainer>
      </PageSection>

      {/* How It Works Section */}
      <PageSection className="py-14 sm:py-20 bg-slate-50">
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">How it works</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2 break-keep">
              설명보다 먼저, Slack 안에서 바로 일합니다
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "URL 또는 문서 입력",
                description: "홈페이지, 랜딩, 문서 링크를 Slack에 붙여 넣습니다",
                icon: "📎",
              },
              {
                step: "02",
                title: "질문으로 목표 고정",
                description: "문의, 구매, 콘텐츠, 보고 중 무엇이 급한지 짧게 확인합니다",
                icon: "🎯",
              },
              {
                step: "03",
                title: "실행 초안 생성",
                description: "비교표, 카피, 브리프, 보고용 요약이 바로 이어집니다",
                icon: "✨",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <Card variant="tint" className="p-6 card-hover h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-3xl font-bold text-blue-200">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Package Lineup Section */}
      <PageSection className="py-14 sm:py-20">
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">Agent packages</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2 break-keep">
              팀의 반복 업무에 맞춰 Slack 에이전트를 패키지로 붙입니다
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Website Diagnosis Agent",
                description: "사이트 URL을 읽고 핵심 병목, 경쟁사 비교, CTA 초안, 보고용 요약까지 만듭니다",
                footer: "사이트 진단 · 전환 문구 · 보고 초안",
                href: "/packages/website-diagnosis-agent",
                color: "blue",
                icon: "🔍",
              },
              {
                title: "Campaign Brief Agent",
                description: "회의 메모, 링크, 기존 자료를 바탕으로 브리프, 메시지 방향, 액션 리스트를 정리합니다",
                footer: "브리프 생성 · 카피 초안 · 실행 정리",
                href: "/packages/campaign-brief-agent",
                color: "emerald",
                icon: "📋",
              },
              {
                title: "Korea Local Ops Agent",
                description: "한국 채널을 진단하고 KR/EN summary와 HQ 공유용 action memo를 만듭니다",
                footer: "Korea scan · KR/EN summary · HQ memo",
                href: "/packages/korea-local-ops-agent",
                color: "indigo",
                icon: "🌏",
              },
            ].map((pkg, index) => (
              <AnimatedSection key={pkg.title} delay={index * 0.1}>
                <Card variant="strong" className="p-6 flex flex-col card-hover h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{pkg.icon}</span>
                    <h3 className="text-lg font-semibold text-slate-950">{pkg.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 flex-1">{pkg.description}</p>
                  <p className="mt-4 text-xs text-slate-500">{pkg.footer}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <CTAButton 
                      href={pkg.href} 
                      variant="outline" 
                      size="sm" 
                      className={`w-full hover:bg-${pkg.color}-50 hover:border-${pkg.color}-200 transition-all`}
                    >
                      상세 보기
                    </CTAButton>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Outputs Section */}
      <PageSection className="py-14 sm:py-20 bg-slate-50">
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">Outputs</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2 break-keep">
              대화가 끝나면 답변이 아니라 실행물이 남습니다
            </h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "경쟁사 비교표", icon: "📊" },
              { title: "전환 문구 초안", icon: "📝" },
              { title: "캠페인 브리프", icon: "📄" },
              { title: "팀장 보고용 요약", icon: "📑" },
              { title: "KR/EN executive summary", icon: "🌐" },
              { title: "다음 액션 체크리스트", icon: "✅" },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <Card variant="tint" className="p-4 flex items-center gap-3 card-hover">
                  <span className="text-xl">{item.icon}</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-slate-700">{item.title}</span>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Slack Surfaces Section */}
      <PageSection className="py-14 sm:py-20">
        <PageContainer>
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">Slack surfaces</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2 break-keep">
              대화는 메시지에서, 이어보기는 App Home에서, 입력은 모달에서 처리합니다
            </h2>
          </AnimatedSection>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Slack 메시지",
                description: "URL 입력, 1차 진단, 빠른 실행 버튼",
                icon: "💬",
              },
              {
                title: "모달",
                description: "목표, 결과 형식, 언어 옵션 입력",
                icon: "🪟",
              },
              {
                title: "스레드",
                description: "비교표, 초안, 요약 결과 공유",
                icon: "🧵",
              },
              {
                title: "App Home",
                description: "저장한 진단, 최근 작업, 다시 열기",
                icon: "🏠",
              },
            ].map((surface, index) => (
              <AnimatedSection key={surface.title} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover h-full">
                  <div className="text-3xl mb-3">{surface.icon}</div>
                  <h3 className="font-semibold text-slate-950">{surface.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{surface.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* FAQ Section */}
      <PageSection className="py-14 sm:py-20 bg-slate-50">
        <PageContainer size="narrow">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-wider text-blue-600 uppercase mb-3 px-3 py-1 bg-blue-50 rounded-full">FAQ</span>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl mt-2">자주 묻는 질문</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: "우리 팀 상황에 맞게 바꿀 수 있나요?",
                a: "네, 패키지 도입 시 팀의 입력물, 질문 흐름, 출력 형식을 맞춤 세팅합니다. 기본 패키지 구조는 유지하면서 팀에 맞게 조정됩니다.",
              },
              {
                q: "Slack 안에서만 써야 하나요?",
                a: "주요 흐름은 Slack 안에서 완료됩니다. 결과물은 필요시 웹에서도 확인할 수 있지만, 입력부터 출력까지 Slack에서 이어지는 것이 핵심입니다.",
              },
              {
                q: "결과물은 저장되나요?",
                a: "네, 모든 진단과 초안은 App Home에 자동 저장됩니다. 이전 작업을 다시 열어서 수정하거나 이어서 작업할 수 있습니다.",
              },
              {
                q: "영어 요약도 가능한가요?",
                a: "네, Korea Local Ops Agent를 포함한 모든 패키지에서 KR/EN 요약 옵션을 선택할 수 있습니다. HQ 공유용 EN executive summary도 함께 생성됩니다.",
              },
              {
                q: "도입 전에 샘플을 볼 수 있나요?",
                a: "네, 회사 URL이나 현재 쓰는 자료 예시를 보내주시면 실제 패키지 흐름으로 데모를 보여드립니다. /contact 페이지에서 요청하세요.",
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover">
                  <h3 className="font-semibold text-slate-950">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </PageContainer>
      </PageSection>

      {/* Final CTA Section */}
      <PageSection className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/50" />
        <PageContainer size="narrow" className="relative text-center">
          <AnimatedSection>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl lg:text-3xl break-keep">
              우리 팀 Slack에 맞는 에이전트 패키지 데모를 받아보세요
            </h2>
            <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              회사 사이트나 채널 URL을 보내주시면 프롬프토리 방식으로 실제 진단 예시를 보여드립니다
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
              <CTAButton href="/pricing" size="lg" className="btn-shine hover:scale-105 transition-transform w-full sm:w-auto justify-center">
                가격 보기
              </CTAButton>
              <CTAButton href="/contact?type=quick_audit" variant="outline" size="lg" className="hover-lift w-full sm:w-auto justify-center">
                무료 Quick Audit 받기
              </CTAButton>
            </div>
          </AnimatedSection>
        </PageContainer>
      </PageSection>
    </div>
  );
}
