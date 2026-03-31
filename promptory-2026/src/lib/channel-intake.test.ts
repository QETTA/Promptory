import assert from "node:assert/strict";
import test from "node:test";

import { parseChannelInput } from "@/lib/channel-intake";

test("channel intake normalizes missing protocol and detects youtube", () => {
  const parsed = parseChannelInput("youtube.com/@promptory");

  assert.equal(parsed.ok, true);

  if (parsed.ok) {
    assert.equal(parsed.kind, "youtube");
    assert.equal(parsed.supported, true);
    assert.equal(parsed.normalizedUrl, "https://youtube.com/@promptory");
  }
});

test("channel intake detects blog channels", () => {
  const parsed = parseChannelInput("https://brand-story.tistory.com");

  assert.equal(parsed.ok, true);

  if (parsed.ok) {
    assert.equal(parsed.kind, "blog");
    assert.equal(parsed.supportLabel, "지원 채널");
  }
});

test("channel intake marks unsupported but valid hosts clearly", () => {
  const parsed = parseChannelInput("https://example.com/shop");

  assert.equal(parsed.ok, true);

  if (parsed.ok) {
    assert.equal(parsed.kind, "unsupported");
    assert.equal(parsed.supported, false);
  }
});

test("channel intake rejects malformed urls", () => {
  const parsed = parseChannelInput("ht!tp://bad url");

  assert.equal(parsed.ok, false);

  if (!parsed.ok) {
    assert.match(parsed.message, /URL 형식|공백이 들어간 주소/);
  }
});
