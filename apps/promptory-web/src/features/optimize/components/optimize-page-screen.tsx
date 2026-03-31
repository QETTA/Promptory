import type { ReactNode } from "react";

import { ChannelIntakeCard } from "@/components/channel-intake/channel-intake-card";
import { ChannelResultStack } from "@/components/channel-intake/channel-result-stack";
import { ChannelSnapshotPanel } from "@/components/channel-intake/channel-snapshot-panel";
import { OptimizationBriefBuilder } from "@/components/channel-intake/optimization-brief-builder";
import { ChatPreviewCard } from "@/components/marketplace/chat-preview-card";
import { Hero } from "@/components/marketplace/hero";
import { Card } from "@/components/ui/card";
import { supportedChannelCatalog } from "@/lib/channel-intake";
import { optimizeFirstReplyPreview } from "@/lib/promptory-chat-preview-copy";
import { optimizeEntryIntakeCopy } from "@/lib/promptory-entry-copy";

import type { OptimizePageViewModel } from "../types/optimize-page-data";
import { OptimizeAdvancedReadouts } from "./optimize-advanced-readouts";
import { OptimizeSidebar } from "./optimize-sidebar";
import { OptimizeWorkspaceSummaryCard } from "./optimize-workspace-summary-card";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import { cn } from "@/lib/cn";
import styles from "./optimize-page-screen.module.css";

function WorkspaceStage({
  eyebrow,
  title,
  children,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className={styles.stage}>
      <div>
        <p className={cn("section-kicker", styles.stageEyebrow)}>{eyebrow}</p>
        <h2 className={styles.stageTitle}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function OptimizePageScreen({ view }: { view: OptimizePageViewModel }) {
  const workspace = view.workspace;

  return (
    <div className={styles.page}>
      <Hero
        eyebrow={view.hero.eyebrow}
        mobileBodyHidden
        mobileCompact
        mobileTitleSmall
        theme="workspace"
        tone="light"
        showQuickFacts={false}
        title={view.hero.title}
        body={<p>{view.hero.body}</p>}
        aside={
          <ChannelIntakeCard
            defaultValue={view.input.defaultValue}
            {...optimizeEntryIntakeCopy}
          />
        }
      />

      <div className={styles.content}>
        {view.screenState === "empty" ? (
          <div className={styles.emptyGrid}>
            <ChatPreviewCard
              {...optimizeFirstReplyPreview}
              title={view.emptyState.title}
              description={view.emptyState.body}
              actions={supportedChannelCatalog.slice(0, 3).map((item) => ({
                href: `/optimize?url=${encodeURIComponent(item.url)}`,
                label: `${item.label}로 시작`,
                variant: "outline" as const,
              }))}
            />

            <Card variant="tint" className={styles.supportedCard}>
              <p className={cn("section-kicker", styles.supportedEyebrow)}>{view.emptyState.supportedChannelsTitle}</p>
              <div className={styles.supportedList}>
                {supportedChannelCatalog.map((item) => (
                  <div key={item.kind} className={styles.supportedItem}>
                    <p className={styles.supportedItemTitle}>{item.label}</p>
                    <p className={styles.supportedItemBody}>{item.summary}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : view.screenState === "invalid" ? (
          <Card variant="tint" className={styles.invalidCard}>
            <p>{view.invalidState.message}</p>
            <p className={styles.invalidHint}>{view.invalidState.hint}</p>
          </Card>
        ) : workspace ? (
          <div className={styles.workspaceStack}>
            <OptimizeWorkspaceSummaryCard workspace={workspace} />

            <div className={styles.mobileSidebar}>
              <OptimizeSidebar mobile workspace={workspace} />
            </div>

            <div className={styles.workspaceGrid}>
              <div className={styles.mainColumn}>
                {workspace.snapshot ? (
                  <WorkspaceStage
                    eyebrow={optimizeFlowLabelCopy.stage.stage1}
                    title={optimizeFlowLabelCopy.stageTitle.stage1}
                  >
                    <ChannelSnapshotPanel snapshot={workspace.snapshot} />
                  </WorkspaceStage>
                ) : null}

                {workspace.snapshot ? (
                  <WorkspaceStage
                    eyebrow={optimizeFlowLabelCopy.stage.stage2}
                    title={optimizeFlowLabelCopy.stageTitle.stage2}
                  >
                    <OptimizationBriefBuilder
                      activeAsk={workspace.activeAsk}
                      brief={workspace.brief}
                      moduleCategory={workspace.railPlan?.category}
                      parsed={workspace.parsed}
                      snapshot={workspace.snapshot}
                      surface={workspace.surface}
                    />
                  </WorkspaceStage>
                ) : null}

                {workspace.summary && workspace.railPlan ? (
                  <WorkspaceStage
                    eyebrow={optimizeFlowLabelCopy.stage.stage3}
                    title={optimizeFlowLabelCopy.stageTitle.stage3}
                  >
                    <ChannelResultStack
                      isComplete={workspace.brief.isComplete}
                      railPlan={workspace.railPlan}
                      railProducts={workspace.railProducts}
                      summary={workspace.summary}
                    />
                  </WorkspaceStage>
                ) : null}

                <OptimizeAdvancedReadouts workspace={workspace} />
              </div>

              <OptimizeSidebar workspace={workspace} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
