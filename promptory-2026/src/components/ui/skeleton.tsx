import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-xl bg-[var(--surface-2)]", className)} {...props} />;
}

export function PageHeaderSkeleton({ hasDescription = false }: { hasDescription?: boolean }) {
  return (
    <div className="space-y-3">
      <Skeleton className="mx-auto h-6 w-28 rounded-full" />
      <Skeleton className="mx-auto h-12 w-full max-w-xl" />
      {hasDescription ? <Skeleton className="mx-auto h-5 w-full max-w-2xl" /> : null}
    </div>
  );
}

export function CardSkeleton({
  className,
  hasImage = true,
  lines = 3,
}: {
  className?: string;
  hasImage?: boolean;
  lines?: number;
}) {
  return (
    <div className={cn("rounded-2xl border border-[var(--line)] bg-white p-6", className)}>
      {hasImage ? <Skeleton className="mb-4 h-40 w-full" /> : null}
      <Skeleton className="h-6 w-2/3" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")} />
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4 rounded-2xl border border-[var(--line)] bg-white p-6">
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-11 w-40" />
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-4 h-10 w-16" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return <CardSkeleton lines={4} />;
}
