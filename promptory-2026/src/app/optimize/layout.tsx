import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문장 최적화 | Promptory 2026",
  description: "AI가 분석한 문장 최적화 결과를 확인하고, 개선된 버전을 적용하세요. Studio + Radiant + Pocket + Catalyst 시너지.",
  keywords: ["AI 문장 최적화", "문장 개선", "글쓰기 도구", "AI writing assistant", "텍스트 최적화"],
  openGraph: {
    title: "문장 최적화 | Promptory 2026",
    description: "AI가 분석한 문장 최적화 결과를 확인하고, 개선된 버전을 적용하세요.",
    type: "website",
  },
};

export default function OptimizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
