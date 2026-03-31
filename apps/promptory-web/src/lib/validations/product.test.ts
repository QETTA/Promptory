import test from "node:test";
import assert from "node:assert/strict";

import { parseKeywords, parsePreviewPoints, productFormSchema } from "@/lib/validations/product";

test("product form schema parses a valid payload", () => {
  const parsed = productFormSchema.safeParse({
    category: "자동화",
    description: "이 상품은 반복 업무를 빠르게 자동화하는 실행 세트입니다.",
    keywordsText: "AI, 자동화, 블로그",
    previewPointsText: "노션 보드\n자동화 프롬프트",
    priceKrw: 29000,
    productType: "automation_system",
    setupMinutes: 15,
    status: "draft",
    title: "업무 자동화 킷",
  });

  assert.equal(parsed.success, true);
});

test("parsePreviewPoints trims and limits lines", () => {
  const points = parsePreviewPoints("하나\n둘\n셋\n넷\n다섯\n여섯\n일곱");
  assert.deepEqual(points, ["하나", "둘", "셋", "넷", "다섯", "여섯"]);
});

test("parseKeywords trims, deduplicates, and limits values", () => {
  const keywords = parseKeywords("AI, 자동화, 블로그, AI\n마케팅\n운영\n콘텐츠\n세일즈\nCRM");
  assert.deepEqual(keywords, ["AI", "자동화", "블로그", "마케팅", "운영", "콘텐츠", "세일즈", "CRM"]);
});
