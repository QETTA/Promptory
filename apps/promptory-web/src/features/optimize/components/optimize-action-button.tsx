import { SaveOptimizationRunButton } from "@/components/channel-intake/save-optimization-run-button";
import { CTAButton } from "@/components/ui/cta-button";

import type { OptimizeSidebarAction } from "../types/optimize-page-data";

export function renderOptimizeAction(action: OptimizeSidebarAction, size: "sm" | "lg" = "sm") {
  if (action.kind === "save") {
    return <SaveOptimizationRunButton {...action.payload} label={action.label} size={size} />;
  }

  return (
    <CTAButton href={action.href} size={size}>
      {action.label}
    </CTAButton>
  );
}
