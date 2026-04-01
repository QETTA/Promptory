import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "ui-badge-default",
        danger: "ui-badge-danger",
        inverse: "ui-badge-inverse",
        neutral: "ui-badge-neutral",
        success: "ui-badge-success",
        warning: "ui-badge-warning",
        info: "ui-badge-info",
      },
      size: {
        default: "ui-badge-size-default",
        sm: "ui-badge-size-sm",
        lg: "ui-badge-size-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Accessible label for screen readers */
  "aria-label"?: string;
}

export function Badge({ 
  className, 
  variant, 
  size,
  "aria-label": ariaLabel,
  children,
  ...props 
}: BadgeProps) {
  // Auto-generate aria-label from children if not provided
  const label = ariaLabel || (typeof children === "string" ? children : undefined);
  
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      aria-label={label}
      {...props}
    >
      {children}
    </span>
  );
}
