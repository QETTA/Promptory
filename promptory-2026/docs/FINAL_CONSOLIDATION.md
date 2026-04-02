# Final Consolidation Notes

This document captures the final merge-hardening rules for the Promptory 2026 rollout.

## Purpose

The earlier trigger packs optimized for parallel work:

- route-group separation
- IA and navigation changes
- template foundation
- marketing redesign
- solutions, industries, and education expansion
- console shell
- Slack runtime scaffold

That split is useful for production, but it can leave behind stale files and outdated repo guidance after integration. This consolidation pass keeps the repo contract clear.

## Canonical ownership

Keep these as the source of truth:

- `src/app/(marketing)/**`
- `src/app/(auth)/**`
- `src/app/(legacy-commerce)/**`
- `src/app/(internal-tools)/**`
- `src/app/(console)/**`
- `apps/slack-runtime/**`
- `src/lib/request-to-resolution-content.ts`

Delete or keep deleted:

- root-level `src/app/**` routes that were moved into route groups
- static marketing package detail pages that duplicate `/packages/[slug]`

## Package detail rule

Canonical package detail entrypoint:

- `src/app/(marketing)/packages/[slug]/page.tsx`

Canonical content source:

- `src/lib/request-to-resolution-content.ts`

Legacy package slugs can still redirect for compatibility, but static detail pages should not return.

## Expected product surfaces

- marketing surface: request-to-resolution product story, solutions, industries, education, security, architecture, pilot
- console surface: request, approval, run, connector, policy, audit, and report shells
- Slack runtime: scaffold-only execution surface under `apps/slack-runtime`

## Verification flow

Run the repository consolidation check:

```powershell
node scripts/t08-verify-routes.mjs
```

Then run the normal verification sequence:

```powershell
npm.cmd run typecheck
npm.cmd run test:unit
npm.cmd run test:smoke
npm.cmd run build
```

## Guardrails to preserve

- keep Promptory positioned as a Slack-first, approval-driven internal app
- keep `/optimize` as a demo wedge, not the product center
- keep the MVP framing on one department, one scenario, and a small connector set
- keep the runtime scaffold isolated from the web app until real adapters are introduced
