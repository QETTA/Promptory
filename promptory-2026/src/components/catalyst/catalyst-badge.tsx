import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const toneClasses = {
  neutral: "bg-[var(--surface-2)] text-[var(--ink-secondary)] ring-[var(--line)]",
  success: "bg-[var(--color-success-bg)] text-[var(--color-emerald-700)] ring-transparent",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)] ring-transparent",
  danger: "bg-[var(--color-error-bg)] text-[var(--color-error)] ring-transparent",
  brand: "bg-[var(--brand-50)] text-[var(--brand-700)] ring-transparent",
} as const;

export interface CatalystBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof toneClasses;
}

export function CatalystBadge({ className, tone = "neutral", ...props }: CatalystBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
