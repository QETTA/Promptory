import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";

type ReadStatus = "live" | "partial" | "unavailable";

export type ChannelSurfaceRead = {
  actionSignals: string[];
  browserFollowupNeeded: boolean;
  browserFollowupPoints: string[];
  browserFollowupReason: string | null;
  description: string | null;
  headline: string | null;
  notes: string[];
  sourceUrl: string;
  status: ReadStatus;
  statusLabel: string;
  statusReason: string;
};

export function canAutoReadChannelSurface(parsed: ParsedChannelInputSuccess) {
  if (!parsed.supported) {
    return false;
  }

  switch (parsed.kind) {
    case "youtube":
      return parsed.hostname === "youtu.be" || parsed.hostname.endsWith("youtube.com");
    case "smartstore":
      return parsed.hostname === "smartstore.naver.com";
    case "coupang":
      return (
        parsed.hostname === "store.coupang.com" ||
        parsed.hostname === "coupang.com" ||
        parsed.hostname.endsWith(".coupang.com")
      );
    case "blog":
      return (
        parsed.hostname === "blog.naver.com" ||
        parsed.hostname === "brunch.co.kr" ||
        parsed.hostname === "velog.io" ||
        parsed.hostname.endsWith(".tistory.com") ||
        parsed.hostname.endsWith(".wordpress.com")
      );
    default:
      return false;
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string) {
  return decodeHtml(value.replace(/<[^>]+>/g, " "));
}

function extractMetaContent(html: string, name: string) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["'][^>]*>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return decodeHtml(match[1]);
    }
  }

  return null;
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? stripTags(match[1]) : null;
}

function extractMatches(html: string, pattern: RegExp, limit: number) {
  const results: string[] = [];

  for (const match of html.matchAll(pattern)) {
    const value = stripTags(match[1] ?? "");

    if (!value || results.includes(value)) {
      continue;
    }

    results.push(value);

    if (results.length >= limit) {
      break;
    }
  }

  return results;
}

function pickActionSignals(html: string, kind: ParsedChannelInputSuccess["kind"]) {
  const anchorTexts = extractMatches(html, /<a\b[^>]*>([\s\S]*?)<\/a>/gi, 20);
  const buttonTexts = extractMatches(html, /<button\b[^>]*>([\s\S]*?)<\/button>/gi, 10);
  const actionKeywords =
    kind === "youtube"
      ? /(subscribe|join|watch|channel|구독|보기|더보기|링크)/i
      : /(buy|shop|cart|contact|subscribe|문의|구매|신청|상담|팔로우|구독|링크)/i;

  return [...anchorTexts, ...buttonTexts].filter((text) => actionKeywords.test(text)).slice(0, 3);
}

function getBrowserFollowupPoints(kind: ParsedChannelInputSuccess["kind"]) {
  switch (kind) {
    case "youtube":
      return [
        "설명 더보기 뒤에 숨은 첫 제안 문장",
        "고정 댓글과 외부 링크 안내 문장",
        "채널 홈 첫 화면에서 반복되는 약속",
      ];
    case "blog":
      return [
        "도입부 첫 3문장",
        "본문 중간 비교 근거 블록",
        "말미 문의 또는 이동 문장",
      ];
    case "coupang":
      return [
        "첫 화면 대표 혜택 문장",
        "상세 하단 신뢰 근거와 FAQ",
        "구매 직전 안내 문장",
      ];
    case "smartstore":
      return [
        "스토어 첫 인상 문장",
        "대표 상품 첫 화면 혜택",
        "후기와 신뢰 영역 주변 문장",
      ];
    default:
      return ["대표 진입 화면의 첫 문장", "실제 행동 유도 문장", "신뢰 근거가 붙는 위치"];
  }
}

function getBrowserFollowup(parsed: ParsedChannelInputSuccess, details: { actionSignals: string[]; description: string | null; status: ReadStatus }) {
  if (parsed.kind === "youtube") {
    return {
      browserFollowupNeeded: true,
      browserFollowupPoints: getBrowserFollowupPoints(parsed.kind),
      browserFollowupReason:
        details.status === "unavailable"
          ? "YouTube는 실제 첫 화면, 설명 펼침, 고정 댓글이 나뉘어 보여서 브라우저에서 한 번 더 확인해야 정확합니다."
          : "YouTube는 설명 펼침, 고정 댓글, 채널 홈 레이어가 나뉘어 보여 지금 읽은 정보만으로 확정하기보다 브라우저에서 한 번 더 보는 편이 정확합니다.",
    };
  }

  if (details.status === "partial") {
    return {
      browserFollowupNeeded: true,
      browserFollowupPoints: getBrowserFollowupPoints(parsed.kind),
      browserFollowupReason: "지금 바로 보이는 정보가 얕아, 실제 첫 화면과 펼친 뒤 문장을 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
    };
  }

  if (details.status === "live" && (!details.description || details.actionSignals.length === 0)) {
    return {
      browserFollowupNeeded: true,
      browserFollowupPoints: getBrowserFollowupPoints(parsed.kind),
      browserFollowupReason: "무엇을 다루는지는 읽혔지만, 실제 행동을 만드는 문장은 충분히 보이지 않아 브라우저에서 한 번 더 보는 편이 좋습니다.",
    };
  }

  return {
    browserFollowupNeeded: false,
    browserFollowupPoints: [],
    browserFollowupReason: null,
  };
}

