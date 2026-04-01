import * as React from "react";

import { cn } from "@/lib/cn";

export interface LabelProps extends React.ComponentProps<"label"> {
  /** Marks the field as required */
  isRequired?: boolean;
  /** ID of the form element this label is for */
  htmlFor?: string;
}

/**
 * Label component with consistent form styling
 * Uses CSS variables for theming
 * Supports required indicator and accessibility
 */
export function Label({ className, isRequired, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]",
        className
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">*</span>
      )}
      {isRequired && (
        <span className="sr-only">(required)</span>
      )}
    </label>
  );
}
