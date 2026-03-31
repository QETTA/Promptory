import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";

export type SnapshotCheckStatus = "pass" | "warn" | "fail";

export type SnapshotCheck = {
  detail: string;
  label: string;
  status: SnapshotCheckStatus;
};

export type ChannelSnapshot = {
  confidenceLabel: string;
  confidenceReason: string;
  checks: SnapshotCheck[];
  hostLabel: string;
  identifier: string | null;
  identifierLabel: string;
  kindLabel: string;
  nextSignals: string[];
  normalizedUrl: string;
  pathLabel: string;
  pathValue: string;
  readyLabel: string;
  readyReason: string;
  summaryPoints: string[];
  supportLabel: string;
  surfaceHint: string;
};

function getPathLabel(parsed: ParsedChannelInputSuccess) {
  if (parsed.kind === "coupang") {
    const url = new URL(parsed.normalizedUrl);

    if (parsed.hostname === "pages.coupang.com") {
      return "캠페인 경로";
    }

    if (url.pathname.startsWith("/np/campaigns/")) {
      return "캠페인 경로";
    }

    if (url.pathname.startsWith("/vp/products/")) {
      return "상품 경로";
    }

    return "스토어 경로";
  }

  switch (parsed.kind) {
    case "youtube":
      return "채널 경로";
    case "blog":
      return "블로그 경로";
    case "smartstore":
      return "스토어 경로";
    default:
      return "입력 경로";
  }
}

function getSurfaceHint(kind: ParsedChannelInputSuccess["kind"]) {
  switch (kind) {
    case "youtube":
      return "영상 설명, 고정 댓글, 채널 소개, 외부 링크 안내 문장";
    case "blog":
      return "제목, 도입부, 본문 구조, 말미 안내 문장";
    case "coupang":
      return "상품명, 첫 화면 혜택, 상세 설명, FAQ, 구매 안내 문장";
    case "smartstore":
      return "스토어 소개, 대표 판매 화면, 묶음 제안, 신뢰 영역";
    default:
      return "지원 채널 확인 후 수동 검토 위치";
  }
}

function getCoupangNextSignals(parsed: ParsedChannelInputSuccess) {
  const url = new URL(parsed.normalizedUrl);

  if (parsed.hostname === "pages.coupang.com" || url.pathname.startsWith("/np/campaigns/")) {
    return [
      "캠페인 제목과 대표 혜택 문장을 실제 표면에서 확인합니다.",
      "혜택 설명 뒤에 반복되는 행동 유도 문장을 읽어 전환 목적을 추정합니다.",
      "톤, 신뢰 근거, 행동 유도 위치를 다음 진단 결과 화면으로 넘길 준비를 합니다.",
    ];
  }

  if (url.pathname.startsWith("/vp/products/")) {
    return [
      "상품명과 판매자명을 실제 표면에서 확인합니다.",
      "혜택 설명, 리뷰 근처 문장, 배송/반품 안내 문장을 읽어 전환 목적을 추정합니다.",
      "톤, 신뢰 근거, 행동 유도 위치를 다음 진단 결과 화면으로 넘길 준비를 합니다.",
    ];
  }

  return [
    "판매자명 또는 스토어명을 실제 표면에서 확인합니다.",
    "대표 혜택과 반복 행동 유도 문장을 읽어 전환 목적을 추정합니다.",
    "톤, 신뢰 근거, 행동 유도 위치를 다음 진단 결과 화면으로 넘길 준비를 합니다.",
  ];
}

