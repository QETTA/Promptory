import assert from "node:assert/strict";
import test from "node:test";

import { isPublicDemoishProduct } from "@/lib/server/products";

test("public product filter hides smoke-like public records", () => {
  assert.equal(
    isPublicDemoishProduct({
      description: "Authenticated smoke review published product.",
      title: "Smoke Published 1774845474810",
      seller: { display_name: "Promptory Smoke" },
    }),
    true,
  );
});

test("public product filter keeps normal public records visible", () => {
  assert.equal(
    isPublicDemoishProduct({
      description: "채널 전환 흐름을 바로 적용하는 운영 가이드",
      title: "전환 메시지 운영 모듈",
      seller: { display_name: "Promptory Labs" },
    }),
    false,
  );
});
