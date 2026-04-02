import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface OatmealTextProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "light";
}

const sizeClasses = {
  sm: "text-sm/6",
  md: "text-base/7",
  lg: "text-lg/8",
} as const;

export function OatmealText({
  className,
  size = "md",
  tone = "default",
  ...props
}: OatmealTextProps) {
  return (
    <div
      className={cn(
        sizeClasses[size],
        tone === "default" ? "text-[var(--ink-secondary)]" : "text-white/80",
        className,
      )}
      {...props}
    />
  );
}
