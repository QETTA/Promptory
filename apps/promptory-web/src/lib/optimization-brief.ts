import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";

export const optimizationGoalOptions = [
  { value: "sales", label: "상품 판매 전환", description: "구매 버튼까지 이어지는 문장과 흐름을 더 강하게 만듭니다." },
  { value: "lead", label: "문의 전환", description: "댓글, DM, 상담 요청처럼 대화 시작을 더 쉽게 만듭니다." },
  { value: "content_growth", label: "콘텐츠 반응 확대", description: "클릭, 시청, 저장, 공유 같은 초기 반응을 더 높입니다." },
  { value: "repeat_visit", label: "재방문 유도", description: "한 번 보고 끝나지 않고 다시 들어오게 만드는 동선을 정리합니다." },
] as const;

export const optimizationPainOptions = [
  { value: "weak_hook", label: "첫 문장이 약함", description: "들어오긴 하는데 첫 클릭과 체류가 약합니다." },
  { value: "weak_cta", label: "행동 유도가 약함", description: "보긴 보는데 클릭, 문의, 구매로 잘 안 이어집니다." },
  { value: "low_trust", label: "신뢰가 부족함", description: "후기, 근거, 보증, 비교 포인트가 약해서 망설입니다." },
  { value: "unclear_offer", label: "제안이 흐림", description: "무엇을 주는지, 누구에게 맞는지 한 번에 안 읽힙니다." },
  { value: "manual_overload", label: "운영이 너무 수작업", description: "채널마다 문구를 따로 만들고 고치는 일이 너무 많습니다." },
] as const;

export const optimizationAudienceOptions = [
  { value: "cold", label: "처음 보는 사람", description: "브랜드를 아직 잘 모르는 새로운 유입입니다." },
  { value: "comparing", label: "비교 중인 고객", description: "여러 선택지 사이에서 비교하고 있는 단계입니다." },
  { value: "warm", label: "관심은 있는 팔로워", description: "이미 팔로우했거나 콘텐츠를 꾸준히 보는 사람입니다." },
  { value: "existing", label: "기존 고객", description: "재구매나 재방문 가능성이 있는 기존 사용자입니다." },
] as const;

export const optimizationToneOptions = [
  { value: "trustworthy", label: "신뢰 중심", description: "과장보다 근거, 보증, 안심 포인트를 우선합니다." },
  { value: "expert", label: "전문가형", description: "정확함, 구조, 비교 근거를 분명히 보여 줍니다." },
  { value: "friendly", label: "친근한 설명형", description: "낯설지 않게 쉽게 설명하면서 행동을 유도합니다." },
  { value: "urgent", label: "속도 강조형", description: "지금 해야 할 이유와 즉시 행동을 강하게 밀어 줍니다." },
] as const;

export const optimizationConversionOptions = [
  { value: "purchase", label: "상품 구매", description: "상품 상세나 스토어에서 바로 구매로 이어집니다." },
  { value: "clickout", label: "외부 링크 클릭", description: "랜딩, 링크 허브, 외부 판매처 클릭을 목표로 합니다." },
  { value: "inquiry", label: "문의 시작", description: "DM, 댓글, 채팅, 상담 요청이 핵심 행동입니다." },
  { value: "subscribe", label: "구독/팔로우", description: "채널 구독, 알림 설정, 팔로우를 먼저 키웁니다." },
] as const;

export type OptimizationGoal = (typeof optimizationGoalOptions)[number]["value"];
export type OptimizationPain = (typeof optimizationPainOptions)[number]["value"];
export type OptimizationAudience = (typeof optimizationAudienceOptions)[number]["value"];
export type OptimizationTone = (typeof optimizationToneOptions)[number]["value"];
export type OptimizationConversion = (typeof optimizationConversionOptions)[number]["value"];

export type OptimizationBrief = {
  audience?: OptimizationAudience;
  constraint: string;
  conversion?: OptimizationConversion;
  goal?: OptimizationGoal;
  hasAnyInput: boolean;
  isComplete: boolean;
  missingFields: string[];
  pain?: OptimizationPain;
  tone?: OptimizationTone;
};

export type RecommendedModule = {
  body: string;
  title: string;
};

export type BriefResultCard = {
  body: string;
  emphasis?: string;
  title: string;
};

export type CopyDraftBlock = {
  alternateDraft?: string;
  body: string;
  compareHint?: string;
  draft: string;
  experimentHint?: string;
  placement: string;
  title: string;
};

export type OptimizationBriefSummary = {
  browserExecutionBody: string | null;
  browserExecutionHeadline: string | null;
  browserExecutionSteps: BriefResultCard[];
  browserMemoTemplate: string | null;
  browserOpenUrl: string | null;
  browserReviewCards: BriefResultCard[];
  browserReviewBody: string | null;
  browserReviewHeadline: string | null;
  benchmarkLayers: RecommendedModule[];
  copyDraftBody: string;
  copyDraftHeadline: string;
  copyDrafts: CopyDraftBlock[];
  diagnosisCards: BriefResultCard[];
  diagnosisBody: string;
  diagnosisHeadline: string;
  directionTitle: string;
  directionPoints: string[];
  nextStepSignals: string[];
  recommendedModules: RecommendedModule[];
  readinessLabel: string;
  readinessReason: string;
};

