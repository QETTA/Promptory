import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import styles from "./badge.module.css";

const variantClass = {
  default: styles.default,
  inverse: styles.inverse,
  neutral: styles.neutral,
} as const;

type BadgeVariant = keyof typeof variantClass;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    Partial<{
      variant: BadgeVariant;
    }> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(styles.base, variantClass[variant ?? "default"], className)}
      {...props}
    />
  );
}
