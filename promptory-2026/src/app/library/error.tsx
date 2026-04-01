"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";

/**
 * Library Page Error Boundary
 * Catches errors in the library page and shows a user-friendly error UI
 */
export default function LibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundary
      onReset={reset}
      showRetry={true}
    />
  );
}
