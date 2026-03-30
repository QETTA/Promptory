"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {}

const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn("grid grid-cols-1 sm:grid-cols-[minmax(100px,1fr)_2fr] gap-x-4 gap-y-4 text-sm", className)}
        {...props}
      >
        {children}
      </dl>
    );
  }
);

DescriptionList.displayName = "DescriptionList";

interface DescriptionTermProps extends HTMLAttributes<HTMLElement> {}

const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn("font-medium text-neutral-500 dark:text-neutral-400", className)}
        {...props}
      >
        {children}
      </dt>
    );
  }
);

DescriptionTerm.displayName = "DescriptionTerm";

interface DescriptionDetailsProps extends HTMLAttributes<HTMLElement> {}

const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={cn("text-neutral-900 dark:text-neutral-100", className)}
        {...props}
      >
        {children}
      </dd>
    );
  }
);

DescriptionDetails.displayName = "DescriptionDetails";

export { DescriptionList, DescriptionTerm, DescriptionDetails };
