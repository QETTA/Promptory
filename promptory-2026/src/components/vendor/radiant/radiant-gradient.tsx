import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const paletteClasses = {
  brand:
    "from-[var(--brand-100)] via-[var(--color-indigo-100)] to-[var(--color-purple-100)]",
  glow:
    "from-[#fff1be] via-[#ee87cb] to-[#b060ff]",
  slate:
    "from-white via-[var(--surface-2)] to-[var(--surface-3)]",
} as const;

export interface RadiantGradientProps extends HTMLAttributes<HTMLDivElement> {
  palette?: keyof typeof paletteClasses;
}

export function RadiantGradient({ className, palette = "glow", ...props }: RadiantGradientProps) {
  return (
    <div
      className={cn(
        "bg-linear-to-br",
        paletteClasses[palette],
        className,
      )}
      {...props}
    />
  );
}

export function RadiantGradientOrb({ className, palette = "glow", ...props }: RadiantGradientProps) {
  return (
    <RadiantGradient
      palette={palette}
      className={cn(
        "absolute rounded-full blur-3xl opacity-60",
        className,
      )}
      {...props}
    />
  );
}
