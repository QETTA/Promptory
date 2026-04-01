import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldSelectClass } from "@/components/ui/field";

export interface SelectProps extends React.ComponentProps<"select"> {
  /** Error state for accessibility */
  isInvalid?: boolean;
  /** ID of error message element for aria-describedby */
  errorId?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, isInvalid, errorId, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    // Combine error message reference with any existing aria-describedby
    const describedBy = errorId
      ? ariaDescribedBy
        ? `${ariaDescribedBy} ${errorId}`
        : errorId
      : ariaDescribedBy;

    return (
      <span className="relative block">
        <select
          ref={ref}
          className={cn(
            fieldSelectClass,
            isInvalid && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-focus-ring)]",
            className
          )}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-slate-400)]">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M4 6.5 8 10l4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  },
);

Select.displayName = "Select";
