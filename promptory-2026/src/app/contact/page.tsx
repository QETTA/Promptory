import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "데모 요청 - 프롬프토리",
  description:
    "회사 사이트 URL이나 현재 쓰는 자료 예시를 보내주시면, 프롬프토리 방식으로 실제 대화 흐름과 결과 예시를 준비해 드립니다.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-950">
      {/* Hero Section */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Demo request
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              우리 팀 Slack 기준으로
              <br />
              먼저 보여드릴게요
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              회사 사이트 URL이나 현재 쓰는 자료 예시를 보내주시면,
              프롬프토리 방식으로 실제 대화 흐름과 결과 예시를 준비해 드립니다.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              홈페이지 진단 · 브리프 초안 · KR/EN 요약 · Slack 흐름 기준
            </p>
          </div>

          {/* Right: Trust Box */}
          <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 lg:self-start">
            <h2 className="text-xl font-semibold text-zinc-950">
              이런 정보를 보내주시면 더 정확하게 준비합니다
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                회사 사이트 또는 랜딩 URL
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                현재 가장 밀리는 작업
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                원하는 결과물 예시
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                중소기업 팀 / 외국계 한국지사 여부
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Main Content: Form + Sidebar */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_340px] lg:px-8">
        {/* Left: Form */}
        <ContactForm />

        {/* Right: Process Panel */}
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              What happens next
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
              요청 후 이렇게 준비합니다
            </h2>

            <div className="mt-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">URL 확인</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    보내주신 사이트나 채널을 기준으로 첫 진단 관점을 잡습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    Slack 흐름 설계
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    질문, 결과물, 공유 방식이 어떻게 보일지 예시를 맞춥니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">데모 전달</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    귀사 상황에 맞는 대화 흐름과 출력 예시를 보여드립니다.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-zinc-500">
              범용 소개 대신, 실제 팀 흐름 기준으로 보여드립니다.
            </p>
          </div>
        </aside>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-950">
              자주 묻는 질문
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-950">데모는 무료인가요?</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                네, URL 기준 진단 예시와 Slack 흐름 데모는 무료입니다.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-950">
                어떤 URL을내면 되나요?
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                회사 홈페이지, 랜딩, 블로그, 채널 페이지 등 공개 URL이면 됩니다.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-950">
                Slack이 없으면 어떻게 하나요?
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                데모는 웹에서 보여드리지만, 실제 사용은 Slack이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
