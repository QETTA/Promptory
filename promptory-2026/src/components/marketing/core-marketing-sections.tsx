import type { ReactNode } from "react";

import { CTAButton } from "@/components/ui/cta-button";
import {
  BrandCard,
  BrandContainer,
  BrandHeading,
  BrandLink,
  RadiantAnimatedNumber,
  RadiantGradientOrb,
  RadiantLogoCloud,
  RadiantPlusGrid,
} from "@/components/marketing/template-foundation";
import { cn } from "@/lib/cn";

export type HeroAction = {
  href: string;
  label: string;
  variant?: "default" | "outline";
};

export function CoreMarketingHero({
  eyebrow,
  title,
  description,
  actions,
  notes,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions: HeroAction[];
  notes?: string[];
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-linear-to-b from-white via-[var(--surface-1)] to-[var(--surface-2)] py-20 sm:py-24">
      <RadiantGradientOrb palette="brand" className="-left-16 top-10 h-52 w-52" />
      <RadiantGradientOrb palette="glow" className="right-0 top-28 h-64 w-64" />
      <BrandContainer width="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14">
          <div className="space-y-6">
            <BrandHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              size="lg"
              actions={
                <>
                  {actions.map((action) => (
                    <CTAButton key={action.href} href={action.href} variant={action.variant} size="lg">
                      {action.label}
                    </CTAButton>
                  ))}
                </>
              }
            />
            {notes?.length ? (
              <div className="flex flex-wrap gap-2">
                {notes.map((note) => (
                  <span
                    key={note}
                    className="inline-flex rounded-full border border-[var(--line)] bg-white/90 px-3 py-1.5 text-sm text-[var(--ink-secondary)] shadow-[var(--shadow-xs)]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <BrandCard className="relative overflow-hidden border border-white/80 bg-white/90 p-0 shadow-[var(--shadow-md)] backdrop-blur">
            <RadiantPlusGrid className="opacity-40" />
            <div className="relative p-6 sm:p-8">{children}</div>
          </BrandCard>
        </div>
      </BrandContainer>
    </section>
  );
}

export function HomeHeroGraphic() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <SignalCard
          title="Slack UI"
          description="DM · App Home · shortcut · modal"
          tone="brand"
        />
        <ArrowMark />
        <SignalCard
          title="Approval"
          description="risk summary · approval card · expiry"
          tone="purple"
        />
        <ArrowMark />
        <SignalCard
          title="System of record"
          description="Jira · CRM · IAM · ERP"
          tone="emerald"
        />
      </div>
      <BrandCard tone="muted" className="rounded-[1.6rem] p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStackCard label="Request" body="질문이나 요청은 Slack 안에서 시작" />
          <MiniStackCard label="Decision" body="근거와 영향 범위를 카드로 요약" />
          <MiniStackCard label="Resolution" body="승인 후 실제 시스템에 결과 반영" />
        </div>
      </BrandCard>
      <RadiantLogoCloud
        items={[
          { label: "Slack" },
          { label: "Jira" },
          { label: "CRM" },
          { label: "Okta" },
          { label: "Notion" },
          { label: "ERP" },
        ]}
      />
    </div>
  );
}

export function SecurityHeroGraphic() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SignalCard title="실시간 조회" description="원문 장기 저장보다 필요한 시점 재조회" tone="brand" />
      <SignalCard title="권한 분리" description="역할별 범위와 허용 액션을 따로 관리" tone="purple" />
      <SignalCard title="사람 승인" description="중요한 작업은 approval required" tone="emerald" />
    </div>
  );
}

export function ArchitectureHeroGraphic() {
  return (
    <div className="space-y-3">
      {[
        ["Slack UI", "App Home · assistant · approval"],
        ["Agent Gateway", "intent · policy · retry"],
        ["MCP Tool Mesh", "Slack MCP + custom servers"],
        ["System of record", "Jira · Okta · CRM · GitHub"],
      ].map(([title, body], index) => (
        <div key={title} className="grid grid-cols-[1fr_auto] gap-3">
          <SignalCard title={title} description={body} tone={index % 2 === 0 ? "brand" : "purple"} />
          {index < 3 ? <ArrowMark vertical /> : <div />}
        </div>
      ))}
    </div>
  );
}

export function PilotHeroGraphic() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SignalCard title="30 Days" description="한 부서 · 한 요청 유형 · 파일럿 범위 합의" tone="brand" />
      <SignalCard title="60 Days" description="approval flow + metrics + failed case review" tone="purple" />
      <SignalCard title="90 Days" description="두 번째 pack 확장 또는 private deployment 검토" tone="emerald" />
    </div>
  );
}

export function MetricStrip({
  items,
}: {
  items: ReadonlyArray<{ value: number | string; suffix?: string; label: string; detail: string }>;
}) {
  return (
    <BrandContainer width="wide" className="-mt-10 sm:-mt-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <BrandCard key={`${item.label}-${item.value}`} className="rounded-[1.75rem] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-700)]">{item.label}</p>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                {typeof item.value === "number" ? <RadiantAnimatedNumber end={item.value} /> : item.value}
              </p>
              {item.suffix ? <p className="pb-1 text-sm text-[var(--ink-secondary)]">{item.suffix}</p> : null}
            </div>
            <p className="mt-3 text-sm/6 text-[var(--ink-secondary)]">{item.detail}</p>
          </BrandCard>
        ))}
      </div>
    </BrandContainer>
  );
}

