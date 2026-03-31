import { CTAButton } from "@/components/ui/cta-button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildModuleProductHref } from "@/lib/optimize-rail";
import {
  buildOptimizationBriefSummary,
  getOptimizationRecommendations,
  optimizationAudienceOptions,
  optimizationConversionOptions,
  optimizationGoalOptions,
  optimizationPainOptions,
  optimizationToneOptions,
  type OptimizationBrief,
} from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

function buildAskHref({
  ask,
  audience,
  constraint,
  conversion,
  goal,
  pain,
  tone,
  url,
}: {
  ask?: string;
  audience?: string;
  constraint?: string;
  conversion?: string;
  goal?: string;
  pain?: string;
  tone?: string;
  url: string;
}) {
  const search = new URLSearchParams();
  search.set("url", url);

  if (ask) search.set("ask", ask);
  if (pain) search.set("pain", pain);
  if (goal) search.set("goal", goal);
  if (audience) search.set("audience", audience);
  if (tone) search.set("tone", tone);
  if (conversion) search.set("conversion", conversion);
  if (constraint) search.set("constraint", constraint);

  return `/optimize?${search.toString()}`;
}

function AskChoices<T extends string>({
  currentValue,
  options,
  recommendedValue,
  renderHref,
}: {
  currentValue?: T;
  options: readonly { description: string; label: string; value: T }[];
  recommendedValue?: T;
  renderHref: (value: T) => string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = currentValue === option.value;
        const recommended = recommendedValue === option.value;

        return (
          <a
            key={option.value}
            href={renderHref(option.value)}
            className={cn(
              "block rounded-[1rem] border px-4 py-3 text-left transition",
              active
                ? "border-[var(--brand-600)] bg-[var(--brand-50)] shadow-[0_8px_20px_rgba(37,99,235,0.08)]"
                : "border-[var(--line)] bg-white hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[var(--slate-950)]">{option.label}</p>
              <div className="flex items-center gap-2">
                {recommended ? (
                  <span className="inline-flex rounded-full border border-[var(--brand-300)] bg-[var(--brand-50)] px-2 py-1 text-[11px] font-medium text-[var(--brand-700)]">
                    추천
                  </span>
                ) : null}
                {active ? (
                  <span className="inline-flex rounded-full border border-[var(--line-strong)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--slate-700)]">
                    선택
                  </span>
                ) : null}
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{option.description}</p>
          </a>
        );
      })}
    </div>
  );
}

