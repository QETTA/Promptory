import assert from "node:assert/strict";
import test from "node:test";

import { parseChannelInput } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";

test("channel snapshot marks direct youtube handles as ready", () => {
  const parsed = parseChannelInput("youtube.com/@promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);

  assert.equal(snapshot.readyLabel, "다음 단계 진행 가능");
  assert.equal(snapshot.identifier, "@promptory");
  assert.equal(snapshot.confidenceLabel, "높음");
});

test("channel snapshot warns when supported platform lacks direct path", () => {
  const parsed = parseChannelInput("https://www.youtube.com");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);

  assert.equal(snapshot.readyLabel, "주소 보완 필요");
  assert.equal(snapshot.checks.some((check) => check.label === "직접 경로" && check.status === "warn"), true);
});

test("channel snapshot asks for manual review on unsupported hosts", () => {
  const parsed = parseChannelInput("https://example.com/store");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);

  assert.equal(snapshot.readyLabel, "수동 확인 권장");
  assert.equal(snapshot.checks.some((check) => check.label === "지원 채널" && check.status === "fail"), true);
});

test("channel snapshot reads coupang campaign ids from pages urls", () => {
  const parsed = parseChannelInput("https://pages.coupang.com/p/92589");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);

  assert.equal(snapshot.pathLabel, "캠페인 경로");
  assert.equal(snapshot.identifierLabel, "캠페인 ID");
  assert.equal(snapshot.identifier, "92589");
});
