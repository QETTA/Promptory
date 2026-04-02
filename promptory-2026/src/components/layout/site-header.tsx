import Link from "next/link";

import { LogoutButton } from "@/components/account/logout-button";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { PromptoryLogo } from "@/components/layout/promptory-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { marketingNavItems } from "@/lib/request-to-resolution-content";
import { getOptionalUser, getProfileByUserId } from "@/lib/server/auth";

export async function SiteHeader() {
  const user = await getOptionalUser();
  const profile = user ? await getProfileByUserId(user.id) : null;
  const displayLabel = profile?.display_name?.trim() || user?.email || "로그인 필요";

  return (
    <header className="sticky top-0 z-[1100] border-b border-[var(--line)] bg-white/85 shadow-[var(--shadow-sm)] backdrop-blur-xl backdrop-saturate-[180%]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 transition-transform duration-100 active:scale-[0.96]">
          <PromptoryLogo compactOnMobile showTaglineOnMobile={false} />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          <PrimaryNav items={marketingNavItems} />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/contact"
            className="hidden h-8 items-center rounded-full px-3 text-[0.8rem] font-medium text-[var(--slate-500)] transition-all duration-150 hover:bg-[var(--surface-2)] hover:text-[var(--slate-900)] md:inline-flex active:scale-[0.96]"
          >
            문의
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
                  "px-2.5 text-[0.8rem] text-[var(--slate-600)] sm:px-3 sm:text-[0.84rem] active:scale-[0.96]",
                )}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "relative h-8 overflow-hidden rounded-full px-3.5 text-[0.8rem] before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-500 hover:before:left-full sm:h-8 sm:px-3 sm:text-[0.84rem]",
                )}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-[var(--line)] bg-white/70 backdrop-blur-lg xl:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
          <PrimaryNav items={marketingNavItems} mobile />
        </div>
      </div>
    </header>
  );
}
