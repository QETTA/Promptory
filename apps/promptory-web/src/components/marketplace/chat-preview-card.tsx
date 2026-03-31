import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import styles from "./chat-preview-card.module.css";

import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";

export type ChatPreviewMessage = {
  body: ReactNode;
  role: "assistant" | "user";
};

export type ChatPreviewAction = {
  href: string;
  label: string;
  variant?: "default" | "outline" | "subtle";
};

export type ChatPreviewCardProps = {
  actions?: ChatPreviewAction[];
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  messages: ChatPreviewMessage[];
  mobileHideStatus?: boolean;
  mobileMessageLimit?: 2 | 3 | 4 | 5;
  status?: ReactNode;
  title: ReactNode;
};

export function ChatPreviewCard({
  actions,
  className,
  description,
  eyebrow = "대화 예시",
  messages,
  mobileHideStatus = false,
  mobileMessageLimit,
  status,
  title,
}: ChatPreviewCardProps) {
  return (
    <Card variant="strong" className={cn(styles.card, className)}>
      <p className={cn("section-kicker", styles.eyebrow)}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <div className={styles.description}>{description}</div> : null}

      <div
        className={cn(
          styles.messageList,
          mobileMessageLimit === 2 ? styles.messageListLimit2 : "",
          mobileMessageLimit === 3 ? styles.messageListLimit3 : "",
          mobileMessageLimit === 4 ? styles.messageListLimit4 : "",
        )}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              styles.messageRow,
              message.role === "user" ? styles.messageRowUser : styles.messageRowAssistant,
            )}
          >
            <div
              className={cn(
                styles.bubble,
                message.role === "user" ? styles.bubbleUser : styles.bubbleAssistant,
              )}
            >
              <p className={styles.speaker}>
                {message.role === "user" ? "You" : "Promptory"}
              </p>
              <div>{message.body}</div>
            </div>
          </div>
        ))}
      </div>

      {status ? (
        <div className={cn(styles.status, mobileHideStatus ? styles.statusMobileHidden : "")}>{status}</div>
      ) : null}

      {actions?.length ? (
        <div className={styles.actions}>
          {actions.map((action) => (
            <CTAButton key={action.label} href={action.href} size="sm" variant={action.variant ?? "subtle"}>
              {action.label}
            </CTAButton>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
