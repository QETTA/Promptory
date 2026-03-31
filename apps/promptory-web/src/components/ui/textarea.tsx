import * as React from "react";

import { cn } from "@/lib/cn";
import styles from "@/components/ui/field.module.css";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(styles.textarea, className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
