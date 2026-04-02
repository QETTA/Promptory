"use client";

import { FormSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Optimize Page (Channel Intake) Loading State
 */
export default function OptimizeLoading() {
  return (
    <PageContainer className="py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <PageHeaderSkeleton hasDescription />
        </div>

        {/* Form Area */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
          <FormSkeleton fields={4} />
        </div>

        {/* Preview Area */}
        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
          <div className="mb-4 h-6 w-32 rounded bg-[var(--surface-2)]" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-[var(--surface-2)]" />
            <div className="h-4 w-3/4 rounded bg-[var(--surface-2)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--surface-2)]" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
