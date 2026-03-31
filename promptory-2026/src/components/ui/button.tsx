import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "ui-button-base",
  {
    variants: {
      size: {
        default: "h-11 px-4 text-[0.93rem]",
        lg: "h-12 px-5 text-[0.96rem]",
        sm: "h-9 px-3.5 text-[0.84rem]",
        icon: "h-10 w-10",
      },
      variant: {
        default: "ui-button-default",
        outline: "ui-button-outline",
        subtle: "ui-button-subtle",
        ghost: "ui-button-ghost",
        glass: "ui-button-glass",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ size, variant }), className)} {...props} />;
}

export { buttonVariants };
