import { redirect } from "next/navigation";

import { AuthForm } from "@/components/forms/auth-form";
import { Hero } from "@/components/marketplace/hero";
import { Card } from "@/components/ui/card";
import { SetupCallout } from "@/components/ui/setup-callout";
import { getSafeRedirectTarget } from "@/lib/auth-redirect";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getOptionalUser } from "@/lib/server/auth";

export default async function SignupPage({
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

  const canShowSignup = publicStatus.hasPublicEnv;

  return (
    <div className="pb-16">
      {!canShowSignup ? (
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <SetupCallout
            title="회원가입하려면 Supabase 연결이 필요합니다."
            body="이메일 인증 기반 회원가입을 쓰려면 공개 Supabase 환경 변수가 먼저 필요합니다. /setup에서 연결 상태를 확인해 주세요."
          />
        </div>
      ) : (
        <>
          <Hero
            eyebrow="계정 만들기"
            title="채널 진단과 결과 전달 흐름을 한 계정으로 엽니다"
            body="Promptory 계정을 만들고 메일 인증을 마치면 URL 진단 저장, 주문 확인, 라이브러리 보관, 제작실 작업까지 같은 흐름으로 이어집니다."
            tone="light"
          />
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
            <div className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-1">
              <Card variant="tint" className="rounded-[1.5rem] p-5">
                <p className="section-kicker text-[var(--slate-500)]">진단 저장</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">URL 진단과 추천 흐름을 계정에 보관합니다</p>
                <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                  계정을 만든 뒤 메일 인증만 마치면 저장한 진단과 추천 스택 흐름을 같은 작업공간에서 다시 열 수 있습니다.
                </p>
              </Card>
              <Card variant="default" className="rounded-[1.5rem] p-5">
                <p className="section-kicker text-[var(--slate-500)]">결과 전달 레일</p>
                <p className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">구매와 보관, 제작실도 같은 계정으로 연결합니다</p>
                <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                  주문, 라이브러리, 다운로드 권한이 계정 기준으로 정리되므로 재방문 흐름이 단순하고 신뢰하기 쉽습니다.
                </p>
              </Card>
            </div>
            <div className="self-start">
              <AuthForm mode="signup" redirectTo={redirectTo} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
