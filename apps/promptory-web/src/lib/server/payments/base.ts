export interface TossCheckoutRequest {
  amount: number;
  customerEmail?: string;
  customerKey: string;
  customerName?: string;
  failUrl: string;
  orderId: string;
  orderName: string;
  successUrl: string;
}

export interface DevStubCheckoutSession {
  method: "dev_stub";
  mode: "dev_stub";
  orderId: string;
  redirectUrl: string;
}

export interface TossCheckoutSession extends TossCheckoutRequest {
  method: "toss";
  mode: "toss";
}

export interface ConfirmPaymentInput {
  amount: number;
  orderId: string;
  paymentKey: string;
}

export interface ConfirmPaymentResult {
  method: string | null;
  orderId: string;
  paymentKey: string;
  status: string;
}

export type CheckoutSessionResult = DevStubCheckoutSession | TossCheckoutSession;

export interface PaymentGateway {
  confirmPayment(input: ConfirmPaymentInput): Promise<ConfirmPaymentResult>;
}
