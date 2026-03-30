import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // AI Core Palette
        "ai-core": "#3b82f6",
        "ai-glow": "rgba(59, 130, 246, 0.15)",
        "ai-pulse": "rgba(59, 130, 246, 0.3)",

        // Status Colors
        success: "#10b981",
        partial: "#f97316",
        error: "#ef4444",
        warning: "#f59e0b",

        // Reason Colors
        "reason-clarity": "#3b82f6",
        "reason-impact": "#8b5cf6",
        "reason-flow": "#10b981",
        "reason-urgency": "#f59e0b",

        // Background Layers
        "bg-primary": "#ffffff",
        "bg-secondary": "#fafafa",
        "bg-tertiary": "#f5f5f5",
        "bg-dark": "#171717",

        // Text Colors
        "text-primary": "#171717",
        "text-secondary": "#525252",
        "text-tertiary": "#a3a3a3",
        "text-inverse": "#ffffff",

        // Neutral scale (required for border-neutral-xxx classes)
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
      },
      fontFamily: {
        display: ["var(--font-mona-sans)", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      spacing: {
        sidebar: "20rem",
        navbar: "4rem",
        "content-max": "80rem",
      },
      borderRadius: {
        card: "0.75rem",
        "card-lg": "1.5rem",
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
