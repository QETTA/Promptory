import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import styles from "./empty-state.module.css";

export function EmptyState(props: {
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  title: string;
}) {
  return (
    <Card variant="strong" className={styles.card}>
      <div className={styles.row}>
        <div className={styles.content}>
          <p className={cn("section-kicker", styles.eyebrow)}>No Items Yet</p>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.body}>{props.body}</p>
        </div>
        <div className={styles.status}>
          상태 비어 있음
        </div>
      </div>
      {props.ctaHref && props.ctaLabel ? (
        <Link
          href={props.ctaHref}
          className={cn(
            buttonVariants({ variant: "default" }),
            styles.cta,
          )}
        >
          {props.ctaLabel}
        </Link>
      ) : null}
    </Card>
  );
}
