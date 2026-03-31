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
                ? "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition"
                : "text-sm font-medium transition",
              mobile
                ? isActive
                  ? "border-[var(--brand-600)] bg-[var(--brand-600)] text-white"
                  : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-700)]"
                : isActive
                  ? "text-[var(--slate-950)]"
                  : "text-[var(--slate-700)] hover:text-[var(--slate-950)]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
