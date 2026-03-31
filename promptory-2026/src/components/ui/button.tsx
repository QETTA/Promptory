import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border font-semibold tracking-[-0.01em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.96]",
  {
    variants: {
      size: {
        default: "h-11 px-4 text-[0.93rem]",
        lg: "h-12 px-5 text-[0.96rem]",
        sm: "h-9 px-3.5 text-[0.84rem]",
        icon: "h-10 w-10",
      },
      variant: {
        default:
          "border-blue-700 bg-blue-600 text-white shadow-[0_16px_30px_-20px_rgba(34,80,221,0.45)] hover:-translate-y-px hover:border-blue-800 hover:bg-blue-700 hover:shadow-[0_20px_40px_-20px_rgba(34,80,221,0.5)] active:translate-y-0 active:shadow-[0_8px_20px_-20px_rgba(34,80,221,0.4)]",
        outline:
          "border-slate-200 bg-white text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.14)] hover:-translate-y-px hover:border-blue-500/20 hover:bg-slate-50 hover:shadow-[0_14px_30px_-20px_rgba(15,23,42,0.18)] active:translate-y-0",
        subtle:
          "border-slate-100 bg-slate-50 text-slate-700 shadow-[0_10px_24px_-22px_rgba(15,23,42,0.12)] hover:border-slate-200 hover:bg-white hover:shadow-md active:scale-[0.98]",
        ghost:
          "border-transparent bg-transparent text-slate-900 hover:bg-slate-100 active:bg-slate-200",
        glass:
          "border-white/20 bg-white/10 text-white backdrop-blur-xl shadow-[0_20px_40px_-28px_rgba(2,6,23,0.36)] hover:bg-white/15 hover:border-white/30 active:bg-white/5",
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
