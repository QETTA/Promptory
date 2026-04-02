import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "문의 접수 완료 - 프롬프토리",
  description:
    "보내주신 팀 맥락과 요청 유형을 기준으로, 파일럿 범위와 다음 단계 제안을 준비합니다.",
};

type Props = {
  searchParams?: Promise<{
    team?: string | string[];
  }>;
};

function readTeamParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "팀" : value ?? "팀";
}

export default async function ContactSuccessPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const team = readTeamParam(params.team);
  const steps = [
    { body: "보내주신 URL과 업무 맥락을 검토합니다.", title: "입력 확인" },
    { body: "첫 workflow, 승인 구조, 핵심 connector 범위를 귀사 상황 기준으로 정리합니다.", title: "파일럿 범위 준비" },
    { body: "상담에 바로 쓸 수 있는 next-step과 추천 pack 방향을 전달합니다.", title: "다음 단계 제안" },
  ];

  return (
    <main className="bg-[var(--surface-1)] text-[var(--slate-950)]">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        {/* Success Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-600)] shadow-[var(--shadow-glow)]">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="section-kicker text-[var(--brand-700)]">
          Request received
        </p>

        <h1 className="poster-title mt-4 text-[var(--slate-950)]">
          문의를 접수했습니다
        </h1>

        <p className="body-copy-xl mx-auto mt-6 max-w-2xl text-[var(--slate-600)]">
          {team} 기준으로 보내주신 URL과 상황 설명을 바탕으로,
          <br className="hidden sm:block" />
          첫 파일럿 범위와 다음 단계 제안을 준비합니다.
        </p>

        {/* Status Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} variant={index === steps.length - 1 ? "strong" : "tint"} className="rounded-[var(--radius-4xl)] p-8 text-left">
              <div className={`mb-4 ${index === steps.length - 1 ? "ui-step-marker" : "ui-step-marker-muted"}`}>
                {index + 1}
              </div>
              <h2 className="text-lg font-semibold text-[var(--slate-950)]">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--slate-600)]">
                {step.body}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CTAButton
            href="/pilot"
            size="lg"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            파일럿 구성 보기
          </CTAButton>
          <CTAButton
            href="/contact"
            variant="outline"
            size="lg"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            추가 자료 보내기
          </CTAButton>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <Link
            href="/solutions"
            className="text-sm text-[var(--slate-500)] underline underline-offset-4 transition-colors hover:text-[var(--slate-950)]"
          >
            솔루션 구조 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
