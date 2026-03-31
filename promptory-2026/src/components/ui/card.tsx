import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const cardVariants = cva("", {
  variants: {
    variant: {
      default: "rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_14px_30px_-26px_rgba(15,23,42,0.14)]",
      heroBright:
        "rounded-[1.75rem] border border-[rgba(34,80,221,0.12)] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_100%)] text-[var(--slate-950)] shadow-[0_18px_40px_-30px_rgba(34,80,221,0.16)]",
      heroGlass:
        "rounded-[1.5rem] border border-white/20 bg-white/10 text-white shadow-[0_20px_40px_-28px_rgba(2,6,23,0.36)] backdrop-blur-xl",
      strong: "rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--surface-1)] shadow-[0_14px_28px_-26px_rgba(15,23,42,0.16)]",
      tint: "rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-2)] shadow-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
