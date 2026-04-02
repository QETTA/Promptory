import { cn } from "@/lib/cn";

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
    <div className={cn("flex items-center gap-3", compactOnMobile ? "gap-2.5 sm:gap-3" : null, className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className={cn("shrink-0", compactOnMobile ? "h-9 w-9 sm:h-10 sm:w-10" : "h-10 w-10")}
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

      <div className="min-w-0">
        <div
          className={cn(
            "font-display leading-none tracking-[-0.045em] text-[var(--slate-950)]",
            compactOnMobile ? "text-[1.22rem] sm:text-[1.45rem]" : "text-[1.45rem]",
          )}
        >
          Promptory
        </div>
        {showTagline ? (
          <div
            className={cn(
              "mt-1 font-medium uppercase text-[var(--slate-500)]",
              compactOnMobile ? "text-[9px] tracking-[0.14em] sm:text-[10px] sm:tracking-[0.12em]" : "text-[10px] tracking-[0.12em]",
              !showTaglineOnMobile ? "hidden sm:block" : null,
            )}
          >
            REQUEST-TO-RESOLUTION
          </div>
        ) : null}
      </div>
    </div>
  );
}
