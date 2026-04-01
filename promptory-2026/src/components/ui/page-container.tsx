import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "default" | "narrow" | "wide" | "full";
  padding?: "default" | "small" | "none";
}

const sizeClasses = {
  default: "max-w-6xl",
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
  full: "",
} as const;

const paddingClasses = {
  default: "px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
  small: "px-4 py-4 sm:px-6 lg:px-8",
  none: "",
} as const;

export function PageContainer({
  children,
  className,
  size = "default",
  padding = "default",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "section" | "div" | "main";
}

export function PageSection({
  children,
  className,
  as: Component = "section",
  ...props
}: PageSectionProps) {
  return (
    <Component
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
