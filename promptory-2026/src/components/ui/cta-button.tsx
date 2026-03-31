import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type CTAButtonProps = {
  href?: string;
} & ButtonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href">;

export function CTAButton({ href, className, size, variant, ...props }: CTAButtonProps) {
  if (href) {
    return <Link href={href} className={cn(buttonVariants({ size, variant }), className)} {...props} />;
  }

  return <Button className={className} size={size} variant={variant} {...props} />;
}
