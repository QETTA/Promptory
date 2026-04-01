"use client";

import { SectionErrorBoundary } from "@/components/ui/error-boundary";

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <SectionErrorBoundary onReset={reset} showRetry={true} />;
}
