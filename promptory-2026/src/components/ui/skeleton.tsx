"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

/**
 * Skeleton loading component
 * Provides consistent loading placeholders across the application
 * Uses CSS variables for theming and supports multiple variants
 */

const skeletonVariants = cva(
  // Base styles
  "relative overflow-hidden bg-[var(--surface-2)]",
  {
    variants: {
      /**
       * Shape variant - determines the skeleton's form
       */
      shape: {
        text: "h-4 w-full rounded",
        title: "h-6 w-3/4 rounded",
        heading: "h-8 w-1/2 rounded-lg",
        circle: "rounded-full",
        rectangle: "rounded-xl",
        card: "rounded-2xl",
        avatar: "h-10 w-10 rounded-full",
        button: "h-10 w-24 rounded-lg",
        badge: "h-6 w-16 rounded-full",
        input: "h-10 w-full rounded-lg",
      },
      /**
       * Animation style
       */
      animation: {
        pulse: "animate-pulse",
        shimmer:
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[var(--surface-3)]/50 before:to-transparent",
        none: "",
      },
    },
    defaultVariants: {
      shape: "text",
      animation: "shimmer",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Width override (useful when shape doesn't fit)
   * Accepts Tailwind width classes or custom values
   */
  width?: string;
  /**
   * Height override
   * Accepts Tailwind height classes or custom values
   */
  height?: string;
}

/**
 * Skeleton component - loading placeholder
 *
 * @example
 * // Text skeleton (default)
 * <Skeleton />
 *
 * @example
 * // Avatar with pulse animation
 * <Skeleton shape="avatar" animation="pulse" />
 *
 * @example
 * // Custom sized card skeleton
 * <Skeleton shape="card" className="h-48 w-full" />
 *
 * @example
 * // Multiple skeleton lines (skeleton group)
 * <div className="space-y-2">
 *   <Skeleton shape="heading" />
 *   <Skeleton shape="text" />
 *   <Skeleton shape="text" className="w-2/3" />
 * </div>
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, shape, animation, width, height, style, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ shape, animation }), className)}
        style={{
          ...(width && { width }),
          ...(height && { height }),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };

// ============================================================================
// Pre-built Skeleton Patterns
// ============================================================================

/**
 * CardSkeleton - Complete card loading state
 * Mimics a Card component while loading
 */
export function CardSkeleton({
  className,
  hasImage = true,
  lines = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  hasImage?: boolean;
  lines?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {hasImage && (
          <Skeleton shape="avatar" className="h-12 w-12 shrink-0" />
        )}
        <div className="flex-1 space-y-3">
          <Skeleton shape="heading" className="w-3/4" />
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              shape="text"
              className={i === lines - 1 ? "w-2/3" : "w-full"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * DashboardCardSkeleton - Loading state for dashboard cards
 */
export function DashboardCardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6",
        className
      )}
      {...props}
    >
      <Skeleton shape="text" className="mb-2 h-4 w-20" />
      <Skeleton shape="heading" className="mb-1 h-8 w-24" />
      <Skeleton shape="text" className="h-3 w-32" />
    </div>
  );
}

/**
 * ProductCardSkeleton - Loading state for product cards
 */
export function ProductCardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5",
        className
      )}
      {...props}
    >
      {/* Image placeholder */}
      <Skeleton shape="rectangle" className="mb-4 aspect-video w-full" />
      {/* Title */}
      <Skeleton shape="title" className="mb-2" />
      {/* Description lines */}
      <Skeleton shape="text" className="mb-1" />
      <Skeleton shape="text" className="mb-4 w-2/3" />
      {/* Footer with price and button */}
      <div className="flex items-center justify-between">
        <Skeleton shape="heading" className="h-6 w-20" />
        <Skeleton shape="button" className="w-24" />
      </div>
    </div>
  );
}

/**
 * ListItemSkeleton - Loading state for list items
 */
export function ListItemSkeleton({
  className,
  hasIcon = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hasIcon?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface-1)] p-4",
        className
      )}
      {...props}
    >
      {hasIcon && <Skeleton shape="circle" className="h-10 w-10" />}
      <div className="flex-1 space-y-2">
        <Skeleton shape="title" className="w-1/3" />
        <Skeleton shape="text" className="w-1/2" />
      </div>
      <Skeleton shape="text" className="h-4 w-16" />
    </div>
  );
}

/**
 * FormSkeleton - Loading state for forms
 */
export function FormSkeleton({
  className,
  fields = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { fields?: number }) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Skeleton shape="heading" className="mb-6 w-1/3" />
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton shape="text" className="h-4 w-24" />
          <Skeleton shape="input" />
        </div>
      ))}
      <Skeleton shape="button" className="mt-6 w-full" />
    </div>
  );
}

/**
 * PageHeaderSkeleton - Loading state for page headers
 */
export function PageHeaderSkeleton({
  className,
  hasDescription = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hasDescription?: boolean }) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <Skeleton shape="heading" className="h-10 w-1/2" />
      {hasDescription && (
        <>
          <Skeleton shape="text" />
          <Skeleton shape="text" className="w-3/4" />
        </>
      )}
    </div>
  );
}

/**
 * TableRowSkeleton - Loading state for table rows
 */
export function TableRowSkeleton({
  className,
  columns = 4,
  hasAction = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: number;
  hasAction?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-[var(--line)] py-4",
        className
      )}
      {...props}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="flex-1">
          <Skeleton shape={i === 0 ? "title" : "text"} />
        </div>
      ))}
      {hasAction && <Skeleton shape="button" className="w-20" />}
    </div>
  );
}
