import { Card } from "@/components/ui/card";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import styles from "./channel-browser-review-panel.module.css";

export function ChannelBrowserReviewPanel({
  brief,
  parsed,
  snapshot,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface: ChannelSurfaceRead;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  if (!summary.browserReviewHeadline || summary.browserReviewCards.length === 0) {
    return null;
  }

  return (
    <Card variant="strong" className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.copy}>
          <p className={`section-kicker ${styles.eyebrow}`}>Browser Review</p>
          <h3 className={styles.title}>
            {summary.browserExecutionHeadline ?? summary.browserReviewHeadline}
          </h3>
          <p className={styles.body}>
            {summary.browserExecutionBody ?? summary.browserReviewBody}
          </p>
        </div>

        {summary.browserOpenUrl ? (
          <a
            href={summary.browserOpenUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.openLink}
          >
            실제 채널 열기
          </a>
        ) : null}
      </div>

      {summary.browserMemoTemplate ? (
        <div className={styles.memo}>
          {summary.browserMemoTemplate}
        </div>
      ) : null}

      {summary.browserExecutionSteps.length > 0 ? (
        <div className={styles.stepGrid}>
          {summary.browserExecutionSteps.map((step) => (
            <div key={step.title} className={styles.stepCard}>
              <p className={styles.cardLabel}>{step.title}</p>
              {step.emphasis ? <p className={styles.cardEmphasis}>{step.emphasis}</p> : null}
              <p className={styles.cardBody}>{step.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className={styles.reviewGrid}>
        {summary.browserReviewCards.map((card) => (
          <div key={card.title} className={styles.reviewCard}>
            <p className={styles.cardLabel}>{card.title}</p>
            {card.emphasis ? <p className={styles.cardEmphasis}>{card.emphasis}</p> : null}
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
