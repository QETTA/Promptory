import { getSafeRedirectTarget } from "@/lib/auth-redirect";
import { getPublicEnv } from "@/lib/env/public";

export const authSessionMaxAgeSeconds = 24 * 60 * 60;

export const authCookieOptions = {
  maxAge: authSessionMaxAgeSeconds,
  path: "/",
  sameSite: "lax" as const,
};

export function buildEmailConfirmationUrl(next?: string) {
  const env = getPublicEnv();
  const safeNext = getSafeRedirectTarget(next, "/seller/products");
  const url = new URL("/auth/confirm", env.NEXT_PUBLIC_APP_URL);

  url.searchParams.set("next", safeNext);

  return url.toString();
}
