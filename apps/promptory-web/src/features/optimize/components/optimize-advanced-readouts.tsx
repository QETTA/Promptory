import { ChannelBrowserReviewPanel } from "@/components/channel-intake/channel-browser-review-panel";
import { ChannelCopyDraftPanel } from "@/components/channel-intake/channel-copy-draft-panel";
import { ChannelDiagnosisPreview } from "@/components/channel-intake/channel-diagnosis-preview";
import { ChannelSurfaceReadPanel } from "@/components/channel-intake/channel-surface-read-panel";
import { cn } from "@/lib/cn";
import styles from "./optimize-advanced-readouts.module.css";

import type { OptimizeWorkspaceView } from "../types/optimize-page-data";

export function OptimizeAdvancedReadouts({ workspace }: { workspace: OptimizeWorkspaceView }) {
  if (!workspace.advanced.show) {
    return null;
  }

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <div className={styles.summaryInner}>
          <p className={cn("section-kicker", styles.eyebrow)}>보조 패널</p>
          <p className={styles.title}>{workspace.advanced.title}</p>
          <p className={styles.body}>
            기본 흐름을 다 본 뒤 필요할 때만 자세한 읽기와 초안을 펼쳐 확인합니다.
          </p>
        </div>
      </summary>
      <div className={styles.content}>
        {workspace.advanced.showSurface && workspace.surface ? <ChannelSurfaceReadPanel surface={workspace.surface} /> : null}

        {workspace.advanced.showDiagnosis && workspace.snapshot ? (
          <ChannelDiagnosisPreview
            brief={workspace.brief}
            parsed={workspace.parsed}
            snapshot={workspace.snapshot}
            surface={workspace.surface}
          />
        ) : null}

        {workspace.advanced.showCopyDraft && workspace.snapshot ? (
          <ChannelCopyDraftPanel
            brief={workspace.brief}
            parsed={workspace.parsed}
            snapshot={workspace.snapshot}
            surface={workspace.surface}
          />
        ) : null}

        {workspace.advanced.showBrowserReview && workspace.snapshot && workspace.surface ? (
          <ChannelBrowserReviewPanel
            brief={workspace.brief}
            parsed={workspace.parsed}
            snapshot={workspace.snapshot}
            surface={workspace.surface}
          />
        ) : null}
      </div>
    </details>
  );
}
