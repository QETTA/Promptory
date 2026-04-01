/**
 * Animation Constants
 * Centralized animation timing and easing for consistent UX
 */

// Duration presets (in milliseconds)
export const duration = {
  /** 50ms - Instant feedback */
  instant: 50,
  /** 100ms - Quick transitions */
  fast: 100,
  /** 150ms - Standard transitions */
  normal: 150,
  /** 200ms - Slow transitions */
  slow: 200,
  /** 300ms - Slower transitions */
  slower: 300,
  /** 500ms - Emphasis animations */
  slowest: 500,
  /** 800ms - Dramatic emphasis */
  emphasis: 800,
} as const;

// CSS custom property references for use in inline styles
export const durationVar = {
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  normal: "var(--duration-normal)",
  slow: "var(--duration-slow)",
  slower: "var(--duration-slower)",
  slowest: "var(--duration-slowest)",
  emphasis: "var(--duration-emphasis)",
} as const;

// Easing functions
export const easing = {
  /** Spring physics - bouncy effect */
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  /** Soft spring - subtle bounce */
  springSoft: "cubic-bezier(0.4, 0.0, 0.2, 1.2)",
  /** Exponential out - fast start, slow end */
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Exponential in - slow start, fast end */
  inExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
  /** Micro transitions - subtle */
  micro: "cubic-bezier(0.35, 0, 0.35, 1)",
  /** Enter animation */
  enter: "cubic-bezier(0, 0, 0.15, 1)",
  /** Exit animation */
  exit: "cubic-bezier(0.35, 0, 1, 1)",
  /** Elastic - wobbly effect */
  elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// CSS custom property references for easing
export const easingVar = {
  spring: "var(--ease-spring)",
  springSoft: "var(--ease-spring-soft)",
  outExpo: "var(--ease-out-expo)",
  inExpo: "var(--ease-in-expo)",
  micro: "var(--ease-micro)",
  enter: "var(--ease-enter)",
  exit: "var(--ease-exit)",
  elastic: "var(--ease-elastic)",
} as const;

/**
 * Animation style presets
 * Use these for consistent transition styling
 */
export const transitions = {
  /** Micro interaction - buttons, links */
  micro: `all ${durationVar.fast} ${easingVar.micro}`,
  /** Standard interaction - cards, panels */
  standard: `all ${durationVar.normal} ${easingVar.outExpo}`,
  /** Smooth interaction - larger elements */
  smooth: `all ${durationVar.slower} ${easingVar.spring}`,
  /** Transform only - performance optimized */
  transform: `transform ${durationVar.slower} ${easingVar.spring}`,
  /** Opacity only - fade effects */
  opacity: `opacity ${durationVar.normal} ${easingVar.outExpo}`,
  /** Shadow transitions */
  shadow: `box-shadow ${durationVar.slower} ${easingVar.spring}`,
  /** Color transitions */
  colors: `background-color ${durationVar.normal} ${easingVar.outExpo}, ` +
          `border-color ${durationVar.normal} ${easingVar.outExpo}, ` +
          `color ${durationVar.normal} ${easingVar.outExpo}`,
} as const;

/**
 * Hover lift effect styles
 * Apply to cards and interactive elements
 */
export const hoverEffects = {
  /** Subtle lift - cards, buttons */
  lift: "hover:-translate-y-1 hover:shadow-lg transition-transform",
  /** Scale up - icons, small elements */
  scale: "hover:scale-105 transition-transform",
  /** Brightness - images, media */
  brightness: "hover:brightness-105 transition-all",
  /** Border highlight - inputs, cards */
  border: "hover:border-[var(--line-hover)] transition-colors",
} as const;

/**
 * Active/pressed state styles
 */
export const pressEffects = {
  /** Standard press - most elements */
  standard: "active:scale-[0.98]",
  /** Soft press - larger elements */
  soft: "active:scale-[0.995]",
  /** Deep press - buttons */
  deep: "active:scale-[0.96] active:translate-y-px",
} as const;

/**
 * Animation delay utilities for stagger effects
 */
export const stagger = {
  1: "[animation-delay:0.1s]",
  2: "[animation-delay:0.2s]",
  3: "[animation-delay:0.3s]",
  4: "[animation-delay:0.4s]",
  5: "[animation-delay:0.5s]",
  6: "[animation-delay:0.6s]",
} as const;

/**
 * Compose animation classes for common patterns
 */
export function composeTransition(
  properties: string[],
  durationMs: keyof typeof duration = "normal",
  ease: keyof typeof easing = "outExpo"
): string {
  return properties
    .map(prop => `${prop} ${duration[durationMs]}ms ${easing[ease]}`)
    .join(", ");
}
