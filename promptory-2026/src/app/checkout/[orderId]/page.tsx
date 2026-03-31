import Link from "next/link";
import { redirect } from "next/navigation";

import { CheckoutLauncher } from "@/components/marketplace/checkout-launcher";
import { DevPaymentButton } from "@/components/marketplace/dev-payment-button";
import { Hero } from "@/components/marketplace/hero";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { formatKrw } from "@/lib/currency";
import { getPublicEnvStatus, getTossPublicEnv } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { getPromptoryCheckoutCapability } from "@/lib/payments-capability";
import { getCategoryLabel, getOrderStatusLabel, getPaymentsModeSummary } from "@/lib/promptory-display";
import { requireUser } from "@/lib/server/auth";
import { isCheckoutEligibleOrderStatus } from "@/lib/server/payments";
import { getOrderForBuyer } from "@/lib/server/orders";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const checkoutCapability = getPromptoryCheckoutCapability({ publicStatus, serverStatus });
  const paymentMode = checkoutCapability.paymentMode;

  if (checkoutCapability.blockReason === "missing_public_env" || checkoutCapability.blockReason === "missing_service_role") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="결제를 시작하려면 환경설정이 더 필요합니다."
          body="결제 테스트를 하려면 공개 앱 URL과 Supabase 서버 키가 모두 설정되어야 합니다. 먼저 /setup에서 미설정 항목을 확인하세요."
        />
      </div>
    );
  }

  if (checkoutCapability.blockReason === "payments_disabled") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="지금은 결제 단계가 비활성화되어 있습니다."
          body="현재는 결제 없이 실행 팩 탐색과 주문 생성 흐름까지만 열려 있습니다. 구매 후 흐름을 검증하려면 PAYMENTS_MODE를 dev_stub로 바꿔 주세요."
        />
      </div>
    );
  }

  if (checkoutCapability.blockReason === "missing_toss_secret") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="토스 결제를 시작하려면 환경설정이 더 필요합니다."
          body="toss 모드에서는 TOSS_SECRET_KEY가 필요합니다. 사업자 등록 전에는 dev_stub 모드로 전체 흐름을 먼저 검증할 수 있습니다."
        />
      </div>
    );
  }

  if (checkoutCapability.blockReason === "missing_toss_client_key") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="토스 결제창을 열려면 공개 클라이언트 키가 필요합니다."
          body="toss 모드에서는 NEXT_PUBLIC_TOSS_CLIENT_KEY와 TOSS_SECRET_KEY를 함께 설정해야 합니다. 지금은 dev_stub 모드로 흐름을 먼저 검증할 수 있습니다."
        />
      </div>
    );
  }

  const tossPublicEnv = paymentMode === "toss" ? getTossPublicEnv() : null;
  const { orderId } = await params;
  const user = await requireUser(`/checkout/${orderId}`);
  const order = await getOrderForBuyer(orderId, user.id);

  if (!order) {
    redirect("/orders");
  }

  if (order.status === "paid") {
    redirect("/library");
  }

  if (!isCheckoutEligibleOrderStatus(order.status)) {
    const productHref = order.product?.slug ? `/products/${order.product.slug}` : "/products";

    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--surface-1)] p-6">
          <h1 className="section-title text-[var(--slate-950)]">같은 주문으로는 다시 결제할 수 없습니다.</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--slate-600)]">
            실패하거나 종료된 주문은 다시 열지 않습니다. 실행 팩 상세에서 새 주문을 만들거나 주문 내역으로 돌아가 상태를 확인해 주세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton href={productHref}>실행 팩에서 새 주문 만들기</CTAButton>
            <CTAButton href="/orders" variant="outline">
              주문 내역 보기
            </CTAButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <Hero
        eyebrow="결제"
        theme="payment"
        title="결제는 최대한 짧고 분명하게"
        body={
          <>
            <p>{order.product?.title ?? "실행 팩 정보 없음"}</p>
            <p>{getPaymentsModeSummary(paymentMode)}</p>
          </>
        }
      />

      <div className="mx-auto grid max-w-4xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <section className="rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--surface-1)] p-5">
          <p className="section-kicker text-[var(--slate-500)]">실행 팩 요약</p>
          <h1 className="mt-3 text-[1.4rem] font-semibold text-[var(--slate-950)]">{order.product?.title ?? "실행 팩 정보 없음"}</h1>
          <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
            <p>카테고리 {getCategoryLabel(order.product?.category ?? "실행 팩")}</p>
            <p>주문 상태 {getOrderStatusLabel(order.status)}</p>
            <p>결제 완료 후 라이브러리에서 다시 열고 설치 파일을 받을 수 있습니다.</p>
          </div>
          <div className="mt-5 border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--slate-600)]">
            <p>불필요한 설명은 줄이고 결제에 필요한 정보만 남겼습니다.</p>
            <p>문제가 생기면 주문 내역으로 돌아가 같은 흐름을 다시 확인할 수 있습니다.</p>
          </div>
        </section>

        <aside className="rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--surface-1)] p-5">
          <p className="section-kicker text-[var(--slate-500)]">결제 금액</p>
          <p className="mt-3 text-[2rem] font-semibold tracking-tight text-[var(--slate-950)]">{formatKrw(order.amount_krw)}</p>
          <div className="mt-4 grid gap-2 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--slate-700)]">
            <p>결제 방식 {paymentMode === "dev_stub" ? "개발용 검증" : "Toss 결제"}</p>
            <p>완료 후 이동 /library</p>
          </div>

          <div className="mt-5">
            {paymentMode === "dev_stub" ? (
              <DevPaymentButton orderId={order.id} />
            ) : (
              <CheckoutLauncher orderId={order.id} tossClientKey={tossPublicEnv?.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? ""} />
            )}
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-4">
            <Link href="/orders" className="text-sm font-semibold text-[var(--brand-700)]">
              주문 내역으로 돌아가기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
