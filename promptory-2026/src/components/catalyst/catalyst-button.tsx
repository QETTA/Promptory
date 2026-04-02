import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const toneClasses = {
  primary: "bg-[var(--slate-950)] text-white hover:bg-[var(--slate-900)]",
  secondary: "bg-white text-[var(--ink-primary)] ring-1 ring-[var(--line)] hover:bg-[var(--surface-2)]",
  subtle: "bg-[var(--surface-2)] text-[var(--ink-primary)] hover:bg-[var(--surface-3)]",
} as const;

export interface CatalystButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: keyof typeof toneClasses;
}

export function CatalystButton({ className, tone = "primary", type = "button", ...props }: CatalystButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-60",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
