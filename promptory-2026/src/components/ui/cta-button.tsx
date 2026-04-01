"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { trackClientTelemetryEvent } from "@/lib/telemetry/client";
import type { PromptoryEventName } from "@/lib/telemetry/contracts";

// Telemetry props
export type CTAButtonTelemetryProps = {
  telemetryEventName?: PromptoryEventName;
  telemetryPayload?: Record<string, unknown>;
};

// Link variant props
export type CTAButtonLinkProps = {
  as?: "link";
  href: string;
} & CTAButtonTelemetryProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href"> &
  Pick<ButtonProps, "size" | "variant">;

// Button variant props
export type CTAButtonElementProps = {
  as?: "button";
  href?: never;
} & CTAButtonTelemetryProps &
  ComponentPropsWithoutRef<typeof Button>;

// Combined discriminated union type
export type CTAButtonProps = CTAButtonLinkProps | CTAButtonElementProps;

// Legacy props for backward compatibility (deprecated)
type LegacyCTAButtonProps = {
  as?: never;
  href?: string;
} & CTAButtonTelemetryProps &
  ButtonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href">;

/**
 * CTA Button component that supports both Link and Button behaviors.
 *
 * Recommended approach (explicit):
 * - Use `as="link"` with `href` for navigation
 * - Use `as="button"` for actions
 *
 * Legacy approach (deprecated, for backward compatibility):
 * - `href` prop auto-detects Link vs Button (will be removed in v2)
 *
 * @example
 * // Explicit link (recommended)
 * <CTAButton as="link" href="/pricing">가격 보기</CTAButton>
 *
 * @example
 * // Explicit button (recommended)
 * <CTAButton as="button" onClick={handleSubmit}>제출하기</CTAButton>
 *
 * @example
 * // Legacy (auto-detect by href - deprecated)
 * <CTAButton href="/contact">문의하기</CTAButton>
 */
export function CTAButton(props: CTAButtonProps | LegacyCTAButtonProps) {
  const {
    telemetryEventName,
    telemetryPayload,
    className,
    onClick,
    size,
    variant,
    children,
  } = props;

  function handleClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (telemetryEventName) {
      trackClientTelemetryEvent({
        name: telemetryEventName,
        payload: telemetryPayload,
      });
    }
    onClick?.(event as never);
  }

  // Determine if this should render as a Link
  const shouldRenderAsLink =
    props.as === "link" || ("href" in props && props.href && props.as !== "button");

  if (shouldRenderAsLink && "href" in props && props.href) {
    const { href, "aria-label": ariaLabel, ...rest } = props;
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ size, variant }), className)}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...(rest as Omit<typeof props, "href" | "aria-label">)}
      >
        {children}
      </Link>
    );
  }

  // Render as button element
  const { as: _as, href: _href, "aria-label": ariaLabel, ...buttonProps } = props;
  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...(buttonProps as ComponentPropsWithoutRef<typeof Button>)}
    >
      {children}
    </Button>
  );
}
