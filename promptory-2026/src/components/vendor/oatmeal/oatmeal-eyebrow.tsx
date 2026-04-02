import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function OatmealEyebrow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-sm/6 font-semibold text-[var(--brand-700)]",
        className,
      )}
      {...props}
    />
  );
}
