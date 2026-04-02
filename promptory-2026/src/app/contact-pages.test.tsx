import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import ContactPage from "@/app/(marketing)/contact/page";
import ContactSuccessPage from "@/app/(marketing)/contact/success/page";

test("contact page reflects starter query context from async searchParams", async () => {
  const html = renderToStaticMarkup(
    await ContactPage({
      searchParams: Promise.resolve({
        type: "starter",
        plan: "starter",
        slug: "deal-desk",
      }),
    }),
  );

  assert.match(html, /한 부서 · 한 workflow 파일럿 범위를 같이 자릅니다/);
  assert.match(html, /Starter/);
});

test("contact success page reflects team name from async searchParams", async () => {
  const html = renderToStaticMarkup(
    await ContactSuccessPage({
      searchParams: Promise.resolve({
        team: "Revenue Ops",
      }),
    }),
  );

  assert.match(html, /Revenue Ops 기준으로 보내주신 URL과 상황 설명을 바탕으로/);
});
