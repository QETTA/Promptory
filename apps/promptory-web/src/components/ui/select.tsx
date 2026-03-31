import * as React from "react";

import { cn } from "@/lib/cn";
import styles from "@/components/ui/field.module.css";

export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, ...props }, ref) => {
    return (
      <span className={styles.selectWrap}>
        <select
          ref={ref}
          className={cn(styles.select, className)}
          {...props}
        />
        <span className={styles.selectIcon}>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6.5 8 10l4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  },
);

Select.displayName = "Select";
