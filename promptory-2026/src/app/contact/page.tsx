import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "데모 요청 / 문의 - 프롬프토리",
  description: "우리 팀 Slack에 맞는 에이전트 패키지 데모를 받아보세요. 회사 URL을 보내주시면 실제 진단 예시를 보여드립니다.",
};

export default function ContactPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge className="mb-4">Contact</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              우리 팀 Slack에 맞는
              <br />
              <span className="gradient-text">에이전트 패키지 데모</span>를 받아보세요
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              회사 사이트나 채널 URL을 보내주시면
              프롬프토리 방식으로 실제 진단 예시를 보여드립니다
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Demo Request Card */}
            <AnimatedSection delay={0.1}>
              <Card variant="strong" className="p-6 sm:p-8 card-hover h-full">
                <div className="flex flex-col gap-4 h-full">
                  <Badge>Demo Request</Badge>
                  <h2 className="text-xl font-bold text-slate-950">URL로 데모 요청하기</h2>
                  <p className="text-sm text-slate-600 leading-6 flex-1">
                    회사 홈페이지 URL, 랜딩 페이지, 또는 현재 운영 중인 채널 링크를 보내주세요.
                    해당 URL을 기준으로 실제 패키지 흐름으로 진단 예시를 만들어드립니다.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@promptory.kr?subject=데모 요청 - [회사명]&body=안녕하세요,%0D%0A%0D%0A회사 URL: [URL을 입력해주세요]%0D%0A%0D%0A팀 상황:%0D%0A- 팀 규모:%0D%0A- 주요 고민:%0D%0A- 관심 패키지: (Website Diagnosis / Campaign Brief / Korea Local Ops)%0D%0A%0D%0A감사합니다."
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all hover:scale-[1.02] btn-shine"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      이메일로 데모 요청
                    </a>
                    <p className="text-xs text-slate-500 text-center">
                      또는 hello@promptory.kr로 직접 이메일 보내주세요
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* General Inquiry Card */}
            <AnimatedSection delay={0.2}>
              <Card variant="tint" className="p-6 sm:p-8 card-hover h-full">
                <div className="flex flex-col gap-4 h-full">
                  <Badge variant="neutral">General Inquiry</Badge>
                  <h2 className="text-xl font-bold text-slate-950">일반 문의하기</h2>
                  <p className="text-sm text-slate-600 leading-6 flex-1">
                    패키지 구성, 도입 절차, 맞춤 세팅 범위 등에 대해 궁금한 점이 있으시면
                    언제든 문의해주세요.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@promptory.kr?subject=프롬프토리 문의"
                      className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      문의 이메일 보내기
                    </a>
                    <p className="text-xs text-slate-500 text-center">
                      평일 24시간 내 답변드립니다
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <p className="text-sm font-semibold text-blue-600 mb-2">What to expect</p>
            <h2 className="text-xl font-bold text-slate-950">데모 요청 후 과정</h2>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { step: "01", title: "URL 수신", desc: "보내주신 URL로 실제 패키지 흐름 테스트", icon: "📥" },
              { step: "02", title: "데모 준비", desc: "해당 URL 기준 진단 예시 및 결과물 샘플 준비 (영업일 1-2일)", icon: "⚙️" },
              { step: "03", title: "온라인 미팅", desc: "화면 공유로 Slack 흐름과 결과물 설명 (30분)", icon: "💻" },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.15}>
                <Card variant="strong" className="p-5 card-hover text-center h-full">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <span className="text-2xl font-bold text-blue-200">{item.step}</span>
                  <h3 className="mt-3 font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.2}>
            <Card variant="tint" className="p-6 card-hover">
              <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                데모 요청 시 포함하면 좋은 정보
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  { text: "홈페이지 또는 주요 채널 URL", icon: "🔗" },
                  { text: "팀 규모와 주요 업무 (마케팅/기획/운영 등)", icon: "👥" },
                  { text: "현재 겪고 있는 가장 큰 고민 (브리프 작성/보고 정리/경쟁사 분석 등)", icon: "🎯" },
                  { text: "관심 있는 패키지 (Website Diagnosis / Campaign Brief / Korea Local Ops)", icon: "📦" },
                  { text: "Slack 워크스페이스 사용 여부", icon: "💬" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <p className="text-sm font-semibold text-blue-600 mb-2">FAQ</p>
            <h2 className="text-xl font-bold text-slate-950">자주 묻는 질문</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: "데모는 무료인가요?",
                a: "네, URL 기준 진단 예시와 Slack 흐름 데모는 무료로 제공됩니다. 실제 패키지 도입 시 맞춤 세팅 비용은 별도로 안내드립니다.",
              },
              {
                q: "어떤 URL을내면 되나요?",
                a: "회사 홈페이지, 서비스 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 여러 URL을 함께 보내주셔도 좋습니다.",
              },
              {
                q: "Slack이 없으면 어떻게 하나요?",
                a: "프롬프토리는 Slack 기반으로 설계되었습니다. 데모는 웹에서 보여드리지만, 실제 사용을 위해서는 Slack 워크스페이스가 필요합니다.",
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover">
                  <h3 className="font-semibold text-slate-950 flex items-center gap-2">
                    <span className="text-blue-500">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 pl-5">{faq.a}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <CTAButton href="/packages" size="lg" variant="outline" className="hover-lift">
              패키지 목록 보기
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}