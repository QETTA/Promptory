"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

function getDownloadErrorMessage(status: number, fallback?: string) {
  if (status === 401) {
    return "다운로드하려면 다시 로그인해 주세요.";
  }

  if (status === 403) {
    return fallback ?? "구매가 완료된 실행 팩만 다운로드할 수 있습니다.";
  }

  if (status === 503) {
    return "다운로드 설정이 아직 준비되지 않았습니다. /setup에서 환경 상태를 확인해 주세요.";
  }

  return fallback ?? "다운로드 요청에 실패했습니다.";
}

export function DownloadButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    const popup = window.open("", "_blank", "noopener,noreferrer");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/downloads/${orderId}`);
      const payload = (await response.json().catch(() => null)) as { error?: string; url?: string } | null;

      if (!response.ok || !payload?.url) {
        throw new Error(getDownloadErrorMessage(response.status, payload?.error));
      }

      if (!popup) {
        throw new Error("파일 창을 열지 못했습니다. 브라우저 팝업 차단 설정을 확인해 주세요.");
      }

      popup.location.replace(payload.url);
    } catch (downloadError) {
      popup?.close();
      setError(downloadError instanceof Error ? downloadError.message : "다운로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleDownload} variant="default" disabled={loading}>
        {loading ? "다운로드 준비 중..." : "다운로드"}
      </Button>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export { getDownloadErrorMessage };
