# Promptory 2026

Promptory is a request-to-resolution product for internal Slack agents.

The current product direction is:

- `Slack request intake -> evidence -> approval -> system reflection`
- primary public surfaces: `/`, `/pricing`, `/solutions`, `/industries`, `/education`, `/security`, `/pilot`
- internal operator surface: `/console`
- legacy commerce rails remain isolated and are no longer the main product story

Business and product guardrails live in:

- `docs/BUSINESS_PRODUCT_FOUNDATION.md`

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase SSR / Supabase JS
- Zod

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

- `http://127.0.0.1:3000`
- `http://127.0.0.1:3000/console`

## Important scripts

```powershell
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
npm.cmd run check:supabase
npm.cmd run sync:storage
```

## Environment

Copy `.env.example` and fill the required values for:

- public Supabase URL and anon key
- server-side Supabase service role key
- optional Toss or dev payment mode values

The app can still render some surfaces without full server wiring, but auth, order, download, and persistence flows need Supabase configured.

## Main directories

- `src/app/`
  - marketing, auth, console, legacy-commerce, and internal-tools route groups
- `apps/slack-runtime/`
  - Slack runtime scaffold contracts, mocks, and handlers
- `src/components/marketing/`
  - public marketing sections and templates
- `src/components/console/`
  - console shell and mock operator surfaces
- `src/components/brand/`
  - Promptory-owned wrapper layer for borrowed templates
- `src/components/ui/`
  - tokenized primitives
- `src/lib/`
  - product logic, auth helpers, marketing content, console mock data, and theme helpers
- `src/lib/server/`
  - server-side auth, products, orders, payments, downloads, optimization run persistence
- `supabase/schema.sql`
  - schema baseline for Promptory data

## Current UX rules

- treat Promptory as an approval-driven internal app, not a generic search bot
- keep `/optimize` as a public demo wedge, not the product core
- center the story on request-to-resolution packs and safe pilot rollout
- keep marketing and console surfaces visually distinct but brand-consistent
- keep legacy commerce routes out of the primary navigation
