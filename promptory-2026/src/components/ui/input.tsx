import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldInputClass } from "@/components/ui/field";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Error state for accessibility */
  isInvalid?: boolean;
  /** ID of error message element for aria-describedby */
  errorId?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, errorId, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    // Combine error message reference with any existing aria-describedby
    const describedBy = errorId
      ? ariaDescribedBy
        ? `${ariaDescribedBy} ${errorId}`
        : errorId
      : ariaDescribedBy;

    return (
      <input
        ref={ref}
        className={cn(
          fieldInputClass,
          isInvalid && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-focus-ring)]",
          className
        )}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
