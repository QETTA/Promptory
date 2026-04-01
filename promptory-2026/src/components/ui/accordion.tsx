"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] transition-all duration-300",
        isOpen && "border-[var(--line-strong)] shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[var(--surface-2)]"
      >
        <span className="pr-4 font-semibold text-[var(--slate-950)]">{title}</span>
        <span
          className={cn(
            "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--slate-500)] transition-transform duration-300",
            isOpen && "rotate-180 bg-[var(--brand-50)] text-[var(--brand-600)]"
          )}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5">
          <div className="pt-2 text-sm leading-6 text-[var(--slate-600)]">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { title: string; content: ReactNode }[];
  className?: string;
  defaultOpenIndex?: number | null;
}

export function Accordion({
  items,
  className,
  defaultOpenIndex = null,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
