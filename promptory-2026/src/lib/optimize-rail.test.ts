import assert from "node:assert/strict";
import test from "node:test";

import { buildModuleProductHref, buildOptimizeProductMatchNote, getOptimizeRailPlan } from "@/lib/optimize-rail";
import { parseOptimizationBrief } from "@/lib/optimization-brief";

test("optimize rail maps content sales flows to marketing modules", () => {
  const brief = parseOptimizationBrief({
    pain: "weak_cta",
    goal: "sales",
    audience: "cold",
    tone: "trustworthy",
    conversion: "purchase",
  });

  const plan = getOptimizeRailPlan({
    brief,
    kind: "youtube",
    kindLabel: "YouTube 채널",
    moduleTitles: ["행동 유도 흐름", "전환 흐름"],
    signedIn: false,
  });

  assert.equal(plan.category, "marketing");
  assert.match(plan.primaryHref, /category=marketing/);
  assert.match(plan.secondaryHref, /\/login\?next=%2Forders/);
});

test("optimize rail maps inquiry sales flows to operations modules", () => {
  const brief = parseOptimizationBrief({
    pain: "weak_cta",
    goal: "lead",
    audience: "cold",
    tone: "trustworthy",
    conversion: "inquiry",
  });

  const plan = getOptimizeRailPlan({
    brief,
    kind: "coupang",
    kindLabel: "쿠팡 페이지",
    moduleTitles: ["문의 시작 흐름", "응답 신뢰 묶음"],
    signedIn: true,
  });

  assert.equal(plan.category, "operations");
  assert.equal(plan.secondaryHref, "/orders");
  assert.match(plan.title, /전달 레일/);
});

test("module product href keeps category and strips generic module suffix", () => {
  const href = buildModuleProductHref({
    category: "marketing",
    moduleTitle: "행동 유도 흐름",
  });

  assert.match(href, /category=marketing/);
  assert.match(href, /q=%ED%96%89%EB%8F%99\+%EC%9C%A0%EB%8F%84/);
  assert.doesNotMatch(href, /%EB%AA%A8%EB%93%88/);
});

test("product match note highlights module focus when product text overlaps", () => {
  const note = buildOptimizeProductMatchNote({
    categoryLabel: "마케팅",
    focusTitle: "행동 유도 흐름",
    product: {
      category: "marketing",
      created_at: "2026-01-01T00:00:00.000Z",
      description: "행동 유도 문장과 CTA 흐름을 정리하는 패키지",
      file_path: null,
      id: "p1",
      keywords: ["CTA", "전환"],
      preview_points: ["CTA 흐름을 바로 테스트합니다."],
      price_krw: 19000,
      product_type: "automation_system",
      seller: null,
      seller_id: "seller-1",
      setup_minutes: 15,
      slug: "cta-pack",
      status: "published",
      thumbnail_url: null,
      title: "CTA Pack",
      updated_at: "2026-01-01T00:00:00.000Z",
    },
  });

  assert.match(note, /행동 유도 흐름/);
  assert.match(note, /CTA 흐름을 바로 테스트합니다/);
});
