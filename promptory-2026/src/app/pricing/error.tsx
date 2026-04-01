"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function PricingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorBoundary onReset={reset} showRetry={true} />;
}
