# Promptory 2026

Promptory is the `Channel Stack Doctor` web app inside the existing `QETTA/Promptory` repository.

The current product direction is:

- `URL -> public audit -> ask plan -> result stack -> execution pack rail`
- primary surfaces: `/` and `/optimize`
- support rails: `/products`, `/library`, `/orders`, `/seller/products`

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
- `http://127.0.0.1:3000/optimize`

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
  - route entry points
- `src/components/channel-intake/`
  - optimize workspace blocks
- `src/components/marketplace/`
  - shared product and payment rail surfaces
- `src/components/ui/`
  - tokenized primitives
- `src/lib/`
  - product logic, optimization logic, auth helpers, display and theme helpers
- `src/lib/server/`
  - server-side auth, products, orders, payments, downloads, optimization run persistence
- `supabase/schema.sql`
  - schema baseline for Promptory data

## Current UX rules

- treat Promptory as an AI work surface, not a generic marketplace
- keep `/optimize` as the product core
- use short operational copy
- keep mobile sections compressed
- connect recommendations to execution packs instead of leaving them as analysis-only output
