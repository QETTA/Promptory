import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function RadiantPlusGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-60",
        "[background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:36px_36px]",
        className,
      )}
      {...props}
    />
  );
}
