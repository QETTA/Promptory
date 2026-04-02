import Link from "next/link";

import { getPublicEnvStatus } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { getPaymentsModeSummary } from "@/lib/promptory-display";

export function SetupBanner() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const isReady =
    publicStatus.hasPublicEnv &&
    serverStatus.hasSupabaseServiceRole &&
    (serverStatus.paymentMode !== "toss" || (serverStatus.hasTossSecret && publicStatus.hasTossClientKey));

  if (isReady) {
    return null;
  }

  return (
    <div className="border-b border-[var(--line)] bg-[var(--brand-50)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-1.5 text-[0.78rem] text-[var(--brand-700)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="leading-5 sm:hidden">
          점검 모드 · 테스트 구매 흐름 확인 가능
        </p>
        <p className="hidden leading-5 sm:block">
          운영 전 점검 모드입니다. {getPaymentsModeSummary(serverStatus.paymentMode)}
        </p>
        <Link href="/setup" prefetch={false} className="text-[0.78rem] font-semibold text-[var(--brand-700)] underline underline-offset-4">
          점검 보기
        </Link>
      </div>
    </div>
  );
}
