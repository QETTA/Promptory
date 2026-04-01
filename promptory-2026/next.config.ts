import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ─────────────────────────────────────────────────────────────
  // Cloudflare Pages Static Export 설정 (배포 시에만 활성화)
  // ─────────────────────────────────────────────────────────────
  // output: "export",
  // distDir: "dist",
  distDir: ".next",

  // 이미지 최적화: Cloudflare Images 또는 unoptimized 사용
  images: {
    unoptimized: true, // CF Pages는 Next.js Image 서버 최적화 미지원
  },

  // 환경 변수 (빌드 타임에 주입)
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    CF_ACCESS_TEAM_DOMAIN: process.env.CF_ACCESS_TEAM_DOMAIN ?? "",
  },

  // CORS / 보안 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflareaccess.com https://*.supabase.co",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://*.cloudflareaccess.com wss://*.supabase.co",
              "frame-src https://*.cloudflareaccess.com",
            ].join("; "),
          },
        ],
      },
      // Cloudflare Access JWT 검증용 공개 키 엔드포인트에 대한 캐시 설정
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },

  // 리다이렉트
  async redirects() {
    return [
      {
        source: "/packages/:slug/buy",
        destination: "/buy/:slug",
        permanent: false,
      },
    ];
  },

  // Turbopack 설정 (dev 전용)
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
