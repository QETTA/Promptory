import { Card } from "@/components/ui/card";
import { CopyActionButton } from "@/components/ui/copy-action-button";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSnapshot } from "@/lib/channel-snapshot";
import { buildOptimizationBriefSummary, type OptimizationBrief } from "@/lib/optimization-brief";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import styles from "./channel-copy-draft-panel.module.css";

export function ChannelCopyDraftPanel({
  brief,
  parsed,
  snapshot,
  surface,
}: {
  brief: OptimizationBrief;
  parsed: ParsedChannelInputSuccess;
  snapshot: ChannelSnapshot;
  surface?: ChannelSurfaceRead | null;
}) {
  const summary = buildOptimizationBriefSummary({ brief, parsed, snapshot, surface });

  return (
    <div className={styles.root}>
      <Card variant="strong" className={styles.headerCard}>
        <div className={styles.headerRow}>
          <div className={styles.copy}>
            <p className={`section-kicker ${styles.eyebrow}`}>{optimizeFlowLabelCopy.copyDraft.header}</p>
            <h3 className={styles.title}>
              {summary.copyDraftHeadline}
            </h3>
            <p className={styles.body}>{summary.copyDraftBody}</p>
          </div>
          <CopyActionButton
            currentUrl
            label={optimizeFlowLabelCopy.copyDraft.copyLinkLabel}
            size="sm"
            variant="outline"
            successTitle={optimizeFlowLabelCopy.copyDraft.copyLinkSuccessTitle}
            successDescription={optimizeFlowLabelCopy.copyDraft.copyLinkSuccessDescription}
          />
        </div>
      </Card>

      <div className={styles.draftGrid}>
        {summary.copyDrafts.map((draft) => (
          <div key={draft.title} className={styles.draftCard}>
            <div className={styles.draftHead}>
              <div>
                <p className={`section-kicker ${styles.draftLabel}`}>{draft.title}</p>
                <p className={styles.draftBody}>{draft.body}</p>
              </div>
            </div>

            <div className={styles.variantGrid}>
              <div className={styles.variantCard}>
                <div className={styles.variantHead}>
                  <p className={styles.variantTitle}>{optimizeFlowLabelCopy.copyDraft.aDraftTitle}</p>
                  <CopyActionButton
                    label={optimizeFlowLabelCopy.copyDraft.aDraftLabel}
                    size="sm"
                    variant="subtle"
                    text={draft.draft}
                    successTitle={optimizeFlowLabelCopy.copyDraft.aDraftSuccess}
                    successDescription={`${draft.title}${optimizeFlowLabelCopy.copyDraft.titleSuffix}`}
                  />
                </div>
                <p className={styles.variantText}>{draft.draft}</p>
              </div>

              {draft.alternateDraft ? (
                <div className={styles.variantCardMuted}>
                  <div className={styles.variantHead}>
                    <p className={styles.variantTitle}>{optimizeFlowLabelCopy.copyDraft.bDraftTitle}</p>
                    <CopyActionButton
                      label={optimizeFlowLabelCopy.copyDraft.bDraftLabel}
                      size="sm"
                      variant="subtle"
                      text={draft.alternateDraft}
                      successTitle={optimizeFlowLabelCopy.copyDraft.bDraftSuccess}
                      successDescription={`${draft.title} 대안 초안을 복사했습니다.`}
                    />
                  </div>
                  <p className={styles.variantTextStrong}>{draft.alternateDraft}</p>
                </div>
              ) : null}
            </div>

            <div className={styles.metaGrid}>
              <div>
                <p className={styles.metaLabel}>{optimizeFlowLabelCopy.copyDraft.placementTitle}</p>
                <p className={styles.metaBody}>{draft.placement}</p>
              </div>
              {draft.experimentHint ? (
                <div>
                  <p className={styles.metaLabel}>{optimizeFlowLabelCopy.copyDraft.experimentTitle}</p>
                  <p className={styles.metaBody}>{draft.experimentHint}</p>
                </div>
              ) : null}
              {draft.compareHint ? (
                <div>
                  <p className={styles.metaLabel}>{optimizeFlowLabelCopy.copyDraft.compareTitle}</p>
                  <p className={styles.metaBody}>{draft.compareHint}</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
