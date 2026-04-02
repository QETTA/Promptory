import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { OatmealContainer } from "./oatmeal-container";
import { OatmealEyebrow } from "./oatmeal-eyebrow";
import { OatmealSubheading } from "./oatmeal-subheading";
import { OatmealText } from "./oatmeal-text";

export interface OatmealSectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: ReactNode;
  headline?: ReactNode;
  subheadline?: ReactNode;
  cta?: ReactNode;
}

export function OatmealSection({
  className,
  eyebrow,
  headline,
  subheadline,
  cta,
  children,
  ...props
}: OatmealSectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)} {...props}>
      <OatmealContainer className="space-y-10 sm:space-y-14">
        {headline ? (
          <div className="max-w-3xl space-y-4">
            {eyebrow ? <OatmealEyebrow>{eyebrow}</OatmealEyebrow> : null}
            <OatmealSubheading>{headline}</OatmealSubheading>
            {subheadline ? <OatmealText>{subheadline}</OatmealText> : null}
            {cta ? <div className="pt-2">{cta}</div> : null}
          </div>
        ) : null}
        {children}
      </OatmealContainer>
    </section>
  );
}
