import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { optimizeFlowLabelCopy, optimizeReadinessCopy } from "@/lib/optimize-copy";
import type { ChannelSnapshot, SnapshotCheckStatus } from "@/lib/channel-snapshot";
import styles from "./channel-snapshot-panel.module.css";

function getStatusLabel(status: SnapshotCheckStatus) {
  switch (status) {
    case "pass":
      return optimizeReadinessCopy.statusLabel.pass;
    case "warn":
      return optimizeReadinessCopy.statusLabel.warn;
    default:
      return optimizeReadinessCopy.statusLabel.fail;
  }
}

function getStatusClass(status: SnapshotCheckStatus) {
  switch (status) {
    case "pass":
      return styles.statusPass;
    case "warn":
      return styles.statusWarn;
    default:
      return styles.statusFail;
  }
}

export function ChannelSnapshotPanel({ snapshot }: { snapshot: ChannelSnapshot }) {
  const readinessStatus = snapshot.readinessStatus;

  return (
    <div className={styles.root}>
      <div className={styles.topGrid}>
        <Card variant="strong" className={styles.mainCard}>
          <div className={styles.topRow}>
            <div className={styles.copy}>
              <p className={cn("section-kicker", styles.eyebrow)}>{optimizeFlowLabelCopy.snapshotPanel.sectionKicker}</p>
              <h3 className={styles.headline}>
                {optimizeFlowLabelCopy.snapshotPanel.headline}
              </h3>
              <p className={styles.body}>{snapshot.readyReason}</p>
            </div>

            <div className={styles.badges}>
              <Badge>{snapshot.kindLabel}</Badge>
              <Badge variant="neutral">{snapshot.supportLabel}</Badge>
              <span
                className={cn(
                  styles.statusChip,
                  getStatusClass(readinessStatus),
                )}
              >
                {snapshot.readyLabel}
              </span>
            </div>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaCard}>
              <p className={cn("section-kicker", styles.metaLabel)}>{optimizeFlowLabelCopy.snapshotPanel.hostLabel}</p>
              <p className={styles.metaValue}>{snapshot.hostLabel}</p>
            </div>
            <div className={styles.metaCard}>
              <p className={cn("section-kicker", styles.metaLabel)}>{snapshot.pathLabel}</p>
              <p className={styles.metaValue}>{snapshot.pathValue}</p>
            </div>
            <div className={styles.metaCard}>
              <p className={cn("section-kicker", styles.metaLabel)}>{snapshot.identifierLabel}</p>
              <p className={styles.metaValue}>
                {snapshot.identifier ?? optimizeReadinessCopy.identifierFallback}
              </p>
            </div>
          </div>

          <div className={styles.metaCard}>
            <p className={cn("section-kicker", styles.metaLabel)}>{optimizeFlowLabelCopy.snapshotPanel.normalizedUrlLabel}</p>
            <p className={styles.metaValueBreak}>{snapshot.normalizedUrl}</p>
          </div>
        </Card>

        <Card variant="heroBright" className={styles.sideCard}>
          <p className={cn("section-kicker", styles.eyebrow)}>{optimizeFlowLabelCopy.snapshotPanel.confidenceRailLabel}</p>
          <h3 className={styles.headline}>
            {snapshot.confidenceLabel + optimizeFlowLabelCopy.snapshotPanel.confidenceSuffix}
          </h3>
          <p className={styles.body}>{snapshot.confidenceReason}</p>

          <div className={styles.metaCard}>
            <p className={cn("section-kicker", styles.metaLabel)}>{optimizeFlowLabelCopy.snapshotPanel.nextSurfaceLabel}</p>
            <p className={styles.metaValueBreak}>{snapshot.surfaceHint}</p>
          </div>

          <div className={styles.checksPreview}>
            {snapshot.checks.slice(0, 2).map((check) => (
              <div
                key={check.label}
                className={styles.checkPreviewCard}
              >
                <p className={styles.checkTitle}>{check.label}</p>
                <span
                  className={cn(
                    styles.statusChip,
                    getStatusClass(check.status),
                  )}
                >
                  {getStatusLabel(check.status)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className={styles.checksGrid}>
        {snapshot.checks.map((check) => (
          <div key={check.label} className={styles.checkCard}>
            <div className={styles.checkTop}>
              <p className={styles.checkLabel}>{check.label}</p>
              <span
                className={cn(
                  styles.statusChip,
                  getStatusClass(check.status),
                )}
              >
                {getStatusLabel(check.status)}
              </span>
            </div>
            <p className={styles.checkBody}>{check.detail}</p>
          </div>
        ))}
      </div>

      <div className={styles.bottomGrid}>
        <Card variant="tint" className={styles.listCard}>
          <p className={cn("section-kicker", styles.listEyebrow)}>{optimizeFlowLabelCopy.snapshotPanel.whatWeKnowLabel}</p>
          <div className={styles.pointList}>
            {snapshot.summaryPoints.map((point) => (
              <div key={point} className={styles.pointItem}>
                <span className={styles.dotBrand} />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="tint" className={styles.listCard}>
          <p className={cn("section-kicker", styles.listEyebrow)}>{optimizeFlowLabelCopy.snapshotPanel.whatToReadNextLabel}</p>
          <div className={styles.pointList}>
            {snapshot.nextSignals.map((point) => (
              <div key={point} className={styles.pointItem}>
                <span className={styles.dotSlate} />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
