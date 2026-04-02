import { Hero } from "@/components/marketplace/hero";
import { Section } from "@/components/marketplace/section";
import { EmptyState } from "@/components/ui/empty-state";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { PageContainer } from "@/components/ui/page-container";
import { OrderCard } from "@/components/ui/order-card";
import { formatKrw } from "@/lib/currency";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getPaymentsMode, getServerEnvStatus } from "@/lib/env/server";
import { formatDate } from "@/lib/format";
import { getPromptoryCheckoutCapability } from "@/lib/payments-capability";
import { requireUser } from "@/lib/server/auth";
import { getBuyerOrders } from "@/lib/server/orders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{ created?: string | string[]; orderId?: string | string[] }>;
}) {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const paymentMode = getPaymentsMode();
  const params = (await searchParams) ?? {};
  const created = Array.isArray(params.created) ? params.created[0] : params.created;
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
  const currentQuery = new URLSearchParams(
    Object.entries({
      created,
      orderId,
    }).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const currentPath = currentQuery.size > 0 ? `/orders?${currentQuery.toString()}` : "/orders";

  if (!publicStatus.hasPublicEnv) {
    return (
      <PageContainer>
        <SetupCallout
          title="주문 내역을 보려면 공개 Supabase 연결이 필요합니다."
          body="주문 내역 조회에는 공개 환경 변수가 필요합니다. 먼저 /setup에서 연결 상태를 확인해 주세요."
        />
      </PageContainer>
    );
  }

  const user = await requireUser(currentPath);
  const orders = await getBuyerOrders(user.id);
  const pendingOrders = orders.filter((order) => order.status === "pending_payment");
  const historyOrders = orders.filter((order) => order.status !== "pending_payment");
  const checkoutCapability = getPromptoryCheckoutCapability({ publicStatus, serverStatus });
  const canOpenCheckout = checkoutCapability.canCheckout;

  return (
    <div className="pb-16">
      <Hero
        eyebrow="주문"
        theme="orders"
        title="주문과 다음 액션을 한 번에 봅니다"
        body={
          paymentMode === "dev_stub"
            ? "checkout을 열어 개발용 결제 완료와 라이브러리 이동 흐름까지 같은 퍼널로 확인할 수 있습니다."
            : paymentMode === "toss"
              ? "실제 결제 진행이 필요한 주문만 빠르게 확인하도록 정리했습니다."
              : "주문 접수 상태를 먼저 확인하는 단계입니다."
        }
        aside={
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <DashboardCard caption="전체 주문" value={orders.length} />
            <DashboardCard caption="결제 대기" value={pendingOrders.length} />
            <DashboardCard
              caption="현재 상태"
              value={canOpenCheckout ? (paymentMode === "toss" ? "결제 가능" : "흐름 검증 가능") : "설정 확인 필요"}
            />
          </div>
        }
      />

      <PageContainer>
        {created === "1" ? (
          <div
            className="mt-6 rounded-2xl border border-[var(--brand-300)] bg-[var(--brand-50)] p-4 text-sm leading-6 text-[var(--brand-700)]"
            role="status"
            aria-live="polite"
          >
            주문이 생성되었습니다. {orderId ? `주문 번호 ${orderId} · ` : ""}
            {paymentMode === "toss"
              ? "이제 checkout에서 결제를 진행하면 됩니다."
              : paymentMode === "dev_stub"
                ? "이제 checkout에서 개발용 결제 완료와 구매 후 흐름을 확인할 수 있습니다."
                : "현재는 주문 상태만 확인할 수 있습니다."}
          </div>
        ) : null}

        <Section
          eyebrow="지금 처리할 주문"
          title="지금 처리할 주문"
          description="먼저 처리할 주문만 위로 올리고, 지나간 주문은 아래로 내려서 스캔 속도를 높였습니다."
          actions={
            <>
              <CTAButton href="/products" variant="outline" size="sm">
                실행 팩 레일 보기
              </CTAButton>
              <CTAButton href="/library" variant="outline" size="sm">
                라이브러리 보기
              </CTAButton>
            </>
          }
        >
          {orders.length === 0 ? (
            <EmptyState
              title="아직 주문 내역이 없습니다."
              body="실행 팩 상세에서 연결하기를 누르면 주문이 생성됩니다."
              ctaHref="/products"
              ctaLabel="실행 팩 둘러보기"
            />
          ) : pendingOrders.length === 0 ? (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 text-sm leading-7 text-[var(--slate-600)]">
              지금 바로 처리할 결제 대기 주문은 없습니다.
            </div>
          ) : (
            <div className="grid gap-4" role="list" aria-label="결제 대기 주문 목록">
              {pendingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  paymentMode={paymentMode}
                  canCheckout={canOpenCheckout}
                  variant="pending"
                />
              ))}
            </div>
          )}
        </Section>

        {historyOrders.length > 0 ? (
          <Section eyebrow="주문 기록" title="지난 주문 기록" className="pt-0">
            <div className="grid gap-4" role="list" aria-label="지난 주문 목록">
              {historyOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  paymentMode={paymentMode}
                  variant="history"
                />
              ))}
            </div>
          </Section>
        ) : null}
      </PageContainer>
    </div>
  );
}
