import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[-0.01em]",
  {
    variants: {
      variant: {
        default: "border-[rgba(34,80,221,0.14)] bg-[var(--surface-2)] text-[var(--brand-700)]",
        inverse: "border-white/18 bg-white/10 text-white",
        neutral: "border-[var(--line)] bg-white text-[var(--slate-600)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
