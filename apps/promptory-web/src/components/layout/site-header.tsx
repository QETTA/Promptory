import Link from "next/link";

import { LogoutButton } from "@/components/account/logout-button";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { PromptoryLogo } from "@/components/layout/promptory-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { getOptionalUser, getProfileByUserId } from "@/lib/server/auth";
import styles from "./site-header.module.css";

export async function SiteHeader() {
  const user = await getOptionalUser();
  const profile = user ? await getProfileByUserId(user.id) : null;
  const displayLabel = profile?.display_name?.trim() || user?.email || "로그인 필요";
  const navItems = [
    { href: "/optimize", label: "작업면" },
    { href: "/products", label: "실행 팩" },
    { href: "/library", label: "보관함" },
    ...(user
      ? [
          { href: "/orders", label: "주문" },
          { href: "/seller/products", label: "제작실" },
        ]
      : []),
  ];
  const mobileNavItems = user
    ? [
        { href: "/optimize", label: "작업면" },
        { href: "/products", label: "실행 팩" },
        { href: "/library", label: "보관함" },
        { href: "/orders", label: "주문" },
        { href: "/seller/products", label: "제작실" },
      ]
    : [
        { href: "/optimize", label: "작업면" },
        { href: "/products", label: "실행 팩" },
        { href: "/library", label: "보관함" },
      ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <PromptoryLogo compactOnMobile showTaglineOnMobile={false} />
        </Link>

        <nav className={styles.desktopNav}>
          <PrimaryNav items={navItems} />
        </nav>

        <div className={styles.actions}>
          <Link href="/setup" className={styles.setupLink}>
            설정
          </Link>
          {user ? (
            <>
              <span className={styles.displayLabel}>{displayLabel}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className={styles.textAction}>
                로그인
              </Link>
              <Link href="/signup" className={cn(buttonVariants({ size: "sm" }), styles.primaryAction)}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.mobileNavWrap}>
        <div className={styles.mobileNav}>
          <PrimaryNav items={mobileNavItems} mobile />
        </div>
      </div>
    </header>
  );
}
