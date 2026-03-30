"use client";

import { Alert } from "@/components/primitives/Alert";
import { Button } from "@/components/primitives/Button";
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PartialFailureAlertProps {
  totalCount: number;
  successCount: number;
  errorCount: number;
  onRetry?: () => void;
  onContinue?: () => void;
  errorMessage?: string;
}

function PartialFailureAlert({
  totalCount,
  successCount,
  errorCount,
  onRetry,
  onContinue,
  errorMessage = "일부 문장이 길이 제한으로 분석되지 않았습니다.",
}: PartialFailureAlertProps) {
  return (
    <Alert
      color="warning"
      title={`일부 문장 분석 실패 (${errorCount}/${totalCount})`}
      description={`${successCount}개 문장은 성공적으로 분석되었으나, ${errorCount}개 문장은 처리 중 문제가 발생했습니다. ${errorMessage}`}
      actions={
        <>
          <Button size="sm" variant="secondary" onClick={onRetry}>
            <ArrowPathIcon className="w-4 h-4 mr-1" />
            재시도
          </Button>
          <Button size="sm" onClick={onContinue}>
            계속하기
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </>
      }
    />
  );
}

export { PartialFailureAlert };
