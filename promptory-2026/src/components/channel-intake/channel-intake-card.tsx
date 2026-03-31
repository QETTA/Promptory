"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import {
  supportedChannelCatalog,
  supportedChannelCount,
  supportedChannelExamples,
  supportedChannelHeadline,
} from "@/lib/channel-intake";
import { chipClass } from "@/lib/promptory-theme";
import { trackClientTelemetryEvent } from "@/lib/telemetry/client";

export function ChannelIntakeCard({
  action = "/optimize",
  body = "URL을 넣으면 공개 표면을 읽고 Ask 질문 준비를 시작합니다.",
  className,
  defaultValue = "",
  title = "채널 URL 넣고 진단 시작",
}: {
  action?: string;
  body?: string;
  className?: string;
  defaultValue?: string;
  title?: string;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");

    trackClientTelemetryEvent({
      name: "channel_url_submitted",
      payload: {
        action,
        hasValue: typeof url === "string" && url.trim().length > 0,
        url: typeof url === "string" ? url.trim().slice(0, 240) : null,
      },
    });
  }

  return (
    <Card variant="heroBright" className={cn("overflow-hidden p-4 sm:p-5", className)}>
      <div className="rounded-[1.5rem] border border-[rgba(34,80,221,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(242,247,255,0.98)_100%)] p-4 shadow-[0_20px_40px_-30px_rgba(34,80,221,0.26)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="section-kicker text-[var(--brand-700)]">Public Audit Entry</p>
            <h2 className="mt-2 text-[1.25rem] font-semibold tracking-tight text-[var(--slate-950)]">{title}</h2>
          </div>
          <div className="rounded-full border border-[rgba(34,80,221,0.12)] bg-white px-3 py-1 text-[11px] font-semibold text-[var(--brand-700)]">
            {supportedChannelCount}채널 지원
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--slate-600)]">{body}</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {supportedChannelCatalog.map((channel) => (
            <div
              key={channel.kind}
              className="rounded-[1rem] border border-[rgba(148,163,184,0.16)] bg-white/86 px-3 py-2 text-xs font-semibold text-[var(--slate-700)] shadow-[0_10px_20px_-22px_rgba(15,23,42,0.22)]"
            >
              {channel.label}
            </div>
          ))}
        </div>
      </div>

      <form action={action} className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        <div className="rounded-[1.4rem] border border-[var(--line-strong)] bg-white p-2 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.18)]">
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_132px]">
            <Input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              name="url"
              required
              defaultValue={defaultValue}
              placeholder="https://www.youtube.com/@yourchannel"
              className="h-12 border-transparent shadow-none focus:border-[rgba(34,80,221,0.2)] focus:ring-[rgba(56,113,255,0.1)]"
            />
            <Button type="submit" size="lg" className="h-12 w-full">
              진단 시작
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[1.1rem] border border-[var(--line)] bg-[rgba(248,250,252,0.9)] px-4 py-3 text-xs text-[var(--slate-600)]">
          <span className="font-semibold text-[var(--slate-700)]">입력 즉시</span>
          <span>채널 판별 → 공개 스냅샷 → Ask 준비</span>
        </div>
      </form>

      <div className="mt-4 grid gap-2">
        {[
          "1. URL과 채널 종류를 분류합니다.",
          "2. 공개 표면을 읽을 위치와 한계를 정리합니다.",
          "3. Ask 질문으로 병목을 고정합니다.",
        ].map((line) => (
          <div key={line} className="rounded-[1.05rem] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm leading-6 text-[var(--slate-700)]">
            {line}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slate-500)]">지원 채널 예시</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {supportedChannelExamples.map((example) => (
            <Link
              key={example.label}
              href={`${action}?url=${encodeURIComponent(example.url)}`}
              className={cn(chipClass, "px-3 py-1.5 text-[0.8rem]")}
            >
              {example.label}
            </Link>
          ))}
        </div>
      </div>

      <Card variant="tint" className="mt-4 rounded-[1.25rem] p-4 text-sm leading-6 text-[var(--slate-700)]">
        지금은 {supportedChannelHeadline}까지 공개 표면 확인, 질문 준비, 저장 레일이 연결돼 있습니다.
      </Card>
    </Card>
  );
}
