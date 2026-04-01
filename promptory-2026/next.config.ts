import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  distDir: ".next",

  // 이미지 최적화: Cloudflare Workers는 Next.js Image 서버 최적화 미지원
  images: {
    unoptimized: true,
  },

  // 환경 변수 (빌드 타임에 주입)
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    CF_ACCESS_TEAM_DOMAIN: process.env.CF_ACCESS_TEAM_DOMAIN ?? "",
  },

  // 리다이렉트 (middleware.ts로 이동 후 간소화)
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
