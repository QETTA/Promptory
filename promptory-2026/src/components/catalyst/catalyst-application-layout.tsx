"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CatalystApplicationLayoutProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M3 5.75A.75.75 0 0 1 3.75 5h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.75Zm0 4.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10Zm0 4.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M5.22 5.22a.75.75 0 0 1 1.06 0L10 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06L8.94 10 5.22 6.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

export function CatalystApplicationLayout({
  sidebar,
  topbar,
  children,
}: CatalystApplicationLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--surface-2)] text-[var(--ink-primary)] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <div className="hidden lg:block">{sidebar}</div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-[rgba(15,23,42,0.45)] lg:hidden">
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw]">{sidebar}</div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white text-[var(--ink-primary)] shadow-[var(--shadow-sm)]"
            aria-label="Close navigation"
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/90 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink-primary)]"
              aria-label="Open navigation"
            >
              <MenuIcon />
            </button>
            <div className="text-sm font-semibold text-[var(--ink-secondary)]">Promptory Console</div>
            <div className="size-10" aria-hidden="true" />
          </div>
        </header>

        {topbar ? <div className="border-b border-[var(--line)] bg-white">{topbar}</div> : null}

        <main className="p-4 sm:p-6 lg:p-8">
          <div className={cn("mx-auto max-w-7xl")}>{children}</div>
        </main>
      </div>
    </div>
  );
}
