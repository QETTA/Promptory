import { CatalystStatCard } from "@/components/console/template-foundation";
import type { ConsoleStat } from "@/lib/console/mock-data";

export function ConsoleKpiGrid({ stats }: { stats: ConsoleStat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <CatalystStatCard
          key={stat.key}
          label={stat.label}
          value={stat.value}
          hint={stat.hint}
          tone={stat.tone}
        />
      ))}
    </div>
  );
}
