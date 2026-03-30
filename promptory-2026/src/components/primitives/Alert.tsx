"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { 
  XCircleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon 
} from "@heroicons/react/20/solid";
// =====================================================
// Token Integration: Import consolidated alert styles
// Eliminates duplication and ensures single source of truth
// =====================================================
import { alertStyles, type AlertColor } from "@/lib/tokens";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: AlertColor;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

// Icon registry - separated from styles for better tree-shaking
const alertIcons: Record<AlertColor, typeof InformationCircleIcon> = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, color = "info", title, description, actions, children, ...props }, ref) => {
    // =====================================================
    // Bottleneck Fix: Direct token access (no function calls)
    // O(1) lookup vs O(n) computed styles
    // =====================================================
    const style = alertStyles[color];
    const Icon = alertIcons[color];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "rounded-xl p-4", // Base styles
          style.container,
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", style.icon)} aria-hidden="true" />
          <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow */}
            {title && <h4 className="font-medium">{title}</h4>}
            {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
            {children}
            {actions && <div className="flex items-center gap-2 mt-3">{actions}</div>}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
