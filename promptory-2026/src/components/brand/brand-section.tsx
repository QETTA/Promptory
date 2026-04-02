import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { BrandContainer } from "./brand-container";
import { BrandHeading } from "./brand-heading";

const toneClasses = {
  default: "bg-transparent",
  muted: "bg-[var(--surface-2)]",
  elevated: "bg-white",
  dark: "bg-[var(--slate-950)] text-white",
} as const;

export interface BrandSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: keyof typeof toneClasses;
  width?: "narrow" | "default" | "wide" | "full";
  contentClassName?: string;
}

export function BrandSection({
  className,
  eyebrow,
  title,
  description,
  actions,
  tone = "default",
  width = "default",
  children,
  contentClassName,
  ...props
}: BrandSectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", toneClasses[tone], className)} {...props}>
      <BrandContainer width={width} className="space-y-10 sm:space-y-14">
        {title ? (
          <BrandHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            actions={actions}
          />
        ) : null}
        <div className={cn("space-y-6", contentClassName)}>{children}</div>
      </BrandContainer>
    </section>
  );
}
