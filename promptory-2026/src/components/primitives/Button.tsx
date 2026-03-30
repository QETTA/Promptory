"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { colors } from "@/lib/tokens";

// =====================================================
// Simple, explicit props interface - Bottleneck Fix
// Avoiding complex type merging issues
// =====================================================
// =====================================================
// Button Props with backward compatibility
// Supports both 'loading' and 'isLoading' for flexibility
// =====================================================
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** @deprecated Use isLoading instead */
  loading?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  form?: string;
  /** Accessible label for loading state */
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, loading, loadingText, children, ...props }, ref) => {
    // Support both 'loading' and 'isLoading' for backward compatibility
    const loadingState = isLoading ?? loading ?? false;
    // Token-based transition: duration-200 (200ms) aligns with animation.duration.fast (0.15s) + buffer
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // =====================================================
    // Token Integration: Using centralized color tokens
    // Prevents disconnection and ensures consistency
    // =====================================================
    const variants = {
      primary: "text-white hover:opacity-90 active:scale-[0.98]",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 focus:ring-neutral-500",
      outline: "border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800 focus:ring-neutral-500",
      ghost: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800",
      danger: "text-white hover:opacity-90 active:scale-[0.98]",
    };

    // =====================================================
    // Token Integration: Dynamic styles using token values
    // Memoized to prevent recalculation on each render
    // =====================================================
    const dynamicStyles = useMemo(() => {
      if (variant === "primary") {
        return { backgroundColor: colors.ai.core };
      }
      if (variant === "danger") {
        return {
          backgroundColor: colors.error.DEFAULT,
          outlineColor: colors.error.light,
        };
      }
      return undefined;
    }, [variant]);

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={dynamicStyles}
        disabled={loadingState || props.disabled}
        aria-busy={loadingState}
        aria-label={loadingState ? (loadingText || "로딩 중...") : undefined}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loadingState && (
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
