import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { Metadata } from "next";

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
  },
  {
    slug: "campaign-brief-agent",
    title: "Campaign Brief Agent",
    description: "회의 메모, 링크, 기존 자료를 바탕으로 브리프, 메시지 방향, 액션 리스트를 정리합니다",
    footer: "브리프 생성 · 카피 초안 · 실행 정리",
    useCase: "브리프 생성",
    teamType: "중소기업 팀",
  },
  {
    slug: "korea-local-ops-agent",
    title: "Korea Local Ops Agent",
    description: "한국 채널을 진단하고 KR/EN summary와 HQ 공유용 action memo를 만듭니다",
    footer: "Korea scan · KR/EN summary · HQ memo",
    useCase: "보고 정리",
    teamType: "외국계 한국지사",
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
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-blue-600 mb-2">Slack Agent Packages</p>
            <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
              반복되는 진단, 비교, 초안 작업을 패키지로 붙입니다
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              프롬프토리는 범용 챗봇을 파는 게 아니라
              팀의 실무 흐름에 맞춘 Slack agent 패키지를 제안합니다
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Use case</p>
              <div className="flex flex-wrap gap-2">
                {useCases.map((uc) => (
                  <Badge key={uc.value} variant="neutral" className="cursor-pointer hover:bg-slate-100">
                    {uc.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Team type</p>
              <div className="flex flex-wrap gap-2">
                {teamTypes.map((tt) => (
                  <Badge key={tt.value} variant="neutral" className="cursor-pointer hover:bg-slate-100">
                    {tt.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.slug} variant="strong" className="p-6 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="default" className="text-[10px]">{pkg.useCase}</Badge>
                  <Badge variant="neutral" className="text-[10px]">{pkg.teamType}</Badge>
                </div>
                <h2 className="text-lg font-semibold text-slate-950">{pkg.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 flex-1">{pkg.description}</p>
                <p className="mt-4 text-xs text-slate-500">{pkg.footer}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <CTAButton href={`/packages/${pkg.slug}`} variant="outline" size="sm" className="w-full">
                    상세 보기
                  </CTAButton>
                </div>
                <p className="mt-3 text-[10px] text-slate-400 text-center">
                  맞춤 세팅 포함 · Slack DM/채널/모달 지원 · 저장 후 이어보기
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card variant="tint" className="p-8">
            <h2 className="text-xl font-bold text-slate-950">
              어떤 패키지가 우리 팀에 맞을지 unsure하신가요?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              회사 URL이나 현재 업무 상황을 보내주시면 적합한 패키지를 추천해드립니다
            </p>
            <div className="mt-6">
              <CTAButton href="/contact">
                데모 요청하기
              </CTAButton>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
