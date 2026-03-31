import * as React from "react";

import { cn } from "@/lib/cn";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-[var(--slate-700)]", className)}
      {...props}
    />
  );
}
