import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { Card } from "@/components/ui/card";

type BasicOrder = {
  id: string;
  status?: string | null;
  product?: {
    name?: string | null;
    title?: string | null;
    summary?: string | null;
    description?: string | null;
  } | null;
};

export function OrderCard({
  order,
  paymentMode,
  canCheckout = false,
  variant,
}: {
  order: BasicOrder;
  paymentMode: string;
  canCheckout?: boolean;
  variant: "pending" | "history";
}) {
  const title = order.product?.title ?? order.product?.name ?? "실행 팩 주문";
  const summary = order.product?.summary ?? order.product?.description ?? "실행 팩 주문 상태를 확인합니다.";
  const showCheckout = variant === "pending" && canCheckout;

  return (
    <Card variant="strong" className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={variant === "pending" ? "default" : "neutral"}>
              {variant === "pending" ? "결제 대기" : "주문 기록"}
            </Badge>
            {order.status ? <span className="text-xs text-[var(--slate-500)]">{order.status}</span> : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[var(--slate-950)]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {showCheckout ? (
            <CTAButton href={`/checkout/${order.id}`}>
              {paymentMode === "dev_stub" ? "개발용 checkout 열기" : "checkout 열기"}
            </CTAButton>
          ) : null}
          <CTAButton href="/library" variant="outline">
            라이브러리 보기
          </CTAButton>
        </div>
      </div>
    </Card>
  );
}
