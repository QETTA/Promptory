import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldInputClass } from "@/components/ui/field";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(fieldInputClass, className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
