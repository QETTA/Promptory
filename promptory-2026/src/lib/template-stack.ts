export const TEMPLATE_STACK = {
  marketingShell: "oatmeal",
  impactDonor: "radiant",
  consoleShell: "catalyst",
  tokensOwner: "promptory",
  rules: [
    "Do not merge vendor globals into src/app/globals.css.",
    "Wrap page-facing usage with src/components/brand/* wherever possible.",
    "Keep Radiant to donor sections only; exclude Sanity/blog/studio.",
    "Use Catalyst only inside console/admin surfaces.",
  ],
} as const;
