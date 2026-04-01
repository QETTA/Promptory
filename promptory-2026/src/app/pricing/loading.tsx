"use client";

import { CardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/ui/page-container";

/**
 * Pricing Page Loading State
 */
export default function PricingLoading() {
  return (
    <PageContainer className="py-12">
      {/* Header Skeleton */}
      <div className="mb-12 text-center">
        <PageHeaderSkeleton hasDescription />
      </div>

      {/* Pricing Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6 ${
              i === 1 ? "md:-mt-4 md:mb-4" : ""
            }`}
          >
            {/* Badge */}
            <div className="mb-4 h-6 w-20 rounded-full bg-[var(--surface-2)]" />
            {/* Title */}
            <div className="mb-2 h-7 w-32 rounded bg-[var(--surface-2)]" />
            {/* Price */}
            <div className="mb-4 h-10 w-24 rounded bg-[var(--brand-100)]" />
            {/* Description */}
            <div className="mb-6 space-y-2">
              <div className="h-4 w-full rounded bg-[var(--surface-2)]" />
              <div className="h-4 w-2/3 rounded bg-[var(--surface-2)]" />
            </div>
            {/* Features */}
            <div className="mb-6 space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-[var(--surface-2)]" />
                  <div className="h-4 w-full rounded bg-[var(--surface-2)]" />
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="h-10 w-full rounded-lg bg-[var(--surface-2)]" />
          </div>
        ))}
      </div>

      {/* Add-ons Section Skeleton */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <div className="mx-auto h-6 w-32 rounded bg-[var(--surface-2)]" />
          <div className="mx-auto mt-2 h-4 w-64 rounded bg-[var(--surface-2)]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} lines={2} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
