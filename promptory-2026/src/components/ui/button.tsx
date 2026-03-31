import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border font-semibold tracking-[-0.01em] transition-all duration-150 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(56,113,255,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)]",
  {
    variants: {
      size: {
        default: "h-11 px-4 text-[0.93rem]",
        lg: "h-12 px-5 text-[0.96rem]",
        sm: "h-9 px-3.5 text-[0.84rem]",
      },
      variant: {
        default:
          "border-[var(--brand-700)] bg-[var(--brand-600)] text-white shadow-[0_16px_30px_-20px_rgba(34,80,221,0.45)] hover:-translate-y-px hover:border-[var(--brand-800)] hover:bg-[var(--brand-700)] active:translate-y-0",
        outline:
          "border-[var(--line-strong)] bg-white text-[var(--slate-950)] shadow-[0_10px_24px_-20px_rgba(15,23,42,0.14)] hover:-translate-y-px hover:border-[rgba(34,80,221,0.18)] hover:bg-[var(--surface-2)]",
        subtle:
          "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-800)] shadow-[0_10px_24px_-22px_rgba(15,23,42,0.12)] hover:border-[var(--line-strong)] hover:bg-white",
        ghost:
          "border-transparent bg-transparent text-[var(--slate-900)] hover:bg-[rgba(15,23,42,0.04)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ size, variant }), className)} {...props} />;
}

export { buttonVariants };
