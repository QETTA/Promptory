/**
 * Pattern & Gradient Presets
 * Centralized visual patterns for consistent design across the application
 */

import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Gradient Presets
// ═══════════════════════════════════════════════════════════════

/**
 * Standard gradient patterns used throughout the app
 * These match the design system gradients found in globals.css
 */
export const gradients = {
  /** Hero section gradient - subtle blue/indigo wash */
  hero: "bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20",

  /** Pricing page gradient - warm to cool transition */
  pricing: "bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20",

  /** Package detail gradient - soft purple wash */
  package: "bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/20",

  /** Card hover gradient - subtle lift effect */
  cardHover: "bg-gradient-to-t from-surface-2/50 to-transparent",

  /** Header gradient - transparent to white for scroll */
  header: "bg-gradient-to-b from-white/80 to-white/0 backdrop-blur-sm",

  /** Success/emerald gradient */
  success: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",

  /** Brand gradient - primary brand colors */
  brand: "bg-gradient-to-br from-brand-50 to-brand-100/50",

  /** Dark gradient for dark mode sections */
  dark: "bg-gradient-to-b from-slate-900 to-slate-950",
} as const;

// ═══════════════════════════════════════════════════════════════
// Animation Pattern Classes
// ═══════════════════════════════════════════════════════════════

/**
 * Pre-composed animation patterns for common use cases
 */
export const animations = {
  /** Fade in from below - for page load animations */
  fadeInUp: "animate-fade-in-up",

  /** Fade in from above */
  fadeInDown: "animate-fade-in-down",

  /** Fade in from left */
  fadeInLeft: "animate-fade-in-left",

  /** Fade in from right */
  fadeInRight: "animate-fade-in-right",

  /** Simple fade in */
  fadeIn: "animate-fade-in",

  /** Pulse animation - for attention/loading */
  pulse: "animate-pulse",

  /** Soft pulse - less aggressive than standard pulse */
  pulseSoft: "animate-pulse-soft",

  /** Bounce animation - for notifications/alerts */
  bounce: "animate-bounce",

  /** Spin animation - for loading indicators */
  spin: "animate-spin",

  /** Shimmer effect - for skeleton loading */
  shimmer: "animate-shimmer",
} as const;

/**
 * Animation delay classes for staggered animations
 * Usage: combine with animation classes
 */
export const delays = {
  0: "",
  1: "[animation-delay:0.1s]",
  2: "[animation-delay:0.2s]",
  3: "[animation-delay:0.3s]",
  4: "[animation-delay:0.4s]",
  5: "[animation-delay:0.5s]",
  6: "[animation-delay:0.6s]",
} as const;

// ═══════════════════════════════════════════════════════════════
// Layout Patterns
// ═══════════════════════════════════════════════════════════════

/**
 * Standard layout container patterns
 */
export const layouts = {
  /** Centered container with max-width */
  centered: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",

  /** Centered narrow container for forms */
  narrow: "mx-auto max-w-2xl px-4 sm:px-6",

  /** Full-width section with internal padding */
  section: "w-full py-12 sm:py-16 lg:py-20",

  /** Grid layout for cards */
  cardGrid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",

  /** Flex row with wrapping */
  flexWrap: "flex flex-wrap gap-4",

  /** Stack layout - vertical flex */
  stack: "flex flex-col gap-4",

  /** Stack with large gap */
  stackLoose: "flex flex-col gap-6",
} as const;

// ═══════════════════════════════════════════════════════════════
// Visual Effects
// ═══════════════════════════════════════════════════════════════

/**
 * Reusable visual effect patterns
 */
export const effects = {
  /** Glassmorphism effect */
  glass: "bg-white/80 backdrop-blur-md border border-white/20",

  /** Glassmorphism with stronger blur */
  glassStrong: "bg-white/70 backdrop-blur-lg border border-white/30 shadow-lg",

  /** Glow effect for important elements */
  glow: "shadow-glow",

  /** Emerald glow for success states */
  glowSuccess: "shadow-glow-emerald",

  /** Indigo glow for premium elements */
  glowIndigo: "shadow-glow-indigo",

  /** Subtle hover lift */
  hoverLift: "hover:-translate-y-1 hover:shadow-lg transition-transform duration-200",

  /** Scale on hover */
  hoverScale: "hover:scale-105 transition-transform duration-200",

  /** Border highlight on hover */
  hoverBorder: "hover:border-[var(--line-hover)] transition-colors duration-150",
} as const;

// ═══════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════

/**
 * Compose animation with delay
 * @param animation - Base animation class
 * @param delay - Delay step (0-6)
 * @returns Combined class string
 */
export function withDelay(
  animation: keyof typeof animations,
  delay: keyof typeof delays
): string {
  return cn(animations[animation], delays[delay]);
}

/**
 * Get staggered animation classes for lists
 * @param baseAnimation - Base animation class
 * @param count - Number of items
 * @returns Array of class strings
 */
export function getStaggeredAnimations(
  baseAnimation: keyof typeof animations = "fadeInUp",
  count: number
): string[] {
  return Array.from({ length: count }, (_, i) =>
    withDelay(baseAnimation, Math.min(i + 1, 6) as keyof typeof delays)
  );
}

/**
 * Hero section pattern - combines gradient, layout, and animation
 * Commonly used for page hero sections
 */
export const heroSection = {
  /** Container class for hero sections */
  container: cn(
    gradients.hero,
    "relative overflow-hidden"
  ),

  /** Animated background decoration */
  decoration: cn(
    "absolute inset-0 overflow-hidden pointer-events-none"
  ),

  /** Content wrapper within hero */
  content: cn(
    layouts.centered,
    "relative py-20 lg:py-28"
  ),

  /** Standard grid layout for hero (text + visual) */
  grid: "grid gap-12 lg:grid-cols-2 lg:gap-8 items-center",
} as const;

/**
 * Card pattern presets
 */
export const cardPatterns = {
  /** Standard card with hover effect */
  interactive: cn(
    "group relative overflow-hidden",
    effects.hoverLift,
    "transition-all duration-200"
  ),

  /** Feature card with icon */
  feature: cn(
    "flex flex-col gap-4 p-6",
    "rounded-2xl border border-[var(--line)]",
    "bg-[var(--surface-elevated)]",
    effects.hoverLift
  ),

  /** Pricing card */
  pricing: cn(
    "flex flex-col gap-6 p-8",
    "rounded-3xl border-2",
    "transition-all duration-300",
    "hover:shadow-xl hover:-translate-y-1"
  ),
} as const;

/**
 * Form field pattern presets
 */
export const formPatterns = {
  /** Standard input wrapper */
  field: cn(
    "flex flex-col gap-1.5"
  ),

  /** Input with icon prefix */
  inputWithIcon: cn(
    "pl-10" // Space for left icon
  ),

  /** Input with button suffix */
  inputWithButton: cn(
    "pr-24" // Space for right button
  ),
} as const;