export function OptimizationBriefBuilder({
  activeAsk,
  brief,
  moduleCategory,
  parsed,
  snapshot,
  surface,
}: {
  activeAsk?: string;
  brief: OptimizationBrief;
  moduleCategory?: string;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface?: ChannelSurfaceRead | null;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });
  const recommendations = getOptimizationRecommendations({ parsed, surface });
  const steps = [
    {
      key: "pain",
      label: "Pain",
      question: "지금 가장 아픈 지점은 무엇인가요?",
      value: brief.pain,
      options: optimizationPainOptions,
      recommendedValue: recommendations.pain,
      recommendedReason: recommendations.painReason,
    },
    {
      key: "goal",
      label: "Goal",
      question: "이번 최적화의 1순위 목표는 무엇인가요?",
      value: brief.goal,
      options: optimizationGoalOptions,
      recommendedValue: recommendations.goal,
      recommendedReason: recommendations.goalReason,
    },
    {
      key: "audience",
      label: "Audience",
      question: "이 채널에 가장 많이 들어오는 사람은 누구인가요?",
      value: brief.audience,
      options: optimizationAudienceOptions,
      recommendedValue: recommendations.audience,
      recommendedReason: recommendations.audienceReason,
    },
    {
      key: "tone",
      label: "Tone",
      question: "어떤 인상과 말투로 읽혀야 하나요?",
      value: brief.tone,
      options: optimizationToneOptions,
      recommendedValue: recommendations.tone,
      recommendedReason: recommendations.toneReason,
    },
    {
      key: "conversion",
      label: "Action",
      question: "최종적으로 사용자가 무엇을 하게 만들고 싶나요?",
      value: brief.conversion,
      options: optimizationConversionOptions,
      recommendedValue: recommendations.conversion,
      recommendedReason: recommendations.conversionReason,
    },
  ] as const;
  const firstIncompleteStep = steps.find((step) => !step.value);
  const activeStep = steps.find((step) => step.key === activeAsk) ?? firstIncompleteStep ?? steps[steps.length - 1];
  const answeredSteps = steps.filter((step) => Boolean(step.value));
  const completion = Math.round((answeredSteps.length / steps.length) * 100);
  const quickFillHref = buildAskHref({
    ask: activeStep.key,
    url: parsed.input,
    pain: brief.pain ?? recommendations.pain,
    goal: brief.goal ?? recommendations.goal,
    audience: brief.audience ?? recommendations.audience,
    tone: brief.tone ?? recommendations.tone,
    conversion: brief.conversion ?? recommendations.conversion,
    constraint: brief.constraint,
  });
  const resetHref = buildAskHref({
    url: parsed.input,
  });
  const inquiryFlow = brief.goal === "lead" || brief.conversion === "inquiry";
  const moduleIntro = !brief.hasAnyInput
    ? "채널 타입만 읽은 상태라 시작용 실행 묶음만 먼저 보여 줍니다."
    : !brief.isComplete
      ? "현재 답변 기준의 임시 추천입니다. 남은 질문을 채우면 더 좁혀집니다."
      : inquiryFlow
        ? "문의 전환에 맞는 플러그인과 실행 묶음을 우선순위대로 정리했습니다."
        : "채널 운영에 바로 꽂을 수 있는 플러그인과 실행 묶음을 우선순위대로 정리했습니다.";
  const moduleTitle = !brief.isComplete ? "Starter Stack" : inquiryFlow ? "Inquiry Stack" : "Execution Stack";

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "1. Input", state: "done", body: "URL 확인 완료" },
          { label: "2. Read", state: "done", body: "주소 구조 해석 완료" },
          { label: "3. Plan", state: "current", body: "질문으로 방향 고정" },
          { label: "4. Apply", state: "next", body: "실행 묶음으로 넘김" },
        ].map((step) => (
          <div
            key={step.label}
            className={cn(
              "rounded-[1rem] border px-4 py-3 text-sm",
              step.state === "current"
                ? "border-[var(--brand-600)] bg-[var(--brand-50)] text-[var(--brand-800)]"
                : "border-[var(--line)] bg-[var(--surface-1)] text-[var(--slate-600)]",
            )}
          >
            <p className="font-semibold text-[var(--slate-950)]">{step.label}</p>
            <p className="mt-1 leading-6">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card variant="strong" className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-kicker text-[var(--brand-700)]">Plan Console</p>
              <h3 className="mt-2 text-[1.2rem] font-semibold tracking-tight text-[var(--slate-950)]">
                URL 뒤에서 AI가 먼저 물어야 할 것만 남깁니다
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">
                문제, 목표, 대상, 톤, 최종 행동을 먼저 고정해야 추천이 묶음처럼 보이지 않고 실행 순서로 보입니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {!brief.isComplete ? (
                <CTAButton href={quickFillHref} variant="outline" size="sm">
                  추천값 채우기
                </CTAButton>
              ) : null}
              {brief.hasAnyInput ? (
                <CTAButton href={resetHref} variant="subtle" size="sm">
                  다시 시작
                </CTAButton>
              ) : null}
            </div>
          </div>

          <div className="mt-5 rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="section-kicker text-[var(--slate-500)]">Progress</p>
                <p className="mt-1 text-sm leading-6 text-[var(--slate-700)]">
                  {answeredSteps.length === 0
                    ? "첫 질문부터 고르면 즉시 방향과 초안이 열립니다."
                    : `${answeredSteps.length}/5개가 고정됐고 남은 질문은 ${brief.missingFields.length}개입니다.`}
                </p>
              </div>
              <p className="text-sm font-semibold text-[var(--slate-950)]">{completion}%</p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--line)]">
              <div className="h-full rounded-full bg-[var(--brand-600)] transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => {
              const isActive = activeStep.key === step.key;
              const isDone = Boolean(step.value);

              return (
                <a
                  key={step.key}
                  href={buildAskHref({
                    ask: step.key,
                    url: parsed.input,
                    pain: brief.pain,
                    goal: brief.goal,
                    audience: brief.audience,
                    tone: brief.tone,
                    conversion: brief.conversion,
                    constraint: brief.constraint,
                  })}
                  className={cn(
                    "rounded-[1rem] border px-3 py-3 text-left text-sm transition",
                    isActive
                      ? "border-[var(--brand-600)] bg-[var(--brand-50)] text-[var(--brand-800)]"
                      : isDone
                        ? "border-[var(--line-strong)] bg-white text-[var(--slate-700)]"
                        : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-500)]",
                  )}
                >
                  <p className="font-semibold">
                    {index + 1}. {step.label}
                  </p>
                  <p className="mt-1 text-xs leading-5">{isDone ? "완료" : isActive ? "현재" : "대기"}</p>
                </a>
              );
            })}
          </div>

          <form action="/optimize" className="mt-5 grid gap-4">
            <input type="hidden" name="url" value={parsed.input} />
            <input type="hidden" name="ask" value={activeStep.key} />
            <input type="hidden" name="pain" value={brief.pain ?? ""} />
            <input type="hidden" name="goal" value={brief.goal ?? ""} />
            <input type="hidden" name="audience" value={brief.audience ?? ""} />
            <input type="hidden" name="tone" value={brief.tone ?? ""} />
            <input type="hidden" name="conversion" value={brief.conversion ?? ""} />

            <div className="rounded-[1.1rem] border border-[var(--line)] bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-kicker text-[var(--brand-700)]">{activeStep.label}</p>
                  <h4 className="mt-1 text-base font-semibold text-[var(--slate-950)]">{activeStep.question}</h4>
                </div>
                <span className="inline-flex rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)] px-2.5 py-1 text-[11px] font-medium text-[var(--brand-700)]">
                  현재 질문
                </span>
              </div>

              <div className="mt-4">
                <AskChoices
                  currentValue={activeStep.value}
                  options={activeStep.options}
                  recommendedValue={activeStep.recommendedValue}
                  renderHref={(value) =>
                    buildAskHref({
                      url: parsed.input,
                      pain: activeStep.key === "pain" ? value : brief.pain,
                      goal: activeStep.key === "goal" ? value : brief.goal,
                      audience: activeStep.key === "audience" ? value : brief.audience,
                      tone: activeStep.key === "tone" ? value : brief.tone,
                      conversion: activeStep.key === "conversion" ? value : brief.conversion,
                      constraint: brief.constraint,
                    })
                  }
                />
              </div>

              <div className="mt-4 rounded-[1rem] border border-[var(--brand-200)] bg-[var(--brand-50)] px-4 py-3 text-sm leading-6 text-[var(--brand-800)]">
                <p className="text-xs font-semibold text-[var(--brand-700)]">Surface Read</p>
                <p className="mt-1">{activeStep.recommendedReason}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {steps.map((step) => (
                <div key={step.key} className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--slate-950)]">{step.label}</p>
                    <a
                      href={buildAskHref({
                        ask: step.key,
                        url: parsed.input,
                        pain: brief.pain,
                        goal: brief.goal,
                        audience: brief.audience,
                        tone: brief.tone,
                        conversion: brief.conversion,
                        constraint: brief.constraint,
                      })}
                      className="text-[11px] font-semibold text-[var(--brand-700)]"
                    >
                      열기
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">
                    {step.options.find((option) => option.value === step.value)?.label ?? "아직 미정"}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-1)] p-4">
              <Label htmlFor="constraint">Constraint Note</Label>
              <Textarea
                id="constraint"
                name="constraint"
                defaultValue={brief.constraint}
                placeholder="예: 과장 표현 금지, 가격보다 신뢰 강조, 초보자도 이해되는 말투"
                className="min-h-28 rounded-2xl"
              />
              <p className="mt-2 text-xs leading-6 text-[var(--slate-500)]">
                금지 표현, 우선순위, 브랜드 톤을 적으면 결과 카드에 그대로 반영됩니다.
              </p>
            </div>

            <CTAButton type="submit" size="lg">
              {brief.hasAnyInput ? "이 답변으로 계획 갱신" : "질문 시작"}
            </CTAButton>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card variant="heroBright" className="p-5 sm:p-6">
            <p className="section-kicker text-[var(--brand-700)]">Plan Readout</p>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">{summary.directionTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{summary.readinessReason}</p>

            <div className="mt-4 grid gap-3">
              {summary.directionPoints.slice(0, 3).map((point) => (
                <div key={point} className="flex gap-3 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-500)]" />
                  <p className="text-sm leading-6 text-[var(--slate-700)]">{point}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="tint" className="p-5">
            <p className="section-kicker text-[var(--slate-500)]">System Benchmark</p>
            <div className="mt-3 grid gap-3">
              {summary.benchmarkLayers.map((layer) => (
                <div key={layer.title}>
                  <p className="text-sm font-semibold text-[var(--slate-950)]">{layer.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--slate-600)]">{layer.body}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="tint" className="p-5">
            <p className="section-kicker text-[var(--slate-500)]">Next Output</p>
            <div className="mt-3 grid gap-3">
              {(brief.hasAnyInput ? summary.nextStepSignals : summary.directionPoints.slice(0, 3)).map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-6 text-[var(--slate-700)]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--slate-400)]" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card variant="strong" className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="section-kicker text-[var(--brand-700)]">Stack Match</p>
            <h4 className="mt-2 text-base font-semibold text-[var(--slate-950)]">{moduleTitle}</h4>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--slate-600)]">{moduleIntro}</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.recommendedModules.map((module, index) => (
            <div key={module.title} className="rounded-[1.1rem] border border-[var(--line)] bg-[var(--surface-1)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--slate-950)]">{module.title}</p>
                <span className="inline-flex rounded-full border border-[var(--line)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--slate-600)]">
                  {index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{module.body}</p>
              {moduleCategory ? (
                <div className="mt-4">
                  <CTAButton
                    href={buildModuleProductHref({
                      category: moduleCategory,
                      moduleTitle: module.title,
                    })}
                    variant="outline"
                    size="sm"
                  >
                    관련 실행 팩 보기
                  </CTAButton>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
