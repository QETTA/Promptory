import type { ReactNode } from "react";

import { supportedChannelHeadline } from "@/lib/channel-intake";
import { cn } from "@/lib/cn";
import styles from "./hero.module.css";

export function Hero({
  eyebrow,
  title,
  body,
  actions,
  aside,
  mobileBodyHidden = false,
  mobileCompact = false,
  mobileAsideFirst = false,
  mobileContentHidden = false,
  mobileTitleSmall = false,
  theme = "market",
  tone = "dark",
  showQuickFacts = true,
}: {
  actions?: ReactNode;
  aside?: ReactNode;
  body?: ReactNode;
  eyebrow?: string;
  mobileBodyHidden?: boolean;
  mobileCompact?: boolean;
  mobileAsideFirst?: boolean;
  mobileContentHidden?: boolean;
  mobileTitleSmall?: boolean;
  showQuickFacts?: boolean;
  theme?: "auth" | "catalog" | "detail" | "library" | "market" | "orders" | "payment" | "workspace";
  title: ReactNode;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  const themeClass = {
    auth: styles.themeAuth,
    catalog: styles.themeCatalog,
    detail: styles.themeDetail,
    library: styles.themeLibrary,
    market: styles.themeMarket,
    orders: styles.themeOrders,
    payment: styles.themePayment,
    workspace: styles.themeWorkspace,
  }[theme];

  return (
    <section className={cn(styles.root, isDark ? styles.dark : styles.light, isDark ? themeClass : null)}>
      <div className={cn(styles.overlay, isDark ? styles.overlayDark : styles.overlayLight)} />
      {!isDark ? <div className={styles.divider} /> : null}
      <div className={cn(styles.shell, mobileCompact ? styles.shellCompact : null)}>
        <div
          className={cn(
            styles.content,
            mobileAsideFirst ? styles.contentAsideFirst : null,
            mobileContentHidden ? styles.contentHiddenMobile : null,
            !isDark ? styles.contentLight : null,
            mobileCompact ? styles.contentCompact : styles.contentRegular,
          )}
        >
          {eyebrow ? (
            <p className={cn("section-kicker", isDark ? styles.eyebrowDark : styles.eyebrowLight)}>{eyebrow}</p>
          ) : null}
          <h1
            className={cn(
              styles.title,
              mobileCompact ? styles.titleCompact : null,
              mobileTitleSmall ? styles.titleSmall : null,
              isDark ? styles.titleDark : styles.titleLight,
            )}
          >
            {title}
          </h1>
          {body ? (
            <div
              className={cn(
                styles.body,
                mobileCompact ? styles.bodyCompact : styles.bodyRegular,
                mobileBodyHidden ? styles.bodyHiddenMobile : null,
                isDark ? styles.bodyDark : styles.bodyLight,
              )}
            >
              {body}
            </div>
          ) : null}
          {actions ? (
            <div className={cn(styles.actions, mobileCompact ? styles.actionsCompact : styles.actionsRegular)}>{actions}</div>
          ) : null}
          {!isDark && showQuickFacts ? (
            <div className={styles.quickFacts}>
              {[
                ["URL 입력", supportedChannelHeadline],
                ["Ask 진단", "병목과 목표를 먼저 고정"],
                ["실행 연결", "추천 스택을 바로 적용"],
              ].map(([label, value]) => (
                <div key={label} className={styles.quickFactCard}>
                  <p className={styles.quickFactLabel}>{label}</p>
                  <p className={styles.quickFactValue}>{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className={cn(styles.aside, mobileAsideFirst ? styles.asideFirst : null)}>
            {!isDark ? <div className={styles.asideGlow} /> : null}
            <div className={styles.asideInner}>{aside}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
