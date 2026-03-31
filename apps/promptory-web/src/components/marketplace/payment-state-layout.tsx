import Link from "next/link";

import { Hero } from "@/components/marketplace/hero";
import { CTAButton } from "@/components/ui/cta-button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { cn } from "@/lib/cn";
import styles from "./payment-state-layout.module.css";

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
    <div className={styles.pageShell}>
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
          <div className={styles.asideGrid}>
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

      <div className={styles.contentWrap}>
        <div className={styles.panel}>
          <div className={styles.panelGrid}>
            <div className={styles.infoCard}>
              <p className={cn("section-kicker", styles.mutedKicker)}>현재 상황</p>
              <p className={styles.bodyText}>{body}</p>
              {detail ? <p className={styles.detailText}>{detail}</p> : null}
            </div>
            <div className={styles.infoCard}>
              <p className={cn("section-kicker", styles.mutedKicker)}>{isError ? "다음 단계" : "바로 이어서 하기"}</p>
              <p className={styles.bodyText}>{usabilityCopy}</p>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <p className={cn("section-kicker", styles.mutedKicker)}>다음 액션</p>
            <div className={styles.actionRow}>
              <CTAButton href={primaryHref} size="lg" className={styles.fullWidthButton}>
                {primaryLabel}
              </CTAButton>
              <CTAButton href={secondaryHref} variant="outline" size="lg" className={styles.fullWidthButton}>
                {secondaryLabel}
              </CTAButton>
            </div>
          </div>

          <div className={styles.footerCopy}>
            <p>
              {isError
                ? "실패나 취소 직후에는 상태 반영이 늦을 수 있습니다. 먼저 주문 내역을 확인하고, 필요할 때만 새 주문으로 다시 시작하는 흐름을 권장합니다."
                : "구매 후 상태는 반영됐습니다. 라이브러리에서 바로 이어서 검증하거나 주문 내역에서 결제 이력을 다시 볼 수 있습니다."}
            </p>
          </div>
        </div>

        <div className={styles.returnNote}>
          <Link href={secondaryHref} className={styles.returnLink}>
            주문 흐름이 헷갈리면 먼저 {secondaryLabel}
          </Link>{" "}
          로 돌아가 현재 상태를 다시 확인할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
