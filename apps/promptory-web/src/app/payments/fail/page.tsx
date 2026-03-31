import { PaymentStateLayout } from "@/components/marketplace/payment-state-layout";
import { PaymentFailureSync } from "@/components/marketplace/payment-failure-sync";
import { getOptionalUser } from "@/lib/server/auth";
import { getOrderForBuyer } from "@/lib/server/orders";
import { checkoutSchema } from "@/lib/validations/order";

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; message?: string; orderId?: string }>;
}) {
  const params = await searchParams;
  const parsedOrderId = params.orderId
    ? checkoutSchema.safeParse({
        orderId: params.orderId,
      })
    : null;
  const validOrderId = parsedOrderId?.success ? parsedOrderId.data.orderId : null;
  const user = await getOptionalUser();
  const order = validOrderId && user ? await getOrderForBuyer(validOrderId, user.id) : null;
  const productHref = order?.product?.slug ? `/products/${order.product.slug}` : "/products";
  const productLabel = order?.product?.slug ? "실행 팩으로 돌아가기" : "다른 실행 팩 보기";
  const failureMessage = params.message
    ? `${params.message} 현재 주문 상태는 주문 내역에서 다시 확인할 수 있고, 필요하면 실행 팩 상세에서 새 주문으로 다시 시작하면 됩니다.`
    : "결제가 취소되었거나 실패했습니다. 현재 주문 상태를 먼저 확인한 뒤, 필요하면 실행 팩 상세에서 새 주문으로 다시 시작하면 됩니다.";
  const detail = [params.code ? `오류 코드: ${params.code}` : null]
    .filter((entry): entry is string => Boolean(entry))
    .join(" · ");

  return (
    <>
      {validOrderId && user ? <PaymentFailureSync orderId={validOrderId} /> : null}
      <PaymentStateLayout
        eyebrow="결제 실패"
        title="결제가 완료되지 않았습니다"
        body={`${failureMessage} 구매한 실행형 시스템은 결제가 완료된 뒤에만 라이브러리로 연결됩니다.`}
        detail={detail || null}
        primaryHref="/orders"
        primaryLabel="주문 내역 보기"
        secondaryHref={productHref}
        secondaryLabel={productLabel}
        tone="error"
      />
    </>
  );
}
