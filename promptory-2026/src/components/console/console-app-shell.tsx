import Link from "next/link";
import type { ReactNode } from "react";

import { PromptoryLogo } from "@/components/layout/promptory-logo";
import {
  CatalystApplicationLayout,
  CatalystBadge,
  CatalystSidebar,
  CatalystSidebarBody,
  CatalystSidebarFooter,
  CatalystSidebarHeader,
  CatalystSidebarHeading,
  CatalystSidebarItem,
  CatalystSidebarSection,
} from "@/components/console/template-foundation";
import { cn } from "@/lib/cn";

function IconFrame({ children }: { children: ReactNode }) {
  return <span className="flex size-4 items-center justify-center">{children}</span>;
}

function GridIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M3 3.75A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 3 8.25v-4.5Zm8 0A.75.75 0 0 1 11.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 11 8.25v-4.5Zm-8 8A.75.75 0 0 1 3.75 11h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 3 16.25v-4.5Zm8 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Z" />
      </svg>
    </IconFrame>
  );
}

function ListIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M4 5.75A.75.75 0 0 1 4.75 5h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 5.75Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Zm0 4.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Z" />
      </svg>
    </IconFrame>
  );
}

function CheckIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.313a1 1 0 0 1-1.42-.004L3.29 9.258a1 1 0 1 1 1.42-1.41l3.04 3.062 6.54-6.595a1 1 0 0 1 1.414-.006Z" clipRule="evenodd" />
      </svg>
    </IconFrame>
  );
}

function BoltIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M10.85 2.932a.75.75 0 0 0-1.381-.13l-4.5 8.75A.75.75 0 0 0 5.625 12H9l-1.125 5.063a.75.75 0 0 0 1.37.498l5.25-8.25A.75.75 0 0 0 13.875 8H10.75l.1-5.068Z" />
      </svg>
    </IconFrame>
  );
}

function PlugIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M6.5 2.75a.75.75 0 0 1 1.5 0v2h4v-2a.75.75 0 0 1 1.5 0v2h.25A1.75 1.75 0 0 1 15.5 6.5v.75A4.75 4.75 0 0 1 11 11.96V14.5h1.25a.75.75 0 0 1 0 1.5H7.75a.75.75 0 0 1 0-1.5H9.5v-2.54A4.75 4.75 0 0 1 4.5 7.25V6.5A1.75 1.75 0 0 1 6.25 4.75h.25v-2Z" />
      </svg>
    </IconFrame>
  );
}

function ShieldIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path fillRule="evenodd" d="M10 1.944 4 4.5v4.375c0 3.585 2.126 6.827 5.415 8.257a1.5 1.5 0 0 0 1.17 0C13.874 15.702 16 12.46 16 8.875V4.5l-6-2.556Z" clipRule="evenodd" />
      </svg>
    </IconFrame>
  );
}

function BookIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M4.75 3A1.75 1.75 0 0 0 3 4.75v10.5C3 16.216 3.784 17 4.75 17h9.5A1.75 1.75 0 0 0 16 15.25V4.75A1.75 1.75 0 0 0 14.25 3h-9.5Zm.75 2.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 5.5 5.5Zm0 3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 5.5 8.5Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
      </svg>
    </IconFrame>
  );
}

function ChartIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M3.75 2.5a.75.75 0 0 1 .75.75v12.5h11.75a.75.75 0 0 1 0 1.5H3.75A1.25 1.25 0 0 1 2.5 16.5V3.25a.75.75 0 0 1 .75-.75Zm10.28 2.22a.75.75 0 0 1 1.06 1.06l-3.01 3.012a.75.75 0 0 1-1.06 0L9.5 7.268 6.53 10.24a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l1.52 1.52 2.48-2.48Z" />
      </svg>
    </IconFrame>
  );
}

const navSections: ReadonlyArray<{
  title: string;
  items: ReadonlyArray<{
    href: string;
    label: string;
    icon: ReactNode;
    exact?: boolean;
  }>;
}> = [
  {
    title: "Operations",
    items: [
      { href: "/console", label: "Dashboard", icon: <GridIcon />, exact: true },
      { href: "/console/requests", label: "Requests", icon: <ListIcon /> },
      { href: "/console/approvals", label: "Approvals", icon: <CheckIcon /> },
      { href: "/console/runs", label: "Runs", icon: <BoltIcon /> },
    ],
  },
  {
    title: "Governance",
    items: [
      { href: "/console/connectors", label: "Connectors", icon: <PlugIcon /> },
      { href: "/console/policies", label: "Policies", icon: <ShieldIcon /> },
      { href: "/console/audit", label: "Audit", icon: <BookIcon /> },
      { href: "/console/reports", label: "Reports", icon: <ChartIcon /> },
    ],
  },
];

function ConsoleTopbar() {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[var(--ink-primary)]">Promptory Console</p>
        <p className="text-sm text-[var(--ink-secondary)]">
          approval-driven console shell · internal app pilot · request-to-resolution ops
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CatalystBadge tone="brand">Starter internal app</CatalystBadge>
        <CatalystBadge tone="neutral">mock console shell</CatalystBadge>
        <CatalystBadge tone="success">Slack UI + Agent + MCP</CatalystBadge>
        <Link
          href="/pilot"
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition",
            "bg-[var(--slate-950)] text-white hover:bg-[var(--slate-900)]",
          )}
        >
          pilot page
        </Link>
      </div>
    </div>
  );
}

export function ConsoleAppShell({ children }: { children: ReactNode }) {
  const sidebar = (
    <CatalystSidebar>
      <CatalystSidebarHeader>
        <Link href="/" className="inline-flex">
          <PromptoryLogo className="text-white [&_*]:text-white" compactOnMobile showTaglineOnMobile={false} />
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          <CatalystBadge tone="brand">Internal app</CatalystBadge>
          <CatalystBadge tone="neutral" className="bg-white/10 text-white ring-white/15">
            console MVP
          </CatalystBadge>
        </div>
      </CatalystSidebarHeader>

      <CatalystSidebarBody>
        {navSections.map((section) => (
          <CatalystSidebarSection key={section.title}>
            <CatalystSidebarHeading>{section.title}</CatalystSidebarHeading>
            {section.items.map((item) => (
              <CatalystSidebarItem key={item.href} href={item.href} icon={item.icon} exact={item.exact}>
                {item.label}
              </CatalystSidebarItem>
            ))}
          </CatalystSidebarSection>
        ))}
      </CatalystSidebarBody>

      <CatalystSidebarFooter>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <p className="font-semibold text-white">Scope note</p>
          <p className="mt-2 leading-6">
            이 영역은 mock data 기반 console shell입니다. 실제 auth guard, runtime, connector write path는
            T07에서 연결합니다.
          </p>
        </div>
      </CatalystSidebarFooter>
    </CatalystSidebar>
  );

  return <CatalystApplicationLayout sidebar={sidebar} topbar={<ConsoleTopbar />}>{children}</CatalystApplicationLayout>;
}
