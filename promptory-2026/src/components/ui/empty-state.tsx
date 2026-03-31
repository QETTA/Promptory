import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export function EmptyState(props: {
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  title: string;
}) {
  return (
    <Card variant="strong" className="overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="section-kicker text-[var(--brand-700)]">No Items Yet</p>
          <h2 className="mt-2 text-[1.55rem] font-semibold tracking-tight text-[var(--slate-950)]">{props.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{props.body}</p>
        </div>
        <div className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1.5 text-[11px] font-semibold text-[var(--slate-600)]">
          상태 비어 있음
        </div>
      </div>
      {props.ctaHref && props.ctaLabel ? (
        <Link
          href={props.ctaHref}
          className={cn(
            buttonVariants({ variant: "default" }),
            "mt-5",
          )}
        >
          {props.ctaLabel}
        </Link>
      ) : null}
    </Card>
  );
}
