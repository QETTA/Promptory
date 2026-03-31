import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import styles from "./section.module.css";

export function Section({
  actions,
  children,
  description,
  eyebrow,
  title,
  className,
  compact = false,
}: {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  description?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
}) {
  return (
    <section className={cn(styles.section, compact ? styles.compact : "", className)}>
      <div className={cn(styles.header, compact ? styles.compactHeader : "")}>
        <div className={styles.copy}>
          {eyebrow ? <p className={cn("section-kicker", styles.eyebrow)}>{eyebrow}</p> : null}
          <h2
            className={cn(
              compact ? styles.compactTitle : "section-title",
              styles.title,
            )}
          >
            {title}
          </h2>
          {description ? (
            <div
              className={cn(
                styles.description,
                compact ? styles.compactDescription : styles.defaultDescription,
              )}
            >
              {description}
            </div>
          ) : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
