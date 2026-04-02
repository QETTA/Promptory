import type { ConsoleRunRecord } from "@/lib/console/types";

export const consoleRuns: ConsoleRunRecord[] = [
  {
    id: "run-240401-001",
    workflow: "deal-desk-approval-workflow",
    requestId: "req-acme-discount-renewal",
    status: "승인 대기",
    statusTone: "warning",
    duration: "1m 14s",
    startedAt: "2026-04-01 10:42",
    retryPolicy: "approval wait + 2 retries",
    owner: "Sales Ops queue",
    note: "VP approval 수신 후 CRM update / quote note write 예정",
  },
  {
    id: "run-240401-002",
    workflow: "it-access-expiring-grant",
    requestId: "req-snowflake-read-30d",
    status: "승인 대기",
    statusTone: "brand",
    duration: "49s",
    startedAt: "2026-04-01 11:28",
    retryPolicy: "approval wait + expiry schedule",
    owner: "IT Ops queue",
    note: "Okta write는 preview 후 manager confirm 필요",
  },
  {
    id: "run-240401-003",
    workflow: "incident-postmortem-pack",
    requestId: "req-status-postmortem-brief",
    status: "완료",
    statusTone: "success",
    duration: "2m 08s",
    startedAt: "2026-04-01 08:05",
    retryPolicy: "idempotent publish + no retry",
    owner: "Support Ops",
    note: "Jira, Status Page, Confluence 3개 시스템 반영 완료",
  },
  {
    id: "run-240401-004",
    workflow: "cx-refund-exception-workflow",
    requestId: "req-cx-refund-vip-exception",
    status: "실패",
    statusTone: "danger",
    duration: "36s",
    startedAt: "2026-04-01 07:50",
    retryPolicy: "exponential backoff + manual replay",
    owner: "CX Ops",
    note: "CRM 권한 부족으로 write step 실패, human review queue 이동",
  },
  {
    id: "run-240401-005",
    workflow: "promo-readiness-board",
    requestId: "req-promo-readiness-alpha",
    status: "지연",
    statusTone: "warning",
    duration: "5m 42s",
    startedAt: "2026-04-01 06:40",
    retryPolicy: "Jira MCP timeout after 3 attempts",
    owner: "Merch Ops",
    note: "Jira MCP timeout 42% 이슈와 연결된 degraded run",
  },
];

export function getRunsForRequest(id: string) {
  return consoleRuns.filter((run) => run.requestId === id);
}
