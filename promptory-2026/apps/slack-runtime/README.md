# Slack runtime scaffold

This folder is a scaffold-only implementation of Promptory's Slack runtime.

What is included:
- request intake contracts for Slack surfaces
- normalization and workflow planning types
- approval queue contract and mock implementation
- mock MCP execution contract
- mock system-of-record reflection contract
- handlers for intake, approval, and App Home summary

What is intentionally not included:
- Slack Bolt or Slack SDK wiring
- real database, queue, or API adapters
- real MCP clients
- real Jira, CRM, IAM, HRIS, ERP, or ITSM integration
- environment variables or secrets

How this connects to the web app later:
- `NormalizedRequest` should map to the request rows shown in the web console.
- `ApprovalRequest` and `ApprovalDecision` should map to the approvals queue UI.
- `ResolutionReceipt` should back request detail, runs, audit, and reports surfaces.
- `McpToolResult` and `SystemRecordReflectionResult` should become the shared contract between runtime execution and console visibility.

Request-to-resolution flow in this scaffold:
1. Slack sends an intake payload.
2. The intake handler normalizes the request and drafts an evidence plan.
3. The orchestrator creates an execution plan and queues approval.
4. The approval handler accepts or rejects the request.
5. Approved requests execute mock MCP actions and reflect to the mock system of record.
6. A final resolution receipt is returned for Slack and console surfaces.
