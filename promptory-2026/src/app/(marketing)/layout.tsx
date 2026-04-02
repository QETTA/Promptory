import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SetupBanner } from "@/components/layout/setup-banner";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SetupBanner />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
