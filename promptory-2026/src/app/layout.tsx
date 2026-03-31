import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SetupBanner } from "@/components/layout/setup-banner";
import { ToastProvider } from "@/components/ui/toast-provider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "프롬프토리 - 맞춤형 Slack Agent Package",
  description: "Slack에 URL을내면, 진단부터 실행 초안까지 팀 대화 안에서 끝납니다. 홈페이지, 랜딩, 문서 링크를 읽고 비교표, 카피 초안, 보고용 요약까지 이어서 만듭니다.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>
          <SetupBanner />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
