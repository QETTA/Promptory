import Link from "next/link";
import type { ReactNode } from "react";

import { BrandCard, BrandContainer } from "@/components/marketing/template-foundation";
import { cn } from "@/lib/cn";

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--line)] bg-gradient-to-b from-white via-[var(--surface-1)] to-[var(--surface-2)] py-16 sm:py-20">
      <BrandContainer width="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">{eyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--ink-secondary)]">{description}</p>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </BrandContainer>
    </section>
  );
}

export function MarketingInsetCallout({
  eyebrow,
  title,
  body,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <BrandCard className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-2)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{body}</p>
    </BrandCard>
  );
}

export function MarketingActionLink({
  href,
  children,
  tone = "primary",
}: {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
        tone === "primary"
          ? "bg-[var(--slate-950)] text-white hover:bg-[var(--slate-900)]"
          : "border border-[var(--line)] bg-white text-[var(--ink-primary)] hover:bg-[var(--surface-2)]",
      )}
    >
      {children}
    </Link>
  );
}
