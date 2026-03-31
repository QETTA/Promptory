import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SetupBanner } from "@/components/layout/setup-banner";
import { ToastProvider } from "@/components/ui/toast-provider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Promptory",
  description: "개인 채널 URL을 기반으로 실행 시스템을 최적화하는 Promptory",
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
