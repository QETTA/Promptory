# Runtime architecture notes

## Position in the product

- `marketing site` explains the product story and package model
- `console` shows requests, approvals, runs, policies, connectors, audit, and reports
- `slack runtime` receives requests, builds previews, requests approval, and starts execution

## Request-to-resolution spine

1. assistant message intake
2. intent classification
3. policy and current-state lookup
4. plan and preview generation
5. approval card emission when needed
6. workflow start
7. status callback to Slack
8. downstream audit, trace, and reporting

## Current scaffold boundaries

### Handlers
- `intake-command.ts`
- `approval-action.ts`
- `app-home.ts`

### Contracts
- Slack intake payload
- evidence plan
- approval request and decision
- MCP tool result
- system-of-record reflection result
- resolution receipt

### Runtime edges
- mock MCP client
- mock approval queue
- mock system-of-record adapter

## Guardrail assumptions

- read operations may auto-run within the user's scope
- write operations require preview and confirm
- admin operations require approval and expiry metadata
- audit and trace stay separate

## Why this stays isolated

The current repo is still centered on a Next.js app.
This scaffold stays under `apps/slack-runtime` so later work can either:

- keep it in the same repo as a runtime package
- turn it into its own workspace
- or move it into a customer-specific deployment rail
