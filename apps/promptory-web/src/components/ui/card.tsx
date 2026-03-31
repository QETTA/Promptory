import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import styles from "./card.module.css";

const cardVariantClass = {
  default: styles.default,
  heroBright: styles.heroBright,
  heroGlass: styles.heroGlass,
  strong: styles.strong,
  tint: styles.tint,
} as const;

type CardVariant = keyof typeof cardVariantClass;

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<{
      variant: CardVariant;
    }> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(styles.base, cardVariantClass[variant ?? "default"], className)} {...props} />;
}
