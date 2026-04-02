import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const sizeClasses = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

export function PageContainer({
  children,
  className,
  padding,
  size = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: keyof typeof sizeClasses;
  padding?: "none" | "default";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        padding === "none" ? "" : "px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PageSection({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <section className={cn("py-12 sm:py-16", className)} {...props}>
      {children}
    </section>
  );
}
