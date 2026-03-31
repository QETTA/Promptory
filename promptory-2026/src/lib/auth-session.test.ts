import assert from "node:assert/strict";
import test from "node:test";

import { authSessionMaxAgeSeconds, buildEmailConfirmationUrl } from "@/lib/auth-session";
import { getAuthQueryErrorMessage, getFriendlyAuthErrorMessage } from "@/lib/auth-feedback";

test("auth session max age stays at 24 hours", () => {
  assert.equal(authSessionMaxAgeSeconds, 24 * 60 * 60);
});

test("email confirmation url keeps only safe next targets", () => {
  const previous = {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  };
  process.env.NEXT_PUBLIC_APP_URL = "http://127.0.0.1:3000";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

  try {
    assert.equal(
      buildEmailConfirmationUrl("/seller/products"),
      "http://127.0.0.1:3000/auth/confirm?next=%2Fseller%2Fproducts",
    );
    assert.equal(
      buildEmailConfirmationUrl("https://evil.example"),
      "http://127.0.0.1:3000/auth/confirm?next=%2Fseller%2Fproducts",
    );
  } finally {
    if (previous.NEXT_PUBLIC_APP_URL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
    else process.env.NEXT_PUBLIC_APP_URL = previous.NEXT_PUBLIC_APP_URL;
    if (previous.NEXT_PUBLIC_SUPABASE_URL === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = previous.NEXT_PUBLIC_SUPABASE_URL;
    if (previous.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previous.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
});

test("friendly auth errors map common Supabase messages", () => {
  assert.equal(getFriendlyAuthErrorMessage("Email not confirmed"), "이메일 인증을 완료한 뒤 로그인해 주세요.");
  assert.equal(getFriendlyAuthErrorMessage("Invalid login credentials"), "이메일 또는 비밀번호를 다시 확인해 주세요.");
  assert.equal(getFriendlyAuthErrorMessage("User already registered"), "이미 가입된 이메일입니다. 바로 로그인해 주세요.");
});

test("query auth errors map confirmation failures", () => {
  assert.equal(getAuthQueryErrorMessage("confirm_failed"), "이메일 인증 링크가 만료되었거나 이미 사용되었습니다. 다시 시도해 주세요.");
  assert.equal(getAuthQueryErrorMessage("invalid_link"), "인증 링크를 다시 확인해 주세요.");
  assert.equal(getAuthQueryErrorMessage("setup"), "인증을 처리하려면 /setup에서 Supabase 연결을 먼저 확인해 주세요.");
});
