import { cn } from "@/lib/cn";

interface PriceBadgeProps {
  price: string;
  setupPrice?: string;
  className?: string;
}

export function PriceBadge({ price, setupPrice, className }: PriceBadgeProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-slate-950">{price}</span>
        {setupPrice && (
          <span className="text-xs text-slate-500">{setupPrice}</span>
        )}
      </div>
      <p className="text-[10px] text-slate-400">
        Core Package 기준 (Add-on 별도)
      </p>
    </div>
  );
}
