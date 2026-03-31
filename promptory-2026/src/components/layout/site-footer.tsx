import { getPaymentsMode } from "@/lib/env/server";
import { getPaymentsModeSummary } from "@/lib/promptory-display";
import { PromptoryLogo } from "@/components/layout/promptory-logo";

export function SiteFooter() {
  const paymentsMode = getPaymentsMode();
  const paymentsMessage = getPaymentsModeSummary(paymentsMode);

  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--surface-2)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <PromptoryLogo />
          <p className="mt-4 text-[1.4rem] font-semibold text-[var(--slate-950)]">개인 채널 URL 기반 최적화 엔진</p>
          <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
            Promptory는 개인 채널 URL을 읽고 실행 시스템을 최적화하는 엔진을 지향합니다. 현재 앱에 구현된 구매와 보관함은 결과 전달 레일로 함께 점검합니다.
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-1)] p-5 text-sm leading-7 text-[var(--slate-600)]">
          {paymentsMessage}
        </div>
      </div>
    </footer>
  );
}
