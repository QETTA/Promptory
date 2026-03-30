import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
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
  label,
  options,
  question,
  recommendedValue,
  renderHref,
}: {
  currentValue?: T;
  label: string;
  options: readonly { description: string; label: string; value: T }[];
  question: string;
  recommendedValue?: T;
  renderHref: (value: T) => string;
}) {
  return (
    <Card variant="strong" className="p-5">
      <p className="section-kicker text-[var(--brand-700)]">{label}</p>
      <h4 className="mt-2 text-base font-semibold text-[var(--slate-950)]">{question}</h4>
      <div className="mt-4 grid gap-3">
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
                  : "border-[var(--line)] bg-[var(--surface-1)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]",
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
                      선택됨
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{option.description}</p>
            </a>
          );
        })}
      </div>
    </Card>
  );
}

export function OptimizationBriefBuilder({
  activeAsk,
  brief,
  parsed,
  snapshot,
  surface,
}: {
  activeAsk?: string;
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface?: ChannelSurfaceRead | null;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });
  const recommendations = getOptimizationRecommendations({ parsed, surface });
  const steps = [
    {
      key: "pain",
      label: "질문 1",
      question: "지금 가장 아픈 지점은 무엇인가요?",
      value: brief.pain,
      options: optimizationPainOptions,
      recommendedValue: recommendations.pain,
      recommendedReason: recommendations.painReason,
    },
    {
      key: "goal",
      label: "질문 2",
      question: "이번 최적화의 1순위 목표는 무엇인가요?",
      value: brief.goal,
      options: optimizationGoalOptions,
      recommendedValue: recommendations.goal,
      recommendedReason: recommendations.goalReason,
    },
    {
      key: "audience",
      label: "질문 3",
      question: "이 채널에 가장 많이 들어오는 사람은 누구인가요?",
      value: brief.audience,
      options: optimizationAudienceOptions,
      recommendedValue: recommendations.audience,
      recommendedReason: recommendations.audienceReason,
    },
    {
      key: "tone",
      label: "질문 4",
      question: "어떤 인상과 말투로 읽혀야 하나요?",
      value: brief.tone,
      options: optimizationToneOptions,
      recommendedValue: recommendations.tone,
      recommendedReason: recommendations.toneReason,
    },
    {
      key: "conversion",
      label: "질문 5",
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
  const inquiryFlow = brief.goal === "lead" || brief.conversion === "inquiry";
  const moduleIntro = !brief.hasAnyInput
    ? "아직 답변이 없어 채널 타입 기준의 초기 모듈만 먼저 보여 줍니다. 최종 추천처럼 보이지 않게, 지금은 진단 출발점으로만 해석해야 합니다."
    : !brief.isComplete
      ? "지금 보이는 모듈은 현재 답변 기준의 임시 추천입니다. 남은 질문이 채워지면 막히는 지점과 전환 구조에 맞춰 더 좁혀집니다."
      : inquiryFlow
        ? "이제 채널 운영에 바로 꽂아 넣을 수 있는 문의형 플러그인/모듈 묶음으로 정리할 수 있습니다."
        : "이제 채널 운영에 바로 꽂아 넣을 수 있는 플러그인/모듈 묶음으로 정리할 수 있습니다.";
  const moduleTitle = !brief.isComplete ? "초기 추천 모듈" : inquiryFlow ? "바로 적용할 문의 모듈" : "바로 적용할 모듈";

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: "1. URL", state: "done", body: "채널 URL을 확인했습니다." },
          { label: "2. 주소 확인", state: "done", body: "입력한 주소에서 채널 단서를 읽었습니다." },
          { label: "3. 진단 질문", state: "current", body: "지금 막히는 지점과 목표를 질문형으로 고정합니다." },
          { label: "4. 추천 결과", state: "next", body: "다음 단계에서 바로 쓸 모듈로 넘깁니다." },
        ].map((step) => (
          <Card
            key={step.label}
            variant={step.state === "current" ? "strong" : "tint"}
            className="p-4 text-sm leading-6 text-[var(--slate-700)]"
          >
            <p className="font-semibold text-[var(--slate-950)]">{step.label}</p>
            <p className="mt-2">{step.body}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card variant="strong" className="p-5 sm:p-6">
          <p className="section-kicker text-[var(--brand-700)]">진단 질문</p>
          <h3 className="mt-2 text-[1.2rem] font-semibold tracking-tight text-[var(--slate-950)]">URL 뒤에는 AI가 물어야 합니다</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
            고객이 지금 막히는 지점을 먼저 묻고, 그 다음 목표와 전환 행동을 고정해야 결과가 좋아집니다. Genspark류 super agent처럼 Promptory도 URL 뒤에서 질문, 계획, 모듈 추천 순서로 가야 합니다.
          </p>

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
                      ? "border-[var(--brand-600)] bg-[var(--brand-50)] text-[var(--brand-700)]"
                      : isDone
                        ? "border-[var(--line-strong)] bg-white text-[var(--slate-700)]"
                        : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-500)]",
                  )}
                >
                  <p className="font-semibold">
                    {index + 1}. {step.label}
                  </p>
                  <p className="mt-1 text-xs leading-6">{isDone ? "응답 완료" : isActive ? "현재 질문" : "다음 대기"}</p>
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

            <AskChoices
              label={activeStep.label}
              question={activeStep.question}
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

            <div className="rounded-[1rem] border border-[var(--brand-200)] bg-[var(--brand-50)] px-4 py-3 text-sm leading-7 text-[var(--brand-800)]">
              <p className="text-xs font-semibold text-[var(--brand-700)]">지금 읽힌 표면 기준 추천</p>
              <p className="mt-2">{activeStep.recommendedReason}</p>
            </div>

            <div className="grid gap-3 rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-2)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="section-kicker text-[var(--slate-500)]">현재 답변</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--slate-700)]">
                    지금까지 고른 답을 요약합니다. 필요하면 다시 눌러 바로 수정할 수 있습니다.
                  </p>
                </div>
                <p className="text-xs font-medium text-[var(--slate-500)]">{answeredSteps.length}/5 응답 완료</p>
              </div>

              <div className="grid gap-3">
                {steps.map((step) => (
                  <div
                    key={step.key}
                    className="flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[var(--slate-950)]">{step.label}</p>
                      <p className="mt-1 leading-6 text-[var(--slate-600)]">
                        {step.options.find((option) => option.value === step.value)?.label ?? "아직 답하지 않음"}
                      </p>
                    </div>
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
                      className="text-xs font-semibold text-[var(--brand-700)]"
                    >
                      수정
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-1)] p-4">
              <Label htmlFor="constraint">제약 조건</Label>
              <Textarea
                id="constraint"
                name="constraint"
                defaultValue={brief.constraint}
                placeholder="예: 할인 강조보다 신뢰 정보 우선, 의료 표현 금지, 초보자도 이해되는 말투"
                className="min-h-28 rounded-2xl"
              />
              <p className="mt-2 text-xs leading-6 text-[var(--slate-500)]">
                금지 표현, 꼭 넣어야 할 약속, 피해야 할 톤이 있다면 적어 주세요.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-[var(--brand-600)] bg-[var(--brand-600)] px-5 text-[0.95rem] font-semibold text-white transition hover:border-[var(--brand-700)] hover:bg-[var(--brand-700)]"
            >
              {brief.hasAnyInput ? "이 답변 반영하기" : "질문 시작하기"}
            </button>
          </form>
        </Card>

        <Card variant="heroBright" className="p-5 sm:p-6">
          <p className="section-kicker text-[var(--brand-700)]">질문 상태</p>
          <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">{summary.directionTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">{summary.readinessReason}</p>

          <div className="mt-4 rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-6 text-[var(--slate-700)]">
            {brief.isComplete ? (
              <p>다음 단계에서 이 질문 결과를 바탕으로 문장, 신뢰 근거, 행동 유도, 적용 위치를 한 번에 보여 줄 수 있습니다.</p>
            ) : (
              <p>아직 {brief.missingFields.join(", ")} 항목이 비어 있습니다. 결과를 만들기 전에 방향을 먼저 고정하는 편이 더 안전합니다.</p>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">지금 잡힌 방향</p>
          <div className="mt-3 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
            {summary.directionPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </Card>

        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">비교 기준</p>
          <div className="mt-3 grid gap-3 text-sm leading-7 text-[var(--slate-700)]">
            {summary.benchmarkLayers.map((layer) => (
              <div key={layer.title}>
                <p className="font-semibold text-[var(--slate-950)]">{layer.title}</p>
                <p>{layer.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card variant="tint" className="p-5">
          <p className="section-kicker text-[var(--slate-500)]">다음 결과 준비</p>
          <div className="mt-3 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
            {summary.nextStepSignals.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="strong" className="p-5">
        <p className="section-kicker text-[var(--brand-700)]">추천 모듈</p>
        <h4 className="mt-2 text-base font-semibold text-[var(--slate-950)]">{moduleTitle}</h4>
        <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
          {moduleIntro}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.recommendedModules.map((module) => (
            <Card key={module.title} variant="tint" className="p-4">
              <p className="text-sm font-semibold text-[var(--slate-950)]">{module.title}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">{module.body}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
