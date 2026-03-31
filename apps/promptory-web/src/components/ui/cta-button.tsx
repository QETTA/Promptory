"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { trackClientTelemetryEvent } from "@/lib/telemetry/client";
import type { PromptoryEventName } from "@/lib/telemetry/contracts";

type CTAButtonProps = {
  href?: string;
  telemetryEventName?: PromptoryEventName;
  telemetryPayload?: Record<string, unknown>;
} & ButtonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href">;

export function CTAButton({
  href,
  className,
  onClick,
  size,
  telemetryEventName,
  telemetryPayload,
  variant,
  ...props
}: CTAButtonProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (telemetryEventName) {
      trackClientTelemetryEvent({
        name: telemetryEventName,
        payload: telemetryPayload,
      });
    }

    onClick?.(event as never);
  }

  if (href) {
    return <Link href={href} className={cn(buttonVariants({ size, variant }), className)} onClick={handleClick} {...props} />;
  }

  return <Button className={className} size={size} variant={variant} onClick={handleClick} {...props} />;
}
