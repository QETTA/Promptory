import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { ToastProvider } from "@/components/ui/toast-provider";

import { loadOptimizePage } from "../loaders/load-optimize-page";
import { presentOptimizeWorkspace } from "../presenters/present-optimize-workspace";
import type { OptimizePageData } from "../types/optimize-page-data";
import { OptimizePageScreen } from "./optimize-page-screen";

function renderScreen(view: ReturnType<typeof presentOptimizeWorkspace>) {
  return renderToStaticMarkup(
    <ToastProvider>
      <OptimizePageScreen view={view} />
    </ToastProvider>,
  );
}

test("optimize page screen renders the empty state", async () => {
  const data = await loadOptimizePage(
    {},
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const html = renderScreen(presentOptimizeWorkspace(data));

  assert.match(html, /URL 하나면 첫 답장 시작/);
  assert.match(html, /지원 채널/);
});

test("optimize page screen renders the invalid state", async () => {
  const data = await loadOptimizePage(
    {
      url: "https:// example.com",
    },
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const html = renderScreen(presentOptimizeWorkspace(data));

  assert.match(html, /공백이 들어간 주소는 사용할 수 없습니다/);
  assert.doesNotMatch(html, /현재 작업면/);
});

test("optimize page screen renders the signed-out workspace branch", async () => {
  const data = await loadOptimizePage(
    {},
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const workspaceData: OptimizePageData = {
    ...data,
    isReady: true,
    parsed: {
      ok: true as const,
      input: "https://www.youtube.com/@promptory",
      normalizedUrl: "https://www.youtube.com/@promptory",
      hostname: "youtube.com",
      kind: "youtube" as const,
      kindLabel: "YouTube 채널",
      supported: true,
      supportLabel: "지원 채널",
      focusPoints: [],
      trustPoints: [],
    },
    rawUrl: "https://www.youtube.com/@promptory",
    saveAction: {
      channelKind: "youtube",
      channelLabel: "YouTube 채널",
      queryString: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory",
      rawUrl: "https://www.youtube.com/@promptory",
    },
  };

  const html = renderScreen(presentOptimizeWorkspace(workspaceData));

  assert.match(html, /URL 확인이 끝났습니다/);
  assert.match(html, /대화형 작업면/);
  assert.match(html, /후속 액션 보기/);
  assert.match(html, /로그인 후 저장/);
});

test("optimize page screen renders advanced readouts without breaking the signed-out save branch", async () => {
  const data = await loadOptimizePage(
    {},
    {
      getOptionalUser: async () => null,
      trackServerEvent: async () => {},
    },
  );

  const workspaceData: OptimizePageData = {
    ...data,
    brief: {
      ...data.brief,
      audience: "warm" as const,
      conversion: "purchase" as const,
      goal: "sales" as const,
      hasAnyInput: true,
      isComplete: true,
      pain: "weak_cta" as const,
      tone: "trustworthy" as const,
    },
    isReady: true,
    isSignedIn: false,
    parsed: {
      ok: true as const,
      input: "https://www.youtube.com/@promptory",
      normalizedUrl: "https://www.youtube.com/@promptory",
      hostname: "youtube.com",
      kind: "youtube" as const,
      kindLabel: "YouTube 채널",
      supported: true,
      supportLabel: "지원 채널",
      focusPoints: [],
      trustPoints: [],
    },
    rawUrl: "https://www.youtube.com/@promptory",
    saveAction: {
      channelKind: "youtube",
      channelLabel: "YouTube 채널",
      queryString: "?url=https%3A%2F%2Fwww.youtube.com%2F%40promptory",
      rawUrl: "https://www.youtube.com/@promptory",
    },
    savedRuns: [
      {
        brief: {
          constraint: "",
          goal: "sales" as const,
          hasAnyInput: true,
          isComplete: false,
          missingFields: ["대상 고객"],
          pain: "weak_cta" as const,
        },
        channel: {
          kind: "youtube" as const,
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
          mode: "deterministic" as const,
          rationaleSummary: "현재 Ask 답변과 공개 표면 신호를 기준으로 임시 추천을 만들었습니다.",
          surfaceReadStatus: "partial" as const,
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
      },
    ],
    snapshot: {
      readinessStatus: "pass",
      confidenceLabel: "높음",
      confidenceReason: "지원 채널, 직접 경로, 식별자, 보안 주소가 모두 확인돼 다음 채널 읽기 단계로 이어지기 좋습니다.",
      checks: [],
      hostLabel: "youtube.com",
      identifier: "@promptory",
      identifierLabel: "채널 핸들",
      kindLabel: "YouTube 채널",
      nextSignals: ["영상 설명 읽기"],
      normalizedUrl: "https://www.youtube.com/@promptory",
      pathLabel: "채널 경로",
      pathValue: "/@promptory",
      readyLabel: "다음 단계 진행 가능",
      readyReason: "URL 구조만으로도 다음 단계 채널 읽기 화면으로 연결할 준비가 됐습니다.",
      summaryPoints: ["직접 경로 확인"],
      supportLabel: "지원 채널",
      surfaceHint: "영상 설명, 고정 댓글, 채널 소개, 외부 링크 안내 문장",
    },
    summary: null,
    surface: {
      actionSignals: ["상담 시작"],
      browserFollowupNeeded: false,
      browserFollowupPoints: [],
      browserFollowupReason: null,
      description: "채널 소개",
      headline: "Promptory 채널",
      notes: ["공개 표면 기준"],
      sourceUrl: "https://www.youtube.com/@promptory",
      status: "partial",
      statusLabel: "부분 읽기",
      statusReason: "공개 메타와 일부 CTA를 읽었습니다.",
    },
  };

  const html = renderScreen(presentOptimizeWorkspace(workspaceData));

  assert.match(html, /로그인 후 저장/);
  assert.match(html, /보조 패널/);
  assert.match(html, /저장 진단/);
});
