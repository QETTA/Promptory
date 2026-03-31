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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { buildLoginHref } from "@/lib/auth-redirect";
import { parseChannelInput } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationRunQueryString, trimOptimizationSummaryNote } from "@/lib/optimization-history";
import { getOptimizeRailPlan } from "@/lib/optimize-rail";
import { buildOptimizationBriefSummary, parseOptimizationBrief } from "@/lib/optimization-brief";
import { getOptionalUser } from "@/lib/server/auth";
import { getSavedOptimizationRuns } from "@/lib/server/optimization-runs";
import { canAutoReadChannelSurface, readChannelSurface } from "@/lib/server/channel-surface-read";
import { getPublishedProducts } from "@/lib/server/products";

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
  const surface = parsed?.ok && canAutoReadChannelSurface(parsed) ? await readChannelSurface(parsed) : null;
  const brief = parseOptimizationBrief(params);
  const summary = parsed?.ok && snapshot && brief.hasAnyInput ? buildOptimizationBriefSummary({ brief, parsed, snapshot, surface }) : null;
  const queryString = buildOptimizationRunQueryString(params);
  const user = await getOptionalUser();
  const savedRuns = user ? await getSavedOptimizationRuns(user.id, summary ? 3 : 6) : [];
  const railPlan =
    summary && parsed?.ok
      ? getOptimizeRailPlan({
          brief,
          kind: parsed.kind,
          kindLabel: parsed.kindLabel,
          moduleTitles: summary.recommendedModules.map((module) => module.title),
          signedIn: Boolean(user),
        })
      : null;
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
              <p>유튜브, 쿠팡, 네이버 블로그 URL 중 하나를 넣고 공개 표면 신호부터 시작하세요.</p>
            </>
          )
        }
        aside={<ChannelIntakeCard defaultValue={rawUrl} />}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {!parsed ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
            <Card variant="strong" className="p-5 sm:p-6">
              <p className="section-kicker text-[var(--brand-700)]">AI Workflow</p>
              <h2 className="section-title mt-2 text-[var(--slate-950)]">이 화면은 문서가 아니라 단일 작업면이어야 합니다</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                URL을 넣고, AI가 질문을 던지고, 결과를 스택과 실행 팩으로 연결하는 흐름만 먼저 보여줍니다.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {stackStoryItems.map((item, index) => (
                  <div
                    key={item.title}
                    className={`rounded-[1.15rem] border px-4 py-4 ${
                      index === 0
                        ? "border-[rgba(34,80,221,0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]"
                        : "border-[var(--line)] bg-white"
                    }`}
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
              {[
                {
                  title: "YouTube",
                  body: "영상 제목, 설명, 고정 댓글, 채널 톤을 함께 보고 콘텐츠 반응과 전환 흐름을 정리합니다.",
                },
                {
                  title: "Naver Blog",
                  body: "제목, 도입부, 발행 리듬, 말미 CTA 구조를 기준으로 검색형 콘텐츠 흐름을 읽습니다.",
                },
                {
                  title: "쿠팡",
                  body: "상품명, 대표 혜택, 신뢰 정보, 구매 CTA 순서를 기준으로 판매형 표면을 진단합니다.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-4">
                  <p className="text-base font-semibold text-[var(--slate-950)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{item.body}</p>
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
                    <div key={item.title} className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
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
                        focusTitle={summary.recommendedModules[0]?.title}
                        queryString={queryString}
                        rawUrl={rawUrl}
                        recommendedCategory={railPlan?.category}
                        size="sm"
                        summaryNote={saveSummaryNote}
                      />
                    ) : (
                      <CTAButton href={loginToSaveHref} size="sm">
                        로그인하고 저장
                      </CTAButton>
                    )
                  ) : null}

                  <CTAButton href="/products" variant="outline" size="sm">
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
                      <div key={item.title} className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3">
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
                                URL, 질문 답변, 추천 스택 축을 함께 저장해 같은 계정에서 바로 복귀할 수 있게 합니다.
                              </p>
                            </div>
                            <SaveOptimizationRunButton
                              channelKind={parsed.kind}
                              channelLabel={parsed.kindLabel}
                              focusTitle={summary.recommendedModules[0]?.title}
                              queryString={queryString}
                              rawUrl={rawUrl}
                              recommendedCategory={railPlan?.category}
                              size="sm"
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
                      <div key={item} className="rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--slate-700)]">
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
