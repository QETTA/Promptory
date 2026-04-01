import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export type StoryGridItem = {
  body: string;
  eyebrow?: string;
  points?: string[];
  tone?: "accent" | "default" | "muted";
  title: string;
};

const toneClass = {
  accent: "border-[var(--brand-200)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)]",
  default: "border-[var(--line-strong)] bg-white",
  muted: "border-[var(--line)] bg-[var(--surface-2)]",
} as const;

export function StoryGrid({
  className,
  columns = "3",
  items,
}: {
  className?: string;
  columns?: "2" | "3";
  items: StoryGridItem[];
}) {
  return (
    <div className={cn("grid gap-4", columns === "2" ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((item) => (
        <Card key={item.title} className={cn("flex h-full flex-col p-4 sm:p-5", toneClass[item.tone ?? "default"])}>
          {item.eyebrow ? <p className="section-kicker text-[var(--brand-700)]">{item.eyebrow}</p> : null}
          <h3 className="mt-2 text-[1.02rem] font-semibold tracking-tight text-[var(--slate-950)] sm:text-[1.08rem]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--slate-700)]">{item.body}</p>
          {item.points?.length ? (
            <ul className="mt-3 grid gap-1.5">
              {item.points.map((point) => (
                <li key={point} className="rounded-xl border border-[rgba(148,163,184,0.14)] bg-[var(--surface-1)] px-3 py-2 text-sm leading-6 text-[var(--slate-600)]">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
