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
                ? "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium shadow-sm transition-all duration-300"
                : "relative whitespace-nowrap px-1 py-1 text-[0.82rem] font-medium transition-all duration-300 xl:text-[0.9rem]",
              mobile
                ? isActive
                  ? "border-[var(--brand-600)] bg-[var(--brand-600)] text-white shadow-[var(--shadow-md)]"
                  : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-700)] hover:border-[var(--brand-300)] hover:bg-[var(--surface-1)] hover:shadow-[var(--shadow-sm)]"
                : isActive
                  ? "text-[var(--slate-900)]"
                  : "text-[var(--slate-600)] hover:text-[var(--slate-900)]",
              !mobile && "hover:-translate-y-0.5 hover:shadow-sm"
            )}
            title={item.label}
          >
            {!mobile && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--brand-500)] transition-all duration-300",
                  isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
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
