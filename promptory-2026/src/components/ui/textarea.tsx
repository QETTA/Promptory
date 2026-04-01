import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldTextareaClass } from "@/components/ui/field";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Error state for accessibility */
  isInvalid?: boolean;
  /** ID of error message element for aria-describedby */
  errorId?: string;
  /** Auto-resize textarea height based on content */
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, errorId, autoResize, "aria-describedby": ariaDescribedBy, onInput, ...props }, ref) => {
    // Combine error message reference with any existing aria-describedby
    const describedBy = errorId
      ? ariaDescribedBy
        ? `${ariaDescribedBy} ${errorId}`
        : errorId
      : ariaDescribedBy;

    // Handle auto-resize
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.currentTarget;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }
      // Type cast needed due to React event type differences
      onInput?.(e as unknown as React.InputEvent<HTMLTextAreaElement>);
    };

    return (
      <textarea
        ref={ref}
        className={cn(
          fieldTextareaClass,
          isInvalid && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-focus-ring)]",
          autoResize && "resize-none overflow-hidden",
          className
        )}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        onInput={handleInput}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
