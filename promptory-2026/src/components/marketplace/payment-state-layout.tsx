import Link from "next/link";

import { Hero } from "@/components/marketplace/hero";
import { CTAButton } from "@/components/ui/cta-button";
import { DashboardCard } from "@/components/ui/dashboard-card";

interface PaymentStateLayoutProps {
  body: string;
  detail?: string | null;
  eyebrow: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  title: string;
  tone?: "default" | "error";
}

export function PaymentStateLayout({
  body,
  detail,
  eyebrow,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
  tone = "default",
}: PaymentStateLayoutProps) {
  const isError = tone === "error";
  const statusValue = isError ? "확인 필요" : "사용 가능";
  const nextActionDetail = isError
    ? "주문 내역에서 현재 상태를 먼저 확인한 뒤, 필요하면 실행 팩 상세에서 새 주문을 만들면 됩니다."
    : "라이브러리나 주문 내역으로 이동해 바로 다음 단계를 이어갈 수 있습니다.";
  const usabilityCopy = isError
    ? "결제가 끝나지 않은 경우에도 주문 상태는 잠시 남아 있을 수 있습니다. 주문 내역을 확인한 뒤 새 주문이 필요한지 판단하면 됩니다."
    : "구매한 실행형 시스템이 계정에 연결되었습니다. 라이브러리에서 바로 다시 열거나 다운로드 가능 여부를 확인할 수 있습니다.";

  return (
    <div className="pb-16">
      <Hero
        eyebrow={eyebrow}
        theme="payment"
        title={title}
        body={
          <>
            <p>{body}</p>
            {detail ? <p>{detail}</p> : null}
          </>
        }
        aside={
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <DashboardCard
              caption="현재 상태"
              value={statusValue}
              detail={
                isError
                  ? "주문 상태를 확인한 뒤 새 주문 또는 다른 실행 팩 흐름으로 이동할 수 있습니다."
                  : "구매 후 흐름이 반영됐는지 바로 확인할 수 있습니다."
              }
            />
            <DashboardCard
              caption="다음 액션"
              value={primaryLabel}
              detail={nextActionDetail}
            />
          </div>
        }
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--surface-1)] p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] p-4">
              <p className="section-kicker text-[var(--slate-500)]">현재 상황</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">{body}</p>
              {detail ? <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{detail}</p> : null}
            </div>
            <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-2)] p-4">
              <p className="section-kicker text-[var(--slate-500)]">{isError ? "다음 단계" : "바로 이어서 하기"}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">{usabilityCopy}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <p className="section-kicker text-[var(--slate-500)]">다음 액션</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton href={primaryHref} size="lg" className="w-full sm:w-auto">
                {primaryLabel}
              </CTAButton>
              <CTAButton href={secondaryHref} variant="outline" size="lg" className="w-full sm:w-auto">
                {secondaryLabel}
              </CTAButton>
            </div>
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--slate-600)]">
            <p>
              {isError
                ? "실패나 취소 직후에는 상태 반영이 늦을 수 있습니다. 먼저 주문 내역을 확인하고, 필요할 때만 새 주문으로 다시 시작하는 흐름을 권장합니다."
                : "구매 후 상태는 반영됐습니다. 라이브러리에서 바로 이어서 검증하거나 주문 내역에서 결제 이력을 다시 볼 수 있습니다."}
            </p>
          </div>
        </div>

        <div className="mt-4 text-sm leading-7 text-[var(--slate-500)]">
          <Link href={secondaryHref} className="font-medium text-[var(--slate-700)]">
            주문 흐름이 헷갈리면 먼저 {secondaryLabel}
          </Link>{" "}
          로 돌아가 현재 상태를 다시 확인할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