function inferIdentifier(parsed: ParsedChannelInputSuccess) {
  const url = new URL(parsed.normalizedUrl);
  const segments = url.pathname.split("/").filter(Boolean);

  if (parsed.kind === "youtube") {
    const first = segments[0] ?? "";
    const second = segments[1] ?? "";

    if (first.startsWith("@")) {
      return { identifier: first, label: "채널 핸들" };
    }

    if (["channel", "c", "user"].includes(first) && second) {
      return { identifier: second, label: "채널 식별자" };
    }

    if (first) {
      return { identifier: first, label: "채널 경로" };
    }
  }

  if (parsed.kind === "blog") {
    if (parsed.hostname === "blog.naver.com") {
      return { identifier: segments[0] ?? null, label: "블로그 아이디" };
    }

    if (parsed.hostname.endsWith(".tistory.com")) {
      return { identifier: parsed.hostname.split(".")[0] ?? null, label: "블로그 서브도메인" };
    }

    if (parsed.hostname === "brunch.co.kr" || parsed.hostname === "velog.io") {
      return { identifier: segments[0] ?? null, label: "작성자 경로" };
    }

    if (parsed.hostname.endsWith(".wordpress.com")) {
      return { identifier: parsed.hostname.split(".")[0] ?? null, label: "블로그 서브도메인" };
    }

    return { identifier: segments[0] ?? parsed.hostname.split(".")[0] ?? null, label: "블로그 식별자" };
  }

  if (parsed.kind === "coupang") {
    const vendorIndex = segments.findIndex((segment) => segment === "vendors");

    if (vendorIndex >= 0 && segments[vendorIndex + 1]) {
      return { identifier: segments[vendorIndex + 1] ?? null, label: "판매자 ID" };
    }

    if (parsed.hostname === "pages.coupang.com" && segments[0] === "p" && segments[1]) {
      return { identifier: segments[1] ?? null, label: "캠페인 ID" };
    }

    const campaignIndex = segments.findIndex((segment) => segment === "campaigns");

    if (campaignIndex >= 0 && segments[campaignIndex + 1]) {
      return { identifier: segments[campaignIndex + 1] ?? null, label: "캠페인 ID" };
    }

    const productIndex = segments.findIndex((segment) => segment === "products");

    if (productIndex >= 0 && segments[productIndex + 1]) {
      return { identifier: segments[productIndex + 1] ?? null, label: "상품 ID" };
    }

    return { identifier: segments[0] ?? null, label: "스토어 식별자" };
  }

  if (parsed.kind === "smartstore") {
    return { identifier: segments[0] ?? null, label: "스토어명" };
  }

  return { identifier: segments[0] ?? null, label: "식별자" };
}

function buildChecks(parsed: ParsedChannelInputSuccess, identifier: string | null, pathValue: string) {
  const url = new URL(parsed.normalizedUrl);
  const isHttps = url.protocol === "https:";
  const hasPath = pathValue !== "/";
  const supported = parsed.supported;
  const canSnapshot = supported && Boolean(identifier) && hasPath;

  const checks: SnapshotCheck[] = [
    {
      label: "보안 주소",
      status: isHttps ? "pass" : "warn",
      detail: isHttps ? "https 주소라서 실제 공개 채널 검토 흐름에 바로 쓰기 좋습니다." : "http 주소는 열 수 있지만 공개 채널 검토 기준으로는 보안 확인이 더 필요합니다.",
    },
    {
      label: "지원 채널",
      status: supported ? "pass" : "fail",
      detail: supported ? `${parsed.kindLabel}로 분류돼 Promptory의 우선 지원 범위 안에 있습니다.` : "지원 채널 범위 밖이라 자동 읽기보다 수동 확인 경로를 먼저 열어야 합니다.",
    },
    {
      label: "직접 경로",
      status: hasPath ? "pass" : "warn",
      detail: hasPath ? "루트 도메인이 아니라 직접 채널/스토어 경로가 들어 있어 식별 정확도가 올라갑니다." : "도메인 루트만 있어 어떤 채널을 읽어야 하는지 추가 입력이 필요합니다.",
    },
    {
      label: "식별자 추출",
      status: identifier ? "pass" : "warn",
      detail: identifier ? `URL 구조에서 ${identifier} 식별자를 추출했습니다.` : "핸들, 블로그 아이디, 스토어명 같은 식별자가 없어 다음 단계에서 사용자가 직접 확인해야 합니다.",
    },
    {
      label: "다음 단계 준비도",
      status: canSnapshot ? "pass" : supported ? "warn" : "fail",
      detail: canSnapshot
        ? "URL 구조만으로도 다음 단계 채널 읽기 화면으로 연결할 준비가 됐습니다."
        : supported
          ? "지원 채널이지만 경로나 식별자가 약해서 다음 단계 전에 주소 보완이 더 필요합니다."
          : "지원 범위를 먼저 넓히거나 수동 검토로 분리해야 합니다.",
    },
  ];

  return {
    canSnapshot,
    checks,
    hasPath,
    isHttps,
    supported,
  };
}

