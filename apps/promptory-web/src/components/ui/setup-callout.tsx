import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import styles from "./setup-callout.module.css";

export function SetupCallout(props: {
  body: string;
  title: string;
}) {
  return (
    <Card variant="tint" className={styles.card}>
      <div className={styles.row}>
        <div className={styles.content}>
          <p className={cn("section-kicker", styles.eyebrow)}>Setup Required</p>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.body}>{props.body}</p>
        </div>
        <div className={styles.status}>
          환경 설정
        </div>
      </div>

      <div className={styles.actions}>
        <CTAButton href="/setup" variant="outline" size="sm">
          환경설정 가이드 보기
        </CTAButton>
      </div>
    </Card>
  );
}
