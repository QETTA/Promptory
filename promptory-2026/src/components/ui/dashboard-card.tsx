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
        "rounded-[1.2rem] border border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] p-4 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.16)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="section-kicker text-[var(--slate-500)]">{caption}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--brand-500)] shadow-[0_0_0_6px_rgba(56,113,255,0.1)]" />
          <span className="text-[11px] font-semibold text-[var(--slate-500)]">live</span>
        </div>
      </div>
      <p className="mt-3 font-display text-[1.9rem] leading-none tracking-[-0.04em] text-[var(--slate-950)]">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{detail}</p> : null}
    </div>
  );
}
