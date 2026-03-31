import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedSection, Accordion } from "@/components/ui/animated-section";
import { SlackChatMock } from "@/components/marketing/SlackChatMock";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import {
  packageDefinitions,
  type PackageSlug,
  type PackageDefinition,
} from "@/lib/promptory-content";
import { cn } from "@/lib/cn";

// Generate metadata for each package
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageDefinitions[slug as PackageSlug];

  if (!pkg) {
    return {
      title: "페이지를 찾을 수 없습니다 - 프롬프토리",
    };
  }

  return {
    title: `${pkg.title} - 프롬프토리`,
    description: pkg.fullDescription,
  };
}

// Generate static params for all packages
export async function generateStaticParams() {
  return Object.keys(packageDefinitions).map((slug) => ({
    slug,
  }));
}

// Color theme configurations
const colorThemes = {
  blue: {
    badge: "bg-[var(--brand-600)] hover:bg-[var(--brand-700)] shadow-[var(--shadow-glow)]",
    gradient: "from-slate-50 via-brand-50/30 to-indigo-50/20",
    accent: "text-[var(--brand-600)]",
    bgLight: "bg-brand-50",
    bgLighter: "bg-brand-100",
    textLight: "text-[var(--brand-600)]",
    gradientText: "gradient-text",
    ctaButton: "bg-[var(--brand-600)] hover:bg-[var(--brand-700)]",
    border: "border-brand-200",
    hoverBorder: "hover:border-brand-300",
    numberBg: "bg-brand-100 text-[var(--brand-600)]",
    icon: "text-brand-500",
    stepNumber: "text-brand-200",
  },
  emerald: {
    badge: "bg-emerald-600 hover:bg-emerald-700 shadow-[var(--shadow-glow-emerald)]",
    gradient: "from-slate-50 via-emerald-50/30 to-teal-50/20",
    accent: "text-emerald-600",
    bgLight: "bg-emerald-50",
    bgLighter: "bg-emerald-100",
    textLight: "text-emerald-600",
    gradientText: "gradient-text-emerald",
    ctaButton: "bg-emerald-600 hover:bg-emerald-700",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    numberBg: "bg-emerald-100 text-emerald-600",
    icon: "text-emerald-500",
    stepNumber: "text-emerald-200",
  },
  indigo: {
    badge: "bg-indigo-600 hover:bg-indigo-700 shadow-[var(--shadow-glow-indigo)]",
    gradient: "from-slate-50 via-indigo-50/30 to-purple-50/20",
    accent: "text-indigo-600",
    bgLight: "bg-indigo-50",
    bgLighter: "bg-indigo-100",
    textLight: "text-indigo-600",
    gradientText: "gradient-text-indigo",
    ctaButton: "bg-indigo-600 hover:bg-indigo-700",
    border: "border-indigo-200",
    hoverBorder: "hover:border-indigo-300",
    numberBg: "bg-indigo-100 text-indigo-600",
    icon: "text-indigo-500",
    stepNumber: "text-indigo-200",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = packageDefinitions[slug as PackageSlug];

  if (!pkg) {
    notFound();
  }

  const theme = colorThemes[pkg.color];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section
        className={cn(
          "py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br",
          theme.gradient
        )}
      >
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={cn(
              "absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl animate-pulse-soft",
              theme.bgLight
            )}
          />
          <div
            className={cn(
              "absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl animate-pulse-soft",
              theme.bgLighter
            )}
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection direction="left" className="flex flex-col gap-6">
              <Badge className={cn("w-fit", theme.badge)}>{pkg.badge}</Badge>
              <h1 className="poster-title text-[var(--slate-950)]">
                {pkg.heroTitle.line1}
                <br />
                <span className={theme.gradientText}>{pkg.heroTitle.highlight}</span>
                {pkg.heroTitle.line2 && (
                  <>
                    <br />
                    {pkg.heroTitle.line2}
                  </>
                )}
              </h1>
              <p className="body-copy-xl text-[var(--slate-600)]">{pkg.heroBody}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton
                  href="/contact"
                  size="lg"
                  className={cn(
                    "btn-shine hover:scale-105 transition-transform",
                    theme.ctaButton
                  )}
                >
                  데모 요청하기
                </CTAButton>
                <CTAButton
                  href="/demo/slack"
                  variant="outline"
                  size="lg"
                  className={cn("hover-lift", theme.border, "hover:bg-[var(--surface-2)]")}
                >
                  샘플 대화 보기
                </CTAButton>
              </div>
              <p className="body-copy-xs pt-2 text-[var(--slate-500)]">{pkg.microCopy}</p>
            </AnimatedSection>

            <AnimatedSection
              direction="right"
              delay={0.2}
              className="flex justify-center lg:justify-end"
            >
              <div className="animate-float" style={{ animationDuration: "4s" }}>
                <SlackChatMock
                  title="Promptory Agent"
                  messages={pkg.conversation.messages}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Best Fit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Best fit"
            title="이런 팀에게 맞습니다"
            align="center"
            className="mb-10"
            badgeVariant="neutral"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="tint" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className={cn("text-lg", theme.icon)}>✓</span>
                  이런 상황에 빠르게 체감됩니다
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {pkg.bestFit.good.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={cn("mt-0.5", theme.icon)}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="tint" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="text-slate-400 text-lg">×</span>
                  Not for everyone
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {pkg.bestFit.notGood.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">−</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works in Slack Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pkg.slackFlow.eyebrow}
            title={pkg.slackFlow.title}
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pkg.slackFlow.steps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <Card variant="strong" className="p-5 card-hover h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span
                      className={cn("text-2xl font-bold", theme.stepNumber)}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Outputs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pkg.outputs.eyebrow}
            title={pkg.outputs.title}
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <div
            className={cn(
              "grid gap-4",
              pkg.outputs.items.length <= 4
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {pkg.outputs.items.map((output, index) => (
              <AnimatedSection key={output.title} delay={index * 0.1}>
                <Card variant="tint" className="p-5 card-hover h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{output.icon}</span>
                    <h3 className="font-semibold text-slate-950">{output.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{output.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Example Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pkg.conversation.eyebrow}
            title={pkg.conversation.title}
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <AnimatedSection delay={0.2}>
            <Card variant="strong" className="p-6 shadow-lg">
              <div className="space-y-6">
                {pkg.conversation.messages.map((message, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                    style={{
                      animation: "fadeInUp 0.3s ease-out forwards",
                      animationDelay: `${index * 100}ms`,
                      opacity: 0,
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center text-sm font-bold",
                        message.type === "user" ? "slack-user-avatar" : "slack-agent-avatar"
                      )}
                    >
                      {message.type === "user" ? "U" : "P"}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-bold",
                          message.type === "user" ? "text-slate-900" : "slack-agent-name"
                        )}
                      >
                        {message.type === "user" ? "사용자" : "Promptory Agent"}
                      </p>
                      <p className="slack-message-bubble mt-1 px-3 py-2 text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                      {message.buttons && message.buttons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.buttons.map((btn, btnIndex) => (
                            <span
                              key={btnIndex}
                              className="slack-action-chip cursor-pointer px-3 py-1.5 text-xs font-medium"
                            >
                              {btn}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Rollout Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pkg.rollout.eyebrow}
            title={pkg.rollout.title}
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pkg.rollout.items.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Card variant="tint" className="p-4 flex items-center gap-3 card-hover">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center flex-shrink-0",
                      theme.numberBg
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={pkg.included.eyebrow}
            title={pkg.included.title}
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Included
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {pkg.included.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card variant="strong" className="p-6 card-hover h-full">
                <h3 className="font-semibold text-slate-950 mb-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                      theme.bgLight,
                      theme.textLight
                    )}
                  >
                    +
                  </span>
                  Optional
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {pkg.included.optionalItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className={theme.icon}>−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust Boundary Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className={cn("text-sm font-semibold mb-2", theme.accent)}>
              {pkg.trustBoundary.eyebrow}
            </p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
              {pkg.trustBoundary.title}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-7">
              {pkg.trustBoundary.body}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="자주 묻는 질문"
            align="center"
            className="mb-10"
            badgeVariant="neutral"
            eyebrowClassName={theme.accent}
          />

          <AnimatedSection delay={0.2}>
            <Accordion items={pkg.faq} />
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className={cn(
          "py-16 relative overflow-hidden",
          pkg.color === "blue" && "bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/80",
          pkg.color === "emerald" && "bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/80",
          pkg.color === "indigo" && "bg-gradient-to-br from-indigo-50/80 via-slate-50 to-purple-50/80"
        )}
      >
        <div
          className={cn(
            "absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl",
            theme.bgLight
          )}
        />
        <div
          className={cn(
            "absolute bottom-10 right-10 w-48 h-48 rounded-full blur-3xl",
            pkg.color === "blue" && "bg-indigo-200/20",
            pkg.color === "emerald" && "bg-teal-200/20",
            pkg.color === "indigo" && "bg-purple-200/20"
          )}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl lg:text-4xl">
              {pkg.finalCta.title}
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              {pkg.finalCta.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton
                href="/contact"
                size="lg"
                className={cn(
                  "btn-shine hover:scale-105 transition-transform",
                  theme.ctaButton
                )}
              >
                {pkg.finalCta.primaryCta}
              </CTAButton>
              <CTAButton
                href="/contact"
                variant="outline"
                size="lg"
                className={cn("hover-lift", theme.border, theme.bgLight)}
              >
                {pkg.finalCta.secondaryCta}
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
