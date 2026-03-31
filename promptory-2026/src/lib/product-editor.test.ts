import test from "node:test";
import assert from "node:assert/strict";

import { getProductEditorChecklist, getSellerReadinessLabel, getSellerReadinessSummary } from "@/lib/product-editor";

test("product editor checklist blocks publish readiness without a product file", () => {
  const checklist = getProductEditorChecklist({
    description:
      "초보자도 바로 따라 할 수 있도록 결과와 사용 흐름을 한 번에 보여 주는 자동화 상품입니다.",
    hasProductFile: false,
    hasThumbnail: true,
    previewPointsText: "결과 예시 제공\n시작 가이드 제공\n기본 템플릿 포함",
    status: "draft",
    title: "고객 상담 자동화 시스템",
  });

  assert.equal(checklist.publishReady, false);
  assert.equal(checklist.readinessLabel, "실행 팩 파일 필요");
  assert.equal(checklist.summary, "공개 전환 전 실제 실행 팩 파일이 필요합니다.");
});

test("product editor checklist marks ready listings as publishable", () => {
  const checklist = getProductEditorChecklist({
    description:
      "콘텐츠 제작자가 바로 적용할 수 있게 결과 예시와 사용 흐름, 포함 자료를 함께 정리한 상품입니다.",
    hasProductFile: true,
    hasThumbnail: true,
    previewPointsText: "결과 예시 제공\n시작 가이드 제공\n기본 템플릿 포함",
    status: "published",
    title: "마케팅 콘텐츠 자동화 시스템",
  });

  assert.equal(checklist.publishReady, true);
  assert.equal(checklist.recommendedReady, true);
  assert.equal(checklist.readinessLabel, "공개 가능");
  assert.equal(checklist.summary, "공개 조건과 권장 항목이 모두 준비되었습니다. 지금 공개해도 무리가 없는 상태입니다.");
});

test("product editor checklist recommends a thumbnail when only the file is ready", () => {
  const checklist = getProductEditorChecklist({
    description: "짧은 설명",
    hasProductFile: true,
    hasThumbnail: false,
    previewPointsText: "한 줄",
    status: "draft",
    title: "짧은 제목",
  });

  assert.equal(checklist.publishReady, true);
  assert.equal(checklist.recommendedReady, false);
  assert.equal(checklist.readinessLabel, "공개 가능 · 썸네일 추천");
  assert.equal(checklist.summary, "지금 공개는 가능하지만 썸네일까지 넣으면 목록과 상세에서 더 빠르게 이해됩니다.");
});

test("product editor checklist keeps the publish label even when quality copy still needs work", () => {
  const checklist = getProductEditorChecklist({
    description: "짧은 설명",
    hasProductFile: true,
    hasThumbnail: true,
    previewPointsText: "한 줄",
    status: "draft",
    title: "짧은 제목",
  });

  assert.equal(checklist.publishReady, true);
  assert.equal(checklist.recommendedReady, false);
  assert.equal(checklist.readinessLabel, "공개 가능");
  assert.equal(checklist.summary, "지금 공개는 가능하지만 제목, 설명, 미리보기 문구를 더 또렷하게 다듬으면 전환에 유리합니다.");
});

test("seller readiness helpers use the same labels and summaries as the editor", () => {
  assert.equal(getSellerReadinessLabel({ hasProductFile: false, hasThumbnail: false }), "실행 팩 파일 필요");
  assert.equal(getSellerReadinessSummary({ hasProductFile: false, hasThumbnail: false }), "공개 전환 전 실제 실행 팩 파일이 필요합니다.");

  assert.equal(getSellerReadinessLabel({ hasProductFile: true, hasThumbnail: false }), "공개 가능 · 썸네일 추천");
  assert.equal(
    getSellerReadinessSummary({ hasProductFile: true, hasThumbnail: false }),
    "지금 공개는 가능하지만 썸네일까지 넣으면 목록과 상세에서 더 빠르게 이해됩니다.",
  );

  assert.equal(getSellerReadinessLabel({ hasProductFile: true, hasThumbnail: true }), "공개 가능");
  assert.equal(
    getSellerReadinessSummary({ hasProductFile: true, hasThumbnail: true }),
    "공개 조건은 충족했습니다. 이제 설명과 미리보기 문구를 다듬으며 전환을 높이면 됩니다.",
  );
});
