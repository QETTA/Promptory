import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { OptimizationRunCard } from "@/components/channel-intake/optimization-run-card";
import type { OptimizationRunRow } from "@/lib/supabase/types";

test("optimization run card renders reopen and module links for saved diagnoses", () => {
  const run: OptimizationRunRow = {
    id: "run-1",
    user_id: "user-1",
    title: "YouTube CTA 진단",
    raw_url: "https://www.youtube.com/@promptory",
    normalized_url: "https://www.youtube.com/@promptory",
    channel_kind: "youtube",
    channel_label: "YouTube 채널",
    query_string: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=cta",
    state_key: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=cta",
    engine_mode: "deterministic",
    engine_version: "deterministic-2026-03-31",
    evidence_signals: ["YouTube 채널 URL로 분류했습니다."],
    focus_title: "전환 CTA",
    rationale_summary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
    recommended_category: "마케팅",
    surface_read_status: "partial",
    summary_note: "현재 답변 축과 URL 상태를 다시 여는 저장 진단입니다.",
    created_at: "2026-03-31T00:00:00.000Z",
    updated_at: "2026-03-31T00:00:00.000Z",
  };

  const markup = renderToStaticMarkup(<OptimizationRunCard run={run} />);

  assert.match(markup, /Saved Run/);
  assert.match(markup, /YouTube CTA 진단/);
  assert.match(markup, /\/optimize\?url=/);
  assert.match(markup, /\/products\?category=/);
});
