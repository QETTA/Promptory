import test from "node:test";
import assert from "node:assert/strict";

import { slugify } from "@/lib/slug";

test("slugify keeps Korean letters and normalizes whitespace", () => {
  assert.equal(slugify("  자동화 시스템 101  "), "자동화-시스템-101");
});
