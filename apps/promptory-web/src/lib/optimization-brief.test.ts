import assert from "node:assert/strict";
import test from "node:test";

import { parseChannelInput } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, getOptimizationRecommendations, parseOptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import { parseChannelSurfaceHtml } from "@/lib/server/channel-surface-read";

test("optimization brief parser keeps only allowed option values", () => {
  const brief = parseOptimizationBrief({
    pain: "weak_cta",
    goal: "sales",
    audience: "warm",
    tone: "expert",
    conversion: "purchase",
    constraint: "과장 표현 금지",
  });

  assert.equal(brief.goal, "sales");
  assert.equal(brief.pain, "weak_cta");
  assert.equal(brief.audience, "warm");
  assert.equal(brief.tone, "expert");
  assert.equal(brief.conversion, "purchase");
  assert.equal(brief.isComplete, true);
});

test("optimization brief parser tracks missing fields", () => {
  const brief = parseOptimizationBrief({
    goal: "sales",
    constraint: "",
  });

  assert.equal(brief.isComplete, false);
  assert.deepEqual(brief.missingFields, ["지금 막히는 지점", "대상 고객", "톤", "전환 행동"]);
});

test("optimization brief summary reflects snapshot and brief direction", () => {
  const parsed = parseChannelInput("youtube.com/@promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);
  const brief = parseOptimizationBrief({
    pain: "low_trust",
    goal: "sales",
    audience: "comparing",
    tone: "trustworthy",
    conversion: "purchase",
    constraint: "할인 강조보다 신뢰 정보 우선",
  });
  const surface = parseChannelSurfaceHtml(
    parsed,
    `
      <html>
        <head>
          <title>Promptory</title>
          <meta name="description" content="전환 흐름을 정리하는 채널" />
        </head>
      </html>
    `,
    "https://www.youtube.com/@promptory",
  );
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  assert.equal(summary.readinessLabel, "질문 준비 완료");
  assert.match(summary.directionTitle, /상품 판매 전환/);
  assert.equal(summary.directionPoints.some((point) => point.includes("할인 강조보다 신뢰 정보 우선")), true);
  assert.equal(summary.recommendedModules.length > 0, true);
  assert.equal(summary.benchmarkLayers.length, 3);
  assert.match(summary.benchmarkLayers[0]?.body ?? "", /내 채널의 실패 지점/);
  assert.match(summary.diagnosisHeadline, /믿을 근거|망설이게/);
  assert.match(summary.diagnosisBody, /브라우저/);
  assert.equal(summary.diagnosisCards.length, 3);
  assert.equal(summary.browserReviewCards.length, 3);
  assert.match(summary.browserReviewHeadline ?? "", /브라우저/);
  assert.equal(summary.browserExecutionSteps.length, 4);
  assert.match(summary.browserExecutionHeadline ?? "", /실채널|브라우저 확인 순서/);
  assert.match(summary.browserOpenUrl ?? "", /youtube\.com/);
  assert.match(summary.browserMemoTemplate ?? "", /잘 먹는 문장/);
  assert.equal(summary.copyDrafts.length, 3);
  assert.match(summary.copyDraftHeadline, /복붙|붙여 넣는/);
  assert.equal(Boolean(summary.copyDrafts[0]?.alternateDraft), true);
  assert.equal(Boolean(summary.copyDrafts[0]?.compareHint), true);
  assert.equal(Boolean(summary.copyDrafts[0]?.experimentHint), true);
});

test("optimization brief summary stays truthful before answers are filled", () => {
  const parsed = parseChannelInput("youtube.com/@promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);
  const brief = parseOptimizationBrief({});
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot });

  assert.equal(summary.readinessLabel, "질문 시작 전");
  assert.match(summary.directionTitle, /진단을 시작/);
  assert.match(summary.readinessReason, /아직 막히는 지점, 목표, 대상 고객, 톤, 전환 행동을 받지 않았습니다/);
  assert.match(summary.diagnosisHeadline, /먼저 끊기는 위치/);
  assert.equal(summary.diagnosisCards.length, 3);
  assert.equal(summary.browserReviewCards.length, 0);
  assert.equal(summary.browserExecutionSteps.length, 0);
  assert.equal(summary.browserOpenUrl, null);
  assert.equal(summary.copyDrafts.length, 3);
  assert.equal(Boolean(summary.copyDrafts[0]?.alternateDraft), true);
  assert.equal(Boolean(summary.copyDrafts[0]?.experimentHint), true);
});

