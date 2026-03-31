"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import {
  supportedChannelCatalog,
  supportedChannelCount,
  supportedChannelExamples,
  supportedChannelHeadline,
} from "@/lib/channel-intake";
import { optimizeFlowLabelCopy } from "@/lib/optimize-copy";
import { trackClientTelemetryEvent } from "@/lib/telemetry/client";
import styles from "./channel-intake-card.module.css";

export type ChannelIntakeDensity = "default" | "compact" | "workspace";

export type ChannelIntakeCardProps = {
  action?: string;
  afterInputHint?: string;
  body?: string;
  className?: string;
  defaultValue?: string;
  density?: ChannelIntakeDensity;
  flowBody?: string;
  flowLabel?: string;
  submitLabel?: string;
  title?: string;
};

export function ChannelIntakeCard({
  action = "/optimize",
  afterInputHint,
  body = optimizeFlowLabelCopy.entry.body,
  className,
  defaultValue = "",
  density = optimizeFlowLabelCopy.entry.density,
  flowBody,
  flowLabel,
  submitLabel,
  title = optimizeFlowLabelCopy.entry.title,
}: ChannelIntakeCardProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");

    trackClientTelemetryEvent({
      name: "channel_url_submitted",
      payload: {
        action,
        hasValue: typeof url === "string" && url.trim().length > 0,
        url: typeof url === "string" ? url.trim().slice(0, 240) : null,
      },
    });
  }

  const isCompact = density !== "default";
  const showSupportGrid = density === "default";
  const showDetailedSteps = density === "default";
  const showBottomTruth = density === "default";
  const showExampleLinks = density === "default";
  const isWorkspace = density === "workspace";
  const highlightedExamples = supportedChannelExamples.slice(0, 3);
  const highlightedChannels = supportedChannelCatalog.slice(0, 4);
  const resolvedSubmitLabel =
    submitLabel ??
    (isWorkspace
      ? optimizeFlowLabelCopy.entry.workspaceSubmitLabel
      : isCompact
        ? optimizeFlowLabelCopy.entry.compactSubmitLabel
        : optimizeFlowLabelCopy.entry.defaultSubmitLabel);
  const resolvedFlowLabel =
    flowLabel ??
    (isWorkspace
      ? optimizeFlowLabelCopy.entry.workspaceFlowLabel
      : isCompact
        ? optimizeFlowLabelCopy.entry.compactFlowLabel
        : optimizeFlowLabelCopy.entry.defaultFlowLabel);
  const resolvedFlowBody =
    flowBody ??
    (isWorkspace
      ? optimizeFlowLabelCopy.entry.workspaceFlowBody
      : isCompact
        ? optimizeFlowLabelCopy.entry.compactFlowBody
        : optimizeFlowLabelCopy.entry.defaultFlowBody);
  const resolvedAfterInputHint = afterInputHint ?? (isCompact ? optimizeFlowLabelCopy.entry.compactAfterInputHint : null);
  const connectorBody = optimizeFlowLabelCopy.entry.connectorBody.replace("{supportedChannelHeadline}", supportedChannelHeadline);

  return (
    <Card variant="heroBright" className={cn(styles.root, className)}>
      <div
        className={cn(
          styles.headerCard,
          isWorkspace ? styles.headerCardWorkspace : isCompact ? styles.headerCardCompact : styles.headerCardDefault,
        )}
      >
        <div className={styles.headerTop}>
          <div>
            <p className={styles.titleKicker}>{optimizeFlowLabelCopy.entry.titleKicker}</p>
            <h2 className={cn(styles.title, isCompact ? styles.titleCompact : styles.titleDefault)}>{title}</h2>
          </div>
          <p className={styles.countChip}>
            {supportedChannelCount}채널 지원
          </p>
        </div>
        <p className={styles.summaryBody}>{body}</p>

        {showSupportGrid ? (
          <div className={styles.supportGrid}>
            {highlightedChannels.map((channel) => (
              <p
                key={channel.kind}
                className={styles.supportChip}
              >
                {channel.label}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <form action={action} className={styles.intakeForm} onSubmit={handleSubmit}>
        <div className={styles.urlInputCard}>
          <div className={styles.urlInputRow}>
            <Input
              type="text"
              inputMode="url"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              name="url"
              required
              defaultValue={defaultValue}
              placeholder={optimizeFlowLabelCopy.entry.inputPlaceholder}
              className={styles.urlInput}
            />
            <Button type="submit" size="lg" className={styles.submitButton}>
              {resolvedSubmitLabel}
            </Button>
          </div>
        </div>
        <div className={styles.flowHintRow}>
          <span className={styles.flowHintLabel}>{resolvedFlowLabel}</span>
          <span>{resolvedFlowBody}</span>
        </div>
      </form>

      {resolvedAfterInputHint ? (
        <div className={styles.afterInputHint}>
          {resolvedAfterInputHint}
        </div>
      ) : null}

      {showDetailedSteps ? (
        <div className={styles.detailedSteps}>
          {optimizeFlowLabelCopy.entry.steps.map((line) => (
            <div key={line} className={styles.stepItem}>
              {line}
            </div>
          ))}
        </div>
      ) : null}

      {showExampleLinks ? (
        <div className={styles.exampleSection}>
          <p className={styles.sectionLabel}>{optimizeFlowLabelCopy.entry.exampleLabel}</p>
          <div className={styles.exampleLinkSection}>
            {highlightedExamples.map((example) => (
              <Link
                key={example.label}
                href={`${action}?url=${encodeURIComponent(example.url)}`}
                className={styles.exampleChip}
              >
                {example.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {showBottomTruth ? (
        <Card variant="tint" className={styles.resultCard}>
          <p className={styles.resultTitle}>{isWorkspace ? optimizeFlowLabelCopy.entry.workspaceResultTitle : optimizeFlowLabelCopy.entry.defaultResultTitle}</p>
          {connectorBody}
        </Card>
      ) : null}
    </Card>
  );
}
