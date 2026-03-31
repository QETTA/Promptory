import assert from "node:assert/strict";
import test from "node:test";

import {
  isDevStubPaymentProvider,
  isCancelableOrderStatus,
  isCheckoutEligibleOrderStatus,
  isIdempotentPaymentConfirmation,
  isSuccessfulTossPaymentStatus,
  shouldCancelPendingOrder,
} from "@/lib/server/payments";
import { isReusableOrderStatus } from "@/lib/server/orders";

test("promptory order status helpers keep reusable active orders narrow", () => {
  assert.equal(isReusableOrderStatus("draft"), true);
  assert.equal(isReusableOrderStatus("pending_payment"), true);
  assert.equal(isReusableOrderStatus("paid"), false);
  assert.equal(isReusableOrderStatus("cancelled"), false);
});

test("promptory checkout and cancel guards only allow active states", () => {
  assert.equal(isCheckoutEligibleOrderStatus("draft"), true);
  assert.equal(isCheckoutEligibleOrderStatus("pending_payment"), true);
  assert.equal(isCheckoutEligibleOrderStatus("paid"), false);
  assert.equal(isCancelableOrderStatus("draft"), true);
  assert.equal(isCancelableOrderStatus("pending_payment"), true);
  assert.equal(isCancelableOrderStatus("cancelled"), false);
  assert.equal(shouldCancelPendingOrder({ payment_provider: "dev_stub", status: "pending_payment" }), true);
  assert.equal(shouldCancelPendingOrder({ payment_provider: "toss", status: "pending_payment" }), true);
});

test("promptory payment confirmation helpers keep idempotency strict", () => {
  const paidOrder = { payment_reference: "pay_123", status: "paid" } as const;

  assert.equal(isIdempotentPaymentConfirmation(paidOrder, "pay_123"), true);
  assert.equal(isIdempotentPaymentConfirmation(paidOrder, "pay_other"), false);
  assert.equal(isSuccessfulTossPaymentStatus("DONE"), true);
  assert.equal(isSuccessfulTossPaymentStatus("FAIL"), false);
  assert.equal(isDevStubPaymentProvider("dev_stub"), true);
  assert.equal(isDevStubPaymentProvider("toss"), false);
});
