/**
 * Cloudflare Access JWT 검증 유틸리티
 *
 * Cloudflare Access는 인증된 요청에 다음을 주입합니다:
 *   - 쿠키: `CF_Authorization`
 *   - 헤더: `Cf-Access-Jwt-Assertion`
 *
 * 공개 키(JWK) 엔드포인트:
 *   https://<team>.cloudflareaccess.com/cdn-cgi/access/certs
 *   예: https://lider-yohan.cloudflareaccess.com/cdn-cgi/access/certs
 *
 * 참고: https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/
 */

const CF_ACCESS_TEAM_DOMAIN =
  process.env.CF_ACCESS_TEAM_DOMAIN ?? "lider-yohan.cloudflareaccess.com";

const CERTS_URL = `https://${CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`;

// JWK 캐시 (Edge 환경에서는 글로벌 캐시 사용)
let cachedJWKS: Record<string, CryptoKey> | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1시간

interface JWKSResponse {
  keys: Array<{
    kid: string;
    kty: string;
    alg: string;
    use: string;
    n: string;
    e: string;
  }>;
}

/**
 * Cloudflare Access 공개 키를 가져옵니다.
 */
async function fetchPublicKeys(): Promise<Record<string, CryptoKey>> {
  if (cachedJWKS && Date.now() < cacheExpiry) {
    return cachedJWKS;
  }

  const res = await fetch(CERTS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch CF Access certs: ${res.status}`);
  }

  const data: JWKSResponse = await res.json();
  const keys: Record<string, CryptoKey> = {};

  for (const jwk of data.keys) {
    const cryptoKey = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );
    keys[jwk.kid] = cryptoKey;
  }

  cachedJWKS = keys;
  cacheExpiry = Date.now() + CACHE_TTL_MS;
  return keys;
}

export interface CFAccessPayload {
  /** 사용자 이메일 */
  email: string;
  /** Subject (CF identity ID) */
  sub: string;
  /** Audience (CF Access Application Client ID) */
  aud: string[];
  /** Issuer */
  iss: string;
  /** Issued At */
  iat: number;
  /** Expiration */
  exp: number;
  /** 추가 커스텀 클레임 */
  [key: string]: unknown;
}

/**
 * CF Access JWT를 완전히 검증합니다 (서명 + 만료 + AUD).
 *
 * @param token - JWT 토큰 문자열
 * @param expectedAud - 검증할 AUD (CF Access Application Client ID)
 * @returns 검증된 페이로드 또는 null
 */
export async function verifyCFAccessJWT(
  token: string,
  expectedAud?: string
): Promise<CFAccessPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // 헤더에서 kid 추출
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
    const payload: CFAccessPayload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    // 만료 확인
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }

    // AUD 확인
    if (expectedAud && !payload.aud?.includes(expectedAud)) {
      return null;
    }

    // Issuer 확인
    const expectedIss = `https://${CF_ACCESS_TEAM_DOMAIN}`;
    if (payload.iss !== expectedIss) {
      return null;
    }

    // 서명 검증
    const keys = await fetchPublicKeys();
    const key = keys[header.kid];
    if (!key) return null;

    const signingInput = `${parts[0]}.${parts[1]}`;
    const signature = Uint8Array.from(
      atob(parts[2].replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      new TextEncoder().encode(signingInput)
    );

    return valid ? payload : null;
  } catch {
    return null;
  }
}

/**
 * CF Access JWT 토큰을 빠르게 파싱합니다 (서명 검증 없음).
 * 서버 컴포넌트에서 이메일/sub만 읽을 때 사용합니다.
 */
export function parseCFAccessJWT(token: string): Partial<CFAccessPayload> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

/**
 * Request headers에서 CF Access JWT를 추출합니다.
 */
export function extractCFAccessToken(headers: Headers): string | null {
  return (
    headers.get("Cf-Access-Jwt-Assertion") ??
    headers.get("CF_Authorization") ??
    null
  );
}
