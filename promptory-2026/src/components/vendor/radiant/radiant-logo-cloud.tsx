import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface RadiantLogoCloudItem {
  label: string;
}

const defaultItems: RadiantLogoCloudItem[] = [
  { label: "Slack" },
  { label: "Jira" },
  { label: "Salesforce" },
  { label: "Okta" },
  { label: "Notion" },
  { label: "Workday" },
];

export interface RadiantLogoCloudProps extends HTMLAttributes<HTMLDivElement> {
  items?: RadiantLogoCloudItem[];
}

export function RadiantLogoCloud({ className, items = defaultItems, ...props }: RadiantLogoCloudProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)} {...props}>
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-secondary)] shadow-[var(--shadow-xs)]"
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
