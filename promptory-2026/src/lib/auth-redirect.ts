export function getSafeRedirectTarget(next: string | string[] | undefined, fallback: string) {
  const candidate = Array.isArray(next) ? next[0] : next;

  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  return candidate;
}

function buildAuthHref(path: "/login" | "/signup", next?: string) {
  const safeNext = getSafeRedirectTarget(next, "");

  if (!safeNext) {
    return path;
  }

  return `${path}?next=${encodeURIComponent(safeNext)}`;
}

export function buildLoginHref(next?: string) {
  return buildAuthHref("/login", next);
}

export function buildSignupHref(next?: string) {
  return buildAuthHref("/signup", next);
}
