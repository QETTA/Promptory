import * as React from "react";

import { cn } from "@/lib/cn";
import styles from "@/components/ui/field.module.css";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(styles.input, className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
