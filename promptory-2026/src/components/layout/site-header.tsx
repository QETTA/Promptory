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
    <header className="sticky top-0 z-[1100] border-b border-slate-200/60 bg-white/85 backdrop-blur-xl backdrop-saturate-[180%] shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 transition-transform duration-100 active:scale-[0.96]">
          <PromptoryLogo compactOnMobile showTaglineOnMobile={false} />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <PrimaryNav items={navItems} />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/setup"
            className="hidden h-8 items-center rounded-full px-3 text-[0.8rem] font-medium text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 md:inline-flex active:scale-[0.96]"
          >
            설정
          </Link>
          {user ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm text-slate-500 md:inline">{displayLabel}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-2.5 text-[0.8rem] text-slate-600 sm:px-3 sm:text-[0.84rem] active:scale-[0.96]",
                )}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-8 rounded-full px-3.5 text-[0.8rem] sm:h-8 sm:px-3 sm:text-[0.84rem] relative overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-500 hover:before:left-full",
                )}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile nav */}
      <div className="border-t border-slate-200/60 lg:hidden bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
          <PrimaryNav items={mobileNavItems} mobile />
        </div>
      </div>
    </header>
  );
}