function getCoupangSurfaceLabel(parsed: ParsedChannelInputSuccess) {
  const url = new URL(parsed.normalizedUrl);

  if (parsed.hostname === "pages.coupang.com" || url.pathname.startsWith("/np/campaigns/")) {
    return "쿠팡 공개 캠페인 화면";
  }

  if (url.pathname.startsWith("/vp/products/")) {
    return "쿠팡 공개 판매 화면";
  }

  if (url.pathname.includes("/vendors")) {
    return "쿠팡 판매자 화면";
  }

  return "쿠팡 공개 화면";
}

function getUnavailableReadNotes(parsed: ParsedChannelInputSuccess, reason: "response" | "error") {
  if (parsed.kind === "coupang") {
    const targetLabel = getCoupangSurfaceLabel(parsed);

    return [
      reason === "response"
        ? `${targetLabel}이 자동 읽기를 잠시 제한해, 지금은 주소와 질문 답변 기준으로 먼저 진단합니다.`
        : `${targetLabel}을 지금 바로 읽지 못해, 주소와 질문 답변 기준으로 먼저 진단합니다.`,
      "대표 혜택, 후기 근처, 구매 직전 문장은 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
    ];
  }

  if (parsed.kind === "smartstore") {
    return [
      reason === "response"
        ? "스토어 쪽에서 자동 읽기를 잠시 제한해, 지금은 주소와 질문 답변 기준으로 먼저 진단합니다."
        : "스토어 공개 화면을 지금 바로 읽지 못해, 주소와 질문 답변 기준으로 먼저 진단합니다.",
      "대표 혜택, 후기 근처, 구매 직전 문장은 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
    ];
  }

  if (parsed.kind === "youtube") {
    return [
      reason === "response"
        ? "채널 쪽에서 자동 읽기를 잠시 제한해, 지금은 주소와 질문 답변 기준으로 먼저 진단합니다."
        : "공개 채널 화면을 지금 바로 읽지 못해, 주소와 질문 답변 기준으로 먼저 진단합니다.",
      "설명 펼침, 고정 댓글, 채널 첫 화면은 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
    ];
  }

  return [
    reason === "response"
      ? "공개 페이지가 자동 읽기를 잠시 허용하지 않아, 지금은 주소와 질문 답변 기준으로 먼저 진단합니다."
      : "공개 페이지를 지금 바로 읽지 못해, 주소와 질문 답변 기준으로 먼저 진단합니다.",
    "첫 화면 뒤에 숨어 있는 문장은 브라우저에서 한 번 더 확인하는 편이 안전합니다.",
  ];
}

