import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CatalystPageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function CatalystPageHeader({
  className,
  eyebrow,
  title,
  description,
  actions,
  ...props
}: CatalystPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="space-y-2">
        {eyebrow ? <div className="text-sm font-medium text-[var(--brand-700)]">{eyebrow}</div> : null}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink-primary)]">{title}</h1>
          {description ? <p className="mt-2 max-w-3xl text-sm text-[var(--ink-secondary)]">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
