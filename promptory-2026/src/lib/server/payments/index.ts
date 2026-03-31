import { getPublicEnv } from "@/lib/env/public";
import { getPaymentsMode } from "@/lib/env/server";
import { getOrderById, getOrderForBuyer, updateOrderStatus } from "@/lib/server/orders";
import { getProductById } from "@/lib/server/products";
import { TossPaymentGateway } from "@/lib/server/payments/toss";
import type { CheckoutSessionResult } from "@/lib/server/payments/base";
import type { OrderRow } from "@/lib/supabase/types";

export function createPaymentGateway() {
  return new TossPaymentGateway();
}

export function isDevStubPaymentProvider(provider: string) {
  return provider === "dev_stub";
}

export function isCheckoutEligibleOrderStatus(status: OrderRow["status"]) {
  return status === "draft" || status === "pending_payment";
}

export function isCancelableOrderStatus(status: OrderRow["status"]) {
  return status === "draft" || status === "pending_payment";
}

export function shouldCancelPendingOrder(order: Pick<OrderRow, "payment_provider" | "status">) {
  return isCancelableOrderStatus(order.status);
}

export function isSuccessfulTossPaymentStatus(status: string) {
  return status === "DONE";
}

export function isIdempotentPaymentConfirmation(
  order: Pick<OrderRow, "payment_reference" | "status">,
  paymentKey: string,
) {
  return order.status === "paid" && order.payment_reference === paymentKey;
}

export async function createOrderCheckout(params: {
  customerEmail?: string;
  customerKey: string;
  customerName?: string;
  orderId: string;
}): Promise<CheckoutSessionResult> {
  const paymentMode = getPaymentsMode();

  if (paymentMode === "disabled") {
    throw new Error("지금은 결제 기능이 비활성화되어 있습니다.");
  }

  const order = await getOrderById(params.orderId);

  if (!order) {
    throw new Error("주문을 찾지 못했습니다.");
  }

  if (!isCheckoutEligibleOrderStatus(order.status)) {
    throw new Error("결제할 수 없는 주문 상태입니다.");
  }

  const product = await getProductById(order.product_id);

  if (!product || product.status !== "published") {
    throw new Error("실행 팩을 찾지 못했습니다.");
  }

  const env = getPublicEnv();

  if (paymentMode === "dev_stub") {
    await updateOrderStatus(order.id, {
      payment_provider: "dev_stub",
      status: "pending_payment",
    });

    return {
      method: "dev_stub",
      mode: "dev_stub",
      orderId: order.id,
      redirectUrl: `${env.NEXT_PUBLIC_APP_URL}/checkout/${order.id}?mode=dev_stub`,
    };
  }

  await updateOrderStatus(order.id, {
    payment_provider: "toss",
    status: "pending_payment",
  });

  return {
    amount: order.amount_krw,
    customerEmail: params.customerEmail,
    customerKey: params.customerKey,
    customerName: params.customerName,
    failUrl: `${env.NEXT_PUBLIC_APP_URL}/payments/fail?orderId=${order.id}`,
    method: "toss",
    mode: "toss",
    orderId: order.id,
    orderName: product.title,
    successUrl: `${env.NEXT_PUBLIC_APP_URL}/payments/success`,
  };
}

export async function completeDevOrderPayment(orderId: string) {
  if (getPaymentsMode() !== "dev_stub") {
    throw new Error("개발용 결제 완료는 dev_stub 모드에서만 사용할 수 있습니다.");
  }

  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("주문을 찾지 못했습니다.");
  }

  if (order.status === "paid" && isDevStubPaymentProvider(order.payment_provider)) {
    const existingProduct = await getProductById(order.product_id);
    return { order, product: existingProduct };
  }

  if (order.status === "paid") {
    throw new Error("이미 다른 결제로 완료된 주문입니다.");
  }

  if (order.status !== "pending_payment") {
    throw new Error("개발용 결제 완료가 가능한 주문 상태가 아닙니다.");
  }

  const product = await getProductById(order.product_id);

  if (!product || product.status !== "published") {
    throw new Error("실행 팩을 찾지 못했습니다.");
  }

  await updateOrderStatus(order.id, {
    payment_provider: "dev_stub",
    payment_reference: `dev_stub:${order.id}`,
    status: "paid",
  });

  const updatedOrder = await getOrderById(order.id);

  if (!updatedOrder) {
    throw new Error("개발용 결제 완료 후 주문을 다시 불러오지 못했습니다.");
  }

  return { order: updatedOrder, product };
}

export async function confirmPromptoryPayment(params: {
  amount: number;
  buyerId: string;
  orderId: string;
  paymentKey: string;
}) {
  if (getPaymentsMode() !== "toss") {
    throw new Error("토스 결제 승인은 toss 모드에서만 사용할 수 있습니다.");
  }

  const order = await getOrderForBuyer(params.orderId, params.buyerId);

  if (!order) {
    throw new Error("주문을 찾지 못했습니다.");
  }

  if (isIdempotentPaymentConfirmation(order, params.paymentKey)) {
    const product = await getProductById(order.product_id);
    return { order, product };
  }

  if (order.status === "paid") {
    throw new Error("이미 다른 결제로 완료된 주문입니다.");
  }

  if (order.status !== "pending_payment") {
    throw new Error("결제 확인이 가능한 주문 상태가 아닙니다.");
  }

  if (order.amount_krw !== params.amount) {
    throw new Error("결제 금액이 주문 금액과 일치하지 않습니다.");
  }

  const product = await getProductById(order.product_id);

  if (!product) {
    throw new Error("실행 팩을 찾지 못했습니다.");
  }

  const gateway = createPaymentGateway();
  const confirmation = await gateway.confirmPayment(params);

  if (!isSuccessfulTossPaymentStatus(confirmation.status)) {
    throw new Error("결제 승인 상태가 완료되지 않았습니다.");
  }

  await updateOrderStatus(order.id, {
    payment_provider: "toss",
    payment_reference: params.paymentKey,
    status: "paid",
  });

  const updatedOrder = await getOrderById(order.id);

  if (!updatedOrder) {
    throw new Error("결제 후 주문을 다시 불러오지 못했습니다.");
  }

  return { order: updatedOrder, product };
}

export async function cancelPromptoryPayment(orderId: string) {
  const paymentMode = getPaymentsMode();
  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("주문을 찾지 못했습니다.");
  }

  if (order.status === "paid") {
    return order;
  }

  if (shouldCancelPendingOrder(order)) {
    await updateOrderStatus(order.id, {
      payment_provider: paymentMode === "toss" ? "toss" : order.payment_provider,
      status: "cancelled",
    });
  }

  const updatedOrder = await getOrderById(order.id);
  return updatedOrder ?? order;
}
