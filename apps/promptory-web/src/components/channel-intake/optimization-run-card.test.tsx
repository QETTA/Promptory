import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { optimizeResultLabelCopy } from "@/lib/optimize-copy";
import { OptimizationRunCard } from "@/components/channel-intake/optimization-run-card";
import type { ReplaySafeOptimizationRun } from "@/features/optimize/domain/optimization-run-contract";

test("optimization run card renders reopen and module links for saved diagnoses", () => {
  const run: ReplaySafeOptimizationRun = {
    id: "run-1",
    brief: {
      constraint: "",
      goal: "sales",
      hasAnyInput: true,
      isComplete: false,
      missingFields: ["대상 고객", "톤", "전환 행동"],
      pain: "weak_cta",
    },
    channel: {
      kind: "youtube",
      label: "YouTube 채널",
    },
    createdAt: "2026-03-31T00:00:00.000Z",
    derived: {
      focusTitle: "전환 CTA",
      recommendedCategory: "마케팅",
      summaryNote: "현재 답변 축과 URL 상태를 다시 여는 저장 진단입니다.",
      title: "YouTube CTA 진단",
    },
    engine: {
      evidenceSignals: ["YouTube 채널 URL로 분류했습니다."],
      mode: "deterministic",
      rationaleSummary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
      surfaceReadStatus: "partial",
      version: "deterministic-2026-03-31",
    },
    source: {
      normalizedUrl: "https://www.youtube.com/@promptory",
      rawUrl: "https://www.youtube.com/@promptory",
    },
    state: {
      queryString: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=cta",
      stateKey: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=cta",
    },
    updatedAt: "2026-03-31T00:00:00.000Z",
  };

  const markup = renderToStaticMarkup(<OptimizationRunCard run={run} />);

  assert.match(markup, new RegExp(optimizeResultLabelCopy.savedRunKicker));
  assert.match(markup, /YouTube CTA 진단/);
  assert.match(markup, /\/optimize\?url=/);
  assert.match(markup, /\/products\?category=/);
});
