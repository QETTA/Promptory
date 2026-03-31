export type ChannelKind = "youtube" | "blog" | "coupang" | "smartstore" | "unsupported";

export type ParsedChannelInput =
  | {
      ok: false;
      input: string;
      message: string;
    }
  | {
      ok: true;
      input: string;
      normalizedUrl: string;
      hostname: string;
      kind: ChannelKind;
      kindLabel: string;
      supported: boolean;
      supportLabel: string;
      focusPoints: string[];
      trustPoints: string[];
    };

export type ParsedChannelInputSuccess = Extract<ParsedChannelInput, { ok: true }>;

const explicitBlogHosts = new Set(["blog.naver.com", "brunch.co.kr", "velog.io"]);

export const supportedChannelExamples = [
  { label: "YouTube 채널", url: "https://www.youtube.com/@yourchannel" },
  { label: "네이버 블로그", url: "https://blog.naver.com/yourbrand" },
  { label: "쿠팡 스토어", url: "https://store.coupang.com/vp/vendors/A000123" },
  { label: "스마트스토어", url: "https://smartstore.naver.com/yourbrand" },
] as const;

function normalizeInput(raw: string) {
  const trimmed = raw.trim();

  if (!trimmed) {
    return "";
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function normalizeHostname(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function detectChannelKind(hostname: string): ChannelKind {
  if (hostname === "youtu.be" || hostname.endsWith("youtube.com")) {
    return "youtube";
  }

  if (hostname === "smartstore.naver.com") {
    return "smartstore";
  }

  if (hostname === "store.coupang.com" || hostname.endsWith(".coupang.com") || hostname === "coupang.com") {
    return "coupang";
  }

  if (
    explicitBlogHosts.has(hostname) ||
    hostname.endsWith(".tistory.com") ||
    hostname.endsWith(".wordpress.com")
  ) {
    return "blog";
  }

  return "unsupported";
}

function getKindLabel(kind: ChannelKind) {
  switch (kind) {
    case "youtube":
      return "YouTube 채널";
    case "blog":
      return "블로그 채널";
    case "coupang":
      return "쿠팡 판매 채널";
    case "smartstore":
      return "스마트스토어";
    default:
      return "확인 필요 채널";
  }
}

function getFocusPoints(kind: ChannelKind) {
  switch (kind) {
    case "youtube":
      return [
        "채널이 반복해서 다루는 주제와 영상별 약속이 일관적인지 봅니다.",
        "영상 설명, 고정 댓글, 링크 CTA가 전환 동선에 맞는지 확인합니다.",
        "영상 톤과 상품/제안 톤이 얼마나 자연스럽게 이어지는지 점검합니다.",
      ];
    case "blog":
      return [
        "제목, 도입부, 본문, 말미 CTA가 같은 전환 목표를 향하는지 봅니다.",
        "검색형 키워드와 실제 해결 약속이 서로 어긋나지 않는지 확인합니다.",
        "정보성 글과 판매성 문장이 부딪히지 않도록 톤을 정리합니다.",
      ];
    case "coupang":
      return [
        "상품명 첫 문장과 첫 화면 가치 제안이 바로 이해되는지 확인합니다.",
        "혜택, 신뢰, FAQ, 구매 CTA의 순서가 전환 흐름에 맞는지 봅니다.",
        "상세 화면 톤이 리뷰나 썸네일 톤과 충돌하지 않는지 정리합니다.",
      ];
    case "smartstore":
      return [
        "스토어 첫인상과 대표 판매 카드 카피가 같은 고객층을 향하는지 확인합니다.",
        "상세 화면, 묶음 제안, 신뢰 정보의 순서가 구매 흐름을 끊지 않는지 봅니다.",
        "스토어 운영 말투와 실제 판매 문장이 같은 브랜드처럼 읽히는지 정리합니다.",
      ];
    default:
      return [
        "현재 Promptory가 자동으로 읽는 지원 채널인지 먼저 확인합니다.",
        "지원 범위 밖 채널은 수동 검토나 추후 지원 대상으로 분리합니다.",
        "입력 URL의 구조와 도메인을 기준으로 다음 연결 방법을 정합니다.",
      ];
  }
}

function getTrustPoints(kind: ChannelKind) {
  if (kind === "unsupported") {
    return [
      "지원 채널이 아니면 자동 스냅샷 대신 수동 검토 기준으로 분리합니다.",
      "입력한 URL을 분석했다고 가장하지 않고, 지원 여부부터 먼저 밝힙니다.",
    ];
  }

  return [
    "URL 원문과 정규화된 주소를 함께 보여 입력 실수를 줄입니다.",
    "지원 채널 분류를 먼저 보여 주고, 그 뒤에 채널 문맥 해석을 이어갑니다.",
    "채널 특성과 전환 목표가 맞지 않으면 결과를 과장하지 않고 한계를 함께 안내합니다.",
  ];
}

export function parseChannelInput(raw: string): ParsedChannelInput {
  const normalizedInput = normalizeInput(raw);
  const trimmed = raw.trim();

  if (!normalizedInput) {
    return {
      ok: false,
      input: raw,
      message: "채널 URL을 먼저 입력해 주세요.",
    };
  }

  if (/\s/.test(trimmed)) {
    return {
      ok: false,
      input: raw,
      message: "공백이 들어간 주소는 사용할 수 없습니다. 전체 URL을 다시 확인해 주세요.",
    };
  }

  try {
    const url = new URL(normalizedInput);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        ok: false,
        input: raw,
        message: "http 또는 https 주소만 입력할 수 있습니다.",
      };
    }

    const hostname = normalizeHostname(url.hostname);
    const kind = detectChannelKind(hostname);
    const supported = kind !== "unsupported";

    return {
      ok: true,
      input: raw,
      normalizedUrl: url.toString(),
      hostname,
      kind,
      kindLabel: getKindLabel(kind),
      supported,
      supportLabel: supported ? "지원 채널" : "지원 확인 필요",
      focusPoints: getFocusPoints(kind),
      trustPoints: getTrustPoints(kind),
    };
  } catch {
    return {
      ok: false,
      input: raw,
      message: "URL 형식이 올바르지 않습니다. 전체 주소를 다시 확인해 주세요.",
    };
  }
}
