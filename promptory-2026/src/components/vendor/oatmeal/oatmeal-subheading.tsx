import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface OatmealSubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tone?: "default" | "light";
}

export function OatmealSubheading({
  className,
  tone = "default",
  ...props
}: OatmealSubheadingProps) {
  return (
    <h2
      className={cn(
        "font-[var(--font-display)] text-3xl/10 font-medium tracking-tight text-balance sm:text-4xl/11",
        tone === "default" ? "text-[var(--ink-primary)]" : "text-white",
        className,
      )}
      {...props}
    />
  );
}
