import { DownloadButton } from "@/components/account/download-button";
import { OptimizationRunCard } from "@/components/channel-intake/optimization-run-card";
import { Hero } from "@/components/marketplace/hero";
import { Section } from "@/components/marketplace/section";
import { EmptyState } from "@/components/ui/empty-state";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { PageContainer } from "@/components/ui/page-container";
import { DownloadCard } from "@/components/ui/download-card";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { requireUser } from "@/lib/server/auth";
import { getSavedOptimizationRuns } from "@/lib/server/optimization-runs";
import { getPaidLibrary } from "@/lib/server/orders";

export default async function LibraryPage() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();

  if (!publicStatus.hasPublicEnv) {
    return (
      <PageContainer>
        <SetupCallout
          title="라이브러리를 보려면 Supabase 연결이 필요합니다"
          body="로그인과 구매 내역 조회에는 공개 Supabase 환경 변수가 필요합니다. 먼저 /setup에서 환경 상태를 확인해 주세요."
        />
      </PageContainer>
    );
  }

  const user = await requireUser("/library");
  const savedRuns = await getSavedOptimizationRuns(user.id, 6);
  const library = serverStatus.hasSupabaseServiceRole ? await getPaidLibrary(user.id) : [];
  const readyDownloads = library.filter((order) => Boolean(order.product?.file_path));
  const waitingDownloads = library.filter((order) => !order.product?.file_path);

  return (
    <div className="pb-16">
      <Hero
        eyebrow="저장한 작업공간"
        theme="library"
        title="저장한 진단과 결과를 다시 여는 공간"
        body="Promptory 보관함은 먼저 저장한 URL 진단을 다시 열고, 필요할 때 구매한 실행 팩과 다운로드를 이어서 확인하는 작업 공간입니다."
        aside={
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <DashboardCard caption="저장한 진단" value={savedRuns.length} />
            <DashboardCard caption="보관된 실행 팩" value={library.length} />
            <DashboardCard caption="즉시 실행 가능" value={readyDownloads.length} />
            <DashboardCard caption="파일 준비 중" value={waitingDownloads.length} />
          </div>
        }
      />

      <PageContainer>
        <Section
          eyebrow="저장한 진단"
          title="저장한 진단을 먼저 다시 엽니다"
          description="채널 URL 진단과 답변 상태를 같은 계정에서 다시 열고, 관련 실행 팩 레일로 바로 이어갈 수 있습니다."
          actions={
            <CTAButton href="/optimize" variant="outline" size="sm">
              새 진단 시작
            </CTAButton>
          }
        >
          {savedRuns.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2" role="list" aria-label="저장한 진단 목록">
              {savedRuns.map((run) => (
                <OptimizationRunCard key={run.id} run={run} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="아직 저장한 진단이 없습니다."
              body="먼저 URL 진단을 시작하면, 현재 답변과 추천 스택 축을 여기에서 다시 열 수 있습니다."
              ctaHref="/optimize"
              ctaLabel="첫 진단 시작"
            />
          )}
        </Section>

        <Section
          eyebrow="구매한 실행 팩"
          title="구매한 결과 전달 실행 팩"
          description="다운로드 가능한 실행 팩은 바로 열고, 파일이 아직 없는 팩은 준비 상태만 확인합니다."
          actions={
            <>
              <CTAButton href="/orders" variant="outline" size="sm">
                주문 내역 보기
              </CTAButton>
              <CTAButton href="/optimize" variant="outline" size="sm">
                진단으로 돌아가기
              </CTAButton>
            </>
          }
        >
          {!serverStatus.hasSupabaseServiceRole ? (
            <div className="mb-4 max-w-3xl">
              <SetupCallout
                title="다운로드 권한을 확인하려면 서버 설정이 더 필요합니다"
                body="저장한 진단은 지금 그대로 다시 열 수 있지만, signed URL 다운로드를 쓰려면 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 서버 환경 상태를 확인해 주세요."
              />
            </div>
          ) : null}
          {serverStatus.hasSupabaseServiceRole && library.length === 0 ? (
            <EmptyState
              title="아직 보관된 실행 팩이 없습니다."
              body="먼저 URL 진단을 시작해 필요한 결과 전달 실행 팩을 정한 뒤, 구매가 끝나면 여기에서 다시 열 수 있습니다."
              ctaHref="/optimize"
              ctaLabel="먼저 진단 시작"
            />
          ) : null}
        </Section>

        {readyDownloads.length > 0 ? (
          <Section eyebrow="즉시 실행 가능" title="바로 열 수 있는 실행 팩" className="pt-0">
            <div className="grid gap-4" role="list" aria-label="다운로드 가능한 실행 팩 목록">
              {readyDownloads.map((order) => (
                <DownloadCard key={order.id} order={order} variant="ready" />
              ))}
            </div>
          </Section>
        ) : null}

        {waitingDownloads.length > 0 ? (
          <Section eyebrow="파일 준비 중" title="파일 준비를 기다리는 실행 팩" className="pt-0">
            <div className="grid gap-4" role="list" aria-label="파일 준비 중인 실행 팩 목록">
              {waitingDownloads.map((order) => (
                <DownloadCard key={order.id} order={order} variant="waiting" />
              ))}
            </div>
          </Section>
        ) : null}
      </PageContainer>
    </div>
  );
}
