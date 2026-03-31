import { OptimizationRunCard } from "@/components/channel-intake/optimization-run-card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import styles from "./optimize-sidebar.module.css";

import type { OptimizeWorkspaceView } from "../types/optimize-page-data";
import { renderOptimizeAction } from "./optimize-action-button";

export function OptimizeSidebar({
  mobile = false,
  workspace,
}: {
  mobile?: boolean;
  workspace: OptimizeWorkspaceView;
}) {
  if (mobile) {
    return (
      <div className={styles.mobileWrap}>
        <Card variant="strong" className={styles.mobileCard}>
          <div className={styles.mobileTop}>
            <div>
              <p className={cn("section-kicker", styles.mobileEyebrow)}>{optimizeFlowLabelCopy.nextAction}</p>
              <p className={styles.mobileTitle}>{workspace.sidebar.summary.current}</p>
            </div>
            <div className={styles.mobileChip}>
              {workspace.sidebar.summary.next}
            </div>
          </div>
          <div className={styles.mobileActions}>
            {workspace.sidebar.saveAction ? renderOptimizeAction(workspace.sidebar.saveAction) : null}
            {renderOptimizeAction(workspace.sidebar.railAction)}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.desktopWrap}>
      <Card variant="tint" className={styles.panelCard}>
        <p className={cn("section-kicker", styles.panelEyebrow)}>{optimizeFlowLabelCopy.nextAction}</p>
        <h3 className={styles.panelTitle}>
          {optimizeFlowLabelCopy.sidebarContinue}
        </h3>
        <div className={styles.itemList}>
          {workspace.sidebar.cards.map((item) => (
            <div key={item.title} className={styles.itemCard}>
              <p className={styles.itemLabel}>{item.title}</p>
              <p className={styles.itemBody}>{item.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.panelActions}>
          {workspace.sidebar.saveAction ? renderOptimizeAction(workspace.sidebar.saveAction) : null}
          {renderOptimizeAction(workspace.sidebar.railAction)}
        </div>
      </Card>

      {workspace.saveRail ? (
        workspace.saveRail.kind === "signed_in_empty" ? (
          <Card variant="tint" className={styles.railTextCard}>
            {workspace.saveRail.body}
          </Card>
        ) : (
          <Card variant={workspace.saveRail.kind === "signed_in_save" ? "strong" : "tint"} className={styles.saveCard}>
            <div>
              <div>
                <p className="section-kicker text-[var(--brand-700)]">
                  {workspace.saveRail.kind === "signed_in_save"
                    ? optimizeFlowLabelCopy.sidebar.saveSignedIn
                    : optimizeFlowLabelCopy.sidebar.saveSignedOut}
                </p>
                <h3 className={styles.saveTitle}>{workspace.saveRail.title}</h3>
                <p className={styles.saveBody}>{workspace.saveRail.body}</p>
              </div>
              <div className={styles.panelActions}>{renderOptimizeAction(workspace.saveRail.cta)}</div>
            </div>
          </Card>
        )
      ) : null}

      {workspace.savedRuns.length > 0 ? (
        <div className={styles.savedRuns}>
          {workspace.savedRuns.map((run) => (
            <OptimizationRunCard key={run.id} run={run} />
          ))}
        </div>
      ) : null}

      <Card variant="tint" className={styles.truthCard}>
        <p className="section-kicker text-[var(--brand-700)]">{optimizeFlowLabelCopy.truthItems.headline}</p>
        <div className={styles.truthList}>
          {workspace.truthItems.map((item) => (
            <div key={item} className={styles.truthItem}>
              {item}
            </div>
          ))}
        </div>
        <div className={styles.panelActions}>{renderOptimizeAction(workspace.sidebar.railAction)}</div>
      </Card>
    </div>
  );
}
