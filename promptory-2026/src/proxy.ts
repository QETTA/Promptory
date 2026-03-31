import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { authCookieOptions } from "@/lib/auth-session";
import { hasPublicEnv, getPublicEnv } from "@/lib/env/public";
import type { Database } from "@/lib/supabase/types";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  if (!hasPublicEnv()) {
    return response;
  }

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
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      },
    );

    await supabase.auth.getUser();
  } catch {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
