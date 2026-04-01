"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, cardPresets } from "./card";
import { Button } from "./button";
import { AlertCircle, RefreshCw, Home } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 *
 * Usage:
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */

interface ErrorBoundaryProps {
  /** Content to be rendered within the error boundary */
  children?: ReactNode;
  /** Custom fallback component to render when error occurs */
  fallback?: ReactNode;
  /** Callback when error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Callback when user clicks retry */
  onReset?: () => void;
  /** Whether to show the retry button */
  showRetry?: boolean;
  /** Additional classes for the error container */
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Default error fallback UI
 */
function DefaultErrorFallback({
  error,
  onReset,
  showRetry = true,
  className,
}: {
  error?: Error;
  onReset?: () => void;
  showRetry?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-[50vh] items-center justify-center p-4", className)}>
      <Card className={cn(cardPresets.strong, "w-full max-w-lg p-8 text-center")}>
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--error)]/10">
          <AlertCircle className="h-8 w-8 text-[var(--error)]" />
        </div>

        {/* Error Title */}
        <h2 className="mb-3 text-xl font-semibold text-[var(--ink-primary)]">
          문제가 발생했습니다
        </h2>

        {/* Error Message */}
        <p className="mb-2 text-sm text-[var(--ink-secondary)]">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>

        {/* Technical Details (dev only) */}
        {process.env.NODE_ENV === "development" && error && (
          <div className="mb-6 mt-4 rounded-lg bg-[var(--surface-2)] p-4 text-left">
            <p className="mb-2 text-xs font-semibold text-[var(--ink-secondary)]">
              개발자 정보:
            </p>
            <pre className="overflow-x-auto text-xs text-[var(--error)]">
              {error.message}
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-[var(--ink-tertiary)]">
                    Stack trace
                  </summary>
                  <code className="mt-2 block whitespace-pre-wrap text-[var(--ink-tertiary)]">
                    {error.stack}
                  </code>
                </details>
              )}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {showRetry && onReset && (
            <Button onClick={onReset} variant="default" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              다시 시도
            </Button>
          )}
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            홈으로
          </Button>
        </div>
      </Card>
    </div>
  );
}

/**
 * Error Boundary Class Component
 * React error boundaries must be class components
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    // e.g., Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production") {
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = () => {
    // Reset the error boundary state
    this.setState({ hasError: false, error: undefined });

    // Call optional onReset callback
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error fallback
      return (
        <DefaultErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
          showRetry={this.props.showRetry}
          className={this.props.className}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Section-level Error Boundary
 * Smaller error boundary for isolating errors in specific page sections
 */
export function SectionErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      {...props}
      fallback={
        <Card className={cn(cardPresets.tint, "p-6")}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--error)]/10">
              <AlertCircle className="h-5 w-5 text-[var(--error)]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-medium text-[var(--ink-primary)]">
                섹션 로드 실패
              </h3>
              <p className="mb-3 text-sm text-[var(--ink-secondary)]">
                이 섹션을 불러오는 중 문제가 발생했습니다.
              </p>
              {props.showRetry !== false && (
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  새로고침
                </Button>
              )}
            </div>
          </div>
        </Card>
      }
    />
  );
}

/**
 * Card-level Error Boundary
 * Minimal error boundary for card components
 */
export function CardErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      {...props}
      fallback={
        <Card className={cn(cardPresets.default, "border-[var(--error)]/30 p-4")}>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-4 w-4 text-[var(--error)]" />
            <span className="text-sm text-[var(--ink-secondary)]">
              콘텐츠를 불러올 수 없습니다
            </span>
          </div>
        </Card>
      }
    />
  );
}

export default ErrorBoundary;
