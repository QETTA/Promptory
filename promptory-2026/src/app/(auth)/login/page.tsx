import { redirect } from "next/navigation";

import { AuthForm } from "@/components/forms/auth-form";
import { Hero } from "@/components/marketplace/hero";
import { Card } from "@/components/ui/card";
import { SetupCallout } from "@/components/ui/setup-callout";
import { getSafeRedirectTarget } from "@/lib/auth-redirect";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getOptionalUser } from "@/lib/server/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string | string[] }>;
}) {
  const publicStatus = getPublicEnvStatus();
  const params = (await searchParams) ?? {};
  const redirectTo = getSafeRedirectTarget(params.next, "/optimize");
  const user = await getOptionalUser();

  if (user) {
    redirect(redirectTo);
  }

  return (
    <main className="pb-16">
      {!publicStatus.hasPublicEnv ? (
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <SetupCallout
            title="로그인하려면 Supabase 연결이 필요합니다."
            body="로그인에 필요한 공개 Supabase 환경 변수가 아직 비어 있습니다. 먼저 /setup에서 연결 상태를 확인해 주세요."
          />
        </div>
      ) : (
        <>
          <Hero
            eyebrow="로그인"
            title="저장한 진단과 작업 흐름으로 돌아갑니다"
            body="채널 URL 진단을 이어 보거나, 주문과 보관함, 제작실 작업을 같은 계정으로 다시 열려면 먼저 로그인해야 합니다."
            tone="light"
          />
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
            <div className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-1">
              <Card variant="tint" className="rounded-3xl p-5">
                <p className="section-kicker text-[var(--slate-500)]">다시 열기</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">같은 계정으로 진단과 실행 흐름을 이어갑니다</p>
                <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                  저장한 진단, 주문 상태 확인, 라이브러리 복귀, 셀러 상품 관리가 모두 같은 진입점에서 이어집니다.
                </p>
              </Card>
              <Card variant="default" className="rounded-3xl p-5">
                <p className="section-kicker text-[var(--slate-500)]">왜 로그인하나요</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">진단 기록과 구매 권한을 계정 기준으로 연결합니다</p>
                <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                  Promptory는 채널 진단 기록, 주문 이력, 다운로드 권한을 모두 계정 기준으로 연결해 다시 열기 흐름을 단순하게 만듭니다.
                </p>
              </Card>
            </div>
            <div className="self-start">
              <AuthForm mode="login" redirectTo={redirectTo} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
