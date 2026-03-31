import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import styles from "./optimize-workspace-summary-card.module.css";

import type { OptimizeWorkspaceView } from "../types/optimize-page-data";
import { renderOptimizeAction } from "./optimize-action-button";

export function OptimizeWorkspaceSummaryCard({ workspace }: { workspace: OptimizeWorkspaceView }) {
  return (
    <Card variant="heroBright" className={styles.card}>
      <div className={styles.layout}>
        <div>
          <p className={cn("section-kicker", styles.eyebrow)}>{optimizeFlowLabelCopy.workspaceKicker}</p>
          <h2 className={styles.title}>먼저 읽은 내용과 다음 액션</h2>
          <div className={styles.chatStack}>
            <div className={styles.messageUserRow}>
              <div className={cn(styles.message, styles.messageUser)}>
                <p className={styles.speaker}>{optimizeFlowLabelCopy.summaryCopy.youLabel}</p>
                <p className={styles.messageBody}>{workspace.snapshot?.normalizedUrl ?? workspace.parsed.normalizedUrl}</p>
              </div>
            </div>
            <div className={styles.messageAssistantRow}>
              <div className={cn(styles.message, styles.messageAssistant)}>
                <p className={styles.speaker}>{optimizeFlowLabelCopy.summaryCopy.promptoryLabel}</p>
                <p className={styles.messageBody}>
                  {workspace.summary?.diagnosisHeadline ?? `${workspace.parsed.kindLabel}로 읽었어요. 공개 표면 기준 병목부터 먼저 고정하고 있습니다.`}
                </p>
              </div>
            </div>
            <div className={styles.messageAssistantRow}>
              <div className={cn(styles.message, styles.messageAssistant)}>
                <p className={styles.speaker}>{optimizeFlowLabelCopy.summaryCopy.nextLabel}</p>
                <p className={styles.messageBody}>{workspace.sidebar.summary.next}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.progressPanel}>
          {workspace.sidebar.cards.map((item) => (
            <div key={item.title} className={styles.progressCard}>
              <p className={styles.progressLabel}>{item.title}</p>
              <p className={styles.progressValue}>{item.body}</p>
            </div>
          ))}
          <div className={styles.actions}>
            {workspace.sidebar.saveAction ? renderOptimizeAction(workspace.sidebar.saveAction) : null}
            {renderOptimizeAction(workspace.sidebar.railAction)}
          </div>
        </div>
      </div>
    </Card>
  );
}
