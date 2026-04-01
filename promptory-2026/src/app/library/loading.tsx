"use client";

import { DashboardCardSkeleton, CardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Library Page Loading State
 * Shows skeleton placeholders while data loads
 */
export default function LibraryLoading() {
  return (
    <div className="pb-16">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-50)] to-[var(--surface-1)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            {/* Left: Title & Description */}
            <div className="space-y-4">
              <PageHeaderSkeleton hasDescription />
            </div>
            {/* Right: Dashboard Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <PageContainer className="mt-8 space-y-12">
        {/* Saved Runs Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-[var(--surface-2)]" />
              <div className="h-7 w-48 rounded bg-[var(--surface-2)]" />
            </div>
            <div className="h-9 w-28 rounded-lg bg-[var(--surface-2)]" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <CardSkeleton hasImage lines={3} />
            <CardSkeleton hasImage lines={3} />
          </div>
        </section>

        {/* Library Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-[var(--surface-2)]" />
              <div className="h-7 w-56 rounded bg-[var(--surface-2)]" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-28 rounded-lg bg-[var(--surface-2)]" />
              <div className="h-9 w-32 rounded-lg bg-[var(--surface-2)]" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <CardSkeleton hasImage lines={2} />
            <CardSkeleton hasImage lines={2} />
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
