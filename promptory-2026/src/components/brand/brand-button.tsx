import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const toneClasses = {
  primary:
    "bg-[var(--brand-600)] text-white shadow-[var(--shadow-sm)] hover:bg-[var(--brand-700)] focus-visible:ring-[var(--color-focus-ring)]",
  secondary:
    "border border-[var(--line)] bg-white text-[var(--ink-primary)] shadow-[var(--shadow-xs)] hover:border-[var(--line-hover)] hover:bg-[var(--surface-2)] focus-visible:ring-[var(--color-focus-ring)]",
  quiet:
    "bg-[var(--brand-50)] text-[var(--brand-700)] hover:bg-[var(--brand-100)] focus-visible:ring-[var(--color-focus-ring)]",
  ghost:
    "text-[var(--ink-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--ink-primary)] focus-visible:ring-[var(--color-focus-ring)]",
  danger:
    "bg-[var(--color-error)] text-white shadow-[var(--shadow-sm)] hover:opacity-95 focus-visible:ring-[var(--color-error-focus-ring)]",
} as const;

const sizeClasses = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-4 text-[0.95rem]",
  lg: "h-12 px-5 text-base",
} as const;

export interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: keyof typeof toneClasses;
  size?: keyof typeof sizeClasses;
  fullWidth?: boolean;
}

export function BrandButton({
  className,
  tone = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}: BrandButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-[var(--duration-normal)] ease-[var(--ease-micro)] focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60",
        fullWidth && "w-full",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
