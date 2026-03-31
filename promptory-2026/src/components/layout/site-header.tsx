import Link from "next/link";

import { LogoutButton } from "@/components/account/logout-button";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { PromptoryLogo } from "@/components/layout/promptory-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { getOptionalUser, getProfileByUserId } from "@/lib/server/auth";

export async function SiteHeader() {
  const user = await getOptionalUser();
  const profile = user ? await getProfileByUserId(user.id) : null;
  const displayLabel = profile?.display_name?.trim() || user?.email || "로그인 필요";
  const navItems = [
    { href: "/packages", label: "패키지" },
    { href: "/demo/slack", label: "데모" },
    { href: "/contact", label: "문의" },
  ];
  const mobileNavItems = [
    { href: "/packages", label: "패키지" },
    { href: "/demo/slack", label: "데모" },
    { href: "/contact", label: "문의" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(249,251,255,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <PromptoryLogo compactOnMobile showTaglineOnMobile={false} />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <PrimaryNav items={navItems} />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/setup"
            className="hidden h-8 items-center rounded-full px-3 text-[0.8rem] font-medium text-[var(--slate-500)] transition hover:bg-[var(--slate-100)] hover:text-[var(--slate-900)] md:inline-flex"
          >
            설정
          </Link>
          {user ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm text-[var(--slate-500)] md:inline">{displayLabel}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-2.5 text-[0.8rem] text-[var(--slate-700)] sm:px-3 sm:text-[0.84rem]",
                )}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-8 rounded-full px-3.5 text-[0.8rem] sm:h-8 sm:px-3 sm:text-[0.84rem]",
                )}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-[var(--line)] lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
          <PrimaryNav items={mobileNavItems} mobile />
        </div>
      </div>
    </header>
  );
}
