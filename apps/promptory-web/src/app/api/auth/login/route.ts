import { NextResponse } from "next/server";

import { getFriendlyAuthErrorMessage } from "@/lib/auth-feedback";
import { hasAuthRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  if (!hasAuthRuntime()) {
    return jsonError("로그인을 시작하려면 /setup에서 공개 Supabase 연결을 먼저 확인해 주세요.", 503);
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("이메일과 비밀번호를 다시 확인해 주세요.", 400);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return jsonError(getFriendlyAuthErrorMessage(error.message), 400);
  }

  return NextResponse.json({ ok: true });
}
