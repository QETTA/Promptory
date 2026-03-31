import { CampaignBriefMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection, Accordion } from "@/components/ui/animated-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Brief Agent - 프롬프토리",
  description: "회의 메모와 링크를 Slack에내면, 브리프와 실행 정리가 바로 이어집니다. 캠페인 브리프, 카피 초안, 액션 리스트를 Slack 안에서 만듭니다.",
};

export default function CampaignBriefAgentPage() {
  const faqItems = [
    {
      title: "어떤 자료를 입력할 수 있나요?",
      content: "회의 메모, 참고 링크, 노션 문서, 기존 캠페인 자료 등 텍스트 기반 자료면 됩니다. 여러 자료를 한꺼번에 보내주시면 종합해서 분석합니다.",
    },
    {
      title: "브리프 형식은 바꿀 수 있나요?",
      content: "네, 팀의 브리프 템플릿에 맞게 출력 형식을 맞춤 세팅합니다. 기본 제공되는 형식 외에도 원하는 구조로 조정 가능합니다.",
    },
    {
      title: "생성된 카피는 수정할 수 있나요?",
      content: "네, Slack 스레드에서 바로 수정 요청을 할 수 있습니다. '더 짧게', '더 공식적으로', '톤 바꿔줘' 등의 피드백을 주시면 반영됩니다.",
    },
    {
      title: "여러 캠페인 버전을 관리할 수 있나요?",
      content: "네, App Home에서 이전 브리프와 카피 초안을 확인하고 버전별로 비교할 수 있습니다. 승인 플로우 연동도 옵션으로 제공됩니다.",
    },
    {
      title: "도입 전 샘플을 볼 수 있나요?",
      content: "네, 회의 메모나 참고 자료 예시를 보내주시면 실제 Campaign Brief Agent 흐름으로 데모를 보여드립니다. /contact 페이지에서 요청하세요.",
    },
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection direction="left" className="flex flex-col gap-6">
              <Badge className="w-fit bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">Campaign Brief Agent</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                회의 메모와 링크를 Slack에내면,
                <br />
                <span className="gradient-text-emerald">브리프와 실행 정리</span>가
                <br />
                바로 이어집니다
              </h1>
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                기존 자료, 회의 메모, 참고 링크를 읽고
                캠페인 방향을 정리한 뒤
                핵심 메시지, 카피 초안, 액션 리스트까지 Slack 안에서 이어서 만듭니다
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact" size="lg" className="btn-shine hover:scale-105 transition-transform bg-emerald-600 hover:bg-emerald-700">
                  데모 요청하기
                </CTAButton>
                <CTAButton href="/demo/slack" variant="outline" size="lg" className="hover-lift border-emerald-200 hover:bg-emerald-50">
                  샘플 대화 보기
                </CTAButton>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Slack DM · 모달 · App Home · 맞춤 세팅
              </p>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2} className="flex justify-center lg:justify-end">
              <div className="animate-float" style={{ animationDuration: "4s" }}>
                <CampaignBriefMock />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">Best fit</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">이런 팀에게 맞습니다</h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="tint" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">✓</span>
                  이런 상황에 빠르게 체감됩니다
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "회의는 끝났는데 브리프 정리가 늦어지는 팀",
                    "캠페인 방향은 있는데 메시지 초안이 비는 팀",
                    "팀장 보고와 실무 액션 분리를 동시에 해야 하는 팀",
                    "자료는 많은데 핵심을 정리할 인력이 부족한 팀",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="tint" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="text-slate-400 text-lg">×</span>
                  Not for everyone
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "내부 캠페인 관리 시스템이 이미 갖춰진 대규모 조직",
                    "외부 에이전시와의 모든 커뮤니케이션이 정해진 조직",
                    "창의적 컨셉 단계부터 외부와 함께 하는 팀",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">−</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works in Slack Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">In Slack</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">링크 하나로 시작해서, 결과 공유까지 Slack 안에서 이어집니다</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "메시지에서 입력", desc: "회의 메모, 링크, 자료를 보냅니다", icon: "📝" },
              { step: "2", title: "모달에서 목표 고정", desc: "리드, 구매, 인지 등 캠페인 목표를 확인합니다", icon: "🎯" },
              { step: "3", title: "스레드에서 결과 생성", desc: "브리프, 메시지, 액션 리스트를 공유합니다", icon: "📋" },
              { step: "4", title: "App Home에서 다시 열기", desc: "저장된 브리프와 버전 히스토리를 봅니다", icon: "🏠" },
            ].map((s, index) => (
              <AnimatedSection key={s.step} delay={index * 0.1}>
                <Card variant="strong" className="p-5 card-hover h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-2xl font-bold text-emerald-200">{s.step}</span>
                  </div>
                  <h3 className="font-semibold text-slate-950">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Outputs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">Outputs</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">이 패키지가 내놓는 결과물</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "캠페인 브리프", desc: "목표, 타겟, 메시지 방향, 채널이 정리된 1페이지 브리프", icon: "📄" },
              { title: "핵심 메시지 정리", desc: "주요 메시지 3가지와 각각의 근거", icon: "💡" },
              { title: "카피 초안", desc: "헤드라인, 서브카피, CTA 문구 초안", icon: "✍️" },
              { title: "실행 액션 리스트", desc: "채널별 실행 항목과 담당/일정 가이드", icon: "✅" },
              { title: "보고용 요약", desc: "팀장/대표 보고용 캠페인 개요", icon: "📊" },
            ].map((output, index) => (
              <AnimatedSection key={output.title} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{output.icon}</span>
                    <h3 className="font-semibold text-slate-950">{output.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{output.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Example Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">Conversation</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">실제 대화 예시</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card variant="strong" className="p-6 shadow-lg">
              <div className="space-y-6">
                <div className="flex gap-3 animate-slide-in">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm">U</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">사용자</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">회의 메모랑 참고 랜딩 2개 보낼게요</p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A154B] to-[#611f63] flex items-center justify-center text-sm font-bold text-white shadow-sm">P</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4A154B]">Promptory Agent</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">
                      확인했어요.<br />
                      지금은 캠페인 방향은 있는데 메시지 우선순위가 섞여 있어요.<br />
                      리드 확보 기준으로 다시 정리할까요?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm">U</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">사용자</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">네, 이번 목적은 리드예요.</p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A154B] to-[#611f63] flex items-center justify-center text-sm font-bold text-white shadow-sm">P</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4A154B]">Promptory Agent</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">
                      좋아요.<br />
                      브리프는 리드 확보 기준으로 다시 정리하고<br />
                      핵심 메시지 3개와 CTA 초안까지 같이 만들게요.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["브리프 만들기", "카피 초안", "팀장 보고용 요약"].map((btn) => (
                        <span key={btn} className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer">
                          {btn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Rollout Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">Rollout</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "주요 입력물 형식 정의",
              "캠페인 유형별 질문 플로우 설정",
              "브리프/카피 출력 형식 정의",
              "팀 공유 채널 연결",
              "버전 관리 방식 설정",
              "승인 플로우 연결 (옵션)",
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <Card variant="tint" className="p-4 flex items-center gap-3 card-hover">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">What's included</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">기본 패키지와 맞춤 세팅 범위</h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                  Included
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "Slack 기본 인터랙션 설계",
                    "캠페인 목표별 질문 플로우",
                    "브리프/카피/액션리스트 출력 포맷",
                    "기본 App Home 구조",
                    "초기 운영 가이드",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">+</span>
                  Optional
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "승인 플로우 연동",
                    "버전 히스토리 관리",
                    "팀 전용 템플릿 추가",
                    "후속 자동화 연결",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-500">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust Boundary Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold text-emerald-600 mb-2">Trust boundary</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다</h2>
            <p className="mt-4 text-base text-slate-600 leading-7">
              초기 진단은 회의 메모와 공개 자료 중심으로 시작합니다.
              이후 더 정교한 브리프가 필요할 때만 질문과 설정을 추가합니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">FAQ</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">자주 묻는 질문</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Accordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/80" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl lg:text-4xl">
              다음 캠페인 회의 메모를 브리프 초안으로 바로 바꿔보세요
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              회의 메모나 참고 자료를 보내주시면
              실제 Campaign Brief Agent 흐름으로 데모를 보여드립니다
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton href="/contact" size="lg" className="btn-shine hover:scale-105 transition-transform bg-emerald-600 hover:bg-emerald-700">
                데모 요청하기
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg" className="hover-lift border-emerald-200 hover:bg-emerald-50">
                샘플 보내기
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}