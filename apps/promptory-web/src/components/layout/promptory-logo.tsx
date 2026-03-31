import { cn } from "@/lib/cn";
import styles from "./promptory-logo.module.css";

type PromptoryLogoProps = {
  className?: string;
  compactOnMobile?: boolean;
  showTagline?: boolean;
  showTaglineOnMobile?: boolean;
};

export function PromptoryLogo({
  className,
  compactOnMobile = false,
  showTagline = true,
  showTaglineOnMobile = true,
}: PromptoryLogoProps) {
  return (
    <div className={cn(styles.root, compactOnMobile ? styles.rootCompact : "", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className={cn(styles.mark, compactOnMobile ? styles.markCompact : "")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="56" height="56" rx="18" fill="var(--surface-1)" />
        <rect x="4" y="4" width="56" height="56" rx="18" stroke="var(--line-strong)" strokeWidth="2" />
        <path
          d="M22 46V18H35.6C43.4 18 48.5 22.4 48.5 29.4C48.5 36.5 43.4 41 35.6 41H29V46H22Z"
          fill="var(--slate-900)"
        />
        <path
          d="M29 25V34H35.1C38.7 34 41 32.3 41 29.5C41 26.7 38.7 25 35.1 25H29Z"
          fill="var(--surface-1)"
        />
        <rect x="39" y="38" width="9" height="9" rx="3" fill="var(--brand-600)" />
        <path
          d="M41.5 21.5L46 17"
          stroke="var(--brand-600)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.copy}>
        <div className={cn(styles.wordmark, compactOnMobile ? styles.wordmarkCompact : "")}>
          Promptory
        </div>
        {showTagline ? (
          <div
            className={cn(
              styles.tagline,
              compactOnMobile ? styles.taglineCompact : "",
              !showTaglineOnMobile ? styles.taglineHiddenMobile : "",
            )}
          >
            CHANNEL OPTIMIZATION ENGINE
          </div>
        ) : null}
      </div>
    </div>
  );
}
