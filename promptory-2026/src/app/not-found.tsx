import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--slate-950)]">
        페이지를 찾지 못했습니다.
      </h1>
      <p className="mt-4 text-sm leading-7 text-[var(--slate-600)]">
        링크가 잘못되었거나 실행 팩이 비공개 처리되었을 수 있습니다.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
