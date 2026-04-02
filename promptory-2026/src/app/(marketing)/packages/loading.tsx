"use client";

import { ProductCardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Packages Page Loading State
 */
export default function PackagesLoading() {
  return (
    <PageContainer className="py-12">
      {/* Header Skeleton */}
      <div className="mb-10 text-center">
        <PageHeaderSkeleton hasDescription />
      </div>

      {/* Filter Badges Skeleton */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-full bg-[var(--surface-2)]"
          />
        ))}
      </div>

      {/* Packages Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Bottom CTA Skeleton */}
      <div className="mt-12 rounded-2xl bg-[var(--surface-2)] p-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <div className="mx-auto h-6 w-48 rounded bg-[var(--surface-3)]" />
          <div className="mx-auto h-4 w-64 rounded bg-[var(--surface-3)]" />
          <div className="mx-auto mt-4 h-10 w-32 rounded-lg bg-[var(--surface-3)]" />
        </div>
      </div>
    </PageContainer>
  );
}
