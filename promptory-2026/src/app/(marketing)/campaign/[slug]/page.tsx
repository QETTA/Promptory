import type { Metadata } from "next";

import { StubPageShell } from "@/components/marketing/stub-page-shell";
import { buildMetadata, humanizeSlug } from "@/lib/marketing-stubs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = humanizeSlug(slug);
  return buildMetadata(`${label} Campaign`, `${label} campaign landing stub for Promptory experiments.`);
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = humanizeSlug(slug);

  return (
    <StubPageShell
      eyebrow="Campaign stub"
      title={`${label} 캠페인 랜딩 스텁`}
      description="이 라우트는 Oatmeal base + Radiant donor를 붙이기 전, 캠페인별 메시지와 CTA를 실험하기 위한 최소 골격입니다."
      summary="캠페인 페이지는 최종 브랜드 페이지와 분리된 실험 랜딩 레일입니다."
      quickFacts={[
        { label: "Audience", value: "실험용 유입" },
        { label: "Goal", value: "CTA / 문의 전환" },
        { label: "Status", value: "stub only" },
      ]}
      sections={[
        {
          title: "Hero placeholder",
          body: "캠페인별 핵심 메시지와 proof point를 여기에 고정합니다.",
          points: ["headline", "supporting copy", "primary CTA"],
        },
        {
          title: "Proof placeholder",
          body: "승인 병목, request-to-resolution, 파일럿 ROI 같은 proof block을 여기에 배치합니다.",
          points: ["before / after", "ops metric", "buyer language"],
        },
        {
          title: "Conversion placeholder",
          body: "문의 폼, 파일럿 CTA, 교육 funnel 연결 중 하나를 선택합니다.",
          points: ["contact", "pilot", "education"],
        },
      ]}
      primaryCta={{ href: "/contact", label: "문의 CTA 넣기" }}
      secondaryCta={{ href: "/pilot", label: "파일럿 CTA 보기" }}
    />
  );
}
