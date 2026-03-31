import { CampaignBriefMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Brief Agent - 프롬프토리",
  description: "회의 메모와 링크를 Slack에내면, 브리프와 실행 정리가 바로 이어집니다. 캠페인 브리프, 카피 초안, 액션 리스트를 Slack 안에서 만듭니다.",
};

export default function CampaignBriefAgentPage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <Badge className="w-fit bg-emerald-600 hover:bg-emerald-700">Campaign Brief Agent</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                회의 메모와 링크를 Slack에내면,
                <br />
                <span className="text-emerald-600">브리프와 실행 정리</span>가
                <br />
                바로 이어집니다
              </h1>
              <p className="text-base leading-7 text-slate-600">
                기존 자료, 회의 메모, 참고 링크를 읽고
                캠페인 방향을 정리한 뒤
                핵심 메시지, 카피 초안, 액션 리스트까지 Slack 안에서 이어서 만듭니다
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
              <CampaignBriefMock />
            </div>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2">Best fit</p>
            <h2 className="text-2xl font-bold text-slate-950">이런 팀에게 맞습니다</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">이런 상황에 빠르게 체감됩니다</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "회의는 끝났는데 브리프 정리가 늦어지는 팀",
                  "캠페인 방향은 있는데 메시지 초안이 비는 팀",
                  "팀장 보고와 실무 액션 분리를 동시에 해야 하는 팀",
                  "자료는 많은데 핵심을 정리할 인력이 부족한 팀",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="tint" className="p-6">
              <h3 className="font-semibold text-slate-950 mb-4">Not for everyone</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {[
                  "내부 캠페인 관리 시스템이 이미 갖춰진 대규모 조직",
                  "외부 에이전시와의 모든 커뮤니케이션이 정해진 조직",
                  "창의적 컨셉 단계부터 외부와 함께 하는 팀",
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
            <p className="text-sm font-semibold text-emerald-600 mb-2">In Slack</p>
            <h2 className="text-2xl font-bold text-slate-950">링크 하나로 시작해서, 결과 공유까지 Slack 안에서 이어집니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "메시지에서 입력", desc: "회의 메모, 링크, 자료를 보냅니다" },
              { step: "2", title: "모달에서 목표 고정", desc: "리드, 구매, 인지 등 캠페인 목표를 확인합니다" },
              { step: "3", title: "스레드에서 결과 생성", desc: "브리프, 메시지, 액션 리스트를 공유합니다" },
              { step: "4", title: "App Home에서 다시 열기", desc: "저장된 브리프와 버전 히스토리를 봅니다" },
            ].map((s) => (
              <Card key={s.step} variant="strong" className="p-5">
                <span className="text-2xl font-bold text-emerald-200">{s.step}</span>
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
            <p className="text-sm font-semibold text-emerald-600 mb-2">Outputs</p>
            <h2 className="text-2xl font-bold text-slate-950">이 패키지가 내놓는 결과물</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "캠페인 브리프", desc: "목표, 타겟, 메시지 방향, 채널이 정리된 1페이지 브리프" },
              { title: "핵심 메시지 정리", desc: "주요 메시지 3가지와 각각의 근거" },
              { title: "카피 초안", desc: "헤드라인, 서브카피, CTA 문구 초안" },
              { title: "실행 액션 리스트", desc: "채널별 실행 항목과 담당/일정 가이드" },
              { title: "보고용 요약", desc: "팀장/대표 보고용 캠페인 개요" },
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
            <p className="text-sm font-semibold text-emerald-600 mb-2">Conversation</p>
            <h2 className="text-2xl font-bold text-slate-950">실제 대화 예시</h2>
          </div>

          <Card variant="strong" className="p-6">
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">회의 메모랑 참고 랜딩 2개 보낼게요</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    확인했어요.<br />
                    지금은 캠페인 방향은 있는데 메시지 우선순위가 섞여 있어요.<br />
                    리드 확보 기준으로 다시 정리할까요?
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">U</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">사용자</p>
                  <p className="text-sm text-slate-600 mt-1">네, 이번 목적은 리드예요.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A154B] flex items-center justify-center text-xs font-semibold text-white">P</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#4A154B]">Promptory Agent</p>
                  <p className="text-sm text-slate-600 mt-1">
                    좋아요.<br />
                    브리프는 리드 확보 기준으로 다시 정리하고<br />
                    핵심 메시지 3개와 CTA 초안까지 같이 만들게요.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["브리프 만들기", "카피 초안", "팀장 보고용 요약"].map((btn) => (
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
            <p className="text-sm font-semibold text-emerald-600 mb-2">Rollout</p>
            <h2 className="text-2xl font-bold text-slate-950">패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "주요 입력물 형식 정의",
              "캠페인 유형별 질문 플로우 설정",
              "브리프/카피 출력 형식 정의",
              "팀 공유 채널 연결",
              "버전 관리 방식 설정",
              "승인 플로우 연결 (옵션)",
            ].map((item, i) => (
              <Card key={i} variant="tint" className="p-4 flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-500">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm text-slate-700">{item}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            다음 캠페인 회의 메모를 브리프 초안으로 바로 바꿔보세요
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            회의 메모나 참고 자료를 보내주시면
            실제 Campaign Brief Agent 흐름으로 데모를 보여드립니다
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              데모 요청하기
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              샘플 보내기
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
