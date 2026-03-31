import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SetupBanner } from "@/components/layout/setup-banner";
import { ToastProvider } from "@/components/ui/toast-provider";
import { promptoryWebSurfaceMetaDescription } from "@/lib/promptory-web-surface-copy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Promptory",
  description: promptoryWebSurfaceMetaDescription,
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
