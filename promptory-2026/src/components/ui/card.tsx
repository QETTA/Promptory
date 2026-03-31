import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const cardVariants = cva("", {
  variants: {
    variant: {
      default: "ui-card-default",
      heroBright: "ui-card-hero-bright",
      heroGlass: "ui-card-hero-glass",
      strong: "ui-card-strong",
      tint: "ui-card-tint",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
