import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import type { OptimizeRailPlan } from "@/lib/optimize-rail";
import type { OptimizationBrief, OptimizationBriefSummary } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import type { ChannelSurfaceSnapshot } from "@/lib/server/channel-surface-snapshot";

export const DETERMINISTIC_ENGINE_MODE = "deterministic" as const;
export const DETERMINISTIC_ENGINE_VERSION = "deterministic-2026-03-31" as const;

export type OptimizationEngineMode = typeof DETERMINISTIC_ENGINE_MODE | "provider_backed";

export type RecommendationEvidence = {
  detail: string;
  kind: "brief" | "channel" | "snapshot" | "surface";
};

export type RecommendationRationale = {
  confidenceBand: "high" | "medium" | "low";
  evidence: RecommendationEvidence[];
  summary: string;
};

export type OptimizationEngineInput = {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  signedIn: boolean;
  snapshot: ChannelSnapshot;
  surfaceSnapshot: ChannelSurfaceSnapshot | null;
};

export type OptimizationEngineOutput = {
  engineMode: OptimizationEngineMode;
  engineVersion: string;
  railPlan: OptimizeRailPlan | null;
  rationale: RecommendationRationale;
  recommendationPayloadHash: string;
  summary: OptimizationBriefSummary;
  surface: ChannelSurfaceRead | null;
  surfaceSnapshot: ChannelSurfaceSnapshot | null;
};
