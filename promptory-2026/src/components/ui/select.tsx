import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldSelectClass } from "@/components/ui/field";

export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, ...props }, ref) => {
    return (
      <span className="relative block">
        <select
          ref={ref}
          className={cn(fieldSelectClass, className)}
          {...props}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--slate-400)]">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M4 6.5 8 10l4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  },
);

Select.displayName = "Select";
