import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export type SignalStripItem = {
  body: string;
  label: string;
  tone?: "accent" | "default" | "muted";
  value: string;
};

const toneClass = {
  accent: "border-[var(--brand-200)] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)]",
  default: "border-[var(--line-strong)] bg-white",
  muted: "border-[var(--line)] bg-[var(--surface-2)]",
} as const;

export function SignalStrip({
  className,
  items,
}: {
  className?: string;
  items: SignalStripItem[];
}) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-3", className)}>
      {items.map((item) => (
        <Card key={`${item.label}-${item.value}`} className={cn("p-3.5 sm:p-4.5", toneClass[item.tone ?? "default"])}>
          <p className="section-kicker text-[var(--slate-500)]">{item.label}</p>
          <p className="mt-2 font-display text-[clamp(1.2rem,2.3vw,1.85rem)] leading-[0.95] tracking-[-0.04em] text-[var(--slate-950)]">
            {item.value}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-6 text-[var(--slate-600)]">{item.body}</p>
        </Card>
      ))}
    </div>
  );
}
