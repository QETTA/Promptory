import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import styles from "./signal-strip.module.css";

export type SignalStripItem = {
  body: string;
  label: string;
  tone?: "accent" | "default" | "muted";
  value: string;
};

const toneClass = {
  accent: styles.accent,
  default: styles.default,
  muted: styles.muted,
} as const;

export function SignalStrip({
  className,
  items,
}: {
  className?: string;
  items: SignalStripItem[];
}) {
  return (
    <div className={cn(styles.grid, className)}>
      {items.map((item) => (
        <Card key={`${item.label}-${item.value}`} className={cn(styles.card, toneClass[item.tone ?? "default"])}>
          <p className={cn("section-kicker", styles.label)}>{item.label}</p>
          <p className={styles.value}>
            {item.value}
          </p>
          <p className={styles.body}>{item.body}</p>
        </Card>
      ))}
    </div>
  );
}
