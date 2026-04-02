import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface OatmealHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tone?: "default" | "light";
}

export function OatmealHeading({
  className,
  tone = "default",
  ...props
}: OatmealHeadingProps) {
  return (
    <h1
      className={cn(
        "font-[var(--font-display)] text-4xl/11 font-medium tracking-tight text-balance sm:text-5xl/12",
        tone === "default" ? "text-[var(--ink-primary)]" : "text-white",
        className,
      )}
      {...props}
    />
  );
}
