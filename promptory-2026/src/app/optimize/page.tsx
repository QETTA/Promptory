import { ChannelIntakeCard } from "@/components/channel-intake/channel-intake-card";
import { ChannelBrowserReviewPanel } from "@/components/channel-intake/channel-browser-review-panel";
import { ChannelCopyDraftPanel } from "@/components/channel-intake/channel-copy-draft-panel";
import { ChannelDiagnosisPreview } from "@/components/channel-intake/channel-diagnosis-preview";
import { ChannelResultStack } from "@/components/channel-intake/channel-result-stack";
import { OptimizationRunCard } from "@/components/channel-intake/optimization-run-card";
import { ChannelSnapshotPanel } from "@/components/channel-intake/channel-snapshot-panel";
import { ChannelSurfaceReadPanel } from "@/components/channel-intake/channel-surface-read-panel";
import { OptimizationBriefBuilder } from "@/components/channel-intake/optimization-brief-builder";
import { SaveOptimizationRunButton } from "@/components/channel-intake/save-optimization-run-button";
import { Hero } from "@/components/marketplace/hero";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { buildLoginHref } from "@/lib/auth-redirect";
import { parseChannelInput, supportedChannelCatalog, supportedChannelHeadline } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";
import { resolveOptimizationEngine } from "@/lib/optimization-engine/index";
import { buildOptimizationRunQueryString, trimOptimizationSummaryNote } from "@/lib/optimization-history";
import { parseOptimizationBrief } from "@/lib/optimization-brief";
import { getOptionalUser } from "@/lib/server/auth";
import { getChannelSurfaceSnapshot } from "@/lib/server/channel-surface-snapshot";
import { getSavedOptimizationRuns } from "@/lib/server/optimization-runs";
import { getPublishedProducts } from "@/lib/server/products";
import { trackServerEvent } from "@/lib/server/telemetry";

function getUrlParam(params: { url?: string | string[] } | undefined) {
  const raw = params?.url;
  return Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";
}

