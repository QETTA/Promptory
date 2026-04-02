import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  inline:
    "text-[var(--brand-700)] underline-offset-4 transition hover:text-[var(--brand-800)] hover:underline",
  muted:
    "text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]",
  nav: "text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]",
  button:
    "inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-primary)] shadow-[var(--shadow-xs)] transition hover:border-[var(--line-hover)] hover:bg-[var(--surface-2)]",
} as const;

export interface BrandLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: keyof typeof variantClasses;
  external?: boolean;
}

export function BrandLink({
  className,
  href,
  variant = "inline",
  external,
  rel,
  target,
  ...props
}: BrandLinkProps) {
  const resolvedExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(variantClasses[variant], className);

  if (resolvedExternal) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        className={classes}
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}
