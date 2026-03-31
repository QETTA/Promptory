import { NextResponse } from "next/server";

import { buildLoginHref, getSafeRedirectTarget } from "@/lib/auth-redirect";
import { hasAuthRuntime } from "@/lib/env/runtime";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type EmailOtpType = "signup" | "invite" | "magiclink" | "recovery" | "email_change" | "email";

function withErrorQuery(href: string, errorCode: string) {
  const url = new URL(href, "http://promptory.local");

  url.searchParams.set("authError", errorCode);

  return `${url.pathname}${url.search}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = getSafeRedirectTarget(url.searchParams.get("next") ?? undefined, "/seller/products");

  if (!hasAuthRuntime()) {
    return NextResponse.redirect(new URL(withErrorQuery(buildLoginHref(next), "setup"), url));
  }

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const supabase = await createServerSupabaseClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL(withErrorQuery(buildLoginHref(next), "confirm_failed"), url));
    }

    return NextResponse.redirect(new URL(next, url));
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });

    if (error) {
      return NextResponse.redirect(new URL(withErrorQuery(buildLoginHref(next), "confirm_failed"), url));
    }

    return NextResponse.redirect(new URL(next, url));
  }

  return NextResponse.redirect(new URL(withErrorQuery(buildLoginHref(next), "invalid_link"), url));
}
