import { Card } from "@/components/ui/card";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import styles from "./channel-diagnosis-preview.module.css";

export function ChannelDiagnosisPreview({
  brief,
  parsed,
  surface,
  snapshot,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  surface?: ChannelSurfaceRead | null;
  snapshot: ChannelSnapshot;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });
  const stateLabel = brief.isComplete ? "확정 readout" : "임시 readout";
  const surfaceHeadline = surface?.headline?.trim();
  const surfaceDescription = surface?.description?.trim();
  const surfaceSignals = surface?.actionSignals ?? [];

  return (
    <div className={styles.root}>
      <Card variant="strong" className={styles.heroCard}>
        <div className={styles.topRow}>
          <div className={styles.copy}>
            <p className={`section-kicker ${styles.eyebrow}`}>Diagnosis Readout</p>
            <p className={styles.state}>{stateLabel}</p>
            <h3 className={styles.headline}>
              {summary.diagnosisHeadline}
            </h3>
            <p className={styles.body}>{summary.diagnosisBody}</p>
          </div>
        </div>

        <div className={styles.cardGrid}>
          {summary.diagnosisCards.map((card) => (
            <div key={card.title} className={styles.diagnosisCard}>
              <p className={`section-kicker ${styles.cardLabel}`}>{card.title}</p>
              {card.emphasis ? (
                <p className={styles.cardEmphasis}>{card.emphasis}</p>
              ) : null}
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.listGrid}>
        <Card variant="tint" className={styles.listCard}>
          <p className={`section-kicker ${styles.listEyebrow}`}>Decision Trace</p>
          <div className={styles.pointList}>
            {summary.directionPoints.slice(0, 2).map((point) => (
              <div key={point} className={styles.pointItem}>
                <span className={styles.dotBrand} />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="tint" className={styles.listCard}>
          <p className={`section-kicker ${styles.listEyebrow}`}>Next Read Queue</p>
          <div className={styles.pointList}>
            {summary.nextStepSignals.slice(0, 2).map((point) => (
              <div key={point} className={styles.pointItem}>
                <span className={styles.dotSlate} />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {surfaceHeadline || surfaceDescription || surfaceSignals.length > 0 ? (
        <Card variant="tint" className={styles.surfaceCard}>
          <p className={`section-kicker ${styles.listEyebrow}`}>Public Surface Match</p>
          <div className={styles.surfaceGrid}>
            {surfaceHeadline ? (
              <div className={styles.surfaceItem}>
                <p className={styles.surfaceLabel}>Headline</p>
                <p className={styles.surfaceBody}>{surfaceHeadline}</p>
              </div>
            ) : null}
            {surfaceDescription ? (
              <div className={styles.surfaceItem}>
                <p className={styles.surfaceLabel}>Description</p>
                <p className={styles.surfaceBody}>{surfaceDescription}</p>
              </div>
            ) : null}
            {surfaceSignals.length > 0 ? (
              <div className={styles.surfaceItem}>
                <p className={styles.surfaceLabel}>Action Signal</p>
                <p className={styles.surfaceBody}>{surfaceSignals.join(", ")}</p>
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
