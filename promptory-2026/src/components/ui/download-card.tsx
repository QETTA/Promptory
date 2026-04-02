import { DownloadButton } from "@/components/account/download-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type LibraryOrder = {
  id: string;
  product?: {
    name?: string | null;
    summary?: string | null;
    file_path?: string | null;
  } | null;
  status?: string | null;
};

export function DownloadCard({
  order,
  variant,
}: {
  order: LibraryOrder;
  variant: "ready" | "waiting";
}) {
  const title = order.product?.name ?? "실행 팩";
  const summary =
    order.product?.summary ??
    (variant === "ready"
      ? "다운로드 가능한 실행 팩입니다."
      : "파일을 준비 중인 실행 팩입니다.");

  return (
    <Card variant="strong" className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={variant === "ready" ? "default" : "neutral"}>
              {variant === "ready" ? "다운로드 가능" : "파일 준비 중"}
            </Badge>
            {order.status ? <span className="text-xs text-[var(--slate-500)]">{order.status}</span> : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[var(--slate-950)]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{summary}</p>
        </div>
        {variant === "ready" && order.product?.file_path ? (
          <DownloadButton orderId={order.id} />
        ) : (
          <div className="text-sm text-[var(--slate-500)]">준비가 끝나면 여기서 바로 다운로드할 수 있습니다.</div>
        )}
      </div>
    </Card>
  );
}
