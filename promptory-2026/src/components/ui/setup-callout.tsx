import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";

export function SetupCallout(props: {
  body: string;
  title: string;
}) {
  return (
    <Card variant="tint" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="section-kicker text-[var(--brand-700)]">Setup Required</p>
          <h2 className="mt-2 text-[1.05rem] font-semibold tracking-tight text-[var(--slate-950)]">{props.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--slate-700)]">{props.body}</p>
        </div>
        <div className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[var(--slate-600)]">
          환경 설정
        </div>
      </div>

      <div className="mt-4">
        <CTAButton href="/setup" variant="outline" size="sm">
          환경설정 가이드 보기
        </CTAButton>
      </div>
    </Card>
  );
}
