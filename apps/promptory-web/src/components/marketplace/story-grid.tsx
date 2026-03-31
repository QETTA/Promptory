import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import styles from "./story-grid.module.css";

export type StoryGridItem = {
  body: string;
  eyebrow?: string;
  points?: string[];
  tone?: "accent" | "default" | "muted";
  title: string;
};

const toneClass = {
  accent: styles.toneAccent,
  default: styles.toneDefault,
  muted: styles.toneMuted,
} as const;

export function StoryGrid({
  className,
  columns = "3",
  items,
}: {
  className?: string;
  columns?: "2" | "3";
  items: StoryGridItem[];
}) {
  return (
    <div className={cn(columns === "2" ? styles.columns2 : styles.columns3, className)}>
      {items.map((item) => (
        <Card key={item.title} className={cn(styles.card, toneClass[item.tone ?? "default"])}>
          {item.eyebrow ? <p className={cn("section-kicker", styles.eyebrow)}>{item.eyebrow}</p> : null}
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.body}>{item.body}</p>
          {item.points?.length ? (
            <ul className={styles.pointList}>
              {item.points.map((point) => (
                <li key={point} className={styles.pointItem}>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
