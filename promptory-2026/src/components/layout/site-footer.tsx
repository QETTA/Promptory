import Link from "next/link";

import { PromptoryLogo } from "@/components/layout/promptory-logo";
import { marketingFooterGroups } from "@/lib/marketing-ia";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface-1)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col gap-2">
            <PromptoryLogo />
            <p className="max-w-md text-sm leading-relaxed text-[var(--slate-500)]">
              Promptory는 Slack 안에서 요청을 받고, 근거를 찾고, 승인 받고, 시스템에 실제로 반영하는 request-to-resolution package를 만듭니다.
            </p>
          </div>

          {marketingFooterGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[var(--slate-900)]">{group.title}</p>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-sm text-[var(--slate-500)] transition-colors duration-150 hover:text-[var(--brand-700)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-5 sm:flex-row">
          <p className="text-xs text-[var(--slate-400)]">© 2026 Promptory. All rights reserved.</p>
          <a
            href="mailto:hello@promptory.kr"
            className="text-xs text-[var(--slate-400)] transition-colors duration-150 hover:text-[var(--brand-700)]"
          >
            hello@promptory.kr
          </a>
        </div>
      </div>
    </footer>
  );
}
