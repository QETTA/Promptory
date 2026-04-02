import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CatalystShellCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function CatalystShellCard({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: CatalystShellCardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-xs)]",
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="space-y-1">
            {title ? <h2 className="text-lg font-semibold text-[var(--ink-primary)]">{title}</h2> : null}
            {description ? <p className="text-sm text-[var(--ink-secondary)]">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
