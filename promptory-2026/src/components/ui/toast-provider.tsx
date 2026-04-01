"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "./icons";
import { duration, easing } from "./animation";

/**
 * Toast/Notification System
 * Provides standardized toast notifications across the application
 * with consistent styling, animations, and behavior
 */

export type ToastTone = "error" | "warning" | "info" | "success";

export type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Duration in milliseconds (default: 4200ms) */
  duration?: number;
  /** Whether to show close button (default: true) */
  closable?: boolean;
  /** Whether to pause on hover (default: true) */
  pauseOnHover?: boolean;
};

type ToastRecord = ToastInput & {
  id: string;
  tone: ToastTone;
  createdAt: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

// Icon mapping for each tone
const toneIcons: Record<ToastTone, typeof Info> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

// Color mapping using CSS variables
const toneStyles: Record<ToastTone, { bg: string; border: string; icon: string }> = {
  success: {
    bg: "bg-[var(--success)]/10",
    border: "border-[var(--success)]/20",
    icon: "text-[var(--success)]",
  },
  error: {
    bg: "bg-[var(--error)]/10",
    border: "border-[var(--error)]/20",
    icon: "text-[var(--error)]",
  },
  warning: {
    bg: "bg-[var(--warning)]/10",
    border: "border-[var(--warning)]/20",
    icon: "text-[var(--warning)]",
  },
  info: {
    bg: "bg-[var(--info)]/10",
    border: "border-[var(--info)]/20",
    icon: "text-[var(--info)]",
  },
};

// Individual Toast Component
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const durationMs = toast.duration ?? 4200;
  const pauseOnHover = toast.pauseOnHover !== false;
  const closable = toast.closable !== false;

  const Icon = toneIcons[toast.tone];
  const styles = toneStyles[toast.tone];

  // Progress bar animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onDismiss(toast.id);
          return 0;
        }
        return prev - (100 / (durationMs / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, durationMs, toast.id, onDismiss]);

  return (
    <div
      className={cn(
        "pointer-events-auto relative overflow-hidden rounded-xl border",
        "bg-[var(--surface-1)] shadow-lg",
        "transform transition-all duration-300 ease-out",
        "animate-in slide-in-from-right-full fade-in",
        styles.border
      )}
      style={{
        animation: `slideIn ${duration.fast}ms ${easing.outExpo}, fadeIn ${duration.fast}ms ${easing.outExpo}`,
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className={cn("flex gap-3 p-4", styles.bg)}>
        {/* Icon */}
        <div className="shrink-0">
          <Icon className={cn("h-5 w-5", styles.icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--ink-primary)]">
            {toast.title}
          </p>
          {toast.description && (
            <p className="mt-1 text-sm text-[var(--ink-secondary)] leading-relaxed">
              {toast.description}
            </p>
          )}
        </div>

        {/* Close Button */}
        {closable && (
          <button
            onClick={() => onDismiss(toast.id)}
            className={cn(
              "shrink-0 rounded-lg p-1.5",
              "text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]",
              "hover:bg-[var(--surface-2)] transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]/20"
            )}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--surface-2)]">
        <div
          className={cn(
            "h-full transition-all ease-linear",
            toast.tone === "error" && "bg-[var(--error)]",
            toast.tone === "warning" && "bg-[var(--warning)]",
            toast.tone === "success" && "bg-[var(--success)]",
            toast.tone === "info" && "bg-[var(--info)]"
          )}
          style={{
            width: `${progress}%`,
            transitionDuration: isPaused ? "0ms" : "100ms",
          }}
        />
      </div>
    </div>
  );
}

// Toast Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) =>
      current.map((t) =>
        t.id === id ? { ...t, _removing: true } as any : t
      )
    );

    // Small delay for exit animation
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const tone = input.tone ?? "info";

      setToasts((current) => [
        ...current,
        { ...input, id, tone, createdAt: Date.now() },
      ]);

      // Auto-dismiss after duration
      const durationMs = input.duration ?? 4200;
      window.setTimeout(() => {
        removeToast(id);
      }, durationMs);

      return id;
    },
    [removeToast]
  );

  // Convenience methods
  const success = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, tone: "success" }),
    [toast]
  );

  const error = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, tone: "error" }),
    [toast]
  );

  const info = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, tone: "info" }),
    [toast]
  );

  const warning = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, tone: "warning" }),
    [toast]
  );

  const dismissAll = useCallback(() => {
    toasts.forEach((t) => removeToast(t.id));
  }, [toasts, removeToast]);

  const value = useMemo(
    () => ({
      toast,
      success,
      error,
      info,
      warning,
      dismiss: removeToast,
      dismissAll,
    }),
    [toast, success, error, info, warning, removeToast, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed right-4 top-4 z-[100] flex w-[min(92vw,24rem)] flex-col gap-3"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((item) => (
          <ToastItem
            key={item.id}
            toast={item}
            onDismiss={removeToast}
          />
        ))}
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

// Hook for consuming toast context
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}

export default ToastProvider;
