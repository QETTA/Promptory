import assert from "node:assert/strict";
import test from "node:test";

import {
  getDifficultyLabel,
  getOrderStatusLabel,
  getProductTypeLabel,
  getSellerDisplayName,
} from "@/lib/promptory-display";
import {
  getIncludedItems,
  getPrimaryPreviewPoint,
  getPreviewBlock,
} from "@/lib/promptory-product-copy";

test("promptory display helpers map known labels", () => {
  assert.equal(getProductTypeLabel("automation_system"), "실행 시스템");
  assert.equal(getOrderStatusLabel("pending_payment"), "결제 준비 중");
  assert.equal(getDifficultyLabel(12), "쉬움");
  assert.equal(getSellerDisplayName(null), "판매자 정보 준비 중");
});

test("promptory product copy falls back safely", () => {
  assert.equal(
    getPrimaryPreviewPoint([]),
    "바로 적용할 수 있는 구성과 사용 가이드를 포함합니다.",
  );
  assert.deepEqual(getPreviewBlock([]), [
    "초보자용 시작 가이드",
    "바로 복사해 써볼 수 있는 기본 템플릿",
    "실제 결과물을 만드는 순서 설명",
  ]);
  assert.deepEqual(getIncludedItems(15, "prompt_pack"), [
    "15분 안에 시작할 수 있는 실행 가이드",
    "프롬프트 팩 형태로 정리된 핵심 자료",
    "구매 전에 확인할 수 있는 미리보기 정보",
  ]);
});
