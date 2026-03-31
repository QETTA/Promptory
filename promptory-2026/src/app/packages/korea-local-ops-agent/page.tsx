import { KoreaLocalOpsMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { PriceBadge } from "@/components/ui/price-badge";
import { AnimatedSection, Accordion } from "@/components/ui/animated-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korea Local Ops Agent - 프롬프토리",
  description: "한국 채널 진단과 HQ 공유용 요약을 Slack 안에서 한 흐름으로 정리합니다. Korea competitor scan, KR/EN summary, HQ action memo.",
};

export default function KoreaLocalOpsAgentPage() {
  const faqItems = [
    {
      title: "어떤 한국 채널을 분석할 수 있나요?",
      content: "홈페이지, 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 특정 경쟁사를 지정하시면 해당 채널과의 비교도 포함됩니다.",
    },
    {
      title: "KR/EN summary는 동시에 생성되나요?",
      content: "네, 한국 채널 진단 후 KR summary와 EN executive summary를 한 흐름으로 생성합니다. HQ 보고용과 한국팀 내부용을 모두 준비할 수 있습니다.",
    },
    {
      title: "HQ action memo는 어떤 내용이 들어가나요?",
      content: "한국 시장 진단 결과, 본사 결정/지원이 필요한 사항, 권장 액션 아이템이 포함됩니다. 본사의 리소스 할당 결정을 돕는 내용 중심으로 정리합니다.",
    },
    {
      title: "경쟁사는 어떤 기준으로 선정하나요?",
      content: "기본적으로는 동일 카테고리/산업의 주요 한국 플레이어를 기준으로 합니다. 특정 경쟁사를 지정하시면 해당 채널과의 비교를 추가합니다.",
    },
    {
      title: "도입 전 샘플을 볼 수 있나요?",
      content: "네, 한국 사이트 URL이나 채널 링크를 보내주시면 Korea Local Ops Agent 흐름으로 실제 KR/EN 데모를 보여드립니다. /contact 페이지에서 요청하세요.",
    },
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection direction="left" className="flex flex-col gap-6">
              <Badge className="w-fit bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">Korea Local Ops Agent</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                한국 채널 진단과
                <br />
                <span className="gradient-text-indigo">HQ 공유용 요약</span>을
                <br />
                Slack 안에서 한 흐름으로
              </h1>
              <p className="text-base leading-7 text-slate-600 sm:text-lg">
                한국 웹사이트와 채널을 읽고
                로컬 시장 기준 병목을 짚은 뒤
                Korea competitor scan, KR/EN summary, HQ 공유용 action memo까지 Slack 안에서 이어서 만듭니다
              </p>
              {/* Pricing Info */}
              <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-slate-200/60">
                <PriceBadge price="₩79만/월" setupPrice="세팅비 ₩300~500만 (일회성)" />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton 
                  href="/contact?type=package&slug=korea-local-ops-agent" 
                  size="lg" 
                  className="btn-shine hover:scale-105 transition-transform bg-indigo-600 hover:bg-indigo-700"
                  telemetryEventName="package_estimate_clicked"
                  telemetryPayload={{ package: "korea-local-ops-agent", location: "hero" }}
                >
                  견적 요청하기
                </CTAButton>
                <CTAButton href="/demo/slack" variant="outline" size="lg" className="hover-lift border-indigo-200 hover:bg-indigo-50">
                  샘플 대화 보기
                </CTAButton>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Slack DM · 모달 · App Home · KR/EN 옵션 · 맞춤 세팅 · Core Package 기준
              </p>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2} className="flex justify-center lg:justify-end">
              <div className="animate-float" style={{ animationDuration: "4s" }}>
                <KoreaLocalOpsMock />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Best fit</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">이런 팀에게 맞습니다</h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="tint" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="text-indigo-500 text-lg">✓</span>
                  이런 상황에 빠르게 체감됩니다
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "한국 시장 담당 인력이 적은 외국계 한국지사",
                    "본사 공유용 요약까지 동시에 정리해야 하는 팀",
                    "현지 경쟁사와 채널 메시지를 빨리 파악해야 하는 팀",
                    "KR/EN bilingual 문서 작성이 반복되는 팀",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-0.5">→</span>
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
                    "한국 시장 진단을 외부 리서치사에 위임하는 조직",
                    "본사와의 모든 커뮤니케이션이 이미 정해진 절차로 진행되는 조직",
                    "한국 시장만의 독립적인 전략 수립이 어려운 구조",
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
            <p className="text-sm font-semibold text-indigo-600 mb-2">In Slack</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">링크 하나로 시작해서, KR/EN 요약까지 Slack 안에서 이어집니다</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "메시지에서 입력", desc: "한국 사이트 URL, 채널 링크를 보냅니다", icon: "💬" },
              { step: "2", title: "모달에서 목표 고정", desc: "KR only 또는 KR/EN 옵션, 보고 방식을 선택합니다", icon: "🌐" },
              { step: "3", title: "스레드에서 결과 생성", desc: "Korea scan, KR/EN summary를 공유합니다", icon: "📊" },
              { step: "4", title: "App Home에서 관리", desc: "HQ 보고용 파일과 히스토리를 관리합니다", icon: "🏠" },
            ].map((s, index) => (
              <AnimatedSection key={s.step} delay={index * 0.1}>
                <Card variant="strong" className="p-5 card-hover h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-2xl font-bold text-indigo-200">{s.step}</span>
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
            <p className="text-sm font-semibold text-indigo-600 mb-2">Outputs</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">이 패키지가 내놓는 결과물</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "한국 채널 진단", desc: "한국 시장용 메시지, CTA, 페이지 구조 진단", icon: "🇰🇷" },
              { title: "Korea competitor scan", desc: "주요 경쟁사 채널과의 메시지/포지셔닝 비교", icon: "🔍" },
              { title: "KR summary", desc: "한국 팀 내부용 상세 진단 요약", icon: "📝" },
              { title: "EN executive summary", desc: "본사 보고용 1페이지 영문 요약", icon: "📄" },
              { title: "HQ action memo", desc: "본사 결정/지원이 필요한 액션 리스트", icon: "✅" },
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

      {/* Bilingual Support Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Bilingual Support</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">KR과 EN, 한 흐름으로 모두 생성</h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <Badge className="mb-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">KR Summary</Badge>
                <p className="text-sm text-slate-600 leading-6">
                  한국 팀 내부 검토용 상세 진단. 채널별 병목, 경쟁사 비교, 
                  실행 제안을 한국 시장 맥락에 맞게 상세히 정리합니다.
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <Badge className="mb-3 bg-indigo-600">EN Executive Summary</Badge>
                <p className="text-sm text-slate-600 leading-6">
                  본사 리더십 보고용 1페이지 요약. 한국 시장 상황, 
                  주요 인사이트, HQ 지원 필요 사항을 영문으로 간결히 정리합니다.
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Conversation Example Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Conversation</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">실제 대화 예시</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Card variant="strong" className="p-6 shadow-lg">
              <div className="space-y-6">
                <div className="flex gap-3 animate-slide-in">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm">U</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">사용자</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">한국 사이트 URL 보낼게요</p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "100ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A154B] to-[#611f63] flex items-center justify-center text-sm font-bold text-white shadow-sm">P</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4A154B]">Promptory Agent</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">
                      사이트를 확인했어요.<br />
                      제품 정보는 충분하지만 한국 시장용 메시지와 CTA는 약한 편입니다.<br />
                      HQ 보고용 요약도 같이 만들까요?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm">U</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">사용자</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">네, KR/EN 둘 다 필요해요.</p>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-in" style={{ animationDelay: "300ms" }}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A154B] to-[#611f63] flex items-center justify-center text-sm font-bold text-white shadow-sm">P</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4A154B]">Promptory Agent</p>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-lg px-3 py-2 inline-block">
                      좋아요.<br />
                      한국 채널 기준 진단과 경쟁사 스캔을 먼저 정리한 뒤<br />
                      KR/EN summary로 이어서 만들게요.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Korea scan", "KR summary", "EN summary"].map((btn) => (
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
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Rollout</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "한국 주요 채널/입력물 정의",
              "KR/EN 출력 형식 및 템플릿 설정",
              "HQ 보고 방식 및 주기 정의",
              "한국팀-HQ 공유 플로우 설정",
              "경쟁사 모니터링 대상 설정",
              "승인 및 버전 관리 설정",
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <Card variant="tint" className="p-4 flex items-center gap-3 card-hover">
                  <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 text-sm font-bold flex items-center justify-center flex-shrink-0">
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
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">What's included</p>
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
                    "한국 시장 진단 질문 플로우",
                    "KR/EN summary 출력 포맷",
                    "HQ action memo 기본 구조",
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
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">+</span>
                  Optional
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    "특정 경쟁사 모니터링",
                    "HQ 보고 주기/템플릿 커스텀",
                    "KR/EN 출력 비율 조정",
                    "본사 승인 플로우 연동",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-indigo-500">−</span>
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
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold text-indigo-600 mb-2">Trust boundary</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다</h2>
            <p className="mt-4 text-base text-slate-600 leading-7">
              초기 진단은 한국 사이트와 공개 채널 중심으로 시작합니다.
              이후 HQ 보고나 경쟁사 분석이 필요할 때만 깊이를 추가합니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">FAQ</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">자주 묻는 질문</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Accordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-slate-50 to-purple-50/80" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl lg:text-4xl">
              한국 채널 기준의 첫 진단과 HQ 공유용 예시를 먼저 받아보세요
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              한국 사이트 URL이나 채널 링크를 보내주시면
              Korea Local Ops Agent 흐름으로 실제 KR/EN 데모를 보여드립니다
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton 
                href="/contact?type=quick_audit" 
                size="lg" 
                className="btn-shine hover:scale-105 transition-transform bg-indigo-600 hover:bg-indigo-700"
                telemetryEventName="quick_audit_clicked"
                telemetryPayload={{ location: "package_detail_bottom" }}
              >
                무료 Quick Audit 받기
              </CTAButton>
              <CTAButton 
                href="/contact?type=package&slug=korea-local-ops-agent" 
                variant="outline" 
                size="lg" 
                className="hover-lift border-indigo-200 hover:bg-indigo-50"
                telemetryEventName="package_estimate_clicked"
                telemetryPayload={{ package: "korea-local-ops-agent", location: "bottom" }}
              >
                견적 요청하기
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}