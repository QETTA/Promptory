import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "ui-button-base",
  {
    variants: {
      size: {
        default: "h-11 px-4 text-[0.93rem]",
        lg: "h-12 px-5 text-[0.96rem]",
        sm: "h-9 px-3.5 text-[0.84rem]",
        icon: "h-10 w-10",
      },
      variant: {
        default: "ui-button-default",
        outline: "ui-button-outline",
        subtle: "ui-button-subtle",
        ghost: "ui-button-ghost",
        glass: "ui-button-glass",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;
  /** Accessible label for loading state */
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, isLoading, loadingText, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ size, variant }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">{loadingText || "Loading..."}</span>
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
