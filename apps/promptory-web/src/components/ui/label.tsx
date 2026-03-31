import * as React from "react";

import { cn } from "@/lib/cn";
import styles from "@/components/ui/field.module.css";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(styles.label, className)}
      {...props}
    />
  );
}
