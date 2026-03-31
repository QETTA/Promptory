"use client";

import { useState } from "react";

import { CTAButton } from "@/components/ui/cta-button";
import type { promptoryAudienceTabs } from "@/lib/promptory-landing-copy";
import { cn } from "@/lib/cn";
import styles from "./home-audience-tabs.module.css";

type AudienceTab = (typeof promptoryAudienceTabs)[number];

export function HomeAudienceTabs({ items }: { items: readonly AudienceTab[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  if (!activeItem) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.tabList} role="tablist" aria-label="Promptory audience">
        {items.map((item) => {
          const active = item.id === activeItem.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(item.id)}
              className={cn(styles.tabButton, active ? styles.tabButtonActive : "")}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className={styles.panel} role="tabpanel">
        <p className={cn("section-kicker", styles.label)}>{activeItem.label}</p>
        <h3 className={styles.title}>{activeItem.title}</h3>
        <p className={styles.body}>{activeItem.body}</p>
        <div className={styles.bulletList}>
          {activeItem.bullets.map((bullet) => (
            <div key={bullet} className={styles.bulletItem}>
              {bullet}
            </div>
          ))}
        </div>
        <CTAButton href={activeItem.ctaHref} className={styles.cta}>
          {activeItem.ctaLabel}
        </CTAButton>
      </div>
    </div>
  );
}