test("optimization brief summary sharpens sales copy for smartstore even when live read is unavailable", () => {
  const parsed = parseChannelInput("https://smartstore.naver.com/naverplus");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);
  const brief = parseOptimizationBrief({
    pain: "low_trust",
    goal: "sales",
    audience: "comparing",
    tone: "trustworthy",
    conversion: "purchase",
  });
  const surface: ChannelSurfaceRead = {
    actionSignals: [],
    browserFollowupNeeded: true,
    browserFollowupPoints: ["스토어 첫 인상 문장", "대표 상품 첫 화면 혜택", "후기와 신뢰 영역 주변 문장"],
    browserFollowupReason: "스토어 쪽에서 자동 읽기를 잠시 제한해, 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
    description: null,
    headline: null,
    notes: ["스토어 쪽에서 자동 읽기를 잠시 제한해, 지금은 주소와 질문 답변 기준으로 먼저 진단합니다."],
    sourceUrl: "https://smartstore.naver.com/naverplus",
    status: "unavailable",
    statusLabel: "자동 읽기 실패",
    statusReason: "공개 페이지 응답이 안정적이지 않아, 지금은 주소 정보와 질문 답변만으로 진단을 이어갑니다.",
  };
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  assert.match(summary.diagnosisHeadline, /안심하고 사도 되는 이유|망설이게/);
  assert.match(summary.diagnosisBody, /후기|교환\/반품|안심/);
  assert.match(summary.copyDraftBody, /스토어 첫 화면|판매형/);
  assert.match(summary.copyDrafts[0]?.compareHint ?? "", /대표 혜택|대상 고객/);
  assert.match(summary.copyDrafts[1]?.compareHint ?? "", /후기|교환\/반품/);
  assert.match(summary.copyDrafts[2]?.experimentHint ?? "", /구매 유도|전환형/);
  assert.match(summary.recommendedModules[0]?.title ?? "", /신뢰 증명 모듈|신뢰 모듈/);
  assert.equal(summary.recommendedModules.some((module) => /문의|톡톡|상담/.test(module.title)), false);
});

