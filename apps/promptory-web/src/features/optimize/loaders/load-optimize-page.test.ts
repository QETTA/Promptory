import assert from "node:assert/strict";
import test from "node:test";

import type { ChannelSurfaceSnapshot } from "@/lib/server/channel-surface-snapshot";
import type { ReplaySafeOptimizationRun } from "@/features/optimize/domain/optimization-run-contract";

import { loadOptimizePage } from "./load-optimize-page";

function createSurfaceSnapshot(normalizedUrl: string): ChannelSurfaceSnapshot {
  return {
    cacheStatus: "miss",
    cacheTtlMs: 600000,
    contentHash: "hash-1",
    normalizedUrl,
    read: {
      actionSignals: ["상담 시작"],
      browserFollowupNeeded: false,
      browserFollowupPoints: [],
      browserFollowupReason: null,
      description: "채널 소개",
      headline: "Promptory 채널",
      notes: ["공개 표면 기준"],
      sourceUrl: normalizedUrl,
      status: "partial",
      statusLabel: "부분 읽기",
      statusReason: "공개 메타와 일부 CTA를 읽었습니다.",
    },
    snapshotTakenAt: "2026-03-31T00:00:00.000Z",
  };
}

function createSavedRun(): ReplaySafeOptimizationRun {
  return {
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
      recommendedCategory: "conversion",
      summaryNote: "저장된 진단입니다.",
      title: "YouTube CTA 진단",
    },
    engine: {
      evidenceSignals: ["YouTube 채널 URL로 분류했습니다."],
      mode: "deterministic",
      rationaleSummary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
      surfaceReadStatus: "partial",
      version: "deterministic-2026-03-31",
    },
    id: "run-1",
    source: {
      normalizedUrl: "https://www.youtube.com/@promptory",
      rawUrl: "https://www.youtube.com/@promptory",
    },
    state: {
      queryString: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta",
      stateKey: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory&pain=weak_cta",
    },
    updatedAt: "2026-03-31T00:00:00.000Z",
  };
}

test("loadOptimizePage returns empty view without telemetry when URL is missing", async () => {
  const events: string[] = [];
  const data = await loadOptimizePage(
    {},
    {
      getOptionalUser: async () => null,
      trackServerEvent: async (name, _payload) => {
        events.push(name);
      },
    },
  );

  assert.equal(data.rawUrl, "");
  assert.equal(data.parsed, null);
  assert.equal(data.saveAction, null);
  assert.deepEqual(data.savedRuns, []);
  assert.deepEqual(events, []);
});

test("loadOptimizePage returns invalid view for malformed URL input", async () => {
  const data = await loadOptimizePage(
    {
      url: "https:// example.com",
    },
    {
      getOptionalUser: async () => null,
      trackServerEvent: async (_name, _payload) => {},
    },
  );

  assert.ok(data.parsed && !data.parsed.ok);
  assert.match(data.parsed.message, /공백이 들어간 주소/);
  assert.equal(data.summary, null);
});

test("loadOptimizePage builds workspace data and emits ask + recommendation telemetry for a supported signed-out run", async () => {
  const events: Array<{ name: string; payload: Record<string, unknown> }> = [];
  const data = await loadOptimizePage(
    {
      audience: "warm",
      conversion: "purchase",
      goal: "sales",
      pain: "weak_cta",
      tone: "trustworthy",
      url: "https://www.youtube.com/@promptory",
    },
    {
      getChannelSurfaceSnapshot: async (parsed) => createSurfaceSnapshot(parsed.normalizedUrl),
      getOptionalUser: async () => null,
      getPublishedProducts: async () => [],
      trackServerEvent: async (name, payload = {}) => {
        events.push({ name, payload: payload as Record<string, unknown> });
      },
    },
  );

  assert.ok(data.parsed?.ok);
  assert.ok(data.snapshot);
  assert.ok(data.summary);
  assert.ok(data.railPlan);
  assert.ok(data.saveAction);
  assert.equal(data.isSignedIn, false);
  assert.deepEqual(
    events.map((event) => event.name),
    ["ask_completed", "recommendation_generated"],
  );
  assert.equal(events[1]?.payload.railCategory, data.railPlan?.category);
});

test("loadOptimizePage uses signed-in limits and saved runs when the viewer is authenticated", async () => {
  const savedRun = createSavedRun();
  const savedRunCalls: number[] = [];
  const productCategories: string[] = [];

  const data = await loadOptimizePage(
    {
      audience: "warm",
      conversion: "purchase",
      goal: "sales",
      pain: "weak_cta",
      tone: "trustworthy",
      url: "https://www.youtube.com/@promptory",
    },
    {
      getChannelSurfaceSnapshot: async (parsed) => createSurfaceSnapshot(parsed.normalizedUrl),
      getOptionalUser: async () =>
        ({
          email: "user@example.com",
          id: "user-1",
        }) as never,
      getPublishedProducts: async (options = {}) => {
        if (options.category) {
          productCategories.push(options.category);
        }

        return [];
      },
      getSavedOptimizationRuns: async (_userId, limit = 6) => {
        savedRunCalls.push(limit);
        return [savedRun];
      },
      trackServerEvent: async (_name, _payload) => {},
    },
  );

  assert.equal(data.isSignedIn, true);
  assert.equal(savedRunCalls[0], 3);
  assert.equal(data.savedRuns[0]?.id, savedRun.id);
  assert.equal(productCategories[0], data.railPlan?.category);
  assert.match(data.loginToSaveHref, /\/login\?next=/);
  assert.match(decodeURIComponent(data.loginToSaveHref), /\/optimize\?/);
});
