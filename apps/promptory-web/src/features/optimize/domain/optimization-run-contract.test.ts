import assert from "node:assert/strict";
import test from "node:test";

import type { OptimizationRunRow } from "@/lib/supabase/types";

import {
  buildReplaySafeOptimizationRun,
  mapOptimizationRunRowToReplaySafeRun,
  toOptimizationRunPersistencePayload,
} from "./optimization-run-contract";

test("replay-safe optimization run normalizes query and reconstructs brief state", () => {
  const run = buildReplaySafeOptimizationRun({
    channelKind: "youtube",
    channelLabel: "YouTube 채널",
    engineMode: "deterministic",
    engineVersion: "deterministic-2026-03-31",
    evidenceSignals: ["YouTube 채널 URL로 분류했습니다."],
    focusTitle: "전환 CTA",
    normalizedUrl: "https://www.youtube.com/@promptory",
    queryString:
      "?foo=bar&goal=sales&url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta&audience=warm",
    rationaleSummary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
    rawUrl: "",
    recommendedCategory: "marketing",
    summaryNote: "현재 답변 축과 URL 상태를 다시 여는 저장 진단입니다.",
    surfaceReadStatus: "partial",
    userId: "user-1",
  });

  assert.equal(
    run.state.queryString,
    "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta&goal=sales&audience=warm",
  );
  assert.equal(run.source.rawUrl, "https://www.youtube.com/@promptory");
  assert.equal(run.brief.goal, "sales");
  assert.equal(run.brief.pain, "weak_cta");
  assert.equal(run.derived.title, "YouTube 채널 · 전환 CTA");
});

test("optimization run persistence payload reuses replay-safe normalized state key", () => {
  const payload = toOptimizationRunPersistencePayload({
    channelKind: "youtube",
    channelLabel: "YouTube 채널",
    queryString: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta",
    rawUrl: "https://www.youtube.com/@promptory",
    userId: "user-1",
  });

  assert.equal(payload.state_key, payload.query_string);
  assert.equal(payload.raw_url, "https://www.youtube.com/@promptory");
  assert.equal(payload.title, "YouTube 채널 진단 결과");
});

test("optimization run row mapping separates db row from replay-safe run contract", () => {
  const row: OptimizationRunRow = {
    id: "run-1",
    user_id: "user-1",
    title: "YouTube CTA 진단",
    raw_url: "https://www.youtube.com/@promptory",
    normalized_url: "https://www.youtube.com/@promptory",
    channel_kind: "youtube",
    channel_label: "YouTube 채널",
    query_string: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta&goal=sales",
    state_key: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta&goal=sales",
    engine_mode: "deterministic",
    engine_version: "deterministic-2026-03-31",
    evidence_signals: ["YouTube 채널 URL로 분류했습니다."],
    focus_title: "전환 CTA",
    rationale_summary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
    recommended_category: "marketing",
    surface_read_status: "partial",
    summary_note: "현재 답변 축과 URL 상태를 다시 여는 저장 진단입니다.",
    created_at: "2026-03-31T00:00:00.000Z",
    updated_at: "2026-03-31T00:00:00.000Z",
  };

  const run = mapOptimizationRunRowToReplaySafeRun(row);

  assert.equal(run.channel.label, "YouTube 채널");
  assert.equal(run.source.rawUrl, "https://www.youtube.com/@promptory");
  assert.equal(run.state.queryString, row.query_string);
  assert.equal(run.brief.goal, "sales");
});
