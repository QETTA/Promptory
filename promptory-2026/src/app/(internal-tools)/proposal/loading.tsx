"use client";

import { FormSkeleton, CardSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Proposal Page Loading State
 */
export default function ProposalLoading() {
  return (
    <PageContainer className="py-8">
      <div className="mx-auto max-w-3xl">
        <CardSkeleton hasImage={false} lines={4} className="mb-6" />
        <FormSkeleton fields={3} />
      </div>
    </PageContainer>
  );
}
