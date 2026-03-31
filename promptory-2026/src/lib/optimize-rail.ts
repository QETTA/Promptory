import { buildLoginHref } from "@/lib/auth-redirect";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { OptimizationBrief } from "@/lib/optimization-brief";
import { getCategoryLabel } from "@/lib/promptory-display";
import type { ProductWithSeller } from "@/lib/server/products";

export type OptimizeRailPlan = {
  body: string;
  category: string;
  categoryLabel: string;
  emptyBody: string;
  focusBadges: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  title: string;
};

function normalizeModuleQuery(moduleTitle: string) {
  return moduleTitle.replace(/\s*(모듈|묶음|흐름|정리)\s*/g, " ").trim();
}

function getMeaningfulWords(value: string) {
  return value
    .split(/\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
}

export function buildModuleProductHref({
  category,
  moduleTitle,
}: {
  category: string;
  moduleTitle: string;
}) {
  const search = new URLSearchParams();
  search.set("category", category);
  search.set("sort", "interest");
  const normalizedTitle = normalizeModuleQuery(moduleTitle);

  if (normalizedTitle) {
    search.set("q", normalizedTitle);
  }

  return `/products?${search.toString()}`;
}

export function buildOptimizeProductMatchNote({
  categoryLabel,
  focusTitle,
  product,
}: {
  categoryLabel: string;
  focusTitle?: string;
  product: ProductWithSeller;
}) {
  const haystack = [
    product.title,
    product.description,
    ...(product.keywords ?? []),
    ...(product.preview_points ?? []),
  ]
    .join(" ")
    .toLowerCase();
  const focusWords = focusTitle ? getMeaningfulWords(normalizeModuleQuery(focusTitle).toLowerCase()) : [];
  const matchedWord = focusWords.find((word) => haystack.includes(word));
  const previewPoint = product.preview_points?.[0]?.trim();

  if (matchedWord && focusTitle) {
    return `${focusTitle} 축과 맞닿아 있고, ${previewPoint ?? "지금 진단한 방향을 바로 실험하기 좋은 구성입니다."}`;
  }

  if (previewPoint) {
    return `${categoryLabel} 레일에서 바로 검토할 수 있고, ${previewPoint}`;
  }

  return `${categoryLabel} 카테고리라 현재 진단 결과와 가장 가까운 전달 레일로 바로 넘기기 좋습니다.`;
}

function resolveRailCategory({
  brief,
  kind,
}: {
  brief: OptimizationBrief;
  kind: ParsedChannelInputSuccess["kind"];
}) {
  const inquiryFlow = brief.goal === "lead" || brief.conversion === "inquiry";
  const purchaseFlow = brief.goal === "sales" || brief.conversion === "purchase";

  switch (kind) {
    case "youtube":
    case "blog":
      if (brief.pain === "manual_overload") {
        return "automation";
      }

      if (purchaseFlow) {
        return "marketing";
      }

      return brief.goal === "repeat_visit" || brief.conversion === "subscribe" ? "content" : "marketing";
    case "coupang":
    case "smartstore":
      if (brief.pain === "manual_overload") {
        return "automation";
      }

      return inquiryFlow ? "operations" : "sales";
    default:
      return inquiryFlow ? "operations" : "marketing";
  }
}

export function getOptimizeRailPlan({
  brief,
  kind,
  kindLabel,
  moduleTitles,
  signedIn,
}: {
  brief: OptimizationBrief;
  kind: ParsedChannelInputSuccess["kind"];
  kindLabel: string;
  moduleTitles: string[];
  signedIn: boolean;
}): OptimizeRailPlan {
  const category = resolveRailCategory({ brief, kind });
  const categoryLabel = getCategoryLabel(category);
  const inquiryFlow = brief.goal === "lead" || brief.conversion === "inquiry";
  const primaryHref = `/products?category=${encodeURIComponent(category)}&sort=interest`;
  const secondaryTarget = "/orders";

  return {
    body: inquiryFlow
      ? `${kindLabel} 진단 결과를 바로 문의형 실행 묶음과 운영 레일로 넘깁니다. 먼저 관련 ${categoryLabel} 실행 팩을 보고, 실제 전달 흐름은 주문 레일에서 이어서 검증할 수 있습니다.`
      : `${kindLabel} 진단 결과를 바로 실행형 ${categoryLabel} 팩으로 넘깁니다. 먼저 관련 실행 팩을 보고, 실제 전달 흐름은 주문 레일에서 이어서 검증할 수 있습니다.`,
    category,
    categoryLabel,
    emptyBody: `아직 ${categoryLabel} 카테고리에 공개된 실행 팩이 충분하지 않습니다. 그래도 전체 실행 팩 레일에서 같은 방향의 결과를 바로 찾을 수 있게 연결했습니다.`,
    focusBadges: moduleTitles.slice(0, 3),
    primaryHref,
    primaryLabel: `${categoryLabel} 실행 팩 보기`,
    secondaryHref: signedIn ? secondaryTarget : buildLoginHref(secondaryTarget),
    secondaryLabel: signedIn ? "주문 레일 보기" : "로그인하고 주문 레일 열기",
    title: inquiryFlow ? "문의형 결과를 실제 전달 레일로 넘깁니다" : "진단 결과를 실제 실행 팩 레일로 넘깁니다",
  };
}
