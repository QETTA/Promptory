"use client";

import { useState } from "react";
import { WebsiteDiagnosisMock, CampaignBriefMock, KoreaLocalOpsMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { cn } from "@/lib/cn";

type DemoTone = "brand" | "emerald" | "indigo";
type DemoTabId = "website" | "campaign" | "korea";

const accentToneClass: Record<DemoTone, string> = {
  brand: "ui-accent-brand",
  emerald: "ui-accent-emerald",
  indigo: "ui-accent-indigo",
};

const tabs = [
  { id: "website", label: "Deal Desk", tone: "brand" },
  { id: "campaign", label: "People Ops", tone: "emerald" },
  { id: "korea", label: "IT Access", tone: "indigo" },
] as const satisfies readonly { id: DemoTabId; label: string; tone: DemoTone }[];

const tabContent = {
  website: {
    badge: "Deal Desk Approval Pack",
    tone: "brand",
    title: "할인 요청에서 승인과 CRM 반영까지",
    description:
      "영업팀이 Slack 스레드에서 예외 할인을 요청하면, 근거 확인과 approval card, 후속 시스템 반영까지 한 흐름으로 이어지는 데모입니다.",
    steps: [
      { step: "1", text: "할인 / 조건 예외 요청 접수" },
      { step: "2", text: "정책·CRM·유사 사례 확인" },
      { step: "3", text: "approval card에서 승인 / 반려" },
      { step: "4", text: "결과 회신 및 CRM 반영" },
    ],
  },
  campaign: {
    badge: "People Ops Request Pack",
    tone: "emerald",
    title: "직원 요청에서 승인과 실행까지",
    description:
      "출장, 계정 생성, 장비 요청 같은 반복 People Ops 흐름을 Slack intake와 approval, 결과 회신 중심으로 보여주는 데모입니다.",
    steps: [
      { step: "1", text: "직원 요청 접수" },
      { step: "2", text: "정책과 현재 상태 확인" },
      { step: "3", text: "팀장 / 운영자 approval" },
      { step: "4", text: "HRIS / IAM / 티켓 반영" },
    ],
  },
  korea: {
    badge: "IT Access & Security Pack",
    tone: "indigo",
    title: "권한 요청에서 만료일과 audit까지",
    description:
      "접근 권한 요청을 Slack에서 받고, 정책 확인과 approval, 만료일 부여, audit log까지 이어지는 guardrail 중심 흐름을 보여줍니다.",
    steps: [
      { step: "1", text: "권한 요청 접수" },
      { step: "2", text: "정책 / 현재 권한 / 영향 범위 확인" },
      { step: "3", text: "approval 및 만료일 설정" },
      { step: "4", text: "IAM / ITSM 반영과 audit 기록" },
    ],
  },
} as const satisfies Record<DemoTabId, { badge: string; tone: DemoTone; title: string; description: string; steps: readonly { step: string; text: string }[] }>;

const slackSurfaces = [
  {
    title: "Messages / DM / Channel",
    desc: "URL 입력, 1차 진단, 빠른 실행 버튼. 팀과 실시간으로 대화하며 결과를 공유합니다.",
    icon: "💬",
  },
  {
    title: "Modals",
    desc: "목표 설정, 결과 형식 선택, KR/EN 옵션. 집중된 입력을 받아 정확한 결과물을 만듭니다.",
    icon: "🪟",
  },
  {
    title: "Threads",
    desc: "생성된 비교표, 초안, 요약을 스레드로 정리해 팀이 쉽게 따라갈 수 있습니다.",
    icon: "🧵",
  },
  {
    title: "App Home",
    desc: "저장된 작업, 최근 실행 결과, 다시 열기. 사용자별 1:1 공간에서 히스토리를 관리합니다.",
    icon: "🏠",
  },
] as const;

export default function DemoSlackPage() {
  const [activeTab, setActiveTab] = useState<DemoTabId>("website");
  const content = tabContent[activeTab];
  const activeToneClass = accentToneClass[content.tone];

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="ui-demo-hero-surface py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: "var(--brand-200)", opacity: 0.22 }} />
          <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: "var(--indigo-200)", opacity: 0.18 }} />
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Slack Agent Demo"
              title="Slack 안에서 어떻게 작동하는지 보여드립니다"
              body="action pack별로 Slack에서 요청을 받고, 근거를 모으고, 승인 후 실행까지 이어지는 흐름을 확인하세요. 실제 화면은 더 많은 인터랙션을 포함합니다."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-[var(--line)] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2 sm:flex-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02]",
                    accentToneClass[tab.tone],
                    activeTab === tab.id
                      ? "ui-accent-fill"
                      : "bg-[var(--surface-1)] text-[var(--slate-600)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Slack Mock */}
            <AnimatedSection direction="left" className="flex justify-center">
              <div className="animate-float" style={{ animationDuration: "4s" }}>
                {activeTab === "website" && <WebsiteDiagnosisMock />}
                {activeTab === "campaign" && <CampaignBriefMock />}
                {activeTab === "korea" && <KoreaLocalOpsMock />}
              </div>
            </AnimatedSection>

            {/* Right: Explanation */}
            <AnimatedSection direction="right" delay={0.2} className="space-y-6">
              <div>
                <Badge className={cn("mb-3", activeToneClass, "ui-accent-fill")}>{content.badge}</Badge>
                <h2 className="section-title text-[var(--slate-950)] break-keep">{content.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--slate-600)]">
                  {content.description}
                </p>
              </div>
              <div className="space-y-3">
                {content.steps.map((item) => (
                  <Card key={item.step} variant="tint" className="p-3 flex items-center gap-3 card-hover">
                    <span className={cn("ui-step-marker-muted h-7 w-7 flex-shrink-0 text-xs", activeToneClass, "ui-accent-soft")}>
                      {item.step}
                    </span>
                    <span className="text-sm text-[var(--slate-700)]">{item.text}</span>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Slack Surfaces Explained */}
      <section className="bg-[var(--surface-2)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <SectionHeading
              eyebrow="Slack Surfaces"
              title="4개의 Slack Surface로 구성됩니다"
              badgeVariant="neutral"
            />
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {slackSurfaces.map((surface, index) => (
              <AnimatedSection key={surface.title} delay={index * 0.1}>
                <Card variant="strong" className="p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{surface.icon}</span>
                    <div>
                      <h3 className="font-semibold text-[var(--slate-950)]">{surface.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{surface.desc}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="ui-demo-cta-surface" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionHeading
              title="실제로 우리 팀 Slack에서 체험해보세요"
              body="데모 요청하시면 우리 팀의 first workflow 기준으로 실제 request-to-resolution 흐름을 보여드립니다."
            />
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 px-2 sm:px-0">
              <CTAButton href="/contact" size="lg" className="btn-shine hover:scale-105 transition-transform">
                데모 요청하기
              </CTAButton>
              <CTAButton href="/pilot" variant="outline" size="lg" className="hover-lift">
                파일럿 구조 보기
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
