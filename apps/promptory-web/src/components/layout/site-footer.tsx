import { getPaymentsMode } from "@/lib/env/server";
import { getPaymentsModeSummary } from "@/lib/promptory-display";
import { promptoryWebSurfaceFooterCopy } from "@/lib/promptory-web-surface-copy";
import { PromptoryLogo } from "@/components/layout/promptory-logo";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const paymentsMode = getPaymentsMode();
  const paymentsMessage = getPaymentsModeSummary(paymentsMode);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyBlock}>
          <PromptoryLogo />
          <p className={styles.title}>{promptoryWebSurfaceFooterCopy.title}</p>
          <p className={styles.body}>
            {promptoryWebSurfaceFooterCopy.body}
          </p>
        </div>
        <div className={styles.statusCard}>
          {paymentsMessage}
        </div>
      </div>
    </footer>
  );
}
