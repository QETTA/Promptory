"use client";

import { FormSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Contact Page Loading State
 */
export default function ContactLoading() {
  return (
    <PageContainer className="py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <PageHeaderSkeleton hasDescription />
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6 sm:p-8">
          <FormSkeleton fields={5} />
        </div>
      </div>
    </PageContainer>
  );
}
