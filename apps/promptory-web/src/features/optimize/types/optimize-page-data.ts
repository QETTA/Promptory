import type { ParsedChannelInput, ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import type { OptimizationEngineOutput } from "@/lib/optimization-engine/contracts";
import type { OptimizationBrief, OptimizationBriefSummary } from "@/lib/optimization-brief";
import type { OptimizeRailPlan } from "@/lib/optimize-rail";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import type { ProductWithSeller } from "@/lib/server/products";

import type { ReplaySafeOptimizationRun } from "@/features/optimize/domain/optimization-run-contract";

export type OptimizePageSearchParams = {
  ask?: string | string[];
  audience?: string | string[];
  constraint?: string | string[];
  conversion?: string | string[];
  goal?: string | string[];
  pain?: string | string[];
  tone?: string | string[];
  url?: string | string[];
};

export type OptimizeSignalCard = {
  body: string;
  label: string;
  value: string;
};

export type OptimizeStoryCard = {
  body: string;
  eyebrow: string;
  title: string;
};

export type OptimizeSidebarCard = {
  body: string;
  title: string;
};

export type OptimizeSaveAction = {
  channelKind: string;
  channelLabel: string;
  engineMode?: string | null;
  engineVersion?: string | null;
  evidenceSignals?: string[] | null;
  focusTitle?: string | null;
  normalizedUrl?: string | null;
  queryString: string;
  rationaleSummary?: string | null;
  rawUrl: string;
  recommendedCategory?: string | null;
  summaryNote?: string | null;
  surfaceReadStatus?: string | null;
};

export type OptimizePageScreenState = "empty" | "invalid" | "workspace";
export type OptimizeHeroState = "idle" | "ready" | "manual_review" | "needs_tuning";

export type OptimizePageData = {
  activeAsk?: string;
  brief: OptimizationBrief;
  engineResult: OptimizationEngineOutput | null;
  isReady: boolean;
  isSignedIn: boolean;
  loginToSaveHref: string;
  needsManualReview: boolean;
  needsTuning: boolean;
  parsed: ParsedChannelInput | null;
  queryString: string;
  railPlan: OptimizeRailPlan | null;
  railProducts: ProductWithSeller[];
  rawUrl: string;
  saveAction: OptimizeSaveAction | null;
  saveSummaryNote: string | null;
  savedRuns: ReplaySafeOptimizationRun[];
  snapshot: ChannelSnapshot | null;
  summary: OptimizationBriefSummary | null;
  surface: ChannelSurfaceRead | null;
};

export type OptimizeSidebarAction =
  | {
      kind: "link";
      href: string;
      label: string;
    }
  | {
      kind: "save";
      label: string;
      payload: OptimizeSaveAction;
    };

export type OptimizeSaveRailView =
  | {
      body: string;
      cta: OptimizeSidebarAction;
      kind: "signed_in_save";
      title: string;
    }
  | {
      body: string;
      cta: OptimizeSidebarAction;
      kind: "signed_out_login";
      title: string;
    }
  | {
      body: string;
      kind: "signed_in_empty";
    };

export type OptimizeAdvancedReadoutsView = {
  show: boolean;
  showBrowserReview: boolean;
  showCopyDraft: boolean;
  showDiagnosis: boolean;
  showSurface: boolean;
  title: string;
};

export type OptimizeSidebarView = {
  cards: OptimizeSidebarCard[];
  heading: string;
  railAction: OptimizeSidebarAction;
  saveAction: OptimizeSidebarAction | null;
  summary: {
    current: string;
    next: string;
  };
};

export type OptimizeWorkspaceView = {
  activeAsk?: string;
  advanced: OptimizeAdvancedReadoutsView;
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  railPlan: OptimizeRailPlan | null;
  railProducts: ProductWithSeller[];
  saveRail: OptimizeSaveRailView | null;
  savedRuns: ReplaySafeOptimizationRun[];
  savedRunsEmptyBody: string | null;
  sidebar: OptimizeSidebarView;
  snapshot: ChannelSnapshot | null;
  summary: OptimizationBriefSummary | null;
  surface: ChannelSurfaceRead | null;
  truthItems: string[];
};

export type OptimizePageViewModel = {
  emptyState: {
    body: string;
    storyItems: OptimizeStoryCard[];
    supportedChannelsTitle: string;
    title: string;
  };
  hero: {
    body: string;
    eyebrow: string;
    state: OptimizeHeroState;
    title: string;
  };
  input: {
    defaultValue: string;
  };
  invalidState: {
    hint: string;
    message: string;
  };
  screenState: OptimizePageScreenState;
  workspace: OptimizeWorkspaceView | null;
};
