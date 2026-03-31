import * as React from "react";

import { cn } from "@/lib/cn";
import styles from "./button.module.css";

const sizeClass = {
  default: styles.sizeDefault,
  lg: styles.sizeLg,
  sm: styles.sizeSm,
} as const;

const variantClass = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  subtle: styles.variantSubtle,
  ghost: styles.variantGhost,
} as const;

type ButtonSize = keyof typeof sizeClass;
type ButtonVariant = keyof typeof variantClass;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<{
      size: ButtonSize;
      variant: ButtonVariant;
    }> {}

export function Button({ className, size, variant, ...props }: ButtonProps) {
  const resolvedSize = size ?? "default";
  const resolvedVariant = variant ?? "default";

  return (
    <button
      className={cn(styles.base, sizeClass[resolvedSize], variantClass[resolvedVariant], className)}
      {...props}
    />
  );
}

export function buttonVariants({
  size = "default",
  variant = "default",
}: {
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
} = {}) {
  return cn(styles.base, sizeClass[size ?? "default"], variantClass[variant ?? "default"]);
}
