import type { ReactNode } from "react";

import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import type { StubSection } from "@/lib/marketing-stubs";

type LinkCta = {
  href: string;
  label: string;
};

type QuickFact = {
  label: string;
  value: string;
};

type StubPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  summary?: string;
  quickFacts?: QuickFact[];
  sections: StubSection[];
  primaryCta?: LinkCta;
  secondaryCta?: LinkCta;
  children?: ReactNode;
};

export function StubPageShell({
  eyebrow,
  title,
  description,
  summary,
  quickFacts,
  sections,
  primaryCta,
  secondaryCta,
  children,
}: StubPageShellProps) {
  return (
    <div className="pb-16">
      <section className="border-b border-[var(--line)] bg-[var(--surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            body={description}
            align="left"
            className="max-w-4xl"
          />

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta ? (
                <CTAButton href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </CTAButton>
              ) : null}
              {secondaryCta ? (
                <CTAButton href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </CTAButton>
              ) : null}
            </div>
          )}

          {quickFacts?.length ? (
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {quickFacts.map((fact) => (
                <Card key={fact.label} variant="tint" className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--slate-900)]">{fact.value}</p>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stub sections"
          title="현재 단계에서는 정보구조와 CTA만 고정합니다"
          body="템플릿 이식 전이라도 어떤 메시지와 어떤 링크 구조로 설명할지 먼저 고정해 두는 단계입니다."
          align="left"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.title} variant="strong" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--slate-950)]">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--slate-600)]">{section.body}</p>
              {section.points?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-[var(--slate-600)]">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-[var(--brand-600)]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>

        {children ? <div className="mt-12">{children}</div> : null}

        {summary ? (
          <Card variant="tint" className="mt-12 p-6">
            <p className="text-sm font-semibold text-[var(--slate-900)]">요약</p>
            <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{summary}</p>
          </Card>
        ) : null}
      </section>
    </div>
  );
}
