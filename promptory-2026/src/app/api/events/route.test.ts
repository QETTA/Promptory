import assert from "node:assert/strict";
import test from "node:test";

import { POST as telemetryRoute } from "@/app/api/events/route";

test("events api accepts known funnel events", async () => {
  const response = await telemetryRoute(
    new Request("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "channel_url_submitted",
        payload: {
          channelKind: "youtube",
          normalizedUrl: "https://youtube.com/@promptory",
        },
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("events api accepts contact submission events", async () => {
  const response = await telemetryRoute(
    new Request("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "contact_request_submitted",
        payload: {
          inquiryType: "starter",
          teamType: "sales-ops",
          painPointCount: 2,
        },
      }),
    }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("events api rejects unknown events", async () => {
  const response = await telemetryRoute(
    new Request("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "not_real",
      }),
    }),
  );

  assert.equal(response.status, 400);
});

