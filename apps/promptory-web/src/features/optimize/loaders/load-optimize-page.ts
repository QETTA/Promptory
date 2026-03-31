import { buildLoginHref } from "@/lib/auth-redirect";
import { parseChannelInput } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";
import { resolveOptimizationEngine } from "@/lib/optimization-engine/index";
import { buildOptimizationRunQueryString, trimOptimizationSummaryNote } from "@/lib/optimization-history";
import { parseOptimizationBrief } from "@/lib/optimization-brief";
import { getOptionalUser } from "@/lib/server/auth";
import { getChannelSurfaceSnapshot } from "@/lib/server/channel-surface-snapshot";
import { getSavedOptimizationRuns } from "@/lib/server/optimization-runs";
import { getPublishedProducts } from "@/lib/server/products";
import { trackServerEvent } from "@/lib/server/telemetry";

import type { OptimizePageData, OptimizePageSearchParams, OptimizeSaveAction } from "../types/optimize-page-data";

type LoadOptimizePageDependencies = {
  buildChannelSnapshot: typeof buildChannelSnapshot;
  buildLoginHref: typeof buildLoginHref;
  buildOptimizationRunQueryString: typeof buildOptimizationRunQueryString;
  getChannelSurfaceSnapshot: typeof getChannelSurfaceSnapshot;
  getOptionalUser: typeof getOptionalUser;
  getPublishedProducts: typeof getPublishedProducts;
  getSavedOptimizationRuns: typeof getSavedOptimizationRuns;
  parseChannelInput: typeof parseChannelInput;
  parseOptimizationBrief: typeof parseOptimizationBrief;
  resolveOptimizationEngine: typeof resolveOptimizationEngine;
  trackServerEvent: typeof trackServerEvent;
  trimOptimizationSummaryNote: typeof trimOptimizationSummaryNote;
};

const defaultDependencies: LoadOptimizePageDependencies = {
  buildChannelSnapshot,
  buildLoginHref,
  buildOptimizationRunQueryString,
  getChannelSurfaceSnapshot,
  getOptionalUser,
  getPublishedProducts,
  getSavedOptimizationRuns,
  parseChannelInput,
  parseOptimizationBrief,
  resolveOptimizationEngine,
  trackServerEvent,
  trimOptimizationSummaryNote,
};

function getUrlParam(params: OptimizePageSearchParams | undefined) {
  const raw = params?.url;
  return Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";
}

function getActiveAsk(params: OptimizePageSearchParams) {
  return Array.isArray(params.ask) ? params.ask[0] : params.ask;
}

function buildSaveAction(params: {
  engineResult: OptimizePageData["engineResult"];
  parsed: OptimizePageData["parsed"];
  queryString: string;
  railPlan: OptimizePageData["railPlan"];
  rawUrl: string;
  saveSummaryNote: string | null;
  summary: OptimizePageData["summary"];
  surface: OptimizePageData["surface"];
}): OptimizeSaveAction | null {
  if (!params.summary || !params.parsed?.ok) {
    return null;
  }

  return {
    channelKind: params.parsed.kind,
    channelLabel: params.parsed.kindLabel,
    engineMode: params.engineResult?.engineMode,
    engineVersion: params.engineResult?.engineVersion,
    evidenceSignals: params.engineResult?.rationale.evidence.map((item) => item.detail),
    focusTitle: params.summary.recommendedModules[0]?.title,
    normalizedUrl: params.parsed.normalizedUrl,
    queryString: params.queryString,
    rationaleSummary: params.engineResult?.rationale.summary,
    rawUrl: params.rawUrl,
    recommendedCategory: params.railPlan?.category,
    surfaceReadStatus: params.surface?.status,
    summaryNote: params.saveSummaryNote,
  };
}

export async function loadOptimizePage(
  searchParams: OptimizePageSearchParams = {},
  overrides: Partial<LoadOptimizePageDependencies> = {},
): Promise<OptimizePageData> {
  const deps = { ...defaultDependencies, ...overrides };
  const params = searchParams ?? {};
  const rawUrl = getUrlParam(params).trim();
  const activeAsk = getActiveAsk(params);
  const parsed = rawUrl ? deps.parseChannelInput(rawUrl) : null;
  const snapshot = parsed?.ok ? deps.buildChannelSnapshot(parsed) : null;
  const brief = deps.parseOptimizationBrief(params);
  const queryString = deps.buildOptimizationRunQueryString(params);
  const user = await deps.getOptionalUser();
  const isSignedIn = Boolean(user);
  const surfaceSnapshot = parsed?.ok ? await deps.getChannelSurfaceSnapshot(parsed) : null;
  const engineResult =
    parsed?.ok && snapshot
      ? deps.resolveOptimizationEngine({
          brief,
          parsed,
          signedIn: isSignedIn,
          snapshot,
          surfaceSnapshot,
        })
      : null;
  const summary = engineResult?.summary ?? null;
  const railPlan = engineResult?.railPlan ?? null;
  const surface = engineResult?.surface ?? surfaceSnapshot?.read ?? null;
  const savedRuns = user ? await deps.getSavedOptimizationRuns(user.id, summary ? 3 : 6) : [];
  const railProducts = railPlan ? await deps.getPublishedProducts({ category: railPlan.category, sort: "interest", limit: 3 }) : [];
  const isReady = snapshot?.readinessStatus === "pass";
  const needsManualReview = snapshot?.readinessStatus === "fail";
  const needsTuning = snapshot?.readinessStatus === "warn";
  const saveSummaryNote = summary
    ? deps.trimOptimizationSummaryNote(summary.diagnosisBody) ?? deps.trimOptimizationSummaryNote(summary.directionPoints[0] ?? "")
    : null;
  const loginToSaveHref = deps.buildLoginHref(`/optimize${queryString}`);
  const saveAction = buildSaveAction({
    engineResult,
    parsed,
    queryString,
    railPlan,
    rawUrl,
    saveSummaryNote,
    summary,
    surface,
  });

  if (parsed?.ok && brief.hasAnyInput) {
    await deps.trackServerEvent(brief.isComplete ? "ask_completed" : "ask_started", {
      channelKind: parsed.kind,
      normalizedUrl: parsed.normalizedUrl,
      queryString,
    });
  }

  if (engineResult && railPlan) {
    await deps.trackServerEvent("recommendation_generated", {
      channelKind: parsed?.ok ? parsed.kind : null,
      engineMode: engineResult.engineMode,
      engineVersion: engineResult.engineVersion,
      queryString,
      railCategory: railPlan.category,
      recommendationPayloadHash: engineResult.recommendationPayloadHash,
      surfaceStatus: surface?.status ?? null,
    });
  }

  return {
    activeAsk,
    brief,
    engineResult,
    isReady,
    isSignedIn,
    loginToSaveHref,
    needsManualReview,
    needsTuning,
    parsed,
    queryString,
    railPlan,
    railProducts,
    rawUrl,
    saveAction,
    saveSummaryNote,
    savedRuns,
    snapshot,
    summary,
    surface,
  };
}
