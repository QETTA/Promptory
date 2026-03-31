import { WebsiteDiagnosisMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Diagnosis Agent - 프롬프토리",
  description: "Slack에 사이트 URL을내면, 병목 진단과 실행 초안이 바로 이어집니다. 핵심 병목, 경쟁사 비교, CTA 초안, 보고용 요약까지 Slack 안에서 만듭니다.",
};

export default function WebsiteDiagnosisAgentPage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <Badge className="w-fit">Website Diagnosis Agent</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Slack에 사이트 URL을내면,
                <br />
                <span className="text-blue-600">병목 진단과 실행 초안</span>이
                <br />
                바로 이어집니다
              </h1>
              <p className="text-base leading-7 text-slate-600">
                회사 홈페이지나 랜딩 URL을 읽고
                핵심 전환 병목을 짚은 뒤
                경쟁사 비교, CTA 문구 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact" size="lg">
                  데모 요청하기
                </CTAButton>
                <CTAButton href="/demo/slack" variant="outline" size="lg">
                  샘플 대화 보기
                </CTAButton>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Slack DM · 모달 · App Home · 맞춤 세팅
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <WebsiteDiagnosisMock />
            </div>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">Best fit</p>
            <h2 className="text-2xl font-bold text-slate-950">이런 팀에게 맞습니다</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">이런 상황에 빠르게 체감됩니다</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "홈페이지/자료는 있는데 비교와 초안이 자주 밀리는 팀",
                  "Slack 안에서 바로 결과를 보고 공유하고 싶은 팀",
                  "도입 전에 결과 예시를 먼저 보고 싶은 팀",
                  "범용 AI보다 특정 업무 패키지를 원하는 팀",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">Not for everyone</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "자체 사내 시스템 연동이 핵심인 대규모 엔터프라이즈",
                  "정교한 내부 보안 승인 절차가 먼저 필요한 조직",
                  "범용 업무비서 전체를 원하는 팀",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works in Slack Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">In Slack</p>
            <h2 className="text-2xl font-bold text-slate-950">링크 하나로 시작해서, 결과 공유까지 Slack 안에서 이어집니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "메시지에서 입력", desc: "URL, 문서, 메모를 보냅니다" },
              { step: "2", title: "모달에서 목표 고정", desc: "문의, 구매, 보고, 캠페인 등 목적을 확인합니다" },
              { step: "3", title: "스레드에서 결과 생성", desc: "비교표, 초안, 요약을 팀과 바로 공유합니다" },
              { step: "4", title: "App Home에서 다시 열기", desc: "저장된 작업과 최근 실행 결과를 이어서 봅니다" },
            ].map((s) => (
              <Card key={s.step} variant="strong" className="p-5">
                <span className="text-2xl font-bold text-blue-200">{s.step}</span>
                <h3 className="mt-2 font-semibold text-slate-950">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outputs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">Outputs</p>
            <h2 className="text-2xl font-bold text-slate-950">이 패키지가 내놓는 결과물</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "핵심 병목 진단", desc: "사이트 구조와 메시지에서 전환을 방해하는 핵심 병목 3가지" },
              { title: "경쟁사 비교표", desc: "동일 시장/카테고리 경쟁사와의 메시지 및 CTA 비교" },
              { title: "실행 초안", desc: "CTA 문구, 헤드라인 초안, 페이지 구조 제안" },
              { title: "내부 공유용 요약", desc: "팀장/대표 보고용 1페이지 요약" },
            ].map((output) => (
              <Card key={output.title} variant="tint" className="p-5">
                <h3 className="font-semibold text-slate-950">{output.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{output.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Example Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">Conversation</p>
            <h2 className="text-2xl font-bold text-slate-950">실제 대화 예시</h2>
          </div>

          <Card variant="strong" className="p-6">
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">
                    <span className="text-blue-600 underline">https://회사사이트URL</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    사이트로 인식했어요.<br />
                    지금은 유입보다 문의 전환 장치가 약합니다.<br />
                    문의 기준으로 다시 볼까요?
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">네, 문의가 목표예요.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    좋아요.<br />
                    현재 병목은 상단 신뢰 요소 부족, CTA 위치 문제, 메시지 분산입니다.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["경쟁사 비교", "CTA 초안", "보고용 요약"].map((btn) => (
                      <span key={btn} className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700">
                        {btn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Rollout Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">Rollout</p>
            <h2 className="text-2xl font-bold text-slate-950">패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "주요 입력물 정의",
              "질문 플로우 설정",
              "출력 형식 정의",
              "공유 채널/DM 흐름 설정",
              "KR only 또는 KR/EN 옵션 설정",
              "저장/이어보기 구조 설정",
            ].map((item, i) => (
              <Card key={i} variant="tint" className="p-4 flex items-center gap-3">
                <span className="text-xs font-bold text-blue-500">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm text-slate-700">{item}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">What's included</p>
            <h2 className="text-2xl font-bold text-slate-950">기본 패키지와 맞춤 세팅 범위</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="strong" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">Included</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  "Slack 기본 인터랙션 설계",
                  "핵심 질문 플로우",
                  "결과물 포맷",
                  "기본 App Home 구조",
                  "초기 운영 가이드",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="strong" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">Optional</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  "KR/EN summary",
                  "패키지별 추가 출력 형식",
                  "팀 전용 공유 플로우",
                  "후속 자동화 연결",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-blue-500">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Boundary Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 mb-2">Trust boundary</p>
          <h2 className="text-2xl font-bold text-slate-950">처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다</h2>
          <p className="mt-4 text-sm text-slate-600 leading-6">
            초기 진단은 링크와 공개 표면 중심으로 시작합니다.
            이후 더 깊은 결과물이 필요할 때만 질문과 설정을 추가합니다.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 mb-2">FAQ</p>
            <h2 className="text-2xl font-bold text-slate-950">자주 묻는 질문</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "어떤 사이트 URL을 보낼 수 있나요?",
                a: "홈페이지, 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 비밀번호가 걸린 페이지는 접근이 제한됩니다.",
              },
              {
                q: "경쟁사 비교는 어떤 기준으로 하나요?",
                a: "같은 산업/카테고리에서 공개된 메시지, CTA, 페이지 구조를 중심으로 비교합니다. 희망하시는 특정 경쟁사가 있으면 미리 알려주세요.",
              },
              {
                q: "결과물은 수정할 수 있나요?",
                a: "네, 생성된 초안은 스레드에서 바로 수정 요청을 할 수 있습니다. '더 간결하게', '더 공식적으로' 등의 피드백을 주시면 반영됩니다.",
              },
            ].map((faq, index) => (
              <Card key={index} variant="tint" className="p-5">
                <h3 className="font-semibold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            우리 사이트 기준으로 먼저 진단 예시를 받아보세요
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            회사 URL이나 현재 쓰는 자료 예시를 보내주시면
            실제 패키지 흐름으로 데모를 보여드립니다
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              데모 요청하기
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              회사 URL 보내기
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