test("optimization brief summary pivots completed cards toward inquiry flow for sales channels", () => {
  const parsed = parseChannelInput("https://pages.coupang.com/p/92589");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);
  const brief = parseOptimizationBrief({
    pain: "weak_cta",
    goal: "lead",
    audience: "cold",
    tone: "trustworthy",
    conversion: "inquiry",
  });
  const surface: ChannelSurfaceRead = {
    actionSignals: ["1:1 채팅문의", "입점신청", "입점/판매 신청"],
    browserFollowupNeeded: false,
    browserFollowupPoints: [],
    browserFollowupReason: null,
    description: "쿠팡이 추천하는 애플 악세서리 기획전 관련 특가를 만나보세요.",
    headline: "쿠팡이 추천하는 애플 악세서리 기획전 관련 혜택과 특가",
    notes: [],
    sourceUrl: "https://pages.coupang.com/p/92589",
    status: "live",
    statusLabel: "공개 페이지 읽기 완료",
    statusReason: "공개 페이지에서 제목, 설명, 일부 행동 유도 문구를 읽어 지금 단계 진단에 쓸 수 있습니다.",
  };
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  assert.match(summary.diagnosisHeadline, /문의 문구|대화 시작|상담 시작/);
  assert.match(summary.diagnosisBody, /무엇을 해결해 주는지|어떤 답을 받을 수 있는지/);
  assert.match(summary.diagnosisCards[0]?.emphasis ?? "", /문의해도 되는 이유|1:1 채팅문의/);
  assert.match(summary.copyDraftBody, /문의형 문장 초안|상담 유도 위치/);
  assert.match(summary.copyDrafts[0]?.draft ?? "", /무엇을 물어보면 되는지|어떤 질문을 해도 되는지/);
  assert.match(summary.copyDrafts[1]?.compareHint ?? "", /문의 전 안심할 근거|응답 기대/);
  assert.match(summary.copyDrafts[2]?.draft ?? "", /지금 바로 문의|톡톡이나 문의/);
  assert.match(summary.copyDrafts[2]?.experimentHint ?? "", /문의 유도형|상담 시작형/);
  assert.match(summary.recommendedModules[0]?.title ?? "", /문의 시작 모듈/);
  assert.match(summary.recommendedModules[1]?.title ?? "", /문의 시작 모듈|응답 신뢰 모듈|질문 분류 모듈/);
  assert.equal(summary.recommendedModules.some((module) => /구매 유도 모듈|전환 흐름 모듈/.test(module.title)), false);
});

test("optimization recommendations shift sales pain when live surface only shows non-purchase actions", () => {
  const parsed = parseChannelInput("https://pages.coupang.com/p/92589");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const surface: ChannelSurfaceRead = {
    actionSignals: ["1:1 채팅문의", "입점신청", "입점/판매 신청"],
    browserFollowupNeeded: false,
    browserFollowupPoints: [],
    browserFollowupReason: null,
    description: "쿠팡이 추천하는 애플 악세서리 기획전 관련 특가를 만나보세요.",
    headline: "쿠팡이 추천하는 애플 악세서리 기획전 관련 혜택과 특가",
    notes: [],
    sourceUrl: "https://pages.coupang.com/p/92589",
    status: "live",
    statusLabel: "공개 페이지 읽기 완료",
    statusReason: "공개 페이지에서 제목, 설명, 일부 행동 유도 문구를 읽어 지금 단계 진단에 쓸 수 있습니다.",
  };

  const recommendations = getOptimizationRecommendations({ parsed, surface });

  assert.equal(recommendations.pain, "weak_cta");
  assert.match(recommendations.painReason, /입점신청|구매로 이어지는 문장/);
  assert.equal(recommendations.goal, "lead");
  assert.equal(recommendations.conversion, "inquiry");
  assert.equal(recommendations.audience, "cold");
  assert.match(recommendations.goalReason, /문의나 신청 전환|입점신청/);
  assert.match(recommendations.conversionReason, /문의·신청|문의 시작/);
});

test("optimization recommendations keep trust-first fallback when sales surface is unavailable", () => {
  const parsed = parseChannelInput("https://smartstore.naver.com/naverplus");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const surface: ChannelSurfaceRead = {
    actionSignals: [],
    browserFollowupNeeded: true,
    browserFollowupPoints: [],
    browserFollowupReason: null,
    description: null,
    headline: null,
    notes: [],
    sourceUrl: "https://smartstore.naver.com/naverplus",
    status: "unavailable",
    statusLabel: "자동 읽기 실패",
    statusReason: "공개 페이지 응답이 안정적이지 않아, 지금은 주소 정보와 질문 답변만으로 진단을 이어갑니다.",
  };

  const recommendations = getOptimizationRecommendations({ parsed, surface });

  assert.equal(recommendations.pain, "low_trust");
  assert.match(recommendations.painReason, /신뢰 근거|안전/);
  assert.equal(recommendations.goal, "sales");
  assert.equal(recommendations.conversion, "purchase");
  assert.equal(recommendations.audience, "comparing");
});
