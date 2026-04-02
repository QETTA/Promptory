import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { CatalystBadge } from "./catalyst-badge";

const toneClasses = {
  neutral: "from-white to-[var(--surface-2)]",
  brand: "from-[var(--brand-50)] to-white",
  success: "from-[var(--color-success-bg)] to-white",
  warning: "from-[var(--color-warning-bg)] to-white",
  danger: "from-[var(--color-error-bg)] to-white",
} as const;

export interface CatalystStatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  tone?: keyof typeof toneClasses;
}

export function CatalystStatCard({
  className,
  label,
  value,
  hint,
  tone = "neutral",
  ...props
}: CatalystStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-linear-to-br p-5 shadow-[var(--shadow-xs)]",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[var(--ink-secondary)]">{label}</p>
        <CatalystBadge tone={tone === "neutral" ? "neutral" : tone}>{tone}</CatalystBadge>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink-primary)]">{value}</div>
      {hint ? <p className="mt-2 text-sm text-[var(--ink-secondary)]">{hint}</p> : null}
    </div>
  );
}
