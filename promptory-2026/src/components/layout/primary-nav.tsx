"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

type NavItem = {
  href: string;
  label: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav({
  items,
  mobile = false,
}: {
  items: NavItem[];
  mobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              mobile
                ? "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium shadow-sm transition-all duration-300"
                : "relative text-sm font-medium transition-all duration-300",
              mobile
                ? isActive
                  ? "border-[var(--brand-600)] bg-[var(--brand-600)] text-white shadow-[var(--shadow-md)]"
                  : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-700)] hover:border-[var(--brand-300)] hover:bg-[var(--surface-1)] hover:shadow-[var(--shadow-sm)]"
                : isActive
                  ? "text-[var(--slate-900)]"
                  : "text-[var(--slate-600)] hover:text-[var(--slate-900)]",
              !mobile && "py-1 px-1 hover:-translate-y-0.5 hover:shadow-sm"
            )}
          >
            {/* Active indicator for desktop */}
            {!mobile && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--brand-500)] transition-all duration-300",
                  isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />
            )}
            <span className={cn(!mobile && "relative z-10")}>{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}
