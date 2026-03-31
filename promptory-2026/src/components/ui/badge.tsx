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
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
