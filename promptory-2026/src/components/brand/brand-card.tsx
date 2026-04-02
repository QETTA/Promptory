import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const toneClasses = {
  default: "bg-white ring-[var(--line)]",
  muted: "bg-[var(--surface-2)] ring-transparent",
  dark: "bg-[var(--slate-950)] text-white ring-white/10",
} as const;

export interface BrandCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof toneClasses;
}

export function BrandCard({ className, tone = "default", ...props }: BrandCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 shadow-[var(--shadow-sm)] ring-1 sm:p-8",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
