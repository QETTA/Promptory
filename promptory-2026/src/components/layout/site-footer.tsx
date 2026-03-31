import Link from "next/link";

import { PromptoryLogo } from "@/components/layout/promptory-logo";

export function SiteFooter() {
  const footerLinks = [
    { href: "/packages", label: "패키지" },
    { href: "/demo/slack", label: "데모" },
    { href: "/contact", label: "문의" },
  ];
  const packageLinks = [
    { href: "/packages/website-diagnosis-agent", label: "웹사이트 진단" },
    { href: "/packages/campaign-brief-agent", label: "캠페인 초안" },
    { href: "/packages/korea-local-ops-agent", label: "한국 운영 지원" },
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface-1)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <PromptoryLogo />
            <p className="text-sm leading-relaxed text-[var(--slate-500)]">
              Slack에 URL을내면,
              <br />
              진단부터 실행 초안까지 팀 대화 안에서 끝납니다.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[var(--slate-900)]">메뉴</p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--slate-500)] transition-colors duration-150 hover:text-[var(--brand-700)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[var(--slate-900)]">패키지</p>
            <ul className="flex flex-col gap-2">
              {packageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--slate-500)] transition-colors duration-150 hover:text-[var(--brand-700)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--line)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--slate-400)]">
            © 2026 Promptory. All rights reserved.
          </p>
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
