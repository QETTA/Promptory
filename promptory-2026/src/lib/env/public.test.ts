import assert from "node:assert/strict";
import test from "node:test";

import { getPublicEnv, getTossPublicEnv } from "@/lib/env/public";

function withEnv(env: Record<string, string | undefined>, fn: () => void) {
  const previous = new Map<string, string | undefined>();

  for (const [key, value] of Object.entries(env)) {
    previous.set(key, process.env[key]);

    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("getPublicEnv validates required public urls without zod", () => {
  withEnv(
    {
      NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3000",
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    },
    () => {
      assert.deepEqual(getPublicEnv(), {
        NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3000",
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      });
    },
  );
});

test("getPublicEnv rejects malformed urls", () => {
  withEnv(
    {
      NEXT_PUBLIC_APP_URL: "not-a-url",
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    },
    () => {
      assert.throws(() => getPublicEnv(), /NEXT_PUBLIC_APP_URL must be a valid URL/);
    },
  );
});

test("getTossPublicEnv requires a non-empty client key", () => {
  withEnv(
    {
      NEXT_PUBLIC_TOSS_CLIENT_KEY: "",
    },
    () => {
      assert.throws(() => getTossPublicEnv(), /NEXT_PUBLIC_TOSS_CLIENT_KEY is required/);
    },
  );
});
