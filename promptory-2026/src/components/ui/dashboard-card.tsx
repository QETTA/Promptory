import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function DashboardCard({
  caption,
  className,
  value,
  detail,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  caption: ReactNode;
  detail?: ReactNode;
  value: ReactNode;
}) {
  return (
    <div
      className={cn(
        "ui-dashboard-card p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="section-kicker text-[var(--slate-500)]">{caption}</p>
        <div className="flex items-center gap-2">
          <div className="ui-status-dot-live" />
          <span className="text-[11px] font-semibold text-[var(--slate-500)]">live</span>
        </div>
      </div>
      <p className="metric-display mt-3 text-[var(--slate-950)]">{value}</p>
      {detail ? <p className="body-copy-sm mt-2 text-[var(--slate-600)]">{detail}</p> : null}
    </div>
  );
}
