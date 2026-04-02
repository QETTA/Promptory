import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { OatmealEyebrow, OatmealSubheading, OatmealText } from "@/components/vendor/oatmeal";

const sizeClasses = {
  sm: {
    title: "text-2xl/8 sm:text-3xl/10",
    description: "text-sm/6",
  },
  md: {
    title: "text-3xl/10 sm:text-4xl/11",
    description: "text-base/7",
  },
  lg: {
    title: "text-4xl/11 sm:text-5xl/12",
    description: "text-lg/8",
  },
} as const;

export interface BrandHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  size?: keyof typeof sizeClasses;
}

export function BrandHeading({
  className,
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  size = "md",
  ...props
}: BrandHeadingProps) {
  const tones = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <OatmealEyebrow>{eyebrow}</OatmealEyebrow> : null}
      <div className="max-w-3xl space-y-3">
        <OatmealSubheading className={tones.title}>{title}</OatmealSubheading>
        {description ? <OatmealText className={tones.description}>{description}</OatmealText> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
