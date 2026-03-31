import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { POST as loginRoute } from "@/app/api/auth/login/route";
import { GET as downloadRoute } from "@/app/api/downloads/[orderId]/route";
import { POST as createProductRoute } from "@/app/api/products/route";
import LoginPage from "@/app/login/page";
import PaymentSuccessPage from "@/app/payments/success/page";
import SellerProductsPage from "@/app/seller/products/page";

const requiredEnvKeys = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_TOSS_CLIENT_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "PAYMENTS_MODE",
  "TOSS_SECRET_KEY",
] as const;

async function withMissingPromptoryEnv(callback: () => Promise<void>) {
  const previous = new Map<string, string | undefined>();

  for (const key of requiredEnvKeys) {
    previous.set(key, process.env[key]);
    delete process.env[key];
  }

  try {
    await callback();
  } finally {
    for (const key of requiredEnvKeys) {
      const value = previous.get(key);

      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("login page shows setup guidance when public env is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const html = renderToStaticMarkup(await LoginPage({}));
    assert.match(html, /로그인하려면 Supabase 연결이 필요합니다/);
    assert.doesNotMatch(html, /<form/);
  });
});

test("seller center shows setup guidance when write runtime is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const html = renderToStaticMarkup(await SellerProductsPage({}));
    assert.match(html, /판매자 센터를 열려면 Promptory 연결이 필요합니다/);
  });
});

test("login api returns 503 guidance when auth runtime is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const response = await loginRoute(
      new Request("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    );

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "로그인을 시작하려면 /setup에서 공개 Supabase 연결을 먼저 확인해 주세요.",
    });
  });
});

test("product create api returns 503 guidance when seller write runtime is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const response = await createProductRoute(
      new Request("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      }),
    );

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "실행 팩 등록에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 확인해 주세요.",
    });
  });
});

test("download api returns 503 guidance when download runtime is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const response = await downloadRoute(new Request("http://localhost:3000/api/downloads/test-order"), {
      params: Promise.resolve({ orderId: "test-order" }),
    });

    assert.equal(response.status, 503);
    const payload = (await response.json()) as { error?: string };
    assert.equal(typeof payload.error, "string");
    assert.ok(payload.error && payload.error.length > 0);
  });
});

test("payment success page shows setup guidance when payment runtime is missing", async () => {
  await withMissingPromptoryEnv(async () => {
    const html = renderToStaticMarkup(
      await PaymentSuccessPage({
        searchParams: Promise.resolve({
          amount: "29000",
          orderId: "order-1",
          paymentKey: "payment-key",
        }),
      }),
    );

    assert.match(html, /Promptory/);
  });
});
