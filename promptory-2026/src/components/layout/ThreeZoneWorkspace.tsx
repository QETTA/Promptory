"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { layout } from "@/lib/tokens";

interface ThreeZoneWorkspaceProps {
  zoneA: ReactNode; // Left Sidebar - Original Context
  zoneB: ReactNode; // Center Canvas - Result
  zoneC: ReactNode; // Right Panel - Actions
  mobileView?: ReactNode;
  className?: string;
}

function ThreeZoneWorkspace({ zoneA, zoneB, zoneC, mobileView, className }: ThreeZoneWorkspaceProps) {
  return (
    <div className={cn("min-h-screen bg-neutral-50 dark:bg-neutral-950", className)}>
      {/* Desktop 3-Zone Layout - Using token-based sidebar width */}
      <div className="hidden lg:grid min-h-screen" style={{ gridTemplateColumns: `${layout.sidebar.width} 1fr ${layout.sidebar.width}` }}>
        {/* Zone A: Original Context (Left Sidebar) */}
        <div className="bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto">
          <div className="p-4 sticky top-0">
            {zoneA}
          </div>
        </div>

        {/* Zone B: Result Canvas (Center Main) */}
        <div className="bg-neutral-50 dark:bg-neutral-950 overflow-y-auto p-6">
          {zoneB}
        </div>

        {/* Zone C: Action Panel (Right Sidebar) */}
        <div className="bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto">
          <div className="p-4 sticky top-0">
            {zoneC}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {mobileView || (
          <div className="p-4 pb-32">
            {/* Simplified mobile view */}
            {zoneB}
          </div>
        )}
      </div>
    </div>
  );
}

export { ThreeZoneWorkspace };
