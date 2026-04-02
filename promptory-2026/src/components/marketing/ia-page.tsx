import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { PageContainer, PageSection } from "@/components/ui/page-container";

interface HeroAction {
  href: string;
  label: string;
  variant?: "default" | "outline";
}

export function IAPageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}) {
  return (
    <PageSection className="border-b border-[var(--line)] bg-[var(--surface-2)]">
      <PageContainer size="wide" padding="default" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Badge className="mb-4">{eyebrow}</Badge>
          <h1 className="poster-title break-keep text-[var(--slate-950)]">{title}</h1>
          <p className="body-copy-xl mt-5 max-w-2xl text-[var(--slate-600)]">{description}</p>
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryAction ? (
                <CTAButton href={primaryAction.href}>{primaryAction.label}</CTAButton>
              ) : null}
              {secondaryAction ? (
                <CTAButton href={secondaryAction.href} variant={secondaryAction.variant ?? "outline"}>
                  {secondaryAction.label}
                </CTAButton>
              ) : null}
            </div>
          )}
        </div>
      </PageContainer>
    </PageSection>
  );
}

export function IAPageSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <PageSection className="py-12 sm:py-16">
      <PageContainer size="wide">
        <div className="max-w-3xl">
          {eyebrow ? <p className="section-kicker text-[var(--slate-500)]">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-semibold text-[var(--slate-950)] sm:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-sm leading-7 text-[var(--slate-600)] sm:text-base">{description}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </PageContainer>
    </PageSection>
  );
}

export function IAFeatureGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string; meta?: string }[];
  columns?: 2 | 3 | 4;
}) {
  const columnClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={`grid gap-4 ${columnClass}`}>
      {items.map((item) => (
        <Card key={item.title} variant="strong" className="h-full rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-[var(--slate-950)]">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-600)]">{item.body}</p>
          {item.meta ? <p className="mt-4 text-xs text-[var(--slate-500)]">{item.meta}</p> : null}
        </Card>
      ))}
    </div>
  );
}

export function IABulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="rounded-3xl border border-[var(--line)] bg-white px-5 py-4 text-sm text-[var(--slate-700)] shadow-[var(--shadow-sm)]">
          {item}
        </li>
      ))}
    </ul>
  );
}
