import type { ProductStatus } from "@/lib/supabase/types";
import { parsePreviewPoints } from "@/lib/validations/product";

export interface ProductEditorChecklistItem {
  id: "title" | "description" | "preview" | "file" | "thumbnail";
  done: boolean;
  label: string;
  tone: "required" | "recommended";
}

export interface ProductEditorChecklistInput {
  description: string;
  hasProductFile: boolean;
  hasThumbnail: boolean;
  previewPointsText: string;
  status: ProductStatus;
  title: string;
}

export const sellerReadinessRuleText =
  "필수는 실제 실행 팩 파일이고, 썸네일과 문구는 구매 판단과 전환을 높이는 권장 항목입니다.";

export function canPublishProduct(input: Pick<ProductEditorChecklistInput, "hasProductFile">) {
  return input.hasProductFile;
}

export function getSellerReadinessLabel(input: Pick<ProductEditorChecklistInput, "hasProductFile" | "hasThumbnail">) {
  if (!canPublishProduct(input)) {
    return "실행 팩 파일 필요";
  }

  if (input.hasThumbnail) {
    return "공개 가능";
  }

  return "공개 가능 · 썸네일 추천";
}

export function getSellerReadinessSummary(input: Pick<ProductEditorChecklistInput, "hasProductFile" | "hasThumbnail">) {
  if (!canPublishProduct(input)) {
    return "공개 전환 전 실제 실행 팩 파일이 필요합니다.";
  }

  if (!input.hasThumbnail) {
    return "지금 공개는 가능하지만 썸네일까지 넣으면 목록과 상세에서 더 빠르게 이해됩니다.";
  }

  return "공개 조건은 충족했습니다. 이제 설명과 미리보기 문구를 다듬으며 전환을 높이면 됩니다.";
}

export function getProductEditorChecklist(input: ProductEditorChecklistInput) {
  const titleReady = input.title.trim().length >= 8;
  const descriptionReady = input.description.trim().length >= 40;
  const previewCount = parsePreviewPoints(input.previewPointsText).length;
  const previewReady = previewCount >= 3;
  const fileReady = input.hasProductFile;
  const thumbnailReady = input.hasThumbnail;
  const publishReady = canPublishProduct(input);
  const qualityReady = titleReady && descriptionReady && previewReady;
  const readinessLabel = getSellerReadinessLabel(input);

  const items: ProductEditorChecklistItem[] = [
    {
      id: "title",
      done: titleReady,
      label: "제목만 보고도 어떤 결과를 주는 실행 팩인지 바로 이해할 수 있어야 합니다.",
      tone: "recommended",
    },
    {
      id: "description",
      done: descriptionReady,
      label: "설명에는 무엇을 얻는지와 누가 바로 쓸 수 있는지가 함께 보여야 합니다.",
      tone: "recommended",
    },
    {
      id: "preview",
      done: previewReady,
      label: "구매 전에 확인할 핵심 포인트를 3개 이상 적어 두는 편이 좋습니다.",
      tone: "recommended",
    },
    {
      id: "file",
      done: fileReady,
      label: "공개 상태로 전환하려면 실제 실행 팩 파일이 준비되어 있어야 합니다.",
      tone: "required",
    },
    {
      id: "thumbnail",
      done: thumbnailReady,
      label: "썸네일이 있으면 목록과 상세에서 실행 팩을 더 빠르게 이해할 수 있습니다.",
      tone: "recommended",
    },
  ];

  const recommendedReady = items.every((item) => item.done);

  let summary = getSellerReadinessSummary(input);

  if (!fileReady) {
    summary = "공개 전환 전 실제 실행 팩 파일이 필요합니다.";
  } else if (recommendedReady) {
    summary = "공개 조건과 권장 항목이 모두 준비되었습니다. 지금 공개해도 무리가 없는 상태입니다.";
  } else if (thumbnailReady && !qualityReady) {
    summary = "지금 공개는 가능하지만 제목, 설명, 미리보기 문구를 더 또렷하게 다듬으면 전환에 유리합니다.";
  }

  return {
    items,
    previewCount,
    publishReady,
    readinessLabel,
    recommendedReady,
    ruleText: sellerReadinessRuleText,
    summary,
    summaryTone: recommendedReady ? "ready" : publishReady ? "almost" : "needs-work",
    title: input.status === "published" ? "현재 공개 상태 점검" : "공개 준비 상태",
  } as const;
}
