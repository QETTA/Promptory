import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { PageContainer, PageSection } from "@/components/ui/page-container";

export type HeroAction = {
  href: string;
  label: string;
};

export type InfoCard = {
  title: string;
  description: string;
  eyebrow?: string;
  href?: string;
};

export type BulletPanel = {
  title: string;
  items: string[];
};

export function MarketingHero({
  eyebrow,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
}: {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}) {
  return (
    <PageSection className="border-b border-[var(--line)] bg-[var(--surface-1)]">
      <PageContainer className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 text-center">
          <div className="flex justify-center">
            <Badge className="w-fit">{eyebrow}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--slate-950)] sm:text-4xl lg:text-5xl break-keep">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-[var(--slate-600)] sm:text-base">
            {description}
          </p>
          {highlights && highlights.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--slate-700)]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col justify-center gap-3 pt-3 sm:flex-row">
              {primaryAction ? <CTAButton href={primaryAction.href}>{primaryAction.label}</CTAButton> : null}
              {secondaryAction ? (
                <CTAButton href={secondaryAction.href} variant="outline">
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

export function InfoCardGrid({
  title,
  description,
  cards,
}: {
  title: string;
  description?: string;
  cards: InfoCard[];
}) {
  return (
    <PageSection className="py-12 sm:py-16">
      <PageContainer>
        <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--slate-950)] break-keep">{title}</h2>
          {description ? (
            <p className="text-sm leading-7 text-[var(--slate-600)] sm:text-base">{description}</p>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Card key={`${card.title}-${card.href ?? "static"}`} className="h-full border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-sm)]">
              {card.eyebrow ? (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-600)]">
                  {card.eyebrow}
                </p>
              ) : null}
              <h3 className="text-lg font-semibold text-[var(--slate-950)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">{card.description}</p>
              {card.href ? (
                <div className="mt-5 pt-1">
                  <CTAButton href={card.href} variant="outline" size="sm">
                    자세히 보기
                  </CTAButton>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}

export function BulletPanelGrid({
  title,
  description,
  panels,
}: {
  title: string;
  description?: string;
  panels: BulletPanel[];
}) {
  return (
    <PageSection className="bg-[var(--surface-2)] py-12 sm:py-16">
      <PageContainer>
        <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--slate-950)] break-keep">{title}</h2>
          {description ? (
            <p className="text-sm leading-7 text-[var(--slate-600)] sm:text-base">{description}</p>
          ) : null}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {panels.map((panel) => (
            <Card key={panel.title} className="h-full border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <h3 className="text-lg font-semibold text-[var(--slate-950)]">{panel.title}</h3>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-7 text-[var(--slate-600)]">
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </PageContainer>
    </PageSection>
  );
}

export function FinalCtaSection({
  title,
  body,
  primaryAction,
  secondaryAction,
  aside,
}: {
  title: string;
  body: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  aside?: ReactNode;
}) {
  return (
    <PageSection className="py-12 sm:py-16">
      <PageContainer>
        <Card className="overflow-hidden border border-[var(--line)] bg-white p-8 shadow-[var(--shadow-md)]">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--slate-950)] break-keep">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--slate-600)] sm:text-base">{body}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={primaryAction.href}>{primaryAction.label}</CTAButton>
                {secondaryAction ? (
                  <CTAButton href={secondaryAction.href} variant="outline">
                    {secondaryAction.label}
                  </CTAButton>
                ) : null}
              </div>
            </div>
            {aside ? <div>{aside}</div> : null}
          </div>
        </Card>
      </PageContainer>
    </PageSection>
  );
}
