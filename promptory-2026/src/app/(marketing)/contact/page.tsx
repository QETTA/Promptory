import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { BrandCard, BrandContainer } from "@/components/brand";
import {
  contactAfterInquirySteps,
  contactFitSignals,
  contactPreparationChecklist,
} from "@/lib/core-marketing-content";

interface ContactPageProps {
  searchParams: {
    type?: string;
    slug?: string;
    plan?: string;
    track?: string;
  };
}

export const metadata: Metadata = {
  title: "Contact — Promptory",
  description:
    "부서형 action pack, approval workflow, security review, private deployment까지 Promptory 도입 범위를 상담하는 contact page입니다.",
};

function resolveHero(type: string, plan: string, slug: string) {
  switch (type) {
    case "starter":
    case "pilot":
      return {
        badge: plan || "starter",
        subtitle: "4–6주 proof pilot",
        title: "한 부서 · 한 workflow 파일럿 범위를 같이 자릅니다",
        description:
          "가장 반복적이고 승인 중심인 요청 유형 하나를 고르고, Slack surface + approval card + 핵심 connector 2~3개만으로 proof를 만드는 범위를 먼저 정합니다.",
      };
    case "department":
      return {
        badge: plan || "department",
        subtitle: slug || "department pack expansion",
        title: "Department pack 운영 범위를 같이 설계합니다",
        description:
          "첫 workflow 검증 후 어떤 action pack을 추가할지, 어떤 KPI와 운영 cadence를 가져갈지 정리합니다.",
      };
    case "private":
      return {
        badge: plan || "private",
        subtitle: "private deployment / security review",
        title: "배포 · 보안 · 운영 범위를 먼저 맞춥니다",
        description:
          "customer environment deployment, delegated access, audit export, connector boundary 같은 보안 요구를 기준으로 private scope를 정리합니다.",
      };
    case "enterprise":
      return {
        badge: plan || "enterprise",
        subtitle: "multi-department expansion",
        title: "멀티 부서와 exec reporting 범위를 논의합니다",
        description:
          "department pack 여러 개를 묶고, exec briefing과 운영 economics까지 포함한 전사 확장 구조를 같이 설계합니다.",
      };
    case "architecture":
      return {
        badge: "architecture",
        subtitle: "agent + MCP + policy stack review",
        title: "현재 구조를 request-to-resolution 기준으로 검토합니다",
        description:
          "Slack UI, agent gateway, MCP boundary, policy, audit, system of record까지 어떤 식으로 분리할지 구조 관점에서 상담합니다.",
      };
    case "security":
      return {
        badge: "security",
        subtitle: "retention / approval / audit review",
        title: "보안과 데이터 보관 원칙부터 맞춥니다",
        description:
          "원문 최소 보관, delegated access, read/write/admin 경계, approval-by-default 원칙을 기준으로 도입 가능 범위를 정리합니다.",
      };
    case "education":
      return {
        badge: "education",
        subtitle: plan || slug || "diagnostic / hands-on / team workshop",
        title: "교육형 front-end부터 Starter 파일럿까지 이어지는 범위를 같이 정합니다",
        description:
          "직장인 AI 업무자동화 진단, 실습, 팀 워크숍 중 어떤 entry offer가 맞는지와, 이후 Starter 파일럿으로 이어질 수 있는지 함께 설계합니다.",
      };
    default:
      return {
        badge: "demo",
        subtitle: "internal app / action pack inquiry",
        title: "우리 팀 기준으로 first workflow를 먼저 찾아드립니다",
        description:
          "지금 가장 반복적이고 승인 중심인 요청 유형 하나를 알려주시면, Promptory가 어떤 surface와 어떤 connector로 proof를 만들지 먼저 제안합니다.",
      };
  }
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const inquiryType = searchParams.type || "demo";
  const packageSlug = searchParams.slug || "";
  const planType = searchParams.plan || searchParams.track || "";
  const hero = resolveHero(inquiryType, planType, packageSlug);

  return (
    <main className="bg-white text-[var(--ink-primary)]">
      <section className="border-b border-[var(--line)] bg-[var(--surface-2)] py-16 sm:py-20">
        <BrandContainer width="wide" className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="max-w-2xl space-y-5">
            <p className="inline-flex rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
              {hero.badge}
            </p>
            <p className="text-sm font-medium text-[var(--slate-500)]">{hero.subtitle}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-5xl sm:leading-[1.1]">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--ink-secondary)] sm:text-lg">
              {hero.description}
            </p>
          </div>

          <BrandCard className="border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">이런 팀에 잘 맞습니다</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {contactFitSignals.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>
        </BrandContainer>
      </section>

      <BrandContainer width="wide" className="grid gap-10 py-14 lg:grid-cols-[1fr_340px] lg:py-16">
        <ContactForm inquiryType={inquiryType} packageSlug={packageSlug} planType={planType} />

        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <BrandCard className="border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">준비하면 좋은 정보</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink-secondary)]">
              {contactPreparationChecklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </BrandCard>

          <BrandCard className="border border-[var(--line)] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">문의 후 진행</p>
            <div className="mt-4 space-y-5">
              {contactAfterInquirySteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-50)] text-sm font-semibold text-[var(--brand-700)]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink-primary)]">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--ink-secondary)]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </BrandCard>
        </aside>
      </BrandContainer>
    </main>
  );
}
