import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Promptory",
  description: "Request-to-resolution platform for internal Slack agents.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
