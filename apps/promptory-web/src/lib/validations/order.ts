import { z } from "zod";

export const createOrderSchema = z.object({
  productId: z.uuid("올바른 상품 ID가 아닙니다."),
});

export const checkoutSchema = z.object({
  orderId: z.uuid("올바른 주문 ID가 아닙니다."),
});

export const confirmPaymentSchema = z.object({
  amount: z.coerce.number().int().positive(),
  orderId: z.uuid(),
  paymentKey: z.string().min(1),
});
