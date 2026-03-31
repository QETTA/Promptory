import { supportedChannelHeadline } from "@/lib/channel-intake";
import { promptoryWebSurfaceEyebrow } from "@/lib/promptory-web-surface-copy";
import { optimizeFlowLabelCopy, optimizeResultLabelCopy } from "@/lib/optimize-copy";

import type {
  OptimizePageData,
  OptimizePageViewModel,
  OptimizeSaveRailView,
  OptimizeSidebarAction,
  OptimizeSidebarCard,
  OptimizeStoryCard,
} from "../types/optimize-page-data";

function buildStoryItems(data: OptimizePageData): OptimizeStoryCard[] {
  if (data.summary && data.parsed?.ok) {
    return [
      {
        eyebrow: optimizeFlowLabelCopy.presenter.eyebrowCurrent,
        title: data.summary.diagnosisHeadline,
        body: data.summary.diagnosisBody,
      },
      {
        eyebrow: optimizeFlowLabelCopy.presenter.eyebrowAsk,
        title: data.summary.directionTitle,
        body: data.summary.readinessReason,
      },
      {
        eyebrow: optimizeFlowLabelCopy.presenter.eyebrowExecution,
        title: `${data.summary.recommendedModules[0]?.title ?? optimizeFlowLabelCopy.presenter.storyExecutionTitleFallback}`,
        body: optimizeFlowLabelCopy.presenter.storyExecutionBody,
      },
    ];
  }

  return [
    {
      eyebrow: optimizeFlowLabelCopy.presenter.eyebrowPublic,
      title: optimizeFlowLabelCopy.presenter.heroStates.doneLabel,
      body: optimizeFlowLabelCopy.presenter.heroStates.doneBody,
    },
    {
      eyebrow: optimizeFlowLabelCopy.presenter.eyebrowAsk,
      title: optimizeFlowLabelCopy.presenter.heroStates.askPlanTitle,
      body: optimizeFlowLabelCopy.presenter.heroStates.askPlanBody,
    },
    {
      eyebrow: optimizeFlowLabelCopy.presenter.eyebrowExecution,
      title: optimizeFlowLabelCopy.presenter.storyExecution,
      body: optimizeFlowLabelCopy.presenter.storyExecutionBody,
    },
  ];
}

function buildSidebarCards(data: OptimizePageData): OptimizeSidebarCard[] {
  if (data.summary) {
    return [
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleCurrent,
        body: data.summary.diagnosisHeadline,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleQuestions,
        body: data.brief.isComplete
          ? optimizeFlowLabelCopy.presenter.stateQuestionComplete
          : optimizeFlowLabelCopy.presenter.stateQuestionInProgress,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleNext,
        body: data.railPlan?.categoryLabel ?? optimizeFlowLabelCopy.presenter.summaryAfterUnsigned,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleSave,
        body: data.isSignedIn ? optimizeFlowLabelCopy.labels.readyToSave : optimizeFlowLabelCopy.labels.lockedSave,
      },
    ];
  }

  if (data.parsed?.ok) {
    return [
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleChannelType,
        body: data.parsed.kindLabel,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleReadiness,
        body: data.snapshot?.readyLabel ?? optimizeFlowLabelCopy.presenter.summaryAfterSignedIn,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleNextStep,
        body: data.isSignedIn ? optimizeFlowLabelCopy.presenter.summaryAfterSignedIn : optimizeFlowLabelCopy.presenter.summaryAfterUnsigned,
      },
    ];
  }

    return [
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleInput,
        body: optimizeFlowLabelCopy.stageBody.stage1,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleNextWork,
        body: optimizeFlowLabelCopy.stageTitle.stage2,
      },
      {
        title: optimizeFlowLabelCopy.presenter.sidebar.titleResultConnect,
        body: optimizeFlowLabelCopy.labels.resultContinue,
      },
    ];
  }

function buildSidebarSummary(data: OptimizePageData): {
  current: string;
  next: string;
} {
  if (data.summary) {
    return {
      current: data.summary.diagnosisHeadline,
      next:
        data.summary.directionTitle ??
        data.railPlan?.categoryLabel ??
        optimizeFlowLabelCopy.presenter.summaryNext,
    };
  }

  if (data.parsed?.ok) {
    return {
      current: data.parsed.kindLabel,
      next: data.isSignedIn ? optimizeFlowLabelCopy.presenter.summaryAfterSignedIn : optimizeFlowLabelCopy.presenter.summaryAfterUnsigned,
    };
  }

  return {
    current: optimizeFlowLabelCopy.presenter.summaryDefault.current,
    next: optimizeFlowLabelCopy.presenter.summaryDefault.next,
  };
}

