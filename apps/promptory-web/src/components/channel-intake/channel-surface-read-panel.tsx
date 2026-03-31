import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import styles from "./channel-surface-read-panel.module.css";

export function ChannelSurfaceReadPanel({ surface }: { surface: ChannelSurfaceRead }) {
  return (
    <Card variant="strong" className={styles.root}>
      <div className={styles.topRow}>
        <div className={styles.copy}>
          <p className={`section-kicker ${styles.eyebrow}`}>{optimizeFlowLabelCopy.surfacePanel.sectionKicker}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{surface.statusLabel}</Badge>
          </div>
          <p className={styles.body}>{surface.statusReason}</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.headlineCard}>
          <p className={styles.cardLabel}>{optimizeFlowLabelCopy.surfacePanel.headlineLabel}</p>
          <p className={styles.headline}>
            {surface.headline ?? optimizeFlowLabelCopy.surfacePanel.headlineDefault}
          </p>
          <p className={styles.description}>
            {surface.description ?? optimizeFlowLabelCopy.surfacePanel.descriptionDefault}
          </p>
        </div>

        <div className={styles.signalCard}>
          <p className={styles.cardLabel}>{optimizeFlowLabelCopy.surfacePanel.actionSignalsLabel}</p>
          <div className={styles.signalList}>
            {surface.actionSignals.length > 0 ? (
              surface.actionSignals.map((signal) => (
                <p key={signal} className={styles.signalItem}>
                  {signal}
                </p>
              ))
            ) : (
              <p className={styles.signalItem}>
                {optimizeFlowLabelCopy.surfacePanel.actionSignalsFallback}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.notesCard}>
          <p className={styles.cardLabel}>{optimizeFlowLabelCopy.surfacePanel.notesLabel}</p>
          <div className={styles.noteList}>
            {surface.notes.map((note) => (
              <p key={note} className={styles.noteItem}>{note}</p>
            ))}
          </div>
        </div>

        {surface.browserFollowupNeeded ? (
          <div className={styles.followupCard}>
            <p className={`${styles.cardLabel} ${styles.brandLabel}`}>{optimizeFlowLabelCopy.surfacePanel.browserFollowupLabel}</p>
            <p className={styles.description}>
              {surface.browserFollowupReason ?? optimizeFlowLabelCopy.surfacePanel.browserFollowupReasonFallback}
            </p>
            <div className={styles.followupList}>
              {surface.browserFollowupPoints.map((point) => (
                <p key={point} className={styles.followupItem}>
                  {point}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
