import Link from "next/link";

import { getPublicEnvStatus } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { getPaymentsModeSummary } from "@/lib/promptory-display";
import styles from "./setup-banner.module.css";

export function SetupBanner() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const isReady =
    publicStatus.hasPublicEnv &&
    serverStatus.hasSupabaseServiceRole &&
    (serverStatus.paymentMode !== "toss" || (serverStatus.hasTossSecret && publicStatus.hasTossClientKey));

  if (isReady) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <p className={`${styles.copy} ${styles.copyMobile}`}>
          점검 모드 · 테스트 구매 흐름 확인 가능
        </p>
        <p className={`${styles.copy} ${styles.copyDesktop}`}>
          운영 전 점검 모드입니다. {getPaymentsModeSummary(serverStatus.paymentMode)}
        </p>
        <Link href="/setup" className={styles.link}>
          점검 보기
        </Link>
      </div>
    </div>
  );
}
