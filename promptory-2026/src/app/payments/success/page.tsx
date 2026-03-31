import { PaymentStateLayout } from "@/components/marketplace/payment-state-layout";
import { SetupCallout } from "@/components/ui/setup-callout";
import { hasPaymentsRuntime } from "@/lib/env/runtime";
import { getPaymentsMode } from "@/lib/env/server";
import { requireUser } from "@/lib/server/auth";
import { getOrderForBuyer } from "@/lib/server/orders";
import { confirmPromptoryPayment } from "@/lib/server/payments";
import { confirmPaymentSchema } from "@/lib/validations/order";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string; mode?: string; orderId?: string; paymentKey?: string }>;
}) {
  if (!hasPaymentsRuntime()) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <SetupCallout
          title="결제 승인 페이지를 열려면 Promptory 연결이 먼저 필요합니다."
          body="결제 승인에는 공개 Supabase env와 SUPABASE_SERVICE_ROLE_KEY가 필요합니다."
        />
      </div>
    );
  }

  const params = await searchParams;
  const paymentMode = getPaymentsMode();
  const currentQuery = new URLSearchParams(
    Object.entries({
      amount: params.amount,
      mode: params.mode,
      orderId: params.orderId,
      paymentKey: params.paymentKey,
    }).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const currentPath =
    currentQuery.size > 0 ? `/payments/success?${currentQuery.toString()}` : "/payments/success";

  if (paymentMode === "dev_stub") {
    if (!params.orderId) {
      return (
        <PaymentStateLayout
          eyebrow="결제 정보 부족"
          title="주문 정보가 부족합니다"
          body="결제 완료를 확인할 주문 ID가 없어 지금은 구매 후 보관 흐름으로 넘어갈 수 없습니다. 주문 내역으로 돌아가 현재 주문을 다시 확인해 주세요."
          primaryHref="/orders"
          primaryLabel="주문 내역 보기"
          secondaryHref="/products"
          secondaryLabel="실행 팩 보기"
          tone="error"
        />
      );
    }

    try {
      const user = await requireUser(currentPath);
      const order = await getOrderForBuyer(params.orderId, user.id);

      if (!order || order.status !== "paid") {
        throw new Error("개발용 결제 완료 상태를 확인하지 못했습니다.");
      }

      return (
        <PaymentStateLayout
          eyebrow="결제 완료"
          title="개발용 결제 완료가 반영되었습니다"
          body={`${order.product?.title ?? "실행 팩"} 주문이 paid 상태로 전환되었습니다. 이제 구매한 실행형 시스템이 라이브러리와 다운로드 흐름에 제대로 연결되는지 바로 확인할 수 있습니다.`}
          primaryHref="/library"
          primaryLabel="라이브러리 보기"
          secondaryHref="/orders"
          secondaryLabel="주문 내역 보기"
        />
      );
    } catch (error) {
      return (
        <PaymentStateLayout
          eyebrow="결제 확인 실패"
          title="개발용 결제 완료를 확인하지 못했습니다"
          body={error instanceof Error ? error.message : "개발용 결제 확인 중 오류가 발생했습니다."}
          detail="dev_stub 모드에서는 실제 결제창 대신 주문 상태 전환과 구매 후 흐름만 검증합니다."
          primaryHref="/orders"
          primaryLabel="주문 내역 보기"
          secondaryHref="/products"
          secondaryLabel="실행 팩 보기"
          tone="error"
        />
      );
    }
  }

  const parsedConfirmation = confirmPaymentSchema.safeParse(params);

  if (!parsedConfirmation.success) {
    return (
      <PaymentStateLayout
        eyebrow="결제 정보 부족"
        title="결제 정보가 부족합니다"
        body="결제 승인에 필요한 amount, orderId, paymentKey 중 일부가 비어 있습니다. 지금은 구매 완료를 확정할 수 없으니 주문 내역에서 다시 결제를 시작해 주세요."
        primaryHref="/orders"
        primaryLabel="주문 내역 보기"
        secondaryHref="/products"
        secondaryLabel="실행 팩 보기"
        tone="error"
      />
    );
  }

  try {
    const user = await requireUser(currentPath);
    const order = await getOrderForBuyer(parsedConfirmation.data.orderId, user.id);

    if (!order) {
      throw new Error("현재 계정에서 확인할 수 있는 주문이 아닙니다.");
    }

    const result = await confirmPromptoryPayment({
      amount: parsedConfirmation.data.amount,
      buyerId: user.id,
      orderId: parsedConfirmation.data.orderId,
      paymentKey: parsedConfirmation.data.paymentKey,
    });

    return (
      <PaymentStateLayout
        eyebrow="결제 완료"
        title="결제가 완료되었습니다"
        body={`${result.product?.title ?? "실행 팩"} 구매가 정상 처리되었습니다. 이제 구매한 실행형 시스템을 라이브러리에서 다시 열고 다운로드 가능 여부를 바로 확인할 수 있습니다.`}
        primaryHref="/library"
        primaryLabel="라이브러리 보기"
        secondaryHref="/orders"
        secondaryLabel="주문 내역 보기"
      />
    );
  } catch (error) {
    return (
      <PaymentStateLayout
        eyebrow="결제 승인 실패"
        title="결제 승인에 실패했습니다"
        body={error instanceof Error ? error.message : "결제 처리 중 오류가 발생했습니다."}
        detail="주문 내역으로 돌아가 현재 주문 상태를 먼저 확인한 뒤 다시 진행해 주세요."
        primaryHref="/orders"
        primaryLabel="주문 내역 보기"
        secondaryHref="/products"
        secondaryLabel="실행 팩 보기"
        tone="error"
      />
    );
  }
}
