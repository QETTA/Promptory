import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Section({
  actions,
  children,
  description,
  eyebrow,
  title,
  className,
}: {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  }) {
  return (
    <section className={cn("relative py-5 sm:py-7", className)}>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="section-kicker text-[var(--slate-500)]">{eyebrow}</p> : null}
          <h2 className="section-title mt-2 text-[var(--slate-950)]">{title}</h2>
          {description ? <div className="body-copy mt-2 max-w-2xl text-[var(--slate-600)]">{description}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2 lg:pt-1">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
