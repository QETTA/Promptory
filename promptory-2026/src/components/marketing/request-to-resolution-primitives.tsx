import type { ReactNode } from "react";

import { BrandCard, BrandContainer } from "@/components/marketing/template-foundation";
import { CTAButton } from "@/components/ui/cta-button";

export function MarketingHeroFrame({
  eyebrow,
  title,
  description,
  actions,
  aside,
  caption,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--line)] bg-gradient-to-b from-white via-[var(--surface-1)] to-[var(--surface-2)] py-16 sm:py-20">
      <BrandContainer width="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">{eyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--ink-secondary)]">{description}</p>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            {caption ? <p className="text-sm leading-6 text-[var(--ink-tertiary)]">{caption}</p> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </BrandContainer>
    </section>
  );
}

export function InlineCallout({
  title,
  body,
  actions,
}: {
  title: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <BrandCard className="rounded-[2rem] border border-[var(--line)] bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ink-secondary)]">{body}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </BrandCard>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{description}</p>
    </div>
  );
}

export function SimpleChecklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingTierCard({
  tier,
}: {
  tier: {
    name: string;
    badge: string;
    summary: string;
    commercial: string;
    fit: string;
    features: readonly string[];
  };
}) {
  return (
    <BrandCard className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{tier.badge}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{tier.name}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{tier.summary}</p>
      <div className="mt-4 rounded-2xl bg-[var(--surface-2)] p-4 text-sm leading-6 text-[var(--ink-secondary)]">
        <p className="font-semibold text-[var(--ink-primary)]">{tier.commercial}</p>
        <p className="mt-1">{tier.fit}</p>
      </div>
      <div className="mt-5">
        <SimpleChecklist items={tier.features} />
      </div>
    </BrandCard>
  );
}

export function PolicyMatrix({
  items,
}: {
  items: ReadonlyArray<{ action: string; policy: string; rationale: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white">
      <div className="grid grid-cols-1 border-b border-[var(--line)] bg-[var(--surface-2)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)] md:grid-cols-[1fr_1.3fr_1.7fr]">
        <span>Action</span>
        <span>Policy</span>
        <span>Why</span>
      </div>
      {items.map((item) => (
        <div key={item.action} className="grid grid-cols-1 gap-2 border-b border-[var(--line)] px-5 py-4 text-sm leading-7 text-[var(--ink-secondary)] last:border-b-0 md:grid-cols-[1fr_1.3fr_1.7fr]">
          <p className="font-semibold text-[var(--ink-primary)]">{item.action}</p>
          <p>{item.policy}</p>
          <p>{item.rationale}</p>
        </div>
      ))}
    </div>
  );
}

export function LayerRail({ items }: { items: ReadonlyArray<{ title: string; body: string }> }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.title}>
          <BrandCard className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">Layer {index + 1}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.body}</p>
          </BrandCard>
          {index < items.length - 1 ? <div className="py-2 text-center text-[var(--line-hover)]">↓</div> : null}
        </div>
      ))}
    </div>
  );
}

export function WorkflowRail({
  items,
}: {
  items: ReadonlyArray<{ step: string; title: string; description: string }>;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {items.map((item) => (
        <BrandCard key={item.step} className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{item.step}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.description}</p>
        </BrandCard>
      ))}
    </div>
  );
}

export function PilotPhaseRail({
  items,
}: {
  items: ReadonlyArray<{ title: string; duration: string; summary: string; deliverables: readonly string[] }>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <BrandCard key={item.title} className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{item.duration}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-secondary)]">{item.summary}</p>
          <div className="mt-5">
            <SimpleChecklist items={item.deliverables} />
          </div>
        </BrandCard>
      ))}
    </div>
  );
}

export function MetricStrip({
  items,
}: {
  items: ReadonlyArray<{ label: string; value: string | number; detail: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <BrandCard key={`${item.label}-${item.value}`} className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink-primary)]">{item.value}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-secondary)]">{item.detail}</p>
        </BrandCard>
      ))}
    </div>
  );
}
