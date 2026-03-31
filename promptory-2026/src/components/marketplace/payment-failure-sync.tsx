"use client";

import { useEffect, useRef } from "react";

export function PaymentFailureSync({ orderId }: { orderId: string }) {
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;

    void fetch("/api/payments/cancel", {
      body: JSON.stringify({ orderId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch(() => {
      // The cancel route is idempotent; leave recovery to the next authenticated visit if this fails.
    });
  }, [orderId]);

  return null;
}
