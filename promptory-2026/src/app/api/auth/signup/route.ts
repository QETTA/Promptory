import { NextResponse } from "next/server";

// Cloudflare Pages Static Export 설정
export const dynamic = "force-static";

import { getFriendlyAuthErrorMessage } from "@/lib/auth-feedback";
import { buildEmailConfirmationUrl } from "@/lib/auth-session";
import { hasAuthRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  if (!hasAuthRuntime()) {
    return jsonError("회원가입을 시작하려면 /setup에서 공개 Supabase 연결을 먼저 확인해 주세요.", 503);
  }

  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  const redirectTo = typeof body === "object" && body && "redirectTo" in body && typeof body.redirectTo === "string"
    ? body.redirectTo
    : undefined;

  if (!parsed.success) {
    return jsonError("이름, 이메일, 비밀번호를 다시 확인해 주세요.", 400);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        display_name: parsed.data.displayName,
      },
      emailRedirectTo: buildEmailConfirmationUrl(redirectTo),
    },
  });

  if (error) {
    return jsonError(getFriendlyAuthErrorMessage(error.message), 400);
  }

  if (!data.user) {
    return jsonError("회원 계정을 만들지 못했습니다. 잠시 후 다시 시도해 주세요.", 500);
  }

  if (!data.session) {
    return NextResponse.json({
      email: parsed.data.email,
      ok: true,
      requiresEmailVerification: true,
    });
  }

  return NextResponse.json({ ok: true, requiresEmailVerification: false });
}
