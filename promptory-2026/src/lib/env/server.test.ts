import assert from "node:assert/strict";
import test from "node:test";

import {
  getPaymentsMode,
  getSupabaseServerEnv,
  getTossServerEnv,
} from "@/lib/env/server";

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

test("getPaymentsMode defaults to dev_stub and validates allowed values", () => {
  withEnv({ PAYMENTS_MODE: undefined }, () => {
    assert.equal(getPaymentsMode(), "dev_stub");
  });

  withEnv({ PAYMENTS_MODE: "toss" }, () => {
    assert.equal(getPaymentsMode(), "toss");
  });

  withEnv({ PAYMENTS_MODE: "broken" }, () => {
    assert.throws(() => getPaymentsMode(), /PAYMENTS_MODE must be one of/);
  });
});

test("server env helpers require non-empty secrets", () => {
  withEnv({ SUPABASE_SERVICE_ROLE_KEY: "" }, () => {
    assert.throws(() => getSupabaseServerEnv(), /SUPABASE_SERVICE_ROLE_KEY is required/);
  });

  withEnv({ TOSS_SECRET_KEY: "" }, () => {
    assert.throws(() => getTossServerEnv(), /TOSS_SECRET_KEY is required/);
  });
});
