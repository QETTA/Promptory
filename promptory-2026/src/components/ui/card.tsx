import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Card Preset Styles - Recommended way to style cards
 * Use these constants instead of variant prop for better flexibility
 */
export const cardPresets = {
  /** Default card with standard elevation */
  default: "ui-card-default rounded-[var(--radius-4xl)]",
  /** Hero bright with gradient background */
  heroBright: "ui-card-hero-bright rounded-[var(--radius-3xl)]",
  /** Glass effect for dark/gradient backgrounds */
  heroGlass: "ui-card-hero-glass rounded-[var(--radius-4xl)]",
  /** Strong emphasis with border */
  strong: "ui-card-strong rounded-[var(--radius-4xl)]",
  /** Tinted/muted background */
  tint: "ui-card-tint rounded-[var(--radius-4xl)]",
  /** Bento grid style card */
  bento: "card-bento",
  /** Elevated with hover lift effect */
  elevated: "card-elevated",
  /** Glass morphism effect */
  glass: "glass-card",
} as const;

/**
 * @deprecated Use cardPresets constants with className instead of variant prop
 * Example: <Card className={cardPresets.strong}>
 */
const cardVariants = cva("", {
  variants: {
    variant: {
      default: cardPresets.default,
      heroBright: cardPresets.heroBright,
      heroGlass: cardPresets.heroGlass,
      strong: cardPresets.strong,
      tint: cardPresets.tint,
      glass: cardPresets.glass,
      bento: cardPresets.bento,
      elevated: cardPresets.elevated,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** @deprecated Use className with cardPresets instead */
  variant?: keyof typeof cardPresets;
}

export function Card({ className, variant, ...props }: CardProps) {
  // Warn developers about deprecated variant usage in development
  if (process.env.NODE_ENV === "development" && variant) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Card] The "variant" prop is deprecated. Use className with cardPresets instead.\n` +
        `Example: <Card className={cardPresets.${variant}}>`
    );
  }

  return (
    <div
      className={cn(variant ? cardPresets[variant] : cardPresets.default, className)}
      {...props}
    />
  );
}
