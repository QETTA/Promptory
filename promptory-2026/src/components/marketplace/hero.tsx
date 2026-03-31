import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { fullBleedHeroClass, heroToneClass } from "@/lib/promptory-theme";

export function Hero({
  eyebrow,
  title,
  body,
  actions,
  aside,
  theme = "market",
  tone = "dark",
}: {
  actions?: ReactNode;
  aside?: ReactNode;
  body?: ReactNode;
  eyebrow?: string;
  theme?: keyof typeof heroToneClass;
  title: ReactNode;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        isDark
          ? [fullBleedHeroClass, heroToneClass[theme]]
          : "relative overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(180deg,#fcfdff_0%,#f4f8ff_48%,#eff4fb_100%)] text-[var(--slate-950)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(circle_at_top_right,rgba(143,230,255,0.18),transparent_26%),radial-gradient(circle_at_left,rgba(79,124,255,0.22),transparent_32%)]"
            : "bg-[radial-gradient(circle_at_top_right,rgba(56,113,255,0.12),transparent_24%),radial-gradient(circle_at_left_top,rgba(201,219,255,0.52),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0),rgba(234,243,255,0.78))]",
        )}
      />
      {!isDark ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(34,80,221,0.24),transparent)]" />
      ) : null}
      <div
        className={cn(
          "relative mx-auto grid max-w-6xl gap-6 px-4 py-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)] lg:gap-10 lg:px-8 lg:py-14",
          isDark ? "relative" : "",
        )}
      >
        <div
          className={cn(
            "max-w-3xl",
            isDark
              ? ""
              : "rounded-[1.9rem] border border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] px-5 py-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.16)] sm:px-7 sm:py-7",
          )}
        >
          {eyebrow ? (
            <p className={cn("section-kicker", isDark ? "text-white/64" : "text-[var(--slate-500)]")}>{eyebrow}</p>
          ) : null}
          <h1 className={cn("poster-title mt-3", isDark ? "text-white" : "text-[var(--slate-950)]")}>{title}</h1>
          {body ? (
            <div className={cn("poster-copy mt-4 max-w-2xl space-y-3", isDark ? "text-white/78" : "text-[var(--slate-600)]")}>
              {body}
            </div>
          ) : null}
          {actions ? <div className="mt-6 flex flex-wrap gap-2.5">{actions}</div> : null}
          {!isDark ? (
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {[
                ["URL 입력", "유튜브 · 쿠팡 · 네이버 블로그"],
                ["Ask 진단", "병목과 목표를 먼저 고정"],
                ["실행 연결", "추천 스택을 바로 적용"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.18)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--slate-500)]">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="relative lg:pt-2">
            {!isDark ? (
              <div className="pointer-events-none absolute inset-x-4 top-5 -bottom-5 rounded-[2rem] bg-[linear-gradient(180deg,rgba(201,219,255,0.24),rgba(255,255,255,0))] blur-2xl" />
            ) : null}
            <div className="relative">{aside}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