export function buildChannelSnapshot(parsed: ParsedChannelInputSuccess): ChannelSnapshot {
  const url = new URL(parsed.normalizedUrl);
  const pathValue = `${url.pathname}${url.search}` || "/";
  const { identifier, label } = inferIdentifier(parsed);
  const { canSnapshot, checks, hasPath, isHttps, supported } = buildChecks(parsed, identifier, pathValue);

  let confidenceLabel = "낮음";
  let confidenceReason = "지원 여부나 식별자 정보가 약해 수동 확인 비중이 큽니다.";

  if (supported && identifier && hasPath && isHttps) {
    confidenceLabel = "높음";
    confidenceReason = "지원 채널, 직접 경로, 식별자, 보안 주소가 모두 확인돼 다음 채널 읽기 단계로 이어지기 좋습니다.";
  } else if (supported && (identifier || hasPath)) {
    confidenceLabel = "중간";
    confidenceReason = "지원 채널이긴 하지만 경로나 식별자 정보가 일부만 잡혀 다음 단계 전에 보정이 필요합니다.";
  }

  const summaryPoints = [
    `${parsed.kindLabel}로 먼저 분류했습니다.`,
    identifier ? `${label} 기준으로 ${identifier}를 읽을 수 있습니다.` : "URL 구조만으로는 뚜렷한 채널 식별자를 아직 못 잡았습니다.",
    `${getSurfaceHint(parsed.kind)} 순서로 다음 채널 읽기를 이어 가는 것이 자연스럽습니다.`,
  ];

  const nextSignals = canSnapshot
    ? parsed.kind === "coupang"
      ? getCoupangNextSignals(parsed)
      : [
          "채널명 또는 스토어명을 실제 표면에서 확인합니다.",
          "최근 활동 주제와 반복 행동 유도 문장을 읽어 전환 목적을 추정합니다.",
          "톤, 신뢰 근거, 행동 유도 위치를 다음 진단 결과 화면으로 넘길 준비를 합니다.",
        ]
    : [
        "사용자에게 더 직접적인 채널 경로나 대표 페이지를 다시 받습니다.",
        "지원 범위 밖이면 수동 검토 흐름으로 먼저 분기합니다.",
        "식별자 없이 결과를 확정처럼 보여 주지 않습니다.",
      ];

  return {
    confidenceLabel,
    confidenceReason,
    checks,
    hostLabel: parsed.hostname,
    identifier,
    identifierLabel: label,
    kindLabel: parsed.kindLabel,
    nextSignals,
    normalizedUrl: parsed.normalizedUrl,
    pathLabel: getPathLabel(parsed),
    pathValue,
    readyLabel: canSnapshot ? "다음 단계 진행 가능" : supported ? "주소 보완 필요" : "수동 확인 권장",
    readyReason: canSnapshot
      ? "다음 단계에서 실제 채널 읽기 화면으로 이어질 수 있습니다."
      : supported
        ? "지원 채널이지만 직접 경로나 식별자 보정이 필요합니다."
        : "현재는 지원 범위 밖이어서 자동 읽기보다 수동 확인 안내가 먼저입니다.",
    summaryPoints,
    supportLabel: parsed.supportLabel,
    surfaceHint: getSurfaceHint(parsed.kind),
  };
}
