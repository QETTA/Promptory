/**
 * Next.js Proxy (미들웨어 역할)
 *
 * 역할:
 * 1. Supabase 세션 갱신 (기존 기능 유지)
 * 2. Cloudflare Access JWT 헤더 처리
 * 3. 인증 필요 경로 보호
 *
 * Cloudflare Access JWT 흐름:
 * - CF Access가 인증된 요청에 `CF_Authorization` 쿠키 + `Cf-Access-Jwt-Assertion` 헤더 주입
 * - 공개 키: https://lider-yohan.cloudflareaccess.com/cdn-cgi/access/certs
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { authCookieOptions } from "@/lib/auth-session";
import { hasPublicEnv, getPublicEnv } from "@/lib/env/public";
import type { Database } from "@/lib/supabase/types";

// ─────────────────────────────────────────────────────────────
// 보호 경로 (로그인 필요)
// ─────────────────────────────────────────────────────────────
const PROTECTED_PATHS = [
  "/orders",
  "/checkout",
  "/seller",
  "/library",
  "/optimize",
  "/proposal",
  "/setup",
];

const AUTH_PATHS = ["/login", "/signup"];

// ─────────────────────────────────────────────────────────────
// Cloudflare Access JWT 파싱 (빠른 파싱 - 서명 검증 없음)
// 실제 서명 검증은 CF Edge에서 처리됩니다.
// ─────────────────────────────────────────────────────────────
function parseCFJWT(token: string): { exp?: number; email?: string; sub?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function isCFJWTValid(token: string): boolean {
  const payload = parseCFJWT(token);
  if (!payload) return false;
  if (payload.exp && Date.now() / 1000 > payload.exp) return false;
  return true;
}

// ─────────────────────────────────────────────────────────────
// 메인 프록시 함수
// ─────────────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  // ── Cloudflare Access JWT 처리 ──
  const cfJWT =
    request.cookies.get("CF_Authorization")?.value ??
    request.headers.get("Cf-Access-Jwt-Assertion") ??
    null;

  if (cfJWT && isCFJWTValid(cfJWT)) {
    response.headers.set("x-cf-access-verified", "true");
    const payload = parseCFJWT(cfJWT);
    if (payload?.email) {
      response.headers.set("x-cf-access-email", payload.email);
    }
  }

  // ── Supabase 세션 갱신 ──
  if (!hasPublicEnv()) {
    return response;
  }

  let user = null;
  try {
    const env = getPublicEnv();
    const supabase = createServerClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookieOptions: authCookieOptions,
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return response;
  }

  // ── 보호 경로 → 미인증 시 로그인 리다이렉트 ──
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // ── 인증된 사용자가 auth 경로 접근 시 홈으로 리다이렉트 ──
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));
  if (isAuthPath && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
