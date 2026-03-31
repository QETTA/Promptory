import { NextResponse } from "next/server";

import { getFriendlyAuthErrorMessage } from "@/lib/auth-feedback";
import { buildEmailConfirmationUrl } from "@/lib/auth-session";
import { hasAuthRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  if (!hasAuthRuntime()) {
    return jsonError("인증 메일을 보내려면 /setup에서 공개 Supabase 연결을 먼저 확인해 주세요.", 503);
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.pick({ email: true }).safeParse(body);
  const redirectTo = typeof body === "object" && body && "redirectTo" in body && typeof body.redirectTo === "string"
    ? body.redirectTo
    : undefined;

  if (!parsed.success) {
    return jsonError("이메일 주소를 다시 확인해 주세요.", 400);
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resend({
    email: parsed.data.email,
    options: {
      emailRedirectTo: buildEmailConfirmationUrl(redirectTo),
    },
    type: "signup",
  });

  if (error) {
    return jsonError(getFriendlyAuthErrorMessage(error.message), 400);
  }

  return NextResponse.json({ ok: true });
}
