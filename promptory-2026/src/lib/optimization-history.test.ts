import test from "node:test";
import assert from "node:assert/strict";

import {
  buildOptimizationRunQueryString,
  buildOptimizationRunTitle,
  getOptimizationRunRawUrl,
  normalizeOptimizationRunQueryString,
  trimOptimizationSummaryNote,
} from "@/lib/optimization-history";

test("optimization history query builder keeps only supported keys in fixed order", () => {
  const query = buildOptimizationRunQueryString({
    ask: "goal",
    audience: "buyers",
    conversion: "purchase",
    goal: "sales",
    pain: "bounce",
    tone: "clear",
    url: "https://example.com/channel",
  });

  assert.equal(
    query,
    "?url=https%3A%2F%2Fexample.com%2Fchannel&pain=bounce&goal=sales&audience=buyers&tone=clear&conversion=purchase&ask=goal",
  );
});

test("optimization history normalizer drops unknown keys and preserves canonical search", () => {
  const query = normalizeOptimizationRunQueryString(
    "?foo=bar&goal=sales&url=https%3A%2F%2Fexample.com&pain=trust&ask=conversion",
  );

  assert.equal(query, "?url=https%3A%2F%2Fexample.com&pain=trust&goal=sales&ask=conversion");
  assert.equal(getOptimizationRunRawUrl(query), "https://example.com");
});

test("optimization history title prefers focus title", () => {
  assert.equal(
    buildOptimizationRunTitle({
      channelLabel: "YouTube",
      focusTitle: "첫 문장 재정렬",
    }),
    "YouTube · 첫 문장 재정렬",
  );
});

test("optimization history note trimming keeps summaries short", () => {
  assert.equal(trimOptimizationSummaryNote("짧은 메모"), "짧은 메모");
  assert.equal(trimOptimizationSummaryNote("a".repeat(200), 10), "aaaaaaaaa…");
});
