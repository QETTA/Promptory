import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import styles from "./dashboard-card.module.css";

export function DashboardCard({
  caption,
  className,
  value,
  detail,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  caption: ReactNode;
  detail?: ReactNode;
  value: ReactNode;
}) {
  return (
    <div
      className={cn(styles.card, className)}
      {...props}
    >
      <div className={styles.header}>
        <p className={cn("section-kicker", styles.kicker)}>{caption}</p>
        <div className={styles.status}>
          <div className={styles.statusDot} />
          <span className={styles.statusText}>live</span>
        </div>
      </div>
      <p className={styles.value}>{value}</p>
      {detail ? <p className={styles.detail}>{detail}</p> : null}
    </div>
  );
}
