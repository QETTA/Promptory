import * as React from "react";

import { cn } from "@/lib/cn";
import { fieldTextareaClass } from "@/components/ui/field";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(fieldTextareaClass, className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
