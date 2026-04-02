import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { OatmealContainer } from "@/components/vendor/oatmeal";

const widthClasses = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

export interface BrandContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: keyof typeof widthClasses;
}

export function BrandContainer({ className, width = "default", ...props }: BrandContainerProps) {
  return <OatmealContainer className={cn(widthClasses[width], className)} {...props} />;
}