function buildHero(data: OptimizePageData): OptimizePageViewModel["hero"] {
  if (data.isReady && data.parsed?.ok) {
    return {
      body: `${data.parsed.kindLabel} URL을 읽었습니다. 이제 질문 몇 개만 더 고정하면 실행 추천까지 바로 이어집니다.`,
      eyebrow: promptoryWebSurfaceEyebrow,
      state: "ready",
      title: optimizeFlowLabelCopy.presenter.heroStates.readyStateTitle,
    };
  }

  if (data.needsManualReview && data.parsed?.ok) {
    return {
      body: `${data.parsed.kindLabel}는 아직 바로 지원하지 않습니다. 지원 범위와 읽기 한계를 먼저 확인해야 합니다.`,
      eyebrow: promptoryWebSurfaceEyebrow,
      state: "manual_review",
      title: optimizeFlowLabelCopy.presenter.heroStates.manualReviewTitle,
    };
  }

  if (data.needsTuning && data.parsed?.ok) {
    return {
      body: `${data.parsed.kindLabel}로 읽히지만 주소 정보가 약합니다. URL을 조금 더 보정하면 다음 질문으로 이어집니다.`,
      eyebrow: promptoryWebSurfaceEyebrow,
      state: "needs_tuning",
      title: optimizeFlowLabelCopy.presenter.heroStates.tuningTitle,
    };
  }

  return {
    body: `${supportedChannelHeadline} URL 중 하나를 넣으면 채널 종류와 첫 병목부터 바로 읽기 시작합니다.`,
    eyebrow: promptoryWebSurfaceEyebrow,
    state: "idle",
    title: "URL 하나면 첫 답장 시작",
  };
}

function buildInvalidState(data: OptimizePageData): OptimizePageViewModel["invalidState"] {
  const invalidParsed = data.parsed && !data.parsed.ok ? data.parsed : null;

  return {
    hint: optimizeFlowLabelCopy.presenter.invalid.hint,
    message: invalidParsed?.message ?? optimizeFlowLabelCopy.presenter.invalid.message,
  };
}

function buildSidebarAction(data: OptimizePageData): OptimizeSidebarAction {
  return {
    kind: "link",
    href: "/products",
    label: optimizeResultLabelCopy.relatedRailCta,
  };
}

function buildSaveAction(data: OptimizePageData): OptimizeSidebarAction | null {
  if (!data.saveAction) {
    return null;
  }

  if (data.isSignedIn) {
    return {
      kind: "save",
      label: optimizeFlowLabelCopy.sidebar.saveSignedIn,
      payload: data.saveAction,
    };
  }

  return {
    kind: "link",
    href: data.loginToSaveHref,
    label: optimizeFlowLabelCopy.sidebar.saveSignedOut,
  };
}

function buildSaveRail(data: OptimizePageData): OptimizeSaveRailView | null {
  if (data.saveAction) {
    const cta = buildSaveAction(data);

    if (!cta) {
      return null;
    }

    if (data.isSignedIn) {
      return {
        body: optimizeFlowLabelCopy.presenter.saveRailBodySignedIn,
        cta,
        kind: "signed_in_save",
        title: data.summary?.recommendedModules[0]?.title
          ? `${data.summary.recommendedModules[0].title} 축으로 이어지는 ${optimizeFlowLabelCopy.presenter.saveRailSignedInTitle}`
          : optimizeFlowLabelCopy.presenter.saveRailSignedInTitle,
      };
    }

    return {
        body: optimizeFlowLabelCopy.presenter.saveRailBodySignedOut,
        cta,
        kind: "signed_out_login",
        title: optimizeFlowLabelCopy.presenter.saveRailSignedOutTitle,
    };
  }

  if (data.isSignedIn) {
    return {
      body: optimizeFlowLabelCopy.presenter.emptySaveHint,
      kind: "signed_in_empty",
    };
  }

  return null;
}

export function presentOptimizeWorkspace(data: OptimizePageData): OptimizePageViewModel {
  const saveAction = buildSaveAction(data);
  const railAction = buildSidebarAction(data);
  const sidebarSummary = buildSidebarSummary(data);
  const screenState = !data.parsed ? "empty" : data.parsed.ok ? "workspace" : "invalid";
  const showDiagnosis = Boolean(data.snapshot && data.brief.hasAnyInput);
  const showBrowserReview = Boolean(data.snapshot && data.surface?.browserFollowupNeeded);

  return {
    emptyState: {
      body: optimizeFlowLabelCopy.heroBody,
      storyItems: buildStoryItems(data),
      supportedChannelsTitle: optimizeFlowLabelCopy.heroSupportedTitle,
      title: optimizeFlowLabelCopy.presenter.empty.title,
    },
    hero: buildHero(data),
    input: {
      defaultValue: data.rawUrl,
    },
    invalidState: buildInvalidState(data),
    screenState,
    workspace:
      screenState === "workspace" && data.parsed?.ok
        ? {
            activeAsk: data.activeAsk,
            advanced: {
              show: Boolean(data.surface || showDiagnosis || showBrowserReview),
              showBrowserReview,
              showCopyDraft: showDiagnosis,
              showDiagnosis,
              showSurface: Boolean(data.surface),
              title: optimizeFlowLabelCopy.presenter.eyebrowCurrent,
            },
            brief: data.brief,
            parsed: data.parsed,
            railPlan: data.railPlan,
            railProducts: data.railProducts,
            saveRail: buildSaveRail(data),
            savedRuns: data.savedRuns,
            savedRunsEmptyBody:
              !data.savedRuns.length && data.isSignedIn
              ? optimizeFlowLabelCopy.presenter.emptySaveHint
              : null,
            sidebar: {
              cards: buildSidebarCards(data),
              heading: optimizeFlowLabelCopy.presenter.sidebar.heading,
              railAction,
              saveAction,
              summary: sidebarSummary,
            },
            snapshot: data.snapshot,
            summary: data.summary,
            surface: data.surface,
            truthItems: [
              ...optimizeFlowLabelCopy.truthItemsList,
            ],
          }
        : null,
  };
}
