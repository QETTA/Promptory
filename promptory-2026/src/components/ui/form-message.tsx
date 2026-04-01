import * as React from "react";
import { cn } from "@/lib/cn";

export interface FormMessageProps extends React.ComponentProps<"p"> {
  /** Error message content */
  children?: React.ReactNode;
  /** Unique ID for aria-describedby linking */
  id: string;
  /** Visual variant */
  variant?: "error" | "warning" | "success" | "info";
}

/**
 * Accessible form message component for errors, warnings, and hints
 * Automatically links to form inputs via aria-describedby
 */
export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, id, variant = "error", children, ...props }, ref) => {
    if (!children) return null;

    const variantClasses = {
      error: "text-[var(--color-error)]",
      warning: "text-[var(--color-warning)]",
      success: "text-[var(--color-success)]",
      info: "text-[var(--color-info)]",
    };

    return (
      <p
        ref={ref}
        id={id}
        role="alert"
        className={cn(
          "mt-1.5 text-sm",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

/**
 * Hook to generate consistent IDs for form accessibility
 * Returns baseId, errorId, and describedBy for linking label, input, and error
 */
export function useFormFieldId(fieldName: string) {
  const baseId = React.useId();
  const fieldId = `${baseId}-${fieldName}`;
  const errorId = `${fieldId}-error`;

  return {
    fieldId,
    errorId,
    describedBy: (hasError: boolean) => hasError ? errorId : undefined,
  };
}
