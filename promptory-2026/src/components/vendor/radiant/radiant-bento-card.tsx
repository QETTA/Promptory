import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { OatmealEyebrow, OatmealText } from "@/components/vendor/oatmeal";
import { RadiantPlusGrid } from "./radiant-plus-grid";

export interface RadiantBentoCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  graphic?: ReactNode;
  tone?: "default" | "dark";
}

export function RadiantBentoCard({
  className,
  eyebrow,
  title,
  description,
  graphic,
  tone = "default",
  ...props
}: RadiantBentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] ring-1 shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
        tone === "default"
          ? "bg-white text-[var(--ink-primary)] ring-[var(--line)]"
          : "bg-[var(--slate-950)] text-white ring-white/10",
        className,
      )}
      {...props}
    >
      <div className="relative h-64 overflow-hidden border-b border-[var(--line)]/80 bg-[var(--surface-2)]">
        <RadiantPlusGrid />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/80" />
        <div className="relative h-full">{graphic}</div>
      </div>
      <div className="relative space-y-3 p-8">
        <OatmealEyebrow className={tone === "dark" ? "text-white/70" : undefined}>{eyebrow}</OatmealEyebrow>
        <h3 className="text-2xl/8 font-medium tracking-tight">{title}</h3>
        {description ? (
          <OatmealText tone={tone === "dark" ? "light" : "default"}>{description}</OatmealText>
        ) : null}
      </div>
    </div>
  );
}
