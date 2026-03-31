import { createHash } from "node:crypto";

import { getOptimizeRailPlan } from "@/lib/optimize-rail";
import { buildOptimizationBriefSummary } from "@/lib/optimization-brief";

import {
  DETERMINISTIC_ENGINE_MODE,
  DETERMINISTIC_ENGINE_VERSION,
  type OptimizationEngineInput,
  type OptimizationEngineOutput,
  type RecommendationEvidence,
} from "./contracts";

function buildRecommendationEvidence(input: OptimizationEngineInput): RecommendationEvidence[] {
  const evidence: RecommendationEvidence[] = [
    {
      kind: "channel",
      detail: `${input.parsed.kindLabel} URL로 분류하고 직접 경로를 해석했습니다.`,
    },
    {
      kind: "snapshot",
      detail: `${input.snapshot.readyLabel}: ${input.snapshot.readyReason}`,
    },
  ];

  if (input.brief.pain) {
    evidence.push({
      kind: "brief",
      detail: `Pain을 ${input.brief.pain}으로 고정했습니다.`,
    });
  }

  if (input.brief.goal) {
    evidence.push({
      kind: "brief",
      detail: `Goal을 ${input.brief.goal}으로 고정했습니다.`,
    });
  }

  if (input.surfaceSnapshot?.read?.status) {
    evidence.push({
      kind: "surface",
      detail: `공개 표면 읽기 상태는 ${input.surfaceSnapshot.read.statusLabel}입니다.`,
    });
  }

  return evidence;
}

function buildRationaleSummary(input: OptimizationEngineInput) {
  if (!input.brief.hasAnyInput) {
    return "아직 Ask 답변이 없어 채널 분류와 공개 표면 신호만으로 시작용 추천을 만들었습니다.";
  }

  if (!input.brief.isComplete) {
    return "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.";
  }

  return "현재 Ask 답변, 채널 분류, 공개 표면 신호를 함께 묶어 deterministic 추천을 만들었습니다.";
}

function buildConfidenceBand(input: OptimizationEngineInput) {
  if (!input.surfaceSnapshot || input.surfaceSnapshot.read.status === "unavailable") {
    return input.brief.isComplete ? "medium" : "low";
  }

  if (input.surfaceSnapshot.read.status === "partial" || !input.brief.isComplete) {
    return "medium";
  }

  return "high";
}

export function resolveOptimizationEngine(input: OptimizationEngineInput): OptimizationEngineOutput {
  const surface = input.surfaceSnapshot?.read ?? null;
  const summary = buildOptimizationBriefSummary({
    brief: input.brief,
    parsed: input.parsed,
    snapshot: input.snapshot,
    surface,
  });
  const railPlan = getOptimizeRailPlan({
    brief: input.brief,
    kind: input.parsed.kind,
    kindLabel: input.parsed.kindLabel,
    moduleTitles: summary.recommendedModules.map((module) => module.title),
    signedIn: input.signedIn,
  });
  const rationale = {
    confidenceBand: buildConfidenceBand(input),
    evidence: buildRecommendationEvidence(input),
    summary: buildRationaleSummary(input),
  } as const;
  const recommendationPayloadHash = createHash("sha256")
    .update(
      JSON.stringify({
        brief: input.brief,
        kind: input.parsed.kind,
        modules: summary.recommendedModules,
        railCategory: railPlan?.category ?? null,
        surfaceStatus: surface?.status ?? null,
      }),
    )
    .digest("hex");

  return {
    engineMode: DETERMINISTIC_ENGINE_MODE,
    engineVersion: DETERMINISTIC_ENGINE_VERSION,
    railPlan,
    rationale,
    recommendationPayloadHash,
    summary,
    surface,
    surfaceSnapshot: input.surfaceSnapshot,
  };
}
