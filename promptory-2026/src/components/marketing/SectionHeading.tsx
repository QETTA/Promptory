import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
  bodyClassName?: string;
  badgeVariant?: "default" | "neutral" | "inverse";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
  titleClassName,
  eyebrowClassName,
  bodyClassName,
  badgeVariant = "default",
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn(alignClasses[align], className)}>
      {eyebrow && (
        <Badge
          variant={badgeVariant}
          className={cn(
            "mb-2 text-sm font-semibold",
            align === "center" && "mx-auto",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          "text-2xl font-bold text-slate-950 sm:text-3xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-4 text-base text-slate-600 max-w-2xl",
            align === "center" && "mx-auto",
            bodyClassName
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

interface SectionHeadingSimpleProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeadingSimple({
  children,
  align = "center",
  className,
}: SectionHeadingSimpleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h2
      className={cn(
        "text-2xl font-bold text-slate-950 sm:text-3xl",
        alignClasses[align],
        className
      )}
    >
      {children}
    </h2>
  );
}
