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
                  ? "border-blue-600 bg-blue-600 text-white shadow-md"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-white hover:shadow-sm"
                : isActive
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900",
              !mobile && "py-1 px-1 hover:-translate-y-0.5 hover:shadow-sm"
            )}
          >
            {/* Active indicator for desktop */}
            {!mobile && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-500 transition-all duration-300",
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
