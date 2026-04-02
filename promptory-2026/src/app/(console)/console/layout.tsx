import type { ReactNode } from "react";

import { ConsoleAppShell } from "@/components/console/console-app-shell";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return <ConsoleAppShell>{children}</ConsoleAppShell>;
}
