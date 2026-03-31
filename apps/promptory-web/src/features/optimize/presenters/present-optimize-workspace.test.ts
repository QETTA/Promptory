import assert from "node:assert/strict";
import test from "node:test";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";

import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import type { ChannelSurfaceSnapshot } from "@/lib/server/channel-surface-snapshot";
import type { ReplaySafeOptimizationRun } from "@/features/optimize/domain/optimization-run-contract";

import { loadOptimizePage } from "../loaders/load-optimize-page";
import { presentOptimizeWorkspace } from "./present-optimize-workspace";

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

function createManualReviewSnapshot(normalizedUrl: string): ChannelSnapshot {
  return {
    readinessStatus: "fail",
    confidenceLabel: "중간",
    confidenceReason: "지원 여부는 읽히지만 수동 확인이 먼저 필요합니다.",
    checks: [
      {
        detail: "지원 범위를 먼저 확인해야 합니다.",
        label: "지원 채널",
        status: "fail",
      },
    ],
    hostLabel: "youtube.com",
    identifier: "@promptory",
    identifierLabel: "채널 핸들",
    kindLabel: "YouTube 채널",
    nextSignals: ["지원 범위 확인"],
    normalizedUrl,
    pathLabel: "채널 경로",
    pathValue: "/@promptory",
    readyLabel: "수동 확인 권장",
    readyReason: "현재 우선 지원 범위 밖이라 수동 검토가 먼저 필요합니다.",
    summaryPoints: ["수동 검토 선행"],
    supportLabel: "지원 채널",
    surfaceHint: "채널 소개와 링크 영역 확인",
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

test("presentOptimizeWorkspace returns the empty view model for missing URL input", async () => {
  const data = await loadOptimizePage(
    {},
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const view = presentOptimizeWorkspace(data);

  assert.equal(view.screenState, "empty");
  assert.equal(view.hero.state, "idle");
  assert.equal(view.hero.title, "URL 하나면 첫 답장 시작");
  assert.equal(view.emptyState.supportedChannelsTitle, "지원 채널");
  assert.equal(view.workspace, null);
});

test("presentOptimizeWorkspace returns the invalid view model for malformed URL input", async () => {
  const data = await loadOptimizePage(
    {
      url: "https:// example.com",
    },
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const view = presentOptimizeWorkspace(data);

  assert.equal(view.screenState, "invalid");
  assert.match(view.invalidState.message, /공백이 들어간 주소/);
  assert.equal(view.workspace, null);
});

test("presentOptimizeWorkspace builds a ready signed-out workspace view", async () => {
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
      trackServerEvent: async () => {},
    },
  );

  const view = presentOptimizeWorkspace(data);

  assert.equal(view.hero.state, "ready");
  assert.equal(view.hero.title, "URL 확인이 끝났습니다");
  assert.equal(view.workspace?.sidebar.heading, optimizeFlowLabelCopy.presenter.sidebar.heading);
  assert.equal(view.workspace?.saveRail?.kind, "signed_out_login");
  assert.equal(view.workspace?.sidebar.saveAction?.kind, "link");
});

test("presentOptimizeWorkspace keeps the manual review branch distinct from ready state", async () => {
  const data = await loadOptimizePage(
    {
      url: "https://www.youtube.com/@promptory",
    },
    {
      buildChannelSnapshot: (parsed) => createManualReviewSnapshot(parsed.normalizedUrl),
      getChannelSurfaceSnapshot: async (parsed) => createSurfaceSnapshot(parsed.normalizedUrl),
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const view = presentOptimizeWorkspace(data);

  assert.equal(view.hero.state, "manual_review");
  assert.match(view.hero.body, /지원 범위/);
});

test("presentOptimizeWorkspace chooses direct save CTA for signed-in workspace", async () => {
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
      getPublishedProducts: async () => [],
      getSavedOptimizationRuns: async () => [createSavedRun()],
      trackServerEvent: async () => {},
    },
  );

  const view = presentOptimizeWorkspace(data);

  assert.equal(view.workspace?.saveRail?.kind, "signed_in_save");
  assert.equal(view.workspace?.sidebar.saveAction?.kind, "save");
  assert.equal(view.workspace?.savedRuns.length, 1);
});