export function parseChannelSurfaceHtml(
  parsed: ParsedChannelInputSuccess,
  html: string,
  sourceUrl: string,
): ChannelSurfaceRead {
  const headline = extractMetaContent(html, "og:title") ?? extractTitle(html);
  const description = extractMetaContent(html, "description") ?? extractMetaContent(html, "og:description");
  const headings = extractMatches(html, /<h[1-2]\b[^>]*>([\s\S]*?)<\/h[1-2]>/gi, 3);
  const actionSignals = pickActionSignals(html, parsed.kind);
  const notes: string[] = [];

  if (headline) {
    notes.push(`공개 페이지 제목 후보로 "${headline}"를 읽었습니다.`);
  }

  if (description) {
    notes.push("공개 설명 문구를 읽어 채널의 현재 포지션을 요약할 수 있습니다.");
  }

  if (headings.length > 0) {
    notes.push(`상단 제목 구조 ${headings.length}개를 확인했습니다.`);
  }

  if (actionSignals.length > 0) {
    notes.push("공개 페이지 안에서 행동 유도에 가까운 문구를 일부 찾았습니다.");
  }

  if (!headline && !description && headings.length === 0) {
    const followup = getBrowserFollowup(parsed, {
      actionSignals: [],
      description: null,
      status: "partial",
    });

    return {
      actionSignals: [],
      ...followup,
      description: null,
      headline: null,
      notes: [
        "지금 바로 보이는 정보만으로는 의미 있는 제목이나 설명을 찾지 못했습니다.",
        "첫 화면 뒤에 펼쳐지는 영역이 많아, 브라우저에서 한 번 더 보는 편이 더 정확할 수 있습니다.",
      ],
      sourceUrl,
      status: "partial",
      statusLabel: "일부만 읽힘",
      statusReason: "지금 바로 보이는 제목이나 설명이 적어, 현재는 일부 신호만 읽을 수 있습니다.",
    };
  }

  const status = description || actionSignals.length > 0 ? "live" : "partial";
  const followup = getBrowserFollowup(parsed, {
    actionSignals,
    description,
    status,
  });

  return {
    actionSignals,
    ...followup,
    description,
    headline,
    notes,
    sourceUrl,
    status,
    statusLabel: status === "live" ? "공개 페이지 읽기 완료" : "일부만 읽힘",
    statusReason:
      status === "live"
        ? "공개 페이지에서 제목, 설명, 일부 행동 유도 문구를 읽어 지금 단계 진단에 쓸 수 있습니다."
        : "공개 제목은 읽었지만 설명이나 행동 유도 문구는 제한적으로만 잡혔습니다.",
  };
}

export async function readChannelSurface(parsed: ParsedChannelInputSuccess): Promise<ChannelSurfaceRead> {
  if (!canAutoReadChannelSurface(parsed)) {
    return {
      actionSignals: [],
      browserFollowupNeeded: true,
      browserFollowupPoints: getBrowserFollowupPoints(parsed.kind),
      browserFollowupReason: "지원 범위를 먼저 확인해야 하는 채널이라, 서버에서 직접 읽지 않고 수동 검토 포인트만 먼저 정리합니다.",
      description: null,
      headline: null,
      notes: [
        "현재 Promptory의 자동 읽기 지원 범위를 먼저 확인해야 하는 채널입니다.",
        "지원 채널이 확인되기 전에는 서버에서 직접 읽지 않고, 브라우저에서 수동 검토할 포인트만 먼저 정리합니다.",
      ],
      sourceUrl: parsed.normalizedUrl,
      status: "unavailable",
      statusLabel: "자동 읽기 보류",
      statusReason: "지원 범위를 먼저 확인해야 해 서버 자동 읽기를 실행하지 않았습니다.",
    };
  }

  if (!parsed.normalizedUrl.startsWith("https://")) {
    return {
      actionSignals: [],
      browserFollowupNeeded: false,
      browserFollowupPoints: [],
      browserFollowupReason: null,
      description: null,
      headline: null,
      notes: ["보안 주소가 아니어서 자동 읽기보다 주소 보완이 먼저입니다."],
      sourceUrl: parsed.normalizedUrl,
      status: "unavailable",
      statusLabel: "자동 읽기 보류",
      statusReason: "보안 주소가 아니라서 지금은 자동 읽기보다 주소 보완을 먼저 권장합니다.",
    };
  }

  try {
    const response = await fetch(parsed.normalizedUrl, {
      cache: "no-store",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Promptory/1.0",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      const followup = getBrowserFollowup(parsed, {
        actionSignals: [],
        description: null,
        status: "unavailable",
      });

      return {
        actionSignals: [],
        ...followup,
        description: null,
        headline: null,
        notes: getUnavailableReadNotes(parsed, "response"),
        sourceUrl: parsed.normalizedUrl,
        status: "unavailable",
        statusLabel: "자동 읽기 실패",
        statusReason: "공개 페이지 응답이 안정적이지 않아, 지금은 주소 정보와 질문 답변만으로 진단을 이어갑니다.",
      };
    }

    const html = await response.text();
    return parseChannelSurfaceHtml(parsed, html, parsed.normalizedUrl);
  } catch (error) {
    const followup = getBrowserFollowup(parsed, {
      actionSignals: [],
      description: null,
      status: "unavailable",
    });

      return {
        actionSignals: [],
        ...followup,
        description: null,
        headline: null,
        notes: getUnavailableReadNotes(parsed, "error"),
        sourceUrl: parsed.normalizedUrl,
        status: "unavailable",
        statusLabel: "자동 읽기 실패",
      statusReason: "공개 페이지에서 바로 읽을 수 있는 신호를 아직 가져오지 못했습니다. 브라우저에서 한 번 더 확인해야 할 수 있습니다.",
    };
  }
}
