"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function CatalystSidebar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-0 flex-col bg-[var(--slate-950)] text-white",
        className,
      )}
      {...props}
    />
  );
}

export function CatalystSidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("border-b border-white/10 px-4 py-4", className)} {...props} />
  );
}

export function CatalystSidebarBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 space-y-6 overflow-y-auto px-3 py-4", className)} {...props} />;
}

export function CatalystSidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("border-t border-white/10 px-3 py-4", className)} {...props} />
  );
}

export function CatalystSidebarSection({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function CatalystSidebarHeading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/50", className)} {...props} />
  );
}

export interface CatalystSidebarItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  exact?: boolean;
}

export function CatalystSidebarItem({
  className,
  href,
  icon,
  children,
  exact = false,
  ...props
}: CatalystSidebarItemProps) {
  const pathname = usePathname();
  const current = exact ? pathname === href : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium leading-5 transition",
        current
          ? "bg-white text-[var(--slate-950)] shadow-[var(--shadow-sm)]"
          : "text-white/72 hover:bg-white/10 hover:text-white",
        className,
      )}
      {...props}
    >
      {icon ? <span className="size-4 shrink-0">{icon}</span> : null}
      <span className="truncate">{children}</span>
    </Link>
  );
}
