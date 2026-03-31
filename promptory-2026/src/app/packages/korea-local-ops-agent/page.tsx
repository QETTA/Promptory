import { KoreaLocalOpsMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korea Local Ops Agent - 프롬프토리",
  description: "한국 채널 진단과 HQ 공유용 요약을 Slack 안에서 한 흐름으로 정리합니다. Korea competitor scan, KR/EN summary, HQ action memo.",
};

export default function KoreaLocalOpsAgentPage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <Badge className="w-fit bg-indigo-600 hover:bg-indigo-700">Korea Local Ops Agent</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                한국 채널 진단과
                <br />
                <span className="text-indigo-600">HQ 공유용 요약</span>을
                <br />
                Slack 안에서 한 흐름으로
              </h1>
              <p className="text-base leading-7 text-slate-600">
                한국 웹사이트와 채널을 읽고
                로컬 시장 기준 병목을 짚은 뒤
                Korea competitor scan, KR/EN summary, HQ 공유용 action memo까지 Slack 안에서 이어서 만듭니다
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
                Slack DM · 모달 · App Home · KR/EN 옵션 · 맞춤 세팅
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <KoreaLocalOpsMock />
            </div>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Best fit</p>
            <h2 className="text-2xl font-bold text-slate-950">이런 팀에게 맞습니다</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">이런 상황에 빠르게 체감됩니다</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "한국 시장 담당 인력이 적은 외국계 한국지사",
                  "본사 공유용 요약까지 동시에 정리해야 하는 팀",
                  "현지 경쟁사와 채널 메시지를 빨리 파악해야 하는 팀",
                  "KR/EN bilingual 문서 작성이 반복되는 팀",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">Not for everyone</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "한국 시장 진단을 외부 리서치사에 위임하는 조직",
                  "본사와의 모든 커뮤니케이션이 이미 정해진 절차로 진행되는 조직",
                  "한국 시장만의 독립적인 전략 수립이 어려운 구조",
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
            <p className="text-sm font-semibold text-indigo-600 mb-2">In Slack</p>
            <h2 className="text-2xl font-bold text-slate-950">링크 하나로 시작해서, KR/EN 요약까지 Slack 안에서 이어집니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "메시지에서 입력", desc: "한국 사이트 URL, 채널 링크를 보냅니다" },
              { step: "2", title: "모달에서 목표 고정", desc: "KR only 또는 KR/EN 옵션, 보고 방식을 선택합니다" },
              { step: "3", title: "스레드에서 결과 생성", desc: "Korea scan, KR/EN summary를 공유합니다" },
              { step: "4", title: "App Home에서 관리", desc: "HQ 보고용 파일과 히스토리를 관리합니다" },
            ].map((s) => (
              <Card key={s.step} variant="strong" className="p-5">
                <span className="text-2xl font-bold text-indigo-200">{s.step}</span>
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
            <p className="text-sm font-semibold text-indigo-600 mb-2">Outputs</p>
            <h2 className="text-2xl font-bold text-slate-950">이 패키지가 내놓는 결과물</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "한국 채널 진단", desc: "한국 시장용 메시지, CTA, 페이지 구조 진단" },
              { title: "Korea competitor scan", desc: "주요 경쟁사 채널과의 메시지/포지셔닝 비교" },
              { title: "KR summary", desc: "한국 팀 내부용 상세 진단 요약" },
              { title: "EN executive summary", desc: "본사 보고용 1페이지 영문 요약" },
              { title: "HQ action memo", desc: "본사 결정/지원이 필요한 액션 리스트" },
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
            <p className="text-sm font-semibold text-indigo-600 mb-2">Conversation</p>
            <h2 className="text-2xl font-bold text-slate-950">실제 대화 예시</h2>
          </div>

          <Card variant="strong" className="p-6">
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">한국 사이트 URL 보낼게요</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    사이트를 확인했어요.<br />
                    제품 정보는 충분하지만 한국 시장용 메시지와 CTA는 약한 편입니다.<br />
                    HQ 보고용 요약도 같이 만들까요?
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">네, KR/EN 둘 다 필요해요.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    좋아요.<br />
                    한국 채널 기준 진단과 경쟁사 스캔을 먼저 정리한 뒤<br />
                    KR/EN summary로 이어서 만들게요.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Korea scan", "KR summary", "EN summary"].map((btn) => (
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

      {/* KR/EN Feature Highlight */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Bilingual Support</p>
            <h2 className="text-2xl font-bold text-slate-950">KR과 EN, 한 흐름으로 모두 생성</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="strong" className="p-6">
              <Badge className="mb-3">KR Summary</Badge>
              <p className="text-sm text-slate-600 leading-6">
                한국 팀 내부 검토용 상세 진단. 채널별 병목, 경쟁사 비교, 
                실행 제안을 한국 시장 맥락에 맞게 상세히 정리합니다.
              </p>
            </Card>

            <Card variant="strong" className="p-6">
              <Badge className="mb-3 bg-indigo-600">EN Executive Summary</Badge>
              <p className="text-sm text-slate-600 leading-6">
                본사 리더십 보고용 1페이지 요약. 한국 시장 상황, 
                주요 인사이트, HQ 지원 필요 사항을 영문으로 간결히 정리합니다.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Rollout Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-2">Rollout</p>
            <h2 className="text-2xl font-bold text-slate-950">패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "한국 주요 채널/입력물 정의",
              "KR/EN 출력 형식 및 템플릿 설정",
              "HQ 보고 방식 및 주기 정의",
              "한국팀-HQ 공유 플로우 설정",
              "경쟁사 모니터링 대상 설정",
              "승인 및 버전 관리 설정",
            ].map((item, i) => (
              <Card key={i} variant="tint" className="p-4 flex items-center gap-3">
                <span className="text-xs font-bold text-indigo-500">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm text-slate-700">{item}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            한국 채널 기준의 첫 진단과 HQ 공유용 예시를 먼저 받아보세요
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            한국 사이트 URL이나 채널 링크를 보내주시면
            Korea Local Ops Agent 흐름으로 실제 KR/EN 데모를 보여드립니다
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              데모 요청하기
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              한국 URL 보내기
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
