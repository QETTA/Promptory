import Link from "next/link";
import type { ReactNode } from "react";

import { CatalystBadge, CatalystShellCard } from "@/components/console/template-foundation";
import type { ConsoleTone } from "@/lib/console/types";
import { cn } from "@/lib/cn";

const timelineStateClasses = {
  done: {
    dot: "bg-[var(--color-emerald-500)] ring-[var(--color-success-bg)]",
    text: "text-[var(--ink-primary)]",
  },
  current: {
    dot: "bg-[var(--brand-600)] ring-[var(--brand-50)]",
    text: "text-[var(--ink-primary)]",
  },
  upcoming: {
    dot: "bg-[var(--surface-3)] ring-[var(--line)]",
    text: "text-[var(--ink-secondary)]",
  },
} as const;

export function ConsoleToneBadge({ children, tone }: { children: ReactNode; tone: ConsoleTone }) {
  const mappedTone = tone === "danger" ? "danger" : tone === "warning" ? "warning" : tone === "success" ? "success" : tone === "brand" ? "brand" : "neutral";
  return <CatalystBadge tone={mappedTone}>{children}</CatalystBadge>;
}

export function ConsoleLinkButton({
  href,
  children,
  tone = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary";
  className?: string;
}) {
  const isPrimary = tone === "primary";

  return (
    <Link
      href={href}
      style={isPrimary ? { color: "#ffffff" } : undefined}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition",
        isPrimary
          ? "bg-[var(--slate-950)] text-white hover:bg-[var(--slate-900)] hover:text-white focus-visible:text-white"
          : "bg-white text-[var(--ink-primary)] ring-1 ring-[var(--line)] hover:bg-[var(--surface-2)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ConsoleKvGrid({
  items,
  columns = 2,
}: {
  items: { label: string; value: ReactNode }[];
  columns?: 2 | 3;
}) {
  return (
    <dl className={cn("grid gap-4", columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">{item.label}</dt>
          <dd className="mt-2 text-sm leading-6 text-[var(--ink-primary)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ConsoleBulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-[var(--ink-secondary)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-600)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ConsoleTimeline({
  items,
}: {
  items: { step: string; detail: string; state: "done" | "current" | "upcoming" }[];
}) {
  return (
    <ol className="space-y-4">
      {items.map((item) => {
        const state = timelineStateClasses[item.state];
        return (
          <li key={item.step} className="flex gap-3">
            <span className={cn("mt-1.5 size-3 shrink-0 rounded-full ring-4", state.dot)} aria-hidden="true" />
            <div>
              <p className={cn("text-sm font-semibold", state.text)}>{item.step}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--ink-secondary)]">{item.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ConsoleInsightCard({
  title,
  description,
  actions,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <CatalystShellCard title={title} description={description} actions={actions}>
      {children}
    </CatalystShellCard>
  );
}