export function InsightGrid({
  items,
  columns = 3,
}: {
  items: ReadonlyArray<{ eyebrow?: string; title: string; description: string; highlight?: boolean }>;
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 4
      ? "md:grid-cols-2 xl:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-2 xl:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <div className={cn("grid gap-4", gridClass)}>
      {items.map((item) => (
        <BrandCard
          key={item.title}
          className={cn(
            "h-full rounded-[1.8rem] p-5 sm:p-6",
            item.highlight && "border border-[var(--brand-200)] bg-[var(--brand-50)]",
          )}
        >
          {item.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">{item.eyebrow}</p>
          ) : null}
          <h3 className="mt-3 text-xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
          <p className="mt-3 text-sm/7 text-[var(--ink-secondary)]">{item.description}</p>
        </BrandCard>
      ))}
    </div>
  );
}

export function FlowRail({
  items,
}: {
  items: ReadonlyArray<{ step?: string; eyebrow?: string; title: string; description?: string; body?: string }>;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {items.map((item, index) => (
        <BrandCard key={`${item.title}-${index}`} tone={index === items.length - 1 ? "muted" : "default"} className="relative h-full rounded-[1.8rem] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-100)] text-sm font-semibold text-[var(--brand-700)]">
              {item.step ?? item.eyebrow ?? index + 1}
            </span>
            {index < items.length - 1 ? <span className="hidden text-[var(--line-hover)] xl:inline">→</span> : null}
          </div>
          <h3 className="mt-5 text-lg/7 font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
          <p className="mt-3 text-sm/7 text-[var(--ink-secondary)]">{item.description ?? item.body}</p>
        </BrandCard>
      ))}
    </div>
  );
}

export function TierGrid({
  items,
}: {
  items: ReadonlyArray<{ name: string; emphasis: string; bestFor: string; points: readonly string[] }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((tier, index) => (
        <BrandCard
          key={tier.name}
          className={cn(
            "h-full rounded-[1.8rem] p-5 sm:p-6",
            index === 1 && "border border-[var(--brand-200)] bg-[var(--brand-50)]",
          )}
        >
          <p className="text-sm font-semibold text-[var(--brand-700)]">{tier.emphasis}</p>
          <h3 className="mt-3 text-2xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{tier.name}</h3>
          <p className="mt-3 text-sm/6 text-[var(--ink-secondary)]">{tier.bestFor}</p>
          <ul className="mt-5 space-y-2 text-sm/6 text-[var(--ink-secondary)]">
            {tier.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-1 text-[var(--brand-700)]">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </BrandCard>
      ))}
    </div>
  );
}

export function LayerChain({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.title} className="space-y-3">
          <BrandCard className="rounded-[1.6rem] p-5 sm:p-6">
            <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-700)]">Layer {index + 1}</p>
                <h3 className="mt-2 text-xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
              </div>
              <p className="text-sm/7 text-[var(--ink-secondary)]">{item.body}</p>
            </div>
          </BrandCard>
          {index < items.length - 1 ? <div className="flex justify-center text-[var(--line-hover)]">↓</div> : null}
        </div>
      ))}
    </div>
  );
}

export function StackBlocks({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => (
        <BrandCard
          key={item.title}
          tone={index % 2 === 0 ? "default" : "muted"}
          className="rounded-[1.6rem] p-5 sm:p-6"
        >
          <p className="text-sm font-semibold text-[var(--brand-700)]">{item.title}</p>
          <p className="mt-3 text-sm/7 text-[var(--ink-secondary)]">{item.body}</p>
        </BrandCard>
      ))}
    </div>
  );
}

export function RoadmapPanels({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => (
        <BrandCard key={item.title} className="h-full rounded-[1.8rem] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-700)]">Stage {index + 1}</p>
          <h3 className="mt-3 text-2xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{item.title}</h3>
          <p className="mt-3 text-sm/7 text-[var(--ink-secondary)]">{item.body}</p>
        </BrandCard>
      ))}
    </div>
  );
}

export function ChecklistGrid({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <BrandCard className="rounded-[1.8rem] p-5 sm:p-6">
      <h3 className="text-2xl/8 font-semibold tracking-tight text-[var(--ink-primary)]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm/7 text-[var(--ink-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 text-[var(--brand-700)]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </BrandCard>
  );
}

export function InlineMetricList({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <BrandCard key={item} tone="muted" className="rounded-[1.4rem] p-4 text-sm/6 text-[var(--ink-secondary)]">
          {item}
        </BrandCard>
      ))}
    </div>
  );
}

export function CompactLinkRow({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <BrandLink key={link.href} href={link.href} variant="button">
          {link.label}
        </BrandLink>
      ))}
    </div>
  );
}

function SignalCard({
  title,
  description,
  tone,
}: {
  title: string;
  description: string;
  tone: "brand" | "purple" | "emerald";
}) {
  const toneClass =
    tone === "brand"
      ? "border-[var(--brand-200)] bg-[var(--brand-50)]"
      : tone === "purple"
        ? "border-purple-200 bg-purple-50"
        : "border-emerald-200 bg-emerald-50";

  return (
    <div className={cn("rounded-[1.4rem] border p-4 shadow-[var(--shadow-xs)]", toneClass)}>
      <p className="text-sm font-semibold text-[var(--ink-primary)]">{title}</p>
      <p className="mt-2 text-sm/6 text-[var(--ink-secondary)]">{description}</p>
    </div>
  );
}

function MiniStackCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-[1.2rem] bg-white px-4 py-3 shadow-[var(--shadow-xs)] ring-1 ring-[var(--line)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">{label}</p>
      <p className="mt-2 text-sm/6 text-[var(--ink-secondary)]">{body}</p>
    </div>
  );
}

function ArrowMark({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={cn("hidden text-center text-[var(--line-hover)] sm:block", vertical ? "self-center" : "")}>{vertical ? "↓" : "→"}</div>
  );
}