export type OptimizationRecommendations = {
  audience: OptimizationAudience;
  audienceReason: string;
  conversion: OptimizationConversion;
  conversionReason: string;
  goal: OptimizationGoal;
  goalReason: string;
  pain: OptimizationPain;
  painReason: string;
  tone: OptimizationTone;
  toneReason: string;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeOption<T extends string>(value: string | undefined, allowed: readonly { value: T }[]) {
  const normalized = value?.trim();

  if (!normalized) {
    return undefined;
  }

  return allowed.some((item) => item.value === normalized) ? (normalized as T) : undefined;
}

function getLabel<T extends string>(value: T | undefined, allowed: readonly { label: string; value: T }[]) {
  return allowed.find((item) => item.value === value)?.label;
}

function getSurfaceSignalText(surface?: ChannelSurfaceRead | null) {
  return [surface?.headline, surface?.description, ...(surface?.actionSignals ?? [])].filter(Boolean).join(" ");
}

function hasTrustSignal(surface?: ChannelSurfaceRead | null) {
  const text = getSurfaceSignalText(surface);
  return /(후기|리뷰|보증|정품|인증|무료 반품|반품|교환|환불|평점|안심|검증|배송|무료 배송|warranty|review|guarantee|refund|return|official)/i.test(
    text,
  );
}

function hasOfferSignal(surface?: ChannelSurfaceRead | null) {
  const text = getSurfaceSignalText(surface);
  return /(혜택|특가|할인|기획전|추천|세트|전용|맞춤|누구|대상|선물|효과|결과|solution|benefit|offer|deal|sale|특징|장점)/i.test(
    text,
  );
}

function hasPurchaseSignal(surface?: ChannelSurfaceRead | null) {
  return (surface?.actionSignals ?? []).some((signal) => /(구매|장바구니|바로 구매|구매하기|buy|cart|shop|주문)/i.test(signal));
}

function hasNonPurchaseAction(surface?: ChannelSurfaceRead | null) {
  return (surface?.actionSignals ?? []).some((signal) => /(문의|상담|채팅|신청|입점|contact|inquiry|apply|join|subscribe|follow)/i.test(signal));
}

function hasSubscribeSignal(surface?: ChannelSurfaceRead | null) {
  return (surface?.actionSignals ?? []).some((signal) => /(구독|팔로우|알림|follow|subscribe|join)/i.test(signal));
}

function getRecommendedPain({
  parsed,
  surface,
}: {
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
}) {
  if (parsed.kind === "youtube" || parsed.kind === "blog") {
    if (!surface || surface.status === "unavailable") {
      return {
        pain: "weak_cta" as const,
        reason: "지금은 공개 표면을 충분히 읽지 못해, 우선 행동 유도 문장부터 확인하는 편이 안전합니다.",
      };
    }

    if (!surface.headline) {
      return {
        pain: "weak_hook" as const,
        reason: "첫 제목이나 첫 인상 문장을 뚜렷하게 읽지 못해, 첫 문장 약속부터 먼저 확인하는 편이 좋습니다.",
      };
    }

    if (surface.actionSignals.length === 0) {
      return {
        pain: "weak_cta" as const,
        reason: "지금 읽힌 표면에는 다음 행동으로 이어지는 문장이 거의 없어, 행동 유도부터 먼저 보강하는 편이 좋습니다.",
      };
    }

    if (!hasOfferSignal(surface)) {
      return {
        pain: "unclear_offer" as const,
        reason: "무엇을 주는지와 누구에게 맞는지가 읽힌 문장 안에서 아직 선명하지 않아, 제안 구조를 먼저 정리하는 편이 좋습니다.",
      };
    }

    return {
      pain: "weak_cta" as const,
      reason: "표면은 읽히지만 다음 행동으로 이어지는 힘이 아직 약해 보여, 행동 유도 문장을 먼저 점검하는 편이 좋습니다.",
    };
  }

  if (isSalesChannel(parsed.kind)) {
    if (!surface || surface.status === "unavailable") {
      return {
        pain: "low_trust" as const,
        reason: "상품·스토어 화면을 바로 읽지 못한 상태라, 비교 고객이 가장 먼저 망설이는 신뢰 근거부터 점검하는 편이 안전합니다.",
      };
    }

    if (!hasOfferSignal(surface)) {
      return {
        pain: "unclear_offer" as const,
        reason: "지금 읽힌 문장만으로는 대표 혜택과 대상 고객이 선명하지 않아, 제안 구조를 먼저 정리하는 편이 좋습니다.",
      };
    }

    if (!hasPurchaseSignal(surface) && hasNonPurchaseAction(surface)) {
      return {
        pain: "weak_cta" as const,
        reason: `지금 보이는 행동 문구가 ${surface.actionSignals.join(", ")} 쪽으로 쏠려 있어, 구매로 이어지는 문장을 먼저 보강하는 편이 좋습니다.`,
      };
    }

    if (!hasTrustSignal(surface)) {
      return {
        pain: "low_trust" as const,
        reason: "혜택 문장은 보이지만 후기, 보증, 반품 같은 안심 근거가 약해 보여 신뢰부터 보강하는 편이 좋습니다.",
      };
    }

    if (!hasPurchaseSignal(surface)) {
      return {
        pain: "weak_cta" as const,
        reason: "혜택과 설명은 읽히지만 구매 직전 행동 문장이 약해 보여, 선택 이유와 다음 행동을 같이 적는 편이 좋습니다.",
      };
    }

    return {
      pain: "low_trust" as const,
      reason: "구매 흐름은 보이지만 비교 고객을 안심시키는 근거를 먼저 세우는 편이 전환에 더 유리해 보입니다.",
    };
  }

  return {
    pain: "manual_overload" as const,
    reason: "지원 범위 밖 채널은 우선 수동 진단과 반복 운영 기준부터 정리하는 편이 안전합니다.",
  };
}

export function getOptimizationRecommendations({
  parsed,
  surface,
}: {
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
}): OptimizationRecommendations {
  const pain = getRecommendedPain({ parsed, surface });
  const salesChannel = isSalesChannel(parsed.kind);
  const inquiryHeavySurface = !hasPurchaseSignal(surface) && hasNonPurchaseAction(surface);
  const subscribeSurface = hasSubscribeSignal(surface);

  const goal = salesChannel
    ? !surface || surface.status === "unavailable"
      ? "sales"
      : inquiryHeavySurface
        ? "lead"
        : "sales"
    : subscribeSurface
      ? "repeat_visit"
      : hasNonPurchaseAction(surface)
        ? "lead"
        : "content_growth";
  const goalReason = salesChannel
    ? !surface || surface.status === "unavailable"
      ? "현재 판매형 표면을 충분히 읽지 못해, 우선 상품 판매 전환 기준으로 보는 편이 안전합니다."
      : inquiryHeavySurface
        ? `지금 보이는 행동 문구가 ${surface?.actionSignals.join(", ")} 쪽이라, 바로 구매보다 문의나 신청 전환을 먼저 보는 편이 자연스럽습니다.`
        : "현재 표면은 구매나 선택 전환을 먼저 정리하는 쪽이 가장 자연스럽습니다."
    : subscribeSurface
      ? "지금 보이는 행동 문구가 구독과 재방문 쪽이라, 반복 방문 루프를 먼저 정리하는 편이 자연스럽습니다."
      : hasNonPurchaseAction(surface)
        ? "현재 표면은 문의나 대화 시작을 먼저 만드는 쪽이 자연스럽습니다."
        : "현재 표면은 먼저 반응과 클릭을 키우는 쪽이 더 자연스럽습니다.";
  const conversion = salesChannel
    ? !surface || surface.status === "unavailable"
      ? "purchase"
      : inquiryHeavySurface
        ? "inquiry"
        : "purchase"
    : subscribeSurface
      ? "subscribe"
      : hasNonPurchaseAction(surface)
        ? "inquiry"
        : "clickout";
  const conversionReason = salesChannel
    ? !surface || surface.status === "unavailable"
      ? "현재 채널 문맥은 상품 선택과 구매 흐름을 기준으로 보는 편이 자연스럽습니다."
      : inquiryHeavySurface
        ? "지금 읽힌 CTA가 문의·신청 쪽이라, 최종 행동도 문의 시작 기준으로 보는 편이 더 자연스럽습니다."
        : "현재 채널 문맥은 상품 선택과 구매 흐름을 기준으로 보는 편이 자연스럽습니다."
    : subscribeSurface
      ? "지금 읽힌 행동 문구는 구독·팔로우 쪽이라, 최종 행동도 구독 기준으로 보는 편이 자연스럽습니다."
      : hasNonPurchaseAction(surface)
        ? "지금 읽힌 CTA가 문의 쪽이라, 최종 행동도 문의 시작으로 맞추는 편이 자연스럽습니다."
        : "현재 채널 문맥은 외부 이동이나 다음 링크 클릭을 기준으로 보는 편이 자연스럽습니다.";
  const audience = salesChannel
    ? goal === "lead"
      ? "cold"
      : "comparing"
    : goal === "repeat_visit"
      ? "warm"
      : "cold";
  const audienceReason = salesChannel
    ? goal === "lead"
      ? "현재 표면은 비교 직전 고객보다 처음 들어와 문의나 신청을 고민하는 사람 기준으로 보는 편이 더 자연스럽습니다."
      : "판매형 채널은 여러 선택지와 비교 중인 고객 기준으로 보면 진단이 더 정확합니다."
    : goal === "repeat_visit"
      ? "재방문과 구독을 키우려면 이미 관심을 가진 사람 기준으로 보는 편이 더 자연스럽습니다."
      : "콘텐츠 채널은 처음 들어온 사람 기준으로 보면 첫 문장과 CTA를 더 분명하게 잡기 쉽습니다.";

  return {
    pain: pain.pain,
    painReason: pain.reason,
    goal,
    goalReason,
    audience,
    audienceReason,
    tone: salesChannel ? "trustworthy" : "friendly",
    toneReason: salesChannel
      ? "판매형 표면은 과장보다 안심 근거를 먼저 세우는 톤이 더 안전합니다."
      : "콘텐츠 채널은 처음 보는 사람도 부담 없이 읽는 말투가 더 유리합니다.",
    conversion,
    conversionReason,
  };
}

function getSurfaceAction(kind: ParsedChannelInputSuccess["kind"]) {
  switch (kind) {
    case "youtube":
      return "영상 설명, 고정 댓글, 채널 소개";
    case "blog":
      return "제목, 도입부, 말미 CTA";
    case "coupang":
      return "상품명 첫 문장, 혜택 블록, 구매 CTA";
    case "smartstore":
      return "스토어 소개, 대표 상품 카드, 신뢰 영역";
    default:
      return "대표 진입 화면과 핵심 CTA";
  }
}

function getPainAction(pain: OptimizationPain | undefined) {
  switch (pain) {
    case "weak_hook":
      return "첫 진입 문장과 썸네일/제목 약속";
    case "weak_cta":
      return "행동 유도 문장과 다음 행동 연결";
    case "low_trust":
      return "신뢰 근거, 후기, 보증, 비교 포인트";
    case "unclear_offer":
      return "제안 구조와 대상 고객 정의";
    case "manual_overload":
      return "반복 운영용 모듈과 재사용 흐름";
    default:
      return "핵심 메시지와 행동 유도";
  }
}

function isSalesChannel(kind: ParsedChannelInputSuccess["kind"]) {
  return kind === "coupang" || kind === "smartstore";
}

function getChannelBenchmark(kind: ParsedChannelInputSuccess["kind"]) {
  switch (kind) {
    case "youtube":
      return "같은 주제의 YouTube 채널에서 제목, 오프닝, 설명, 고정 댓글이 어떻게 이어지는지";
    case "blog":
      return "같은 검색 의도의 블로그에서 제목, 도입, 비교 근거, 말미 CTA가 어떻게 연결되는지";
    case "coupang":
      return "같은 카테고리와 가격대의 판매 페이지에서 혜택, 증명, CTA 순서가 어떻게 잡히는지";
    case "smartstore":
      return "같은 고객층을 노리는 스토어에서 대표 상품, 후기, 신뢰 요소가 어떻게 묶이는지";
    default:
      return "같은 고객 행동을 만드는 채널에서 핵심 위치와 행동 유도 문장이 어떻게 배치되는지";
  }
}

function getBaseModules(kind: ParsedChannelInputSuccess["kind"], inquiryFlow = false): RecommendedModule[] {
  switch (kind) {
    case "youtube":
      return [
        { title: "첫 문장 모듈", body: "영상 제목, 썸네일 약속, 첫 30초 오프닝 문장을 채널 톤에 맞게 묶습니다." },
        { title: "설명란 전환 모듈", body: "영상 설명, 고정 댓글, 링크 허브 행동 유도 문장을 한 세트로 최적화합니다." },
        { title: "댓글 전환 모듈", body: "댓글 유도, 문의 유도, 구매 유도를 단계별 답변 흐름으로 정리합니다." },
      ];
    case "blog":
      return [
        { title: "제목 모듈", body: "제목, 도입, 검색형 약속을 한 세트로 조정해 첫 클릭과 체류를 올립니다." },
        { title: "신뢰 근거 모듈", body: "본문 중간 근거, 비교 포인트, 사례 블록을 구조화합니다." },
        { title: "말미 전환 모듈", body: "말미 행동 유도 문장, 링크 문장, 재방문 유도 문장을 묶어 정리합니다." },
      ];
    case "coupang":
      if (inquiryFlow) {
        return [
          { title: "문의 시작 모듈", body: "상품 첫 화면, 대표 혜택, 문의 버튼 앞 문장을 묶어 지금 바로 물어볼 이유를 만듭니다." },
          { title: "응답 신뢰 모듈", body: "후기, 운영 원칙, 응답 기준, 안심 문구를 한 레이어로 묶어 상담 시작 장벽을 낮춥니다." },
          { title: "질문 분류 모듈", body: "어떤 고객이 무엇을 물어보면 되는지, 상담 전 먼저 걸러 줄 질문 흐름으로 정리합니다." },
        ];
      }

      return [
        { title: "제안 정리 모듈", body: "상품명 첫 문장, 대표 혜택, 첫 화면 가치 제안을 묶어 정리합니다." },
        { title: "신뢰 모듈", body: "리뷰 요약, 품질 근거, FAQ, 반품/보증 문구를 한 레이어로 만듭니다." },
        { title: "구매 유도 모듈", body: "비교 고객이 바로 결제하도록 행동 유도 문장과 순서를 조정합니다." },
      ];
    case "smartstore":
      if (inquiryFlow) {
        return [
          { title: "톡톡 시작 모듈", body: "스토어 소개, 대표 상품 첫 화면, 톡톡 안내 문장을 묶어 말 걸기 쉬운 첫 흐름을 만듭니다." },
          { title: "운영 신뢰 모듈", body: "후기, 응답 톤, 운영 기준, 안심 문구를 같은 레이어로 정리해 문의 시작을 돕습니다." },
          { title: "안내 분기 모듈", body: "어떤 고객에게 어떤 답을 먼저 줄지, 문의 전 분기 문장과 답변 방향을 정리합니다." },
        ];
      }

      return [
        { title: "스토어 톤 모듈", body: "스토어 소개, 대표 상품 톤, 브랜드 약속을 같은 말투로 정리합니다." },
        { title: "후기와 묶음 모듈", body: "후기, 묶음 제안, 비교 포인트를 구매 흐름에 맞게 배치합니다." },
        { title: "전환 흐름 모듈", body: "스토어 탐색에서 대표 상품 클릭과 구매 행동까지 이어지는 문장을 만듭니다." },
      ];
    default:
      return [
        { title: "기본 진단 모듈", body: "지원 채널 확인과 핵심 surface 파악을 먼저 정리합니다." },
        { title: "수동 검토 모듈", body: "수동 검토 기준과 필수 진단 포인트를 분리해 보여 줍니다." },
        { title: "기본 행동 유도 모듈", body: "지원 범위 밖에서도 공통 행동 유도 문장과 핵심 제안은 먼저 정리합니다." },
      ];
  }
}

function applyPainOverlay(
  modules: RecommendedModule[],
  pain: OptimizationPain | undefined,
  goal: OptimizationGoal | undefined,
  conversion?: OptimizationConversion | undefined,
): RecommendedModule[] {
  const result = [...modules];
  const inquiryFlow = goal === "lead" || conversion === "inquiry";

  if (pain === "manual_overload") {
    result.unshift({
      title: inquiryFlow ? "문의 운영 자동화 모듈" : "운영 자동화 모듈",
      body: inquiryFlow
        ? "반복되는 문의 시작, 안심, 답변 마무리 문구를 재사용 가능한 상담 모듈 묶음으로 분해합니다."
        : "반복되는 채널 운영 문구를 재사용 가능한 플러그인/모듈 묶음으로 분해합니다.",
    });
  } else if (pain === "low_trust") {
    result.unshift({
      title: inquiryFlow ? "문의 안심 모듈" : "신뢰 증명 모듈",
      body: inquiryFlow
        ? "후기, 응답 기준, 운영 신뢰를 채널 surface마다 재사용 가능한 상담 안심 모듈로 만듭니다."
        : "후기, 비교 근거, 안심 포인트를 채널 surface마다 재사용 가능한 증명 모듈로 만듭니다.",
    });
  } else if (pain === "weak_cta") {
    result.unshift({
      title: inquiryFlow ? "문의 시작 모듈" : "행동 유도 모듈",
      body: inquiryFlow
        ? "DM, 톡톡, 채팅, 문의 버튼 앞뒤 문장을 즉시 적용 가능한 상담 시작 모듈로 분해합니다."
        : "댓글, 링크, DM, 구매 버튼 앞뒤 문장을 즉시 적용 가능한 행동 유도 모듈로 분해합니다.",
    });
  } else if (pain === "weak_hook") {
    result.unshift({
      title: inquiryFlow ? "첫 상담 가치 모듈" : "첫 인상 보강 모듈",
      body: inquiryFlow
        ? "첫 문장, 첫 화면, 첫 문의를 담당하는 상담 가치 모듈을 채널별로 분해해 추천합니다."
        : "첫 문장, 첫 화면, 첫 클릭을 담당하는 hook 모듈을 채널별로 분해해 추천합니다.",
    });
  } else if (pain === "unclear_offer") {
    result.unshift({
      title: inquiryFlow ? "질문 분류 모듈" : "제안 선명화 모듈",
      body: inquiryFlow
        ? "누가 무엇을 물어보면 되는지 읽히게 만드는 질문 분류 모듈을 먼저 추천합니다."
        : "무엇을 주고 누구에게 맞는지 읽히게 만드는 제안 정리 모듈을 먼저 추천합니다.",
    });
  }

  if (goal === "repeat_visit") {
    result.push({
      title: "재방문 루프 모듈",
      body: "시리즈 재방문, 저장, 팔로우 이후 재유입을 만드는 반복 루프 모듈을 추가합니다.",
    });
  }

  return result.filter((module, index, list) => list.findIndex((candidate) => candidate.title === module.title) === index).slice(0, 4);
}

function buildDirectDiagnosis({
  brief,
  parsed,
  snapshot,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface?: ChannelSurfaceRead | null;
}) {
  if (!brief.hasAnyInput) {
    return {
      diagnosisHeadline: `${parsed.kindLabel}에서 먼저 끊기는 위치를 좁히는 중입니다`,
      diagnosisBody: `아직 답변 전이라 실패 지점을 확정하진 않고, ${snapshot.surfaceHint} 중 어디부터 봐야 하는지 먼저 좁히는 단계입니다.`,
    };
  }

  const browserClause = surface?.browserFollowupNeeded
    ? "다만 실제 첫 화면과 펼친 뒤 문장은 브라우저에서 한 번 더 보는 편이 정확합니다."
    : "";
  const salesChannel = isSalesChannel(parsed.kind);
  const salesInquiryFlow = salesChannel && isInquiryFlow(brief);

  switch (brief.pain) {
    case "weak_hook":
      if (salesChannel) {
        if (salesInquiryFlow) {
          return {
            diagnosisHeadline: "문의 버튼은 있어도 왜 지금 말을 걸어야 하는지가 약해 대화 시작에서 멈추고 있습니다",
            diagnosisBody:
              surface?.headline
                ? `지금 읽힌 제목은 보이지만, 어떤 문제를 바로 물어볼 수 있는지와 왜 지금 상담을 시작해야 하는지가 한 화면에서 더 선명해야 합니다. ${browserClause}`.trim()
                : `첫 화면에서 문의 대상과 해결 범위가 같이 보이지 않으면 사용자는 버튼이 있어도 말을 걸지 않습니다. ${snapshot.surfaceHint} 중 첫 화면 약속부터 먼저 손보는 편이 좋습니다. ${browserClause}`.trim(),
          };
        }

        return {
          diagnosisHeadline: "대표 상품 첫 화면의 선택 이유가 약해 바로 비교 모드로 빠지고 있습니다",
          diagnosisBody:
            surface?.headline
              ? `지금 읽힌 제목은 보이지만, 왜 이 스토어를 먼저 봐야 하는지와 누구에게 맞는지가 한 화면에서 더 선명해야 합니다. ${browserClause}`.trim()
              : `첫 화면에서 대표 혜택과 대상 고객이 같이 보이지 않으면 사용자는 바로 다른 판매 채널과 비교하게 됩니다. ${snapshot.surfaceHint} 중 첫 화면 약속부터 먼저 손보는 편이 좋습니다. ${browserClause}`.trim(),
        };
      }

      return {
        diagnosisHeadline: "첫 화면 약속이 약해 들어와도 바로 붙잡지 못하고 있습니다",
        diagnosisBody:
          surface?.headline
            ? `지금 읽힌 제목은 보이지만, 첫 인상에서 왜 봐야 하는지가 더 선명해야 합니다. ${browserClause}`.trim()
            : `첫 진입 문장과 대표 약속이 아직 약해 보입니다. ${snapshot.surfaceHint} 중 가장 먼저 보이는 문장부터 손보는 편이 좋습니다. ${browserClause}`.trim(),
      };
    case "weak_cta":
      if (salesChannel) {
        if (salesInquiryFlow) {
          return {
            diagnosisHeadline:
              surface?.actionSignals.length
                ? "문의 문구는 보이지만 지금 말을 걸 이유가 약해 대화 시작에서 멈추고 있습니다"
                : "지금 문의해도 되는 이유가 한 줄로 안 보여 상담 시작에서 멈추게 만들고 있습니다",
            diagnosisBody:
              surface?.actionSignals.length
                ? `지금 보이는 행동 문구는 ${surface.actionSignals.join(", ")} 정도라, 문의 전 무엇을 해결해 주는지와 어떤 답을 받을 수 있는지를 더 직접적으로 붙여야 합니다. ${browserClause}`.trim()
                : `지금 읽힌 정보만으로는 문의 직전 문장이 충분히 드러나지 않습니다. 대표 혜택, 후기 근처, 문의 직전 안내 문장부터 먼저 보강하는 편이 좋습니다. ${browserClause}`.trim(),
          };
        }

        return {
          diagnosisHeadline:
            surface?.actionSignals.length
              ? "혜택은 보이지만 지금 사야 할 이유가 약해 구매 직전에서 멈추고 있습니다"
              : "지금 선택해야 하는 이유가 한 줄로 안 보여 구매 직전에서 망설이게 만들고 있습니다",
          diagnosisBody:
            surface?.actionSignals.length
              ? `지금 보이는 행동 문구는 ${surface.actionSignals.join(", ")} 정도라, 대표 혜택 뒤에 선택 이유와 다음 행동을 더 직접적으로 붙여야 합니다. ${browserClause}`.trim()
              : `지금 읽힌 정보만으로는 구매 직전 문장이 충분히 드러나지 않습니다. 대표 혜택, 후기 근처, 구매 직전 안내 문장부터 먼저 보강하는 편이 좋습니다. ${browserClause}`.trim(),
        };
      }

      return {
        diagnosisHeadline:
          surface?.actionSignals.length
            ? "무엇을 하라는지는 보이지만 다음 행동이 약해 전환이 끊기고 있습니다"
            : "다음에 무엇을 해야 하는지가 바로 안 보여 전환이 끊기고 있습니다",
        diagnosisBody:
          surface?.actionSignals.length
            ? `지금 보이는 행동 문구는 ${surface.actionSignals.join(", ")} 정도라, 클릭이나 문의로 이어지는 문장을 더 직접적으로 붙여야 합니다. ${browserClause}`.trim()
            : `지금 읽힌 정보만으로는 행동으로 이어지는 문장이 충분히 드러나지 않습니다. ${snapshot.surfaceHint}에서 행동 문장을 먼저 보강하는 편이 좋습니다. ${browserClause}`.trim(),
      };
    case "low_trust":
      if (salesChannel) {
        if (salesInquiryFlow) {
          return {
            diagnosisHeadline: "문의는 열려 있지만 믿고 말을 걸어도 되는 이유가 얕아 상담 시작을 망설이게 만들고 있습니다",
            diagnosisBody:
              surface?.description
                ? `스토어 설명은 읽히지만 응답 품질, 상담 범위, 후기, 운영 신뢰를 만드는 문장이 먼저 보이지 않습니다. ${browserClause}`.trim()
                : `지금은 자동 읽기가 제한돼도, 문의 전에 안심할 근거와 응답 기준이 보이는지부터 확인하는 편이 좋습니다. ${snapshot.surfaceHint} 중 신뢰를 만드는 위치부터 먼저 확인하는 편이 좋습니다. ${browserClause}`.trim(),
          };
        }

        return {
          diagnosisHeadline: "상품은 보이지만 안심하고 사도 되는 이유가 얕아 망설이게 만들고 있습니다",
          diagnosisBody:
            surface?.description
              ? `스토어 설명은 읽히지만 후기, 보증, 교환/반품, 운영 신뢰를 만드는 문장이 먼저 보이지 않습니다. ${browserClause}`.trim()
              : `지금은 자동 읽기가 제한돼도, 후기와 안심 문장과 교환/반품 근거가 행동 직전에도 보이는지부터 확인하는 편이 좋습니다. ${snapshot.surfaceHint} 중 신뢰를 만드는 위치부터 먼저 확인하는 편이 좋습니다. ${browserClause}`.trim(),
        };
      }

      return {
        diagnosisHeadline: "무엇을 하는지는 보이지만 믿을 근거가 얕아 망설이게 만들고 있습니다",
        diagnosisBody:
          surface?.description
            ? `공개 설명은 읽히지만 안심할 근거, 비교 포인트, 보증 문장이 먼저 보이지 않습니다. ${browserClause}`.trim()
            : `신뢰를 받쳐 줄 설명과 근거가 아직 얕게 보입니다. ${snapshot.surfaceHint} 중 신뢰를 만드는 위치부터 먼저 확인하는 편이 좋습니다. ${browserClause}`.trim(),
      };
    case "unclear_offer":
      if (salesChannel) {
        if (salesInquiryFlow) {
          return {
            diagnosisHeadline: "누가 문의해야 하고 어떤 답을 받을지 한 화면에 안 읽히고 있습니다",
            diagnosisBody:
              surface?.headline || surface?.description
                ? `공개 문구 일부는 읽히지만 문의 대상과 해결 범위가 한 줄로 묶여 보이지 않습니다. ${browserClause}`.trim()
                : `첫 화면에서 누구를 도와주는지와 무엇을 답해 줄 수 있는지가 함께 읽혀야 합니다. ${snapshot.surfaceHint}에서 대표 혜택 문장과 문의 가치 문장을 같이 정리하는 편이 좋습니다. ${browserClause}`.trim(),
          };
        }

        return {
          diagnosisHeadline: "어떤 고객에게 어떤 차이가 있는지 한 화면에 안 읽히고 있습니다",
          diagnosisBody:
            surface?.headline || surface?.description
              ? `공개 문구 일부는 읽히지만 대표 혜택과 대상 고객이 한 줄로 묶여 보이지 않습니다. ${browserClause}`.trim()
              : `첫 화면에서 누구에게 맞는 스토어인지와 왜 선택해야 하는지가 함께 읽혀야 합니다. ${snapshot.surfaceHint}에서 대표 혜택 문장과 고객 정의를 같이 정리하는 편이 좋습니다. ${browserClause}`.trim(),
        };
      }

      return {
        diagnosisHeadline: "누구를 위한 채널인지와 무엇을 주는지가 한 번에 안 읽히고 있습니다",
        diagnosisBody:
          surface?.headline || surface?.description
            ? `공개 문구 일부는 읽히지만 제안의 대상과 핵심 혜택이 한 줄로 정리돼 보이지 않습니다. ${browserClause}`.trim()
            : `제안 구조와 대상 고객 정의가 아직 흐립니다. ${snapshot.surfaceHint}에서 약속 문장과 대상 고객 문장을 같이 정리하는 편이 좋습니다. ${browserClause}`.trim(),
      };
    case "manual_overload":
      if (salesChannel) {
        if (salesInquiryFlow) {
          return {
            diagnosisHeadline: "문의마다 따로 답을 만드는 운영 방식이 상담 전환 속도를 묶고 있습니다",
            diagnosisBody: `문의 시작 문장, 안심 문장, 답변 마무리 문장을 매번 새로 쓰지 말고 모듈처럼 재사용하는 편이 좋습니다. ${snapshot.surfaceHint}를 문의 모듈 단위로 쪼개면 운영 부담이 빠르게 줄어듭니다. ${browserClause}`.trim(),
          };
        }

        return {
          diagnosisHeadline: "상품마다 따로 손보는 운영 방식이 판매 속도를 묶고 있습니다",
          diagnosisBody: `대표 혜택 문장, 신뢰 문장, 구매 직전 문장을 매번 새로 쓰지 말고 모듈처럼 재사용하는 편이 좋습니다. ${snapshot.surfaceHint}를 모듈 단위로 쪼개면 운영 부담이 빠르게 줄어듭니다. ${browserClause}`.trim(),
        };
      }

      return {
        diagnosisHeadline: "채널마다 따로 손보는 운영 방식이 성장을 묶고 있습니다",
        diagnosisBody: `지금 가장 큰 문제는 한 번 만든 문장을 여러 채널에 재사용하지 못하는 점으로 보입니다. ${snapshot.surfaceHint}를 모듈 단위로 쪼개 재사용 흐름을 먼저 만드는 편이 좋습니다. ${browserClause}`.trim(),
      };
    default:
      return {
        diagnosisHeadline: `${parsed.kindLabel} 기준으로 가장 먼저 손볼 위치가 잡히고 있습니다`,
        diagnosisBody: `지금 받은 답변을 기준으로 ${snapshot.surfaceHint}부터 우선순위를 나누는 단계입니다. ${browserClause}`.trim(),
      };
  }
}

function getPlacementText(kind: ParsedChannelInputSuccess["kind"], pain: OptimizationPain | undefined) {
  switch (kind) {
    case "youtube":
      if (pain === "weak_cta") return "영상 설명 첫 문단, 고정 댓글, 외부 링크 안내 문장";
      if (pain === "low_trust") return "채널 소개, 설명란 근거 문장, 고정 댓글 보증 문장";
      if (pain === "weak_hook") return "제목, 썸네일 약속, 영상 첫 30초 오프닝";
      return "채널 소개, 영상 설명, 고정 댓글";
    case "blog":
      if (pain === "weak_cta") return "도입부 첫 3문장, 본문 중간 링크 문장, 말미 CTA";
      if (pain === "low_trust") return "본문 중간 비교 근거 블록, 사례 문장, 말미 안심 문장";
      if (pain === "weak_hook") return "제목, 도입부 첫 3문장, 소제목 전환부";
      return "제목, 도입부, 말미 안내 문장";
    case "coupang":
      return "상품명 첫 문장, 대표 혜택 블록, 구매 직전 안내 문장";
    case "smartstore":
      return "스토어 소개, 대표 상품 첫 화면, 후기 근처 안내 문장";
    default:
      return "대표 진입 화면과 첫 행동 유도 영역";
  }
}

function isInquiryFlow(brief: OptimizationBrief) {
  return brief.goal === "lead" || brief.conversion === "inquiry";
}

function buildDiagnosisCards({
  brief,
  parsed,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
}) {
  const placement = getPlacementText(parsed.kind, brief.pain);
  const firstSignal = surface?.actionSignals[0];
  const salesInquiryFlow = isSalesChannel(parsed.kind) && isInquiryFlow(brief);

  if (!brief.hasAnyInput) {
    return [
      {
        title: "바꿀 문장",
        emphasis: "아직 실패 지점을 먼저 고르는 단계입니다",
        body: "지금은 문장을 고치기보다 어디에서 가장 먼저 끊기는지부터 좁히는 편이 정확합니다.",
      },
      {
        title: "왜 바꾸나",
        body: "문제를 잘못 고르면 글로벌 레퍼런스를 많이 봐도 실제 채널 개선으로 이어지지 않기 때문입니다.",
      },
      {
        title: "어디에 먼저 붙이나",
        emphasis: placement,
        body: "가장 먼저 보이는 위치부터 확인해야 이후 모듈 추천이 과장되지 않습니다.",
      },
    ] satisfies BriefResultCard[];
  }

  switch (brief.pain) {
    case "weak_hook":
      if (salesInquiryFlow) {
        return [
          {
            title: "바꿀 문장",
            emphasis: "첫 화면에서 왜 지금 말을 걸어야 하는지 먼저 보여 줘야 합니다",
            body: "문의 버튼보다 먼저, 어떤 답을 받을 수 있고 왜 지금 물어볼 가치가 있는지 한 줄로 여는 편이 좋습니다.",
          },
          {
            title: "왜 바꾸나",
            body: "첫 인상에서 해결 범위가 흐리면 문의 버튼이 있어도 직접 말을 거는 장벽이 크게 남습니다.",
          },
          {
            title: "어디에 먼저 붙이나",
            emphasis: placement,
            body: "첫 화면 제목과 대표 소개 문장부터 문의 가치가 같은 약속으로 읽히게 맞추는 편이 자연스럽습니다.",
          },
        ] satisfies BriefResultCard[];
      }

      return [
        {
          title: "바꿀 문장",
          emphasis: "첫 문장을 결과 약속형으로 바꿔야 합니다",
          body: "사용자가 왜 멈춰서 봐야 하는지 첫 화면에서 바로 드러나는 문장으로 다시 잡는 편이 좋습니다.",
        },
        {
          title: "왜 바꾸나",
          body: "첫 인상에서 약속이 흐리면 뒤에 있는 설명과 신뢰 근거까지 읽히기 전에 이탈이 먼저 일어납니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "가장 먼저 보이는 제목과 오프닝 라인부터 같은 약속으로 맞추는 편이 자연스럽습니다.",
        },
      ] satisfies BriefResultCard[];
    case "weak_cta":
      if (salesInquiryFlow) {
        return [
          {
            title: "바꿀 문장",
            emphasis: firstSignal ? `지금의 "${firstSignal}"보다 문의해도 되는 이유가 더 선명해야 합니다` : "지금 문의해도 되는 이유가 한 줄로 보이게 바꿔야 합니다",
            body: "무엇을 물어볼 수 있고 어떤 답을 받을 수 있는지가 한 번에 읽히는 문의 문장으로 바꾸는 편이 좋습니다.",
          },
          {
            title: "왜 바꾸나",
            body: "정보는 읽혀도 말 걸 이유가 약하면 사용자는 문의 버튼 앞에서 멈추고, 상담 시작이 뒤로 밀립니다.",
          },
          {
            title: "어디에 먼저 붙이나",
            emphasis: placement,
            body: "문의 직전 위치에 해결 범위와 다음 행동을 같이 적는 문장을 먼저 붙이는 편이 좋습니다.",
          },
        ] satisfies BriefResultCard[];
      }

      return [
        {
          title: "바꿀 문장",
          emphasis: firstSignal ? `지금의 "${firstSignal}"보다 다음 행동이 더 선명해야 합니다` : "다음 행동이 한 줄로 보이는 문장으로 바꿔야 합니다",
          body: "무엇을 얻고 어디로 가는지가 한 번에 읽히는 행동 문장으로 바꾸는 편이 좋습니다.",
        },
        {
          title: "왜 바꾸나",
          body: "정보는 읽혀도 바로 행동할 이유가 약하면 비교 중인 사용자가 멈추고, 클릭과 문의가 뒤로 밀립니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "사용자가 망설이기 쉬운 위치에 결과와 다음 행동을 같이 적는 문장을 먼저 붙이는 편이 좋습니다.",
        },
      ] satisfies BriefResultCard[];
    case "low_trust":
      if (salesInquiryFlow) {
        return [
          {
            title: "바꿀 문장",
            emphasis: "문의 전에 안심할 근거가 먼저 보이게 바꿔야 합니다",
            body: "상담을 받기 전에 믿고 말을 걸어도 되는 이유와 운영 신뢰를 먼저 보이게 정리하는 편이 좋습니다.",
          },
          {
            title: "왜 바꾸나",
            body: "문의는 구매보다 먼저 사람과 연결되는 행동이라, 응답 품질과 신뢰 근거가 약하면 시작 자체가 쉽게 멈춥니다.",
          },
          {
            title: "어디에 먼저 붙이나",
            emphasis: placement,
            body: "문의 버튼 근처와 설명 중간 위치에 후기, 응답 기준, 안심 문장을 먼저 보강하면 장벽을 줄이기 좋습니다.",
          },
        ] satisfies BriefResultCard[];
      }

      return [
        {
          title: "바꿀 문장",
          emphasis: "설명보다 근거가 먼저 보이게 바꿔야 합니다",
          body: "좋다고 말하는 문장보다 비교 근거, 안심 포인트, 보증 문장이 먼저 보이게 정리하는 편이 좋습니다.",
        },
        {
          title: "왜 바꾸나",
          body: "무엇을 하는지는 보여도 믿을 근거가 약하면 사용자는 바로 행동하지 않고 더 비교하러 떠납니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "설명 중간과 행동 직전 위치에 근거 문장을 먼저 보강하면 망설임을 줄이기 좋습니다.",
        },
      ] satisfies BriefResultCard[];
    case "unclear_offer":
      if (salesInquiryFlow) {
        return [
          {
            title: "바꿀 문장",
            emphasis: "누가 문의해야 하고 어떤 답을 받을지 한 줄로 먼저 보여 줘야 합니다",
            body: "문의 대상과 해결 범위가 같은 문장 안에서 읽히도록 정리하는 편이 좋습니다.",
          },
          {
            title: "왜 바꾸나",
            body: "문의형 채널은 말 걸기 전 기대 답변이 선명해야 행동이 생기기 때문에, 제안이 흐리면 문의 전환이 급격히 떨어집니다.",
          },
          {
            title: "어디에 먼저 붙이나",
            emphasis: placement,
            body: "대표 소개와 문의 유도 문장부터 대상 고객과 해결 범위를 같이 적는 구조로 맞추는 편이 안전합니다.",
          },
        ] satisfies BriefResultCard[];
      }

      return [
        {
          title: "바꿀 문장",
          emphasis: "누구를 위한 채널인지 한 줄로 먼저 보여 줘야 합니다",
          body: "핵심 제안과 대상 고객이 같은 문장 안에서 읽히도록 정리하는 편이 좋습니다.",
        },
        {
          title: "왜 바꾸나",
          body: "대상과 약속이 흐리면 콘텐츠나 상품 자체보다 해석 비용이 먼저 커져 전환이 떨어집니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "대표 제목과 소개 문장부터 제안과 대상을 같이 적는 구조로 맞추는 편이 안전합니다.",
        },
      ] satisfies BriefResultCard[];
    case "manual_overload":
      if (salesInquiryFlow) {
        return [
          {
            title: "바꿀 문장",
            emphasis: "반복되는 문의 응답 문장을 모듈 단위로 쪼개 재사용해야 합니다",
            body: "상품마다 새로 답하기보다, 첫 답변과 안심 근거와 문의 마무리 문장을 분리해 재사용하는 편이 좋습니다.",
          },
          {
            title: "왜 바꾸나",
            body: "문의 운영이 수작업 위주로 남으면 응답 품질과 속도가 흔들리고, 문의가 늘수록 전환 효율이 급격히 떨어집니다.",
          },
          {
            title: "어디에 먼저 붙이나",
            emphasis: placement,
            body: "반복해서 쓰는 문의 시작 문장부터 같은 모듈을 재사용하는 구조로 정리하면 운영 부담이 빠르게 줄어듭니다.",
          },
        ] satisfies BriefResultCard[];
      }

      return [
        {
          title: "바꿀 문장",
          emphasis: "반복되는 문장을 모듈 단위로 쪼개 재사용해야 합니다",
          body: "채널마다 새로 쓰는 대신, 첫 문장과 신뢰 문장과 행동 문장을 분리해 재사용하는 편이 좋습니다.",
        },
        {
          title: "왜 바꾸나",
          body: "운영이 수작업 위주로 남으면 채널 수가 늘수록 품질이 흔들리고, 개선 속도도 급격히 느려집니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "반복해서 쓰는 대표 위치부터 같은 모듈을 재사용하는 구조로 정리하면 운영 부담이 빠르게 줄어듭니다.",
        },
      ] satisfies BriefResultCard[];
    default:
      return [
        {
          title: "바꿀 문장",
          emphasis: "가장 먼저 끊기는 위치를 먼저 고정합니다",
          body: "지금 답변 기준으로 문장을 고치기 전에 어디를 먼저 손볼지 우선순위를 정하는 단계입니다.",
        },
        {
          title: "왜 바꾸나",
          body: "문장을 많이 바꾸기보다 가장 큰 끊김을 먼저 줄이는 편이 실제 체감 개선이 더 빠릅니다.",
        },
        {
          title: "어디에 먼저 붙이나",
          emphasis: placement,
          body: "대표 진입 위치부터 손보는 편이 다음 결과 연결이 자연스럽습니다.",
        },
      ] satisfies BriefResultCard[];
  }
}

function buildBrowserReviewCards({
  brief,
  parsed,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
}) {
  if (!surface?.browserFollowupNeeded) {
    return {
      browserExecutionBody: null,
      browserExecutionHeadline: null,
      browserExecutionSteps: [],
      browserMemoTemplate: null,
      browserOpenUrl: null,
      browserReviewCards: [],
      browserReviewBody: null,
      browserReviewHeadline: null,
    };
  }

  const decisionPoint =
    brief.pain === "weak_cta"
      ? "실제 행동 문장이 결과와 다음 행동을 같이 말하는지"
      : brief.pain === "low_trust"
        ? "안심할 근거가 행동 직전에도 보이는지"
        : brief.pain === "weak_hook"
          ? "첫 문장에서 왜 봐야 하는지가 바로 읽히는지"
          : brief.pain === "unclear_offer"
            ? "누구를 위한 제안인지 한 줄로 읽히는지"
            : brief.pain === "manual_overload"
              ? "반복 운영에 재사용할 문장 묶음으로 나눌 수 있는지"
              : "어디에서 가장 먼저 끊기는지";
  const [firstPoint, secondPoint, thirdPoint] = surface.browserFollowupPoints;
  const placement = getPlacementText(parsed.kind, brief.pain);

  return {
    browserExecutionBody: "실제 채널을 열고, 펼친 뒤 문장을 확인하고, 약한 위치를 메모한 다음 바로 초안으로 교체하는 순서로 움직입니다.",
    browserExecutionHeadline: "실채널 브라우저 확인 순서",
    browserExecutionSteps: [
      {
        title: "1. 실제 채널 열기",
        emphasis: surface.sourceUrl,
        body: "지금 공개 주소를 그대로 열고, 첫 화면에서 가장 먼저 보이는 제목과 설명부터 확인합니다.",
      },
      {
        title: "2. 펼친 뒤 문장 보기",
        emphasis: firstPoint ?? placement,
        body: "정적 읽기에서 빠진 펼침 영역과 실제 행동 문장을 먼저 확인합니다.",
      },
      {
        title: "3. 강한 문장과 약한 위치 기록",
        emphasis: "잘 먹는 문장 / 약한 위치 / 바로 교체할 문장",
        body: "좋은 문장과 약한 문장을 동시에 기록해야 복붙용 초안을 바로 비교 적용하기 쉽습니다.",
      },
      {
        title: "4. 초안으로 바로 교체",
        emphasis: placement,
        body: "아래 복붙용 초안에서 맞는 문장을 골라 가장 먼저 끊기는 위치에 바로 붙여 보고 반응을 확인합니다.",
      },
    ] satisfies BriefResultCard[],
    browserMemoTemplate: `잘 먹는 문장:\n약한 위치:\n바로 교체할 문장:\n다음에 먼저 붙일 위치: ${getPlacementText(parsed.kind, brief.pain)}`,
    browserOpenUrl: surface.sourceUrl,
    browserReviewCards: [
      {
        title: "먼저 펼칠 위치",
        emphasis: firstPoint ?? getPlacementText(parsed.kind, brief.pain),
        body: "정적 읽기에서 빠지기 쉬운 첫 화면 뒤의 문장을 먼저 확인합니다.",
      },
      {
        title: "그다음 읽을 문장",
        emphasis: secondPoint ?? thirdPoint ?? "실제 행동을 만드는 문장",
        body: "사용자가 머무를지 움직일지를 결정하는 문장이 실제 화면에 어떻게 보이는지 읽습니다.",
      },
      {
        title: "확인 뒤 바로 판단할 것",
        emphasis: decisionPoint,
        body: "브라우저로 다시 본 뒤에는 이 기준으로 어떤 모듈을 먼저 적용할지 바로 결정합니다.",
      },
    ] satisfies BriefResultCard[],
    browserReviewBody:
      surface.browserFollowupReason ??
      "지금 보이는 HTML만으로는 부족해, 실제 화면에서 펼친 뒤 문장과 행동 유도 위치를 한 번 더 확인하는 편이 안전합니다.",
    browserReviewHeadline: "브라우저에서 다시 보면 이 3가지를 먼저 봅니다",
  };
}

function getAudienceLead(audience: OptimizationAudience | undefined) {
  switch (audience) {
    case "cold":
      return "처음 보는 사람도";
    case "comparing":
      return "비교 중인 사람도";
    case "warm":
      return "이미 관심 있는 사람도";
    case "existing":
      return "기존 고객도";
    default:
      return "들어온 사람도";
  }
}

function getToneStyle(tone: OptimizationTone | undefined) {
  switch (tone) {
    case "trustworthy":
      return {
        hook: "핵심 결과와 판단 기준부터 차분하게 보여드릴게요.",
        proof: "왜 이렇게 판단하는지 근거와 비교 기준부터 먼저 보여드립니다.",
      };
    case "expert":
      return {
        hook: "핵심 기준부터 짧게 정리한 뒤 필요한 설명만 이어가겠습니다.",
        proof: "근거와 비교 포인트를 먼저 확인하면 판단이 훨씬 빨라집니다.",
      };
    case "urgent":
      return {
        hook: "지금 필요한 핵심만 먼저 보고 바로 다음 단계로 넘어가세요.",
        proof: "망설이지 않게 지금 필요한 근거만 먼저 짚어드립니다.",
      };
    default:
      return {
        hook: "무엇을 얻는지부터 쉽게 이해할 수 있게 먼저 정리해 드릴게요.",
        proof: "헷갈리지 않게 근거와 비교 포인트부터 쉽게 보여드릴게요.",
      };
  }
}

function getConversionDraft(conversion: OptimizationConversion | undefined, kind: ParsedChannelInputSuccess["kind"]) {
  if (conversion === "purchase") {
    return kind === "blog" || kind === "youtube"
      ? "준비가 됐다면 아래 링크에서 바로 확인하고 선택해 보세요."
      : "준비가 됐다면 아래에서 바로 선택하고 이어서 진행해 보세요.";
  }

  if (conversion === "inquiry") {
    return "조건이 맞는다면 아래에서 바로 문의를 시작해 보세요.";
  }

  if (conversion === "subscribe") {
    return kind === "youtube"
      ? "도움이 됐다면 지금 바로 구독하고 다음 영상까지 이어서 받아보세요."
      : "도움이 됐다면 지금 바로 팔로우하고 다음 업데이트까지 이어서 받아보세요.";
  }

  return "핵심만 확인했다면 아래에서 바로 다음 단계로 이동해 보세요.";
}

function getChannelHookDraft({
  audienceLead,
  conversion,
  goal,
  kind,
  pain,
  toneStyle,
}: {
  audienceLead: string;
  conversion: OptimizationConversion | undefined;
  goal: OptimizationGoal | undefined;
  kind: ParsedChannelInputSuccess["kind"];
  pain: OptimizationPain | undefined;
  toneStyle: ReturnType<typeof getToneStyle>;
}) {
  const inquiryFlow = goal === "lead" || conversion === "inquiry";

  if (kind === "youtube") {
    if (pain === "weak_cta") {
      return {
        draft: `${audienceLead} 이 영상에서 무엇을 얻고 어디로 가야 하는지 바로 보이게 시작해 보세요.`,
        alternateDraft: "지금 이 영상 하나로 핵심만 보고 바로 다음 행동까지 이어가 보세요.",
      };
    }

    if (pain === "low_trust") {
      return {
        draft: `${audienceLead} 설명보다 먼저 믿을 근거를 확인할 수 있게 시작해 보세요.`,
        alternateDraft: "왜 이 채널을 믿고 따라가도 되는지부터 먼저 보여 주세요.",
      };
    }

    return {
      draft: `${audienceLead} ${toneStyle.hook}`,
      alternateDraft: "이 영상에서 가장 먼저 가져갈 결과부터 짧게 보여 드릴게요.",
    };
  }

  if (kind === "blog") {
    if (pain === "weak_cta") {
      return {
        draft: `${audienceLead} 여기서 무엇을 얻고 어디로 가는지 바로 보이게 시작해 보세요.`,
        alternateDraft: "이 글을 다 읽고 나면 바로 다음 단계로 움직일 수 있게 먼저 정리해 드릴게요.",
      };
    }

    if (pain === "unclear_offer") {
      return {
        draft: `${audienceLead} 이 글이 어떤 도움을 주는지 한 줄로 먼저 이해할 수 있게 시작해 보세요.`,
        alternateDraft: "이 글이 누구에게 왜 필요한지부터 먼저 분명하게 열어 주세요.",
      };
    }

    return {
      draft: `${audienceLead} ${toneStyle.hook}`,
      alternateDraft: "먼저 핵심 결과를 짧게 보고, 필요한 설명만 이어서 확인해 보세요.",
    };
  }

  if (kind === "coupang" || kind === "smartstore") {
    if (inquiryFlow) {
      if (pain === "weak_cta") {
        return {
          draft:
            kind === "coupang"
              ? `${audienceLead} 이 상품에 지금 무엇을 물어보면 되는지 첫 화면에서 바로 보이게 시작해 보세요.`
              : `${audienceLead} 이 스토어에 지금 어떤 질문을 해도 되는지 첫 화면에서 바로 보이게 시작해 보세요.`,
          alternateDraft:
            kind === "coupang"
              ? "문의 버튼보다 먼저, 지금 물어보면 해결되는 조건 하나를 선명하게 보여 주세요."
              : "스토어 소개보다 먼저, 지금 톡톡이나 문의로 확인할 수 있는 답을 한 문장으로 열어 주세요.",
        };
      }

      if (pain === "low_trust") {
        return {
          draft:
            kind === "coupang"
              ? `${audienceLead} 문의 전에 믿고 말을 걸어도 되는 이유부터 먼저 안심할 수 있게 시작해 보세요.`
              : `${audienceLead} 스토어에 말을 걸기 전에 믿어도 되는 운영 기준부터 먼저 안심할 수 있게 시작해 보세요.`,
          alternateDraft:
            kind === "coupang"
              ? "무엇을 도와주는지보다 왜 믿고 문의해도 되는지부터 먼저 보여 주세요."
              : "스토어 소개보다 후기와 응답 신뢰를 먼저 보여 주세요.",
        };
      }

      if (pain === "unclear_offer") {
        return {
          draft:
            kind === "coupang"
              ? `${audienceLead} 누가 이 상품에 문의해야 하고 어떤 답을 받을 수 있는지 첫 화면에서 바로 이해되게 시작해 보세요.`
              : `${audienceLead} 어떤 고객이 이 스토어에 문의하면 무엇을 안내받는지 첫 화면에서 바로 이해되게 시작해 보세요.`,
          alternateDraft:
            kind === "coupang"
              ? "문의 대상과 해결 범위를 한 줄로 묶어 첫 화면에서 먼저 보여 주세요."
              : "스토어 소개를 길게 쓰기보다 문의 대상과 답변 범위를 먼저 한 줄로 묶어 주세요.",
        };
      }

      if (pain === "manual_overload") {
        return {
          draft: `${audienceLead} 문의 시작 문장을 상품마다 다시 쓰지 않게, 첫 화면 문장을 모듈처럼 재사용해 보세요.`,
          alternateDraft: "스토어 첫 문장과 문의 시작 문장을 같은 틀로 맞춰 운영 부담부터 줄여 보세요.",
        };
      }
    }

    if (pain === "weak_cta") {
      return {
        draft:
          kind === "coupang"
            ? `${audienceLead} 이 상품을 지금 왜 선택해야 하는지 첫 화면에서 바로 보이게 시작해 보세요.`
            : `${audienceLead} 이 스토어에서 무엇부터 보면 되는지 첫 화면에서 바로 보이게 시작해 보세요.`,
        alternateDraft:
          kind === "coupang"
            ? "대표 혜택 하나와 지금 사야 할 이유 하나만 먼저 선명하게 보여 주세요."
            : "스토어 소개보다 먼저 대표 상품을 고를 이유를 한 문장으로 열어 주세요.",
      };
    }

    if (pain === "low_trust") {
      return {
        draft:
          kind === "coupang"
            ? `${audienceLead} 구매 전 가장 불안한 부분부터 먼저 안심할 수 있게 시작해 보세요.`
            : `${audienceLead} 대표 상품을 보기 전에 스토어를 믿을 이유부터 먼저 안심할 수 있게 시작해 보세요.`,
        alternateDraft:
          kind === "coupang"
            ? "무엇이 좋은지보다 왜 믿을 수 있는지부터 먼저 보여 주세요."
            : "스토어 소개보다 후기와 안심 근거를 먼저 보여 주세요.",
      };
    }

    if (pain === "unclear_offer") {
      return {
        draft:
          kind === "coupang"
            ? `${audienceLead} 이 상품이 누구에게 맞고 무엇이 다른지 첫 화면에서 바로 이해되게 시작해 보세요.`
            : `${audienceLead} 이 스토어가 어떤 고객을 위해 무엇을 파는지 첫 화면에서 바로 이해되게 시작해 보세요.`,
        alternateDraft:
          kind === "coupang"
            ? "대표 혜택과 대상 고객을 한 줄로 묶어 첫 화면에서 먼저 보여 주세요."
            : "스토어 소개를 길게 쓰기보다 대표 고객과 대표 혜택을 먼저 한 줄로 묶어 주세요.",
      };
    }

    if (pain === "manual_overload") {
      return {
        draft: `${audienceLead} 대표 혜택 문장을 상품마다 다시 쓰지 않게, 첫 화면 문장을 모듈처럼 재사용해 보세요.`,
        alternateDraft: "스토어 첫 문장과 대표 상품 첫 문장을 같은 틀로 맞춰 운영 부담부터 줄여 보세요.",
      };
    }

    return {
      draft: `${audienceLead} ${toneStyle.hook}`,
      alternateDraft: "처음 들어온 사람도 첫 화면에서 바로 선택 이유를 읽게 만들어 보세요.",
    };
  }

  return {
    draft: `${audienceLead} ${toneStyle.hook}`,
    alternateDraft: "처음 보더라도 바로 이해되는 약속으로 시작해 보세요.",
  };
}

function getChannelProofDraft({
  conversion,
  goal,
  kind,
  pain,
  toneStyle,
}: {
  conversion: OptimizationConversion | undefined;
  goal: OptimizationGoal | undefined;
  kind: ParsedChannelInputSuccess["kind"];
  pain: OptimizationPain | undefined;
  toneStyle: ReturnType<typeof getToneStyle>;
}) {
  const inquiryFlow = goal === "lead" || conversion === "inquiry";

  if (kind === "youtube") {
    if (pain === "weak_cta") {
      return {
        draft: "왜 이 선택이 맞는지 짧게 확인한 뒤 설명란과 고정 댓글에서 바로 이어질 수 있게 정리해 보세요.",
        alternateDraft: "설명은 길게 늘리지 말고, 지금 움직여야 하는 이유만 짧게 보여 주세요.",
      };
    }

    return {
      draft: toneStyle.proof,
      alternateDraft: "비교 포인트와 안심 근거를 먼저 짚으면 영상 뒤 행동이 더 잘 붙습니다.",
    };
  }

  if (kind === "blog") {
    if (pain === "weak_cta") {
      return {
        draft: "왜 이 선택이 맞는지 짧게 확인한 뒤 바로 다음 행동으로 이어질 수 있게 정리해 보세요.",
        alternateDraft: "읽기만 하고 끝나지 않게, 근거 다음에 바로 움직일 이유를 붙여 주세요.",
      };
    }

    if (pain === "low_trust") {
      return {
        draft: "비교 기준과 근거를 먼저 보여 주고, 그 뒤에 설명을 붙이는 편이 좋습니다.",
        alternateDraft: "좋다고 말하기보다 왜 믿어도 되는지부터 먼저 보여 주세요.",
      };
    }
  }

  if (kind === "coupang" || kind === "smartstore") {
    if (inquiryFlow) {
      if (pain === "weak_cta") {
        return {
          draft:
            kind === "coupang"
              ? "대표 혜택 뒤에 문의하면 어떤 답을 바로 받을 수 있는지 짧게 확인한 뒤 바로 상담 행동으로 이어지게 정리해 보세요."
              : "대표 상품을 본 뒤 스토어에 문의하면 어떤 안내를 받을 수 있는지 짧게 확인한 다음 바로 상담 시작으로 이어지게 정리해 보세요.",
          alternateDraft:
            kind === "coupang"
              ? "혜택 설명 뒤에 지금 물어봐도 되는 이유를 한 줄 더 붙여 주세요."
              : "스토어 소개 뒤에 지금 문의하면 해결되는 범위를 한 줄 더 붙여 주세요.",
        };
      }

      if (pain === "unclear_offer") {
        return {
          draft: "문의 대상 하나, 해결 범위 하나, 바로 물어볼 이유 하나를 먼저 묶어 보여 주는 편이 좋습니다.",
          alternateDraft: "좋은 점을 많이 말하기보다 누가 무엇을 물어보면 되는지부터 먼저 분명하게 보여 주세요.",
        };
      }

      return {
        draft:
          kind === "coupang"
            ? "후기, 응답 기준, 운영 신뢰 같은 안심 요소를 먼저 보여 준 뒤 문의 가치와 행동 문장으로 넘기는 편이 좋습니다."
            : "후기, 스토어 신뢰 근거, 응답 원칙을 먼저 보여 준 뒤 대표 상품과 문의 문장으로 넘기는 편이 좋습니다.",
        alternateDraft:
          kind === "coupang"
            ? "문의 전 가장 망설이는 이유를 먼저 끊어 주는 문장이 필요합니다."
            : "스토어에 말을 걸어도 되는 이유를 먼저 짧게 보여 주면 문의 시작이 훨씬 쉬워집니다.",
      };
    }

    if (pain === "weak_cta") {
      return {
        draft:
          kind === "coupang"
            ? "대표 혜택 뒤에 왜 지금 선택해도 되는지 짧게 확인한 뒤 바로 구매 행동으로 이어지게 정리해 보세요."
            : "대표 상품을 본 뒤 왜 이 스토어에서 사도 되는지 짧게 확인한 다음 바로 상품 선택으로 이어지게 정리해 보세요.",
        alternateDraft:
          kind === "coupang"
            ? "혜택 설명 뒤에 결정을 미루지 않아도 되는 이유를 한 줄 더 붙여 주세요."
            : "스토어 소개 뒤에 대표 상품을 바로 눌러도 되는 이유를 한 줄 더 붙여 주세요.",
      };
    }

    if (pain === "unclear_offer") {
      return {
        draft: "대표 혜택 하나, 대상 고객 하나, 선택 이유 하나를 먼저 묶어 보여 주는 편이 좋습니다.",
        alternateDraft: "좋은 점을 많이 말하기보다 누구에게 어떤 차이가 있는지부터 먼저 분명하게 보여 주세요.",
      };
    }

    return {
      draft:
        kind === "coupang"
          ? "리뷰, 비교 포인트, 교환/반품 같은 안심 요소를 먼저 보여 준 뒤 혜택과 행동 문장으로 넘기는 편이 좋습니다."
          : "후기, 스토어 신뢰 근거, 안심 요소를 먼저 보여 준 뒤 대표 상품과 행동 문장으로 넘기는 편이 좋습니다.",
      alternateDraft:
        kind === "coupang"
          ? "구매 전 가장 망설이는 이유를 먼저 끊어 주는 문장이 필요합니다."
          : "스토어를 믿어도 되는 이유를 먼저 짧게 보여 주면 대표 상품 클릭이 훨씬 쉬워집니다.",
    };
  }

  return {
    draft: toneStyle.proof,
    alternateDraft: "근거와 비교 기준부터 먼저 짚는 편이 더 잘 읽힙니다.",
  };
}

function getChannelActionDraft({
  conversion,
  kind,
}: {
  conversion: OptimizationConversion | undefined;
  kind: ParsedChannelInputSuccess["kind"];
}) {
  const base = getConversionDraft(conversion, kind);

  if (kind === "youtube") {
    return {
      draft:
        conversion === "subscribe"
          ? "도움이 됐다면 지금 바로 구독하고 다음 영상까지 이어서 받아보세요."
          : conversion === "inquiry"
            ? "궁금한 점이 있으면 설명란 링크나 고정 댓글에서 바로 이어서 확인해 보세요."
            : "설명란이나 고정 댓글에서 바로 다음 단계로 이동해 보세요.",
      alternateDraft: "지금 필요한 다음 행동 하나만 남기고 바로 움직이게 만들어 보세요.",
    };
  }

  if (kind === "blog") {
    return {
      draft: base,
      alternateDraft:
        conversion === "inquiry"
          ? "읽고 끝내지 말고, 바로 아래에서 문의를 시작해 보세요."
          : "핵심만 이해했다면 바로 아래에서 다음 단계로 넘어가 보세요.",
    };
  }

  if (kind === "coupang" || kind === "smartstore") {
    return {
      draft:
        conversion === "purchase"
          ? kind === "coupang"
            ? "이 조건이 맞다면 지금 이 옵션부터 확인하고 바로 이어서 진행해 보세요."
            : "대표 상품이 맞다면 지금 바로 확인하고 스토어 안에서 이어서 진행해 보세요."
          : conversion === "inquiry"
            ? kind === "coupang"
              ? "궁금한 조건이 남아 있다면 지금 바로 문의하고 가장 맞는 옵션부터 안내받아 보세요."
              : "궁금한 점이 남아 있다면 지금 바로 톡톡이나 문의로 물어보고 맞는 상품부터 안내받아 보세요."
          : base,
      alternateDraft:
        conversion === "purchase"
          ? kind === "coupang"
            ? "지금 필요한 조건이 맞았다면 더 미루지 말고 바로 선택해 보세요."
            : "대표 상품이 맞다면 지금 바로 눌러 보고 이어서 움직여 보세요."
          : conversion === "inquiry"
            ? kind === "coupang"
              ? "결정이 서지 않았다면 지금 바로 물어보고 가장 맞는 조건부터 확인해 보세요."
              : "망설이는 부분이 있다면 지금 바로 문의하고 가장 맞는 상품부터 짚어 보세요."
          : "망설일 이유가 줄었다면 지금 바로 이어서 움직여 보세요.",
    };
  }

  return {
    draft: base,
    alternateDraft: "핵심을 이해했다면 바로 다음 행동으로 이어가 보세요.",
  };
}

function buildCopyDrafts({
  brief,
  parsed,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
}) {
  const audienceLead = getAudienceLead(brief.audience);
  const toneStyle = getToneStyle(brief.tone);
  const placement = getPlacementText(parsed.kind, brief.pain);
  const salesChannel = isSalesChannel(parsed.kind);
  const salesInquiryFlow = salesChannel && isInquiryFlow(brief);
  const firstPlacement =
    parsed.kind === "youtube"
      ? "영상 제목, 썸네일 약속, 설명 첫 문단"
      : parsed.kind === "blog"
        ? "제목, 도입부 첫 3문장"
        : parsed.kind === "coupang"
          ? salesInquiryFlow
            ? "상품명 첫 문장, 대표 혜택 블록, 문의 유도 문장"
            : "상품명 첫 문장, 대표 혜택 블록"
          : parsed.kind === "smartstore"
            ? salesInquiryFlow
              ? "스토어 소개, 대표 상품 첫 화면, 톡톡/문의 안내"
              : "스토어 소개, 대표 상품 첫 화면"
            : placement;
  const trustPlacement =
    brief.pain === "low_trust"
      ? placement
      : parsed.kind === "youtube"
        ? "설명란 근거 문장, 고정 댓글"
        : parsed.kind === "blog"
          ? "본문 중간 비교 근거 블록, 사례 문장"
          : parsed.kind === "coupang"
            ? salesInquiryFlow
              ? "상세 설명 중간, FAQ 근처, 문의 직전 안내"
              : "상세 설명 중간, FAQ 근처"
            : salesInquiryFlow
              ? "후기와 신뢰 영역, 톡톡 안내 근처"
              : "후기와 신뢰 영역 근처";
  const hookDraft = getChannelHookDraft({
    audienceLead,
    conversion: brief.conversion,
    goal: brief.goal,
    kind: parsed.kind,
    pain: brief.pain,
    toneStyle,
  });
  const proofDraft = getChannelProofDraft({
    conversion: brief.conversion,
    goal: brief.goal,
    kind: parsed.kind,
    pain: brief.pain,
    toneStyle,
  });
  const actionDraft = getChannelActionDraft({
    conversion: brief.conversion,
    kind: parsed.kind,
  });
  const firstCompareHint = salesInquiryFlow
    ? "글로벌 기준: 첫 화면 3줄 안에 누구의 문의인지와 무엇을 해결해 주는지가 보이는지"
    : salesChannel
      ? "글로벌 기준: 첫 화면 3줄 안에 대표 혜택과 대상 고객이 함께 보이는지"
    : parsed.kind === "youtube"
      ? "글로벌 기준: 첫 10초 안에 왜 봐야 하는지가 보이는지"
      : "글로벌 기준: 첫 3줄 안에 결과 약속이 보이는지";
  const proofCompareHint = salesInquiryFlow
    ? "글로벌 기준: 문의 전 안심할 근거와 응답 기대가 함께 보이는지"
    : salesChannel
      ? "글로벌 기준: 후기, 보증, 교환/반품 같은 안심 근거가 혜택보다 뒤로 밀리지 않는지"
    : "글로벌 기준: 설명보다 근거와 비교 포인트가 먼저 보이는지";
  const actionCompareHint = salesInquiryFlow
    ? "글로벌 기준: 문의 직전 문장이 무엇을 물어볼 수 있는지와 어디서 시작하는지를 한 번에 말하는지"
    : salesChannel
      ? "글로벌 기준: 구매 직전 문장이 선택 이유와 다음 행동을 한 번에 말하는지"
    : "글로벌 기준: 행동 문장이 결과와 다음 행동을 한 번에 말하는지";
  const firstExperimentHint = salesInquiryFlow
    ? "A안은 상담 가치 선명화형, B안은 바로 말 걸게 만드는 시작형으로 비교해 보세요."
    : salesChannel
      ? "A안은 혜택 선명화형, B안은 비교 고객을 바로 움직이는 선택 이유형으로 비교해 보세요."
    : "A안은 기본 설득형, B안은 더 직접적인 결과 약속형으로 비교해 보세요.";
  const proofExperimentHint = salesInquiryFlow
    ? "A안은 응답 신뢰 확장형, B안은 문의 장벽 압축형으로 비교해 보세요."
    : salesChannel
      ? "A안은 안심 근거 확장형, B안은 망설임을 먼저 끊는 압축형으로 비교해 보세요."
    : "A안은 설명 연결형, B안은 신뢰를 먼저 세우는 압축형으로 비교해 보세요.";
  const actionExperimentHint = salesInquiryFlow
    ? "A안은 안전한 문의 유도형, B안은 바로 DM/상담 시작형으로 비교해 보세요."
    : salesChannel
      ? "A안은 안전한 구매 유도형, B안은 결정을 더 직접 밀어주는 전환형으로 비교해 보세요."
    : "A안은 안전한 기본형, B안은 더 짧고 직접적인 전환형으로 비교해 보세요.";
  const firstDraftBody = salesInquiryFlow
    ? "문의 시작을 여는 문장입니다. 누가 어떤 질문을 해도 되는지와 얻는 답이 첫 화면에서 같이 읽히는 쪽이 좋습니다."
    : salesChannel
      ? "첫 선택 이유를 만드는 문장입니다. 대표 혜택과 대상 고객이 첫 화면에서 같이 읽히는 쪽이 좋습니다."
    : "첫 클릭과 체류를 담당하는 문장입니다. 처음 들어온 사람도 왜 봐야 하는지 바로 읽히는 쪽이 좋습니다.";
  const proofDraftBody = salesInquiryFlow
    ? "문의 장벽을 줄이는 문장입니다. 설명보다 응답 신뢰, 후기, 운영 기준 같은 안심 근거가 먼저 보이는 편이 좋습니다."
    : salesChannel
      ? "망설임을 줄이는 문장입니다. 혜택 설명보다 후기, 보증, 교환/반품 같은 안심 근거가 먼저 보이는 편이 좋습니다."
    : "망설임을 줄이는 문장입니다. 설명보다 판단 근거가 먼저 보이게 두는 편이 좋습니다.";
  const actionDraftBody = salesInquiryFlow
    ? "문의 시작을 미는 문장입니다. 무엇을 물어볼 수 있는지와 다음 행동이 같은 문장 안에서 읽히는 쪽이 전환에 유리합니다."
    : salesChannel
      ? "구매 직전 결정을 미는 문장입니다. 선택 이유와 다음 행동이 같은 문장 안에서 읽히는 쪽이 전환에 유리합니다."
    : "다음 행동으로 넘기는 문장입니다. 결과와 행동이 같은 문장 안에서 읽히는 쪽이 전환에 유리합니다.";

  return {
    copyDraftBody: salesInquiryFlow
      ? "문의 시작 화면과 톡톡/상담 유도 위치에 바로 붙여 보고 비교할 수 있도록, 문의형 문장 초안을 먼저 줍니다."
      : salesChannel
        ? "스토어 첫 화면과 대표 상품에 바로 붙여 보고 비교할 수 있도록, 판매형 문장 초안을 먼저 줍니다."
      : "지금은 최종 생성물이 아니라도, 바로 붙여 넣고 다듬기 시작할 수 있는 초안을 먼저 줍니다.",
    copyDraftHeadline: "바로 붙여 넣는 문장 초안",
    copyDrafts: [
      {
        title: "첫 문장 초안",
        draft: hookDraft.draft,
        alternateDraft: hookDraft.alternateDraft,
        placement: firstPlacement,
        compareHint: firstCompareHint,
        experimentHint: firstExperimentHint,
        body: firstDraftBody,
      },
      {
        title: "근거 문장 초안",
        draft: proofDraft.draft,
        alternateDraft: proofDraft.alternateDraft,
        placement: trustPlacement,
        compareHint: proofCompareHint,
        experimentHint: proofExperimentHint,
        body: proofDraftBody,
      },
      {
        title: "행동 문장 초안",
        draft: actionDraft.draft,
        alternateDraft: actionDraft.alternateDraft,
        placement,
        compareHint: actionCompareHint,
        experimentHint: actionExperimentHint,
        body: actionDraftBody,
      },
    ] satisfies CopyDraftBlock[],
  };
}

export function parseOptimizationBrief(params: {
  audience?: string | string[];
  constraint?: string | string[];
  conversion?: string | string[];
  goal?: string | string[];
  pain?: string | string[];
  tone?: string | string[];
}): OptimizationBrief {
  const goal = normalizeOption(getSingleValue(params.goal), optimizationGoalOptions);
  const pain = normalizeOption(getSingleValue(params.pain), optimizationPainOptions);
  const audience = normalizeOption(getSingleValue(params.audience), optimizationAudienceOptions);
  const tone = normalizeOption(getSingleValue(params.tone), optimizationToneOptions);
  const conversion = normalizeOption(getSingleValue(params.conversion), optimizationConversionOptions);
  const constraint = getSingleValue(params.constraint)?.trim().slice(0, 220) ?? "";
  const missingFields = [
    pain ? null : "지금 막히는 지점",
    goal ? null : "목표",
    audience ? null : "대상 고객",
    tone ? null : "톤",
    conversion ? null : "전환 행동",
  ].filter((value): value is string => Boolean(value));

  return {
    audience,
    constraint,
    conversion,
    goal,
    hasAnyInput: Boolean(pain || goal || audience || tone || conversion || constraint),
    isComplete: missingFields.length === 0,
    missingFields,
    pain,
    tone,
  };
}

export function buildOptimizationBriefSummary({
  brief,
  parsed,
  surface,
  snapshot,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
  snapshot: ChannelSnapshot;
}): OptimizationBriefSummary {
  const goalLabel = getLabel(brief.goal, optimizationGoalOptions) ?? "전환 목표 확인";
  const painLabel = getLabel(brief.pain, optimizationPainOptions) ?? "지금 막히는 지점 확인";
  const audienceLabel = getLabel(brief.audience, optimizationAudienceOptions) ?? "대상 고객 확인";
  const toneLabel = getLabel(brief.tone, optimizationToneOptions) ?? "톤 확인";
  const conversionLabel = getLabel(brief.conversion, optimizationConversionOptions) ?? "핵심 행동 확인";
  const surfaceAction = getSurfaceAction(parsed.kind);
  const painAction = getPainAction(brief.pain);
  const recommendedModules = applyPainOverlay(
    getBaseModules(parsed.kind, isSalesChannel(parsed.kind) && isInquiryFlow(brief)),
    brief.pain,
    brief.goal,
    brief.conversion,
  );
  const benchmarkLayers = [
    {
      title: "0순위 기준점",
      body: `${brief.pain ? painLabel : "지금 막히는 지점"}을 먼저 정하고, 현재 채널에서 실제로 어디서 끊기는지부터 봅니다. 글로벌 사례보다 먼저 내 채널의 실패 지점을 기준으로 잡아야 합니다.`,
    },
    {
      title: "1차 비교 레이어",
      body: `${getChannelBenchmark(parsed.kind)}를 먼저 비교합니다. 같은 채널 타입 안의 정상 작동 패턴이 가장 현실적인 교정 기준입니다.`,
    },
    {
      title: "2차 글로벌 레퍼런스",
      body: "글로벌 상위 채널과 판매 채널은 정답 복제가 아니라 구조 보정용 레퍼런스로 씁니다. 잘 먹히는 첫 문장, 신뢰 근거, 행동 유도 패턴만 추출해 비교합니다.",
    },
  ];
  const filledLabels = [
    brief.pain ? `막히는 지점: ${painLabel}` : null,
    brief.goal ? `목표: ${goalLabel}` : null,
    brief.audience ? `대상: ${audienceLabel}` : null,
    brief.tone ? `톤: ${toneLabel}` : null,
    brief.conversion ? `전환: ${conversionLabel}` : null,
  ].filter((value): value is string => Boolean(value));

  let directionTitle = `${goalLabel} 중심 진단 방향`;
  let directionPoints = [
    `${painLabel}이 현재 가장 큰 문제라고 보고, ${parsed.kindLabel}에서 ${goalLabel}을 중심으로 ${conversionLabel} 흐름을 먼저 정리합니다.`,
    `주 대상은 ${audienceLabel}이며, 전체 문장 톤은 ${toneLabel} 쪽으로 맞춥니다.`,
    `${surfaceAction}와 ${painAction}부터 손보는 것이 현재 채널 구조와 가장 잘 맞습니다.`,
    brief.constraint
      ? `제약 조건: ${brief.constraint}`
      : "아직 제약 조건은 비어 있습니다. 금지 표현, 필수 메시지, 브랜드 제한이 있으면 지금 적어 두는 것이 안전합니다.",
  ];

  const nextStepSignals = [
    `실제 채널 화면에서 채널명, 최근 활동, 반복 행동 유도 문장을 읽어 ${goalLabel}과 연결합니다.`,
    `${snapshot.surfaceHint} 중 어디를 먼저 바꿔야 할지 우선순위를 나눕니다.`,
    "다음 결과 화면에서는 한 번에 붙여 넣는 긴 프롬프트 대신, 바로 적용할 모듈 묶음으로 결과를 나눠 보여 줍니다.",
  ];

  let readinessLabel = "질문 준비 완료";
  let readinessReason = "이제 엔진이 어떤 pain, 목표, 고객, 톤, 전환 행동을 기준으로 움직여야 하는지 분명합니다.";
  let { diagnosisHeadline, diagnosisBody } = buildDirectDiagnosis({ brief, parsed, snapshot, surface });
  const diagnosisCards = buildDiagnosisCards({ brief, parsed, surface });
  const {
    browserExecutionBody,
    browserExecutionHeadline,
    browserExecutionSteps,
    browserMemoTemplate,
    browserOpenUrl,
    browserReviewCards,
    browserReviewBody,
    browserReviewHeadline,
  } = buildBrowserReviewCards({ brief, parsed, surface });
  const { copyDraftBody, copyDraftHeadline, copyDrafts } = buildCopyDrafts({ brief, parsed });

  if (!brief.hasAnyInput) {
    directionTitle = `${parsed.kindLabel} 진단을 시작합니다`;
    directionPoints = [
      `아직 답을 받지 않았기 때문에, 지금은 ${parsed.kindLabel}에서 어디가 안 먹히는지 진단 축을 먼저 고르는 단계입니다.`,
      "지금 확인한 주요 위치를 기준으로 첫 질문부터 좁혀 가면, 결과를 과장하지 않고 바로 쓸 모듈 추천으로 이어질 수 있습니다.",
      "글로벌 레퍼런스는 아직 답을 가리기 쉬우므로, 초반에는 같은 채널 타입의 정상 작동 패턴을 먼저 비교하는 편이 안전합니다.",
      brief.constraint
        ? `제약 조건 메모: ${brief.constraint}`
        : "제약 조건은 아직 비어 있습니다. 없어도 시작할 수 있지만, 금지 표현이나 필수 약속이 있으면 먼저 적는 편이 좋습니다.",
    ];
    readinessLabel = "질문 시작 전";
    readinessReason = "아직 막히는 지점, 목표, 대상 고객, 톤, 전환 행동을 받지 않았습니다. 지금은 진단 질문을 시작하는 단계입니다.";
  } else if (!brief.isComplete) {
    directionTitle = "진단 질문을 보강하는 중입니다";
    directionPoints = [
      filledLabels.length > 0
        ? `지금까지 고정된 항목: ${filledLabels.join(" / ")}`
        : "아직 고정된 항목이 없습니다.",
      `${brief.missingFields.join(", ")} 항목이 비어 있어, 현재 추천은 최종 결과가 아니라 임시 진단안으로 보는 편이 정확합니다.`,
      `${surfaceAction}를 중심으로 ${brief.pain ? painAction : "현재 pain"}을 더 분명히 고르면 다음 단계의 모듈 추천 정밀도가 올라갑니다.`,
      brief.constraint
        ? `제약 조건: ${brief.constraint}`
        : "제약 조건은 아직 비어 있습니다. 금지 표현이나 필수 약속이 있으면 지금 적어 두는 것이 안전합니다.",
    ];
    readinessLabel = "질문 진행 중";
    readinessReason = `${brief.missingFields.join(", ")} 항목이 아직 비어 있어 결과를 확정하지 않고, 현재는 진단용 임시 방향만 보여 줍니다.`;
  }

  return {
    browserExecutionBody,
    browserExecutionHeadline,
    browserExecutionSteps,
    browserMemoTemplate,
    browserOpenUrl,
    browserReviewCards,
    browserReviewBody,
    browserReviewHeadline,
    benchmarkLayers,
    copyDraftBody,
    copyDraftHeadline,
    copyDrafts,
    diagnosisCards,
    diagnosisBody,
    diagnosisHeadline,
    directionTitle,
    directionPoints,
    nextStepSignals,
    recommendedModules,
    readinessLabel,
    readinessReason,
  };
}