export default async function OptimizePage({
  searchParams,
}: {
  searchParams?: Promise<{
    ask?: string | string[];
    audience?: string | string[];
    constraint?: string | string[];
    conversion?: string | string[];
    goal?: string | string[];
    pain?: string | string[];
    tone?: string | string[];
    url?: string | string[];
  }>;
}) {
  const params = (await searchParams) ?? {};
  const rawUrl = getUrlParam(params).trim();
  const activeAsk = Array.isArray(params.ask) ? params.ask[0] : params.ask;
  const parsed = rawUrl ? parseChannelInput(rawUrl) : null;
  const snapshot = parsed?.ok ? buildChannelSnapshot(parsed) : null;
  const brief = parseOptimizationBrief(params);
  const queryString = buildOptimizationRunQueryString(params);
  const user = await getOptionalUser();
  const surfaceSnapshot = parsed?.ok ? await getChannelSurfaceSnapshot(parsed) : null;
  const engineResult = parsed?.ok && snapshot
    ? resolveOptimizationEngine({
        brief,
        parsed,
        signedIn: Boolean(user),
        snapshot,
        surfaceSnapshot,
      })
    : null;
  const summary = engineResult?.summary ?? null;
  const railPlan = engineResult?.railPlan ?? null;
  const surface = engineResult?.surface ?? surfaceSnapshot?.read ?? null;
  const savedRuns = user ? await getSavedOptimizationRuns(user.id, summary ? 3 : 6) : [];
  const railProducts = railPlan ? await getPublishedProducts({ category: railPlan.category, sort: "interest", limit: 3 }) : [];
  const isReady = snapshot?.readyLabel === "다음 단계 진행 가능";
  const needsManualReview = snapshot?.readyLabel === "수동 확인 권장";
  const needsTuning = snapshot?.readyLabel === "주소 보완 필요";
  const saveSummaryNote = summary
    ? trimOptimizationSummaryNote(summary.diagnosisBody) ?? trimOptimizationSummaryNote(summary.directionPoints[0] ?? "")
    : null;
  const loginToSaveHref = buildLoginHref(`/optimize${queryString}`);
  const modeSignals = parsed?.ok
    ? [
        {
          label: "채널 분류",
          value: parsed.kindLabel,
          body: `${parsed.kindLabel}로 읽고 다음 진단 위치를 고정했습니다.`,
          tone: "accent" as const,
        },
        {
          label: "진행 상태",
          value: snapshot?.readyLabel ?? "입력 확인",
          body: snapshot?.readyReason ?? "지원 채널과 직접 경로를 확인합니다.",
        },
        {
          label: "현재 모드",
          value: user ? "저장 가능" : "공개 진단",
          body: user
            ? "지금 결과를 저장하고 다시 열 수 있습니다."
            : "지금은 공개 진단부터 진행합니다.",
        },
      ]
    : [
        {
          label: "입력 방식",
          value: "URL-only",
          body: "공개 표면만 읽는 진단입니다.",
          tone: "accent" as const,
        },
        {
          label: "다음 단계",
          value: "Ask 질문",
          body: "병목과 목표를 질문으로 고정합니다.",
        },
        {
          label: "결과 형태",
          value: "스택 추천",
          body: "병목, 스택, 설치 순서를 보여 줍니다.",
        },
      ];
  const stackStoryItems =
    summary && parsed?.ok
      ? [
          {
            eyebrow: "Diagnosis",
            title: summary.diagnosisHeadline,
            body: summary.diagnosisBody,
            points: summary.diagnosisCards.slice(0, 3).map((card) => `${card.title}: ${card.body}`),
            tone: "accent" as const,
          },
          {
            eyebrow: "Direction",
            title: summary.directionTitle,
            body: summary.readinessReason,
            points: summary.directionPoints.slice(0, 4),
          },
          {
            eyebrow: "Recommended Stack",
            title: `${summary.recommendedModules[0]?.title ?? "추천 스택"} 축으로 실행 팩을 붙입니다`,
            body: "현재 병목에 맞는 실행 팩부터 연결합니다.",
            points: summary.recommendedModules.slice(0, 3).map((module) => `${module.title}: ${module.body}`),
            tone: "muted" as const,
          },
        ]
      : [
          {
            eyebrow: "Public Audit",
            title: "공개 표면부터 정직하게 읽습니다",
            body: "채널 종류와 공개 페이지 신호만 먼저 확인합니다.",
            points: ["채널 분류", "직접 경로 확인", "공개 페이지 읽기", "지원 범위 점검"],
            tone: "accent" as const,
          },
          {
            eyebrow: "Ask",
            title: "질문으로 추천 기준을 고정합니다",
            body: "누구를 향하고 어떤 행동을 만들지부터 정합니다.",
            points: ["pain", "goal", "audience", "tone / conversion"],
          },
          {
            eyebrow: "Rail",
            title: "결과는 실행 팩과 연결됩니다",
            body: "진단은 저장, 주문, 보관함 레일로 이어집니다.",
            points: ["추천 스택", "설치 순서", "저장", "실행 팩 연결"],
            tone: "muted" as const,
          },
        ];

  const rightRailCards = summary
    ? [
        {
          title: "엔진 모드",
          body: engineResult?.engineMode === "provider_backed" ? "provider-backed" : "deterministic",
        },
        {
          title: "현재 모드",
          body: brief.isComplete ? "질문 완료" : "질문 진행 중",
        },
        {
          title: "추천 레일",
          body: railPlan?.categoryLabel ?? "실행 팩 연결 대기",
        },
        {
          title: "저장 상태",
          body: user ? "저장 가능" : "로그인 후 저장",
        },
      ]
    : modeSignals.map((item) => ({ title: item.label, body: `${item.value} · ${item.body}` }));

  if (parsed?.ok && brief.hasAnyInput) {
    await trackServerEvent(brief.isComplete ? "ask_completed" : "ask_started", {
      channelKind: parsed.kind,
      normalizedUrl: parsed.normalizedUrl,
      queryString,
    });
  }

  if (engineResult && railPlan) {
    await trackServerEvent("recommendation_generated", {
      channelKind: parsed?.ok ? parsed.kind : null,
      engineMode: engineResult.engineMode,
      engineVersion: engineResult.engineVersion,
      queryString,
      railCategory: railPlan.category,
      recommendationPayloadHash: engineResult.recommendationPayloadHash,
      surfaceStatus: surface?.status ?? null,
    });
  }

  return (
    <div className="pb-16">
      <Hero
        eyebrow="Promptory Public Audit"
        theme="workspace"
        tone="light"
        title={
          isReady
            ? "URL 확인이 끝났습니다"
            : needsManualReview
              ? "지원 범위를 먼저 확인해야 합니다"
              : needsTuning
                ? "URL을 조금 더 보정해 주세요"
                : "채널 URL로 공개 진단을 시작하세요"
        }
        body={
          isReady && parsed?.ok ? (
            <>
              <p>{parsed.kindLabel}로 분류했고, 이제 Ask 질문으로 병목을 고정한 뒤 추천 스택으로 넘어갑니다.</p>
            </>
          ) : needsManualReview && parsed?.ok ? (
            <>
              <p>{parsed.kindLabel}는 현재 우선 지원 범위 밖입니다.</p>
            </>
          ) : needsTuning && parsed?.ok ? (
            <>
              <p>{parsed.kindLabel}로는 읽히지만 주소 정보가 약해 한 번 더 보정이 필요합니다.</p>
            </>
          ) : (
            <>
              <p>{supportedChannelHeadline} URL 중 하나를 넣고 공개 표면 신호부터 시작하세요.</p>
            </>
          )
        }
        aside={<ChannelIntakeCard defaultValue={rawUrl} />}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {!parsed ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
            <Card variant="strong" className="p-5 sm:p-6">
              <p className="section-kicker text-[var(--brand-700)]">Workflow</p>
              <h2 className="section-title mt-2 text-[var(--slate-950)]">이 화면은 문서가 아니라 단일 작업면이어야 합니다</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                URL을 넣고, 공개 표면과 Ask 답변을 묶어 결정형 진단을 만든 뒤 결과를 스택과 실행 팩으로 연결합니다.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {stackStoryItems.map((item, index) => (
                  <div
                    key={item.title}
                    className={`${index === 0 ? "ui-panel-highlight" : "ui-panel-elevated"} px-4 py-4`}
                  >
                    <p className="section-kicker text-[var(--brand-700)]">{item.eyebrow}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{item.body}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="tint" className="p-5 sm:p-6">
              <p className="section-kicker text-[var(--brand-700)]">Supported Channels</p>
              <div className="mt-4 grid gap-3">
              {supportedChannelCatalog.map((item) => (
                <div key={item.kind} className="ui-panel-elevated px-4 py-4">
                  <p className="text-base font-semibold text-[var(--slate-950)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{item.summary}</p>
                </div>
              ))}
              </div>
            </Card>
          </div>
        ) : parsed && !parsed.ok ? (
          <Card variant="tint" className="p-5 text-sm leading-7 text-[var(--slate-700)]">
            <p>{parsed.message}</p>
            <p className="mt-2">지원 예시 주소를 눌러 다시 시작하거나, 전체 URL을 그대로 붙여 넣어 주세요.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="xl:hidden">
              <Card variant="tint" className="p-5">
                <p className="section-kicker text-[var(--brand-700)]">Workspace Summary</p>
                <div className="mt-4 grid gap-2">
                  {rightRailCards.map((item) => (
                    <div key={item.title} className="ui-panel-elevated px-4 py-3">
                      <p className="text-xs font-semibold text-[var(--slate-500)]">{item.title}</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--slate-950)]">{item.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {summary && parsed?.ok ? (
                    user ? (
                      <SaveOptimizationRunButton
                        channelKind={parsed.kind}
                        channelLabel={parsed.kindLabel}
                        engineMode={engineResult?.engineMode}
                        engineVersion={engineResult?.engineVersion}
                        evidenceSignals={engineResult?.rationale.evidence.map((item) => item.detail)}
                        focusTitle={summary.recommendedModules[0]?.title}
                        normalizedUrl={parsed.normalizedUrl}
                        queryString={queryString}
                        rationaleSummary={engineResult?.rationale.summary}
                        rawUrl={rawUrl}
                        recommendedCategory={railPlan?.category}
                        size="sm"
                        surfaceReadStatus={surface?.status}
                        summaryNote={saveSummaryNote}
                      />
                    ) : (
                      <CTAButton href={loginToSaveHref} size="sm">
                        로그인하고 저장
                      </CTAButton>
                    )
                  ) : null}

                  <CTAButton
                    href="/products"
                    telemetryEventName="execution_pack_clicked"
                    telemetryPayload={{ href: "/products", source: "optimize_summary" }}
                    variant="outline"
                    size="sm"
                  >
                    실행 팩 보기
                  </CTAButton>
                </div>
              </Card>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                {snapshot ? <ChannelSnapshotPanel snapshot={snapshot} /> : null}

                {snapshot ? (
                  <OptimizationBriefBuilder
                    activeAsk={activeAsk}
                    brief={brief}
                    moduleCategory={railPlan?.category}
                    parsed={parsed}
                    snapshot={snapshot}
                    surface={surface}
                  />
                ) : null}

                {summary && railPlan ? (
                  <ChannelResultStack
                    isComplete={brief.isComplete}
                    railPlan={railPlan}
                    railProducts={railProducts}
                    summary={summary}
                  />
                ) : null}

                <details className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-1)] px-5 py-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--slate-950)]">
                    Advanced readouts
                  </summary>
                  <div className="mt-4 grid gap-4">
                    {surface ? <ChannelSurfaceReadPanel surface={surface} /> : null}

                    {snapshot && brief.hasAnyInput ? (
                      <ChannelDiagnosisPreview brief={brief} parsed={parsed} snapshot={snapshot} surface={surface} />
                    ) : null}

                    {snapshot && brief.hasAnyInput ? (
                      <ChannelCopyDraftPanel brief={brief} parsed={parsed} snapshot={snapshot} surface={surface} />
                    ) : null}

                    {snapshot && surface?.browserFollowupNeeded ? (
                      <ChannelBrowserReviewPanel brief={brief} parsed={parsed} snapshot={snapshot} surface={surface} />
                    ) : null}
                  </div>
                </details>
              </div>

              <div className="hidden space-y-4 xl:sticky xl:top-24 xl:block xl:self-start">
                <Card variant="tint" className="p-5">
                  <p className="section-kicker text-[var(--brand-700)]">Workspace Context</p>
                  <div className="mt-4 grid gap-2">
                    {rightRailCards.map((item) => (
                      <div key={item.title} className="ui-panel-elevated px-4 py-3">
                        <p className="text-xs font-semibold text-[var(--slate-500)]">{item.title}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--slate-950)]">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {(savedRuns.length > 0 || (summary && parsed?.ok)) ? (
                  <div className="grid gap-4">
                    {summary && parsed?.ok ? (
                      user ? (
                        <Card variant="strong" className="p-5 sm:p-6">
                          <div className="flex flex-col gap-4">
                            <div>
                              <p className="section-kicker text-[var(--brand-700)]">현재 진단 저장</p>
                              <h3 className="mt-2 text-[1.1rem] font-semibold text-[var(--slate-950)]">
                                {summary.recommendedModules[0]?.title
                                  ? `${summary.recommendedModules[0].title} 축으로 다시 열 수 있게 저장합니다`
                                  : `${parsed.kindLabel} 진단 결과를 저장합니다`}
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                                URL, 질문 답변, 엔진 판단 근거를 함께 저장해 같은 계정에서 바로 복귀할 수 있게 합니다.
                              </p>
                            </div>
                            <SaveOptimizationRunButton
                              channelKind={parsed.kind}
                              channelLabel={parsed.kindLabel}
                              engineMode={engineResult?.engineMode}
                              engineVersion={engineResult?.engineVersion}
                              evidenceSignals={engineResult?.rationale.evidence.map((item) => item.detail)}
                              focusTitle={summary.recommendedModules[0]?.title}
                              normalizedUrl={parsed.normalizedUrl}
                              queryString={queryString}
                              rationaleSummary={engineResult?.rationale.summary}
                              rawUrl={rawUrl}
                              recommendedCategory={railPlan?.category}
                              size="sm"
                              surfaceReadStatus={surface?.status}
                              summaryNote={saveSummaryNote}
                            />
                          </div>
                        </Card>
                      ) : (
                        <Card variant="tint" className="p-5 sm:p-6">
                          <div className="flex flex-col gap-4">
                            <div>
                              <p className="section-kicker text-[var(--brand-700)]">로그인 후 저장</p>
                              <h3 className="mt-2 text-[1.1rem] font-semibold text-[var(--slate-950)]">
                                현재 진단을 계정에 보관하려면 로그인이 필요합니다
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                                로그인하면 지금 URL과 답변 상태 그대로 저장해서, 나중에 다시 열고 이어서 볼 수 있습니다.
                              </p>
                            </div>
                            <CTAButton href={loginToSaveHref} size="sm">
                              로그인하고 저장
                            </CTAButton>
                          </div>
                        </Card>
                      )
                    ) : null}

                    {savedRuns.length > 0 ? (
                      <div className="grid gap-4">
                        {savedRuns.map((run) => (
                          <OptimizationRunCard key={run.id} run={run} />
                        ))}
                      </div>
                    ) : user ? (
                      <Card variant="tint" className="p-5 text-sm leading-7 text-[var(--slate-700)]">
                        아직 저장한 진단이 없습니다. 현재 결과를 저장해 두면 다음에 같은 상태로 바로 다시 열 수 있습니다.
                      </Card>
                    ) : null}
                  </div>
                ) : null}

                <Card variant="tint" className="p-5 sm:p-6">
                  <p className="section-kicker text-[var(--brand-700)]">Current Product Truth</p>
                  <div className="mt-4 grid gap-2">
                    {[
                      "URL 정규화와 채널 판별",
                      "공개 페이지 읽기",
                      "질문형 플래닝",
                      "저장 / 주문 / 라이브러리 연결",
                    ].map((item) => (
                      <div key={item} className="ui-panel-elevated px-4 py-3 text-sm text-[var(--slate-700)]">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CTAButton href="/products" variant="outline" size="sm">
                      실행 팩 둘러보기
                    </CTAButton>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
