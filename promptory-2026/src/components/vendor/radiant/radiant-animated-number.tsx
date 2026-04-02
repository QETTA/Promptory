"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface RadiantAnimatedNumberProps {
  start?: number;
  end: number;
  decimals?: number;
  durationMs?: number;
}

export function RadiantAnimatedNumber({
  start = 0,
  end,
  decimals = 0,
  durationMs = 1200,
}: RadiantAnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(start);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!ref.current || hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasPlayed(true);
        observer.disconnect();

        const startAt = performance.now();
        const frame = (now: number) => {
          const progress = Math.min((now - startAt) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(start + (end - start) * eased);
          if (progress < 1) requestAnimationFrame(frame);
        };

        requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [durationMs, end, hasPlayed, start]);

  const formatted = useMemo(() => value.toFixed(decimals), [decimals, value]);

  return <span ref={ref}>{formatted}</span>;
}
