import assert from "node:assert/strict";
import test from "node:test";

import { DownloadAccessError, isUniqueConstraintError } from "@/lib/server/downloads";

test("isUniqueConstraintError detects postgres unique violations", () => {
  assert.equal(isUniqueConstraintError({ code: "23505" }), true);
  assert.equal(isUniqueConstraintError({ code: "PGRST116" }), false);
  assert.equal(isUniqueConstraintError(undefined), false);
});

test("DownloadAccessError carries an http status", () => {
  const error = new DownloadAccessError("구매 완료된 상품만 다운로드할 수 있습니다.", 403);

  assert.equal(error.status, 403);
  assert.equal(error.message, "구매 완료된 상품만 다운로드할 수 있습니다.");
});
