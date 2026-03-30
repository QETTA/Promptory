"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { reasonColors, statusColors, badgeColors } from "@/lib/tokens";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "ai" | "clarity" | "impact" | "flow" | "urgency" | "neutral" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color = "neutral", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full";

    // =====================================================
    // Token Integration: Using centralized token system
    // Maps badge colors to reasonColors, statusColors, and badgeColors
    // Prevents duplication and ensures consistency
    // =====================================================
    const colorStyles = {
      // Reason types from tokens
      clarity: reasonColors.clarity,
      impact: reasonColors.impact,
      flow: reasonColors.flow,
      urgency: reasonColors.urgency,
      // Badge types from tokens
      ai: badgeColors.ai,
      neutral: badgeColors.neutral,
      // Status types from tokens
      success: { bg: statusColors.completed.bg, text: statusColors.completed.text, border: "" },
      warning: { bg: statusColors.processing.bg, text: statusColors.processing.text, border: "" },
      error: { bg: statusColors.error.bg, text: statusColors.error.text, border: "" },
    };

    const config = colorStyles[color];

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, config.bg, config.text, sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
