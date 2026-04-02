"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

function BoundaryShell({
  title,
  body,
  onReset,
  showRetry,
  className,
}: {
  title: string;
  body: string;
  onReset?: () => void;
  showRetry?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900", className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-rose-800">{body}</p>
      {showRetry && onReset ? (
        <div className="mt-4">
          <Button type="button" variant="outline" onClick={onReset}>
            다시 시도
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function ErrorBoundary({
  onReset,
  showRetry,
  title = "문제가 발생했습니다.",
  body = "잠시 후 다시 시도해 주세요.",
  children,
}: {
  onReset?: () => void;
  showRetry?: boolean;
  title?: string;
  body?: string;
  children?: ReactNode;
}) {
  return children ? <>{children}</> : <BoundaryShell title={title} body={body} onReset={onReset} showRetry={showRetry} />;
}

export function SectionErrorBoundary({
  onReset,
  showRetry,
}: {
  onReset?: () => void;
  showRetry?: boolean;
}) {
  return (
    <BoundaryShell
      title="섹션을 불러오는 중 문제가 발생했습니다."
      body="입력 내용은 그대로 두고 다시 시도할 수 있습니다."
      onReset={onReset}
      showRetry={showRetry}
    />
  );
}
