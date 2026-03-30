/**
 * Promptory 2026 Design Tokens
 * 중앙 집중식 디자인 토큰 관리 - 병목 방지 및 일관성 유지
 */

// =====================================================
// Color Tokens
// =====================================================
export const colors = {
  // AI Core
  ai: {
    core: "#3b82f6",
    light: "#60a5fa",
    dark: "#2563eb",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  // Semantic - Full color scale for consistency
  success: {
    DEFAULT: "#10b981",
    light: "#34d399",
    dark: "#059669",
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  warning: {
    DEFAULT: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  error: {
    DEFAULT: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  partial: {
    DEFAULT: "#f97316",
    light: "#fb923c",
    dark: "#ea580c",
  },
  // Neutral Scale
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
} as const;

// =====================================================
// Reason Type Colors (for badges)
// =====================================================
export const reasonColors = {
  clarity: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  impact: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  flow: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  urgency: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
} as const;

// =====================================================
// Badge Color Tokens (semantic colors for badges)
// =====================================================
export const badgeColors = {
  ai: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
  neutral: {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-700 dark:text-neutral-300",
  },
} as const;

// =====================================================
// Status Colors
// =====================================================
export const statusColors = {
  idle: {
    bg: "bg-neutral-200 dark:bg-neutral-700",
    text: "text-neutral-600 dark:text-neutral-400",
    label: "대기",
  },
  processing: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    label: "처리중",
    animate: true,
  },
  completed: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    label: "완료",
  },
  error: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600 dark:text-red-400",
    label: "오류",
  },
} as const;

// =====================================================
// Spacing Tokens
// =====================================================
export const spacing = {
  xs: "0.25rem",    // 4px
  sm: "0.5rem",     // 8px
  md: "0.75rem",    // 12px
  base: "1rem",     // 16px
  lg: "1.25rem",    // 20px
  xl: "1.5rem",     // 24px
  "2xl": "2rem",    // 32px
  "3xl": "2.5rem",  // 40px
  "4xl": "3rem",    // 48px
} as const;

// =====================================================
// Layout Tokens
// =====================================================
export const layout = {
  sidebar: {
    width: "20rem",        // 320px
    widthMobile: "100%",
    maxWidth: "24rem",
  },
  navbar: {
    height: "4rem",        // 64px
  },
  content: {
    maxWidth: "80rem",     // 1280px
  },
  card: {
    padding: "1rem",
    gap: "0.75rem",
    radius: "1rem",
  },
} as const;

// =====================================================
// Animation Tokens
// =====================================================
export const animation = {
  duration: {
    fast: 0.15,      // 150ms
    base: 0.3,       // 300ms
    slow: 0.5,       // 500ms
    slower: 0.7,     // 700ms
  },
  ease: {
    out: [0, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    inOut: [0.4, 0, 0.2, 1],
    spring: { type: "spring", stiffness: 300, damping: 30 },
  },
  stagger: {
    fast: 0.05,
    base: 0.1,
    slow: 0.15,
  },
} as const;

// =====================================================
// Typography Tokens
// =====================================================
export const typography = {
  fontFamily: {
    display: "var(--font-mona-sans)",
    body: "var(--font-inter)",
    mono: "var(--font-jetbrains-mono)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

// =====================================================
// Gradient Tokens
// =====================================================
export const gradients = {
  ai: "from-blue-500 to-purple-500",
  success: "from-green-500 to-teal-500",
  warning: "from-orange-500 to-red-500",
  info: "from-indigo-500 to-blue-500",
  pink: "from-pink-500 to-rose-500",
  cyan: "from-cyan-500 to-blue-500",
  all: [
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-cyan-500 to-blue-500",
  ],
} as const;

// =====================================================
// Helper: Get gradient by index (cycles through)
// =====================================================
export function getGradient(index: number): string {
  return gradients.all[index % gradients.all.length];
}

// =====================================================
// Helper: Get reason color config
// =====================================================
export function getReasonConfig(type: keyof typeof reasonColors) {
  return reasonColors[type];
}

// =====================================================
// Helper: Get status config
// =====================================================
export function getStatusConfig(status: keyof typeof statusColors) {
  return statusColors[status];
}

// =====================================================
// Alert Component Styles (consolidated from Alert.tsx)
// Centralized to prevent token bloat and ensure consistency
// =====================================================
export const alertStyles = {
  success: {
    container: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    icon: "text-green-600 dark:text-green-400",
  },
  warning: {
    container: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
    icon: "text-amber-600 dark:text-amber-400",
  },
  error: {
    container: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    icon: "text-red-600 dark:text-red-400",
  },
  info: {
    container: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    icon: "text-blue-600 dark:text-blue-400",
  },
} as const;

// Type exports
export type AlertColor = keyof typeof alertStyles;
export type ReasonType = keyof typeof reasonColors;
export type StatusType = keyof typeof statusColors;
