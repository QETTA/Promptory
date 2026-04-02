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
        <span className="card-display text-[var(--slate-950)]">{price}</span>
        {setupPrice && (
          <span className="body-copy-xs text-[var(--slate-500)]">{setupPrice}</span>
        )}
      </div>
      <p className="body-copy-xs text-[var(--slate-400)]">
        Starter / Department 기준 (deployment · connector scope 별도)
      </p>
    </div>
  );
}
