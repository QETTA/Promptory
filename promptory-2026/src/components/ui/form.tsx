import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";
import { Label } from "./label";
import { AlertCircle } from "./icons";

/**
 * Form Field Container
 * Wraps form inputs with label, error message, and help text
 */
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  labelClassName?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className,
  labelClassName,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {label && (
        <Label className={labelClassName}>
          {label}
          {required && <span className="ml-1 text-[var(--color-error)]">*</span>}
        </Label>
      )}
      {children}
      {error && (
        <div className="flex items-center gap-1 text-sm text-[var(--color-error)]" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      {hint && !error && (
        <p className="text-sm text-[var(--color-ink-tertiary)]" id={`${props.id}-hint`}>{hint}</p>
      )}
    </div>
  );
}

/**
 * Form Section Container
 * Groups related form fields with optional title
 */
interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-[var(--color-ink-primary)]">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--color-ink-tertiary)]">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/**
 * Form Actions Container
 * Consistent layout for form buttons
 */
interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right";
}

export function FormActions({
  align = "right",
  children,
  className,
  ...props
}: FormActionsProps) {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 pt-2",
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Form Root Component
 * Wrapper with consistent spacing and layout
 */
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  asChild?: boolean;
  spacing?: "default" | "compact" | "loose";
}

export function Form({
  asChild,
  spacing = "default",
  children,
  className,
  ...props
}: FormProps) {
  const Comp = asChild ? Slot : "form";

  const spacingClasses = {
    compact: "space-y-3",
    default: "space-y-4",
    loose: "space-y-6",
  };

  return (
    <Comp
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
