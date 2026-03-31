import assert from "node:assert/strict";
import test from "node:test";

import { parseChannelInput } from "@/lib/channel-intake";
import { parseChannelSurfaceHtml, readChannelSurface } from "@/lib/server/channel-surface-read";

test("channel surface parser extracts title description and action signals", () => {
  const parsed = parseChannelInput("https://blog.naver.com/promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const surface = parseChannelSurfaceHtml(
    parsed,
    `
      <html>
        <head>
          <title>Promptory Labs</title>
          <meta name="description" content="채널 운영과 전환 흐름을 정리하는 실전 가이드" />
        </head>
        <body>
          <h1>Promptory Labs</h1>
          <a href="/subscribe">구독하기</a>
          <a href="/contact">문의하기</a>
        </body>
      </html>
    `,
    "https://blog.naver.com/promptory",
  );

  assert.equal(surface.status, "live");
  assert.equal(surface.headline, "Promptory Labs");
  assert.equal(surface.description, "채널 운영과 전환 흐름을 정리하는 실전 가이드");
  assert.equal(surface.actionSignals.includes("구독하기"), true);
  assert.equal(surface.browserFollowupNeeded, false);
});

test("channel surface parser stays partial when metadata is sparse", () => {
  const parsed = parseChannelInput("https://blog.naver.com/promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const surface = parseChannelSurfaceHtml(
    parsed,
    `
      <html>
        <body>
          <div>hello</div>
        </body>
      </html>
    `,
    "https://blog.naver.com/promptory",
  );

  assert.equal(surface.status, "partial");
  assert.equal(surface.headline, null);
  assert.equal(surface.description, null);
  assert.equal(surface.browserFollowupNeeded, true);
  assert.equal(surface.browserFollowupPoints.length > 0, true);
});

test("unsupported hosts do not trigger server-side surface reads", async () => {
  const parsed = parseChannelInput("https://example.com/blog");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    throw new Error("should not fetch unsupported hosts");
  }) as typeof fetch;

  try {
    const surface = await readChannelSurface(parsed);
    assert.equal(surface.status, "unavailable");
    assert.equal(fetchCalled, false);
    assert.match(surface.statusReason, /지원 범위/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("youtube surface parser keeps browser followup even when summary text is readable", () => {
  const parsed = parseChannelInput("https://www.youtube.com/@promptory");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const surface = parseChannelSurfaceHtml(
    parsed,
    `
      <html>
        <head>
          <title>Promptory Channel</title>
          <meta name="description" content="채널 운영과 전환을 다루는 YouTube 채널" />
        </head>
        <body>
          <a href="/watch">Watch now</a>
        </body>
      </html>
    `,
    "https://www.youtube.com/@promptory",
  );

  assert.equal(surface.status, "live");
  assert.equal(surface.browserFollowupNeeded, true);
  assert.match(surface.browserFollowupReason ?? "", /브라우저/);
});

test("unavailable smartstore read keeps notes customer-friendly", async () => {
  const parsed = parseChannelInput("https://smartstore.naver.com/naverplus");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    ({
      ok: false,
      status: 429,
    }) as Response) as typeof fetch;

  try {
    const surface = await readChannelSurface(parsed);
    assert.equal(surface.status, "unavailable");
    assert.equal(surface.notes.some((note) => note.includes("429")), false);
    assert.match(surface.notes[0] ?? "", /자동 읽기를 잠시 제한|먼저 진단/);
    assert.match(surface.notes[1] ?? "", /후기|구매 직전|브라우저/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("unavailable coupang product read uses product-specific notes", async () => {
  const parsed = parseChannelInput("https://www.coupang.com/vp/products/96129668?itemId=296212916&vendorItemId=87674415046");
  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    ({
      ok: false,
      status: 403,
    }) as Response) as typeof fetch;

  try {
    const surface = await readChannelSurface(parsed);
    assert.equal(surface.status, "unavailable");
    assert.equal(surface.notes.some((note) => note.includes("스토어 쪽")), false);
    assert.match(surface.notes[0] ?? "", /쿠팡 공개 판매 화면/);
    assert.match(surface.notes[1] ?? "", /구매 직전|브라우저/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
