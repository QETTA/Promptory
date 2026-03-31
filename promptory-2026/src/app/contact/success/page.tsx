import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "데모 요청 완료 - 프롬프토리",
  description:
    "보내주신 URL과 상황 설명을 기준으로, 귀사 팀 흐름에 맞는 Slack 대화 예시와 결과물 방향을 준비합니다.",
};

type Props = {
  searchParams?: {
    team?: string;
  };
};

export default function ContactSuccessPage({ searchParams }: Props) {
  const team = searchParams?.team ?? "팀";

  return (
    <main className="bg-white text-zinc-950">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        {/* Success Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950">
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

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Request received
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          데모 요청을 받았습니다
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          {team} 기준으로 보내주신 URL과 상황 설명을 바탕으로,
          <br className="hidden sm:block" />
          Slack 대화 흐름과 결과물 예시를 준비합니다.
        </p>

        {/* Status Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
              1
            </div>
            <h2 className="text-lg font-semibold text-zinc-950">입력 확인</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              보내주신 URL과 업무 맥락을 검토합니다.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
              2
            </div>
            <h2 className="text-lg font-semibold text-zinc-950">데모 흐름 준비</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              질문, 결과물, 공유 흐름을 귀사 상황 기준으로 맞춥니다.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
              3
            </div>
            <h2 className="text-lg font-semibold text-zinc-950">예시 전달</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              실제 Slack 대화처럼 읽히는 데모 예시를 전달합니다.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/demo/slack"
            className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
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
            Slack 데모 미리 보기
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
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
          </Link>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <Link
            href="/packages"
            className="text-sm text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-950"
          >
            패키지 목록 다시 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
