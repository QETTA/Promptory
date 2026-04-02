export type ConsoleTone = "neutral" | "brand" | "success" | "warning" | "danger";

export interface ConsoleStat {
  key: string;
  label: string;
  value: string;
  hint: string;
  tone: ConsoleTone;
}

export interface ConsoleRequestTimelineStep {
  step: string;
  detail: string;
  state: "done" | "current" | "upcoming";
}

export interface ConsoleRequestRecord {
  id: string;
  title: string;
  requester: string;
  pack: string;
  department: string;
  status: string;
  statusTone: ConsoleTone;
  submittedAt: string;
  dueAt: string;
  approver: string;
  destination: string;
  summary: string;
  sourceLinks: number;
  risk: "low" | "medium" | "high";
  policyNotes: string[];
  evidence: string[];
  systemWrites: string[];
  timeline: ConsoleRequestTimelineStep[];
}

export interface ConsoleApprovalRecord {
  id: string;
  requestId: string;
  title: string;
  requester: string;
  approver: string;
  pack: string;
  risk: "low" | "medium" | "high";
  submittedAt: string;
  dueAt: string;
  recommendation: string;
  detail: string;
  impact: string;
}

export interface ConsoleRunRecord {
  id: string;
  workflow: string;
  requestId: string;
  status: string;
  statusTone: ConsoleTone;
  duration: string;
  startedAt: string;
  retryPolicy: string;
  owner: string;
  note: string;
}

export interface ConsoleConnectorRecord {
  id: string;
  name: string;
  status: string;
  statusTone: ConsoleTone;
  scope: string;
  mode: string;
  lastSync: string;
  note: string;
}

export interface ConsolePolicyRecord {
  id: string;
  role: string;
  defaultScope: string;
  readActions: string[];
  writeActions: string[];
  adminActions: string[];
  guardrails: string[];
}

export interface ConsoleAuditRecord {
  id: string;
  actor: string;
  event: string;
  target: string;
  at: string;
  outcome: string;
  outcomeTone: ConsoleTone;
  detail: string;
}

export interface ConsoleReportRecord {
  id: string;
  title: string;
  audience: string;
  cadence: string;
  summary: string;
  highlights: string[];
}

export const consoleDashboardStats: ConsoleStat[] = [
  {
    key: "automation-rate",
    label: "자동화율",
    value: "31%",
    hint: "policy 범위 내 요청은 preview 없이 완료됩니다.",
    tone: "success",
  },
  {
    key: "failed-runs",
    label: "실패율",
    value: "7%",
    hint: "주요 원인은 Jira MCP timeout, CRM 권한 부족, 문서 버전 불일치입니다.",
    tone: "warning",
  },
  {
    key: "approval-turnaround",
    label: "승인 평균",
    value: "4.2h",
    hint: "approval card 기준, 15분 내 처리 70%를 목표로 둡니다.",
    tone: "brand",
  },
  {
    key: "monthly-cost",
    label: "월 비용",
    value: "$2.3k",
    hint: "trace와 cost는 Langfuse / OTel 기준으로 분리 추적합니다.",
    tone: "neutral",
  },
];

export const consoleRequests: ConsoleRequestRecord[] = [
  {
    id: "req-acme-discount-renewal",
    title: "ACME Corp 할인 검토 / Annual Renewal",
    requester: "김대리",
    pack: "Deal Desk",
    department: "Sales Ops",
    status: "상위 승인 필요",
    statusTone: "warning",
    submittedAt: "2026-04-01 10:42",
    dueAt: "2026-04-01 13:00",
    approver: "VP Sales",
    destination: "Salesforce CRM",
    summary: "Strategic 고객, 요청 할인율 18%, 정책 한도 15% 초과, 마진 영향 -6.2%.",
    sourceLinks: 4,
    risk: "high",
    policyNotes: [
      "Pricing policy 2.1 — 15% 초과 시 상위 승인 필요",
      "Renewal exception guide — Strategic tier는 재협상 근거 필요",
      "CRM closed-won history와 margin guardrail을 함께 확인",
    ],
    evidence: [
      "CRM opportunity snapshot",
      "최근 4건 유사 승인 사례",
      "pricing policy 문서 링크 2개",
      "renewal margin simulation",
    ],
    systemWrites: [
      "승인 결과를 Salesforce opportunity note에 반영",
      "할인 사유와 승인자 정보를 audit log에 기록",
      "필요 시 VP escalation task 생성",
    ],
    timeline: [
      { step: "접수", detail: "Slack thread에서 할인 요청 감지 및 pack 선택", state: "done" },
      { step: "검증", detail: "CRM opportunity / pricing policy / margin simulation 조회", state: "done" },
      { step: "승인", detail: "VP Sales approval card 대기", state: "current" },
      { step: "실행", detail: "승인 후 CRM update + brief DM 예정", state: "upcoming" },
    ],
  },
  {
    id: "req-busan-travel-approval",
    title: "부산 출장 승인 요청 / Tech Conference 2026",
    requester: "박OO",
    pack: "People Ops",
    department: "People Ops",
    status: "승인 대기",
    statusTone: "brand",
    submittedAt: "2026-04-01 09:10",
    dueAt: "2026-04-01 18:00",
    approver: "부서장",
    destination: "Workday + Expense",
    summary: "BEXCO 방문, 550,000 KRW, 정책 범위 내 항목이지만 승인 카드 확인 필요.",
    sourceLinks: 3,
    risk: "medium",
    policyNotes: [
      "국내 출장 일비 한도 내",
      "사전 신청 기한 준수",
      "부서장 전결 가능 범위",
    ],
    evidence: [
      "출장 목적 요약",
      "예상 비용 breakdown",
      "출장 정책 근거 링크 3개",
    ],
    systemWrites: [
      "승인 시 Workday request 생성",
      "Slack 결과 보고와 expense draft 동시 생성",
      "캘린더와 task timeline 업데이트",
    ],
    timeline: [
      { step: "접수", detail: "modal 기반 request intake 저장", state: "done" },
      { step: "검증", detail: "정책, 비용, 사전 신청 기준 자동 확인", state: "done" },
      { step: "승인", detail: "부서장 approval card 확인 대기", state: "current" },
      { step: "실행", detail: "Workday + expense draft 생성 예정", state: "upcoming" },
    ],
  },
  {
    id: "req-snowflake-read-30d",
    title: "Snowflake 읽기 권한 30일 요청",
    requester: "홍길동",
    pack: "IT Access",
    department: "IT Ops",
    status: "승인 대기",
    statusTone: "brand",
    submittedAt: "2026-04-01 11:28",
    dueAt: "2026-04-01 16:00",
    approver: "팀장",
    destination: "Okta + Jira",
    summary: "Analyst 역할, warehouse read only 확장, 30일 만료 접근 + 팀장 승인 권장.",
    sourceLinks: 3,
    risk: "medium",
    policyNotes: [
      "데이터 접근권한 표준 3.2",
      "예외 승인 규정 2.1",
      "만료형 권한은 manager approval + expiry 필수",
    ],
    evidence: [
      "현재 역할과 existing access snapshot",
      "source links ×3",
      "만료일 2026-05-01 preview",
    ],
    systemWrites: [
      "Temporal workflow로 Jira ticket 생성",
      "Okta / IAM 접근권한 부여",
      "재검토 일정과 audit 기록 저장",
    ],
    timeline: [
      { step: "접수", detail: "DM assistant에서 요청 초안 생성", state: "done" },
      { step: "검증", detail: "Slack context + policy + IAM 상태 조회", state: "done" },
      { step: "승인", detail: "팀장 approval modal 대기", state: "current" },
      { step: "실행", detail: "Okta grant + Jira update + canvas summary", state: "upcoming" },
    ],
  },
  {
    id: "req-status-postmortem-brief",
    title: "P1 장애 postmortem pack 생성",
    requester: "최OO",
    pack: "Escalation",
    department: "Support Ops",
    status: "자동 처리 완료",
    statusTone: "success",
    submittedAt: "2026-04-01 08:05",
    dueAt: "2026-04-01 09:00",
    approver: "자동",
    destination: "Jira + Status Page + Confluence",
    summary: "severity 분류, owner 지정, status page update, postmortem draft 생성까지 완료.",
    sourceLinks: 5,
    risk: "low",
    policyNotes: [
      "P1 incident template v3",
      "exec comms policy",
      "public status page change window 확인",
    ],
    evidence: [
      "incident thread summary",
      "Jira incident issue",
      "status page timeline",
      "action items 6개",
    ],
    systemWrites: [
      "status page update 완료",
      "Jira follow-up task 6개 생성",
      "Confluence postmortem draft 생성",
    ],
    timeline: [
      { step: "접수", detail: "channel escalation thread 감지", state: "done" },
      { step: "검증", detail: "severity / owner / impact scope 정리", state: "done" },
      { step: "승인", detail: "low-risk publish rule로 자동 실행", state: "done" },
      { step: "실행", detail: "Status Page + Jira + Confluence 반영 완료", state: "done" },
    ],
  },
  {
    id: "req-cx-refund-vip-exception",
    title: "VIP 환불 예외 검토 / Refund exception",
    requester: "이OO",
    pack: "CX Exception",
    department: "CX Ops",
    status: "실패",
    statusTone: "danger",
    submittedAt: "2026-04-01 07:50",
    dueAt: "2026-04-01 08:30",
    approver: "Finance reviewer",
    destination: "OMS + CRM",
    summary: "주문 데이터는 조회됐지만 CRM 권한 부족으로 recommendation draft가 fallback 상태로 남았습니다.",
    sourceLinks: 2,
    risk: "medium",
    policyNotes: [
      "VIP compensation guide 1.4",
      "refund exception는 finance visibility 필요",
    ],
    evidence: [
      "OMS order summary",
      "CS thread transcript digest",
    ],
    systemWrites: [
      "CRM note write 실패",
      "fallback human review queue 등록",
      "권한 예외 요청 draft 생성",
    ],
    timeline: [
      { step: "접수", detail: "CX thread + order context 수집", state: "done" },
      { step: "검증", detail: "OMS, policy, compensation history 조회", state: "done" },
      { step: "승인", detail: "finance approval 필요", state: "current" },
      { step: "실행", detail: "CRM 권한 부족 해결 후 재시도 예정", state: "upcoming" },
    ],
  },
];

export const consoleApprovals: ConsoleApprovalRecord[] = [
  {
    id: "appr-acme-discount-renewal",
    requestId: "req-acme-discount-renewal",
    title: "ACME Corp 할인 검토",
    requester: "김대리",
    approver: "VP Sales",
    pack: "Deal Desk",
    risk: "high",
    submittedAt: "2026-04-01 10:47",
    dueAt: "2026-04-01 13:00",
    recommendation: "상위 승인 요청",
    detail: "할인율 18%, 정책 한도 15%, 유사 승인 사례 4건, 마진 영향 -6.2%.",
    impact: "승인 시 CRM opportunity / quote approval history 갱신",
  },
  {
    id: "appr-busan-travel-approval",
    requestId: "req-busan-travel-approval",
    title: "부산 출장 승인 요청",
    requester: "박OO",
    approver: "부서장",
    pack: "People Ops",
    risk: "medium",
    submittedAt: "2026-04-01 09:16",
    dueAt: "2026-04-01 18:00",
    recommendation: "승인",
    detail: "정책 범위 내 비용, 사전 신청 완료, 목적/일정 명확.",
    impact: "승인 시 Workday request와 expense draft 생성",
  },
  {
    id: "appr-snowflake-read-30d",
    requestId: "req-snowflake-read-30d",
    title: "Snowflake 읽기 권한 30일",
    requester: "홍길동",
    approver: "팀장",
    pack: "IT Access",
    risk: "medium",
    submittedAt: "2026-04-01 11:31",
    dueAt: "2026-04-01 16:00",
    recommendation: "30일 만료 접근 승인",
    detail: "현재 역할 Analyst, warehouse read only, production write 없음.",
    impact: "승인 시 Okta grant + Jira ticket + audit trace 생성",
  },
  {
    id: "appr-vip-refund-exception",
    requestId: "req-cx-refund-vip-exception",
    title: "VIP 환불 예외 검토",
    requester: "이OO",
    approver: "Finance reviewer",
    pack: "CX Exception",
    risk: "medium",
    submittedAt: "2026-04-01 08:02",
    dueAt: "2026-04-01 10:00",
    recommendation: "추가 질문 후 재검토",
    detail: "OMS 데이터는 조회됐으나 CRM enrichment가 실패해 근거가 부족합니다.",
    impact: "권한 예외 승인 시 fallback queue에서 재실행",
  },
];

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

export const consoleConnectors: ConsoleConnectorRecord[] = [
  {
    id: "connector-slack-mcp",
    name: "Slack MCP",
    status: "connected",
    statusTone: "success",
    scope: "messages / search / users / app home",
    mode: "user delegated",
    lastSync: "1분 전",
    note: "request context와 approval surface의 기본 입구입니다.",
  },
  {
    id: "connector-okta",
    name: "Okta",
    status: "write gated",
    statusTone: "brand",
    scope: "grant / expire / group lookup",
    mode: "approval required",
    lastSync: "5분 전",
    note: "권한 변경은 preview + confirm + expiry를 기본값으로 둡니다.",
  },
  {
    id: "connector-jira",
    name: "Jira",
    status: "degraded",
    statusTone: "warning",
    scope: "create / update / link",
    mode: "service account + idempotency key",
    lastSync: "2분 전",
    note: "최근 timeout 비율이 높아 fallback queue와 retry queue를 함께 사용합니다.",
  },
  {
    id: "connector-salesforce",
    name: "Salesforce CRM",
    status: "connected",
    statusTone: "success",
    scope: "opportunity / quote / notes",
    mode: "approval required for write",
    lastSync: "7분 전",
    note: "Deal Desk pack의 system of record입니다.",
  },
  {
    id: "connector-notion",
    name: "Notion / Wiki",
    status: "search only",
    statusTone: "neutral",
    scope: "knowledge retrieval",
    mode: "read only",
    lastSync: "12분 전",
    note: "policy cited answer rate를 올리는 source-of-truth 역할입니다.",
  },
  {
    id: "connector-workday",
    name: "Workday",
    status: "pilot scope",
    statusTone: "brand",
    scope: "travel / people requests",
    mode: "starter pack only",
    lastSync: "25분 전",
    note: "People Ops pack 파일럿 범위에서만 사용 중입니다.",
  },
];

export const consolePolicies: ConsolePolicyRecord[] = [
  {
    id: "policy-employee",
    role: "일반 직원",
    defaultScope: "read / request_create",
    readActions: ["정책 질문", "근거 링크 조회", "요청 상태 확인"],
    writeActions: ["요청 초안 생성", "preview 확인 후 제출"],
    adminActions: [],
    guardrails: ["읽기 작업은 사용자 권한 범위 내 자동", "쓰기 작업은 preview + confirm", "민감 데이터는 source links만 노출"],
  },
  {
    id: "policy-manager",
    role: "매니저 / 승인자",
    defaultScope: "approve / expire / delegate",
    readActions: ["근거 링크 / 영향 범위 확인", "관련 정책과 유사 사례 조회"],
    writeActions: ["승인 / 반려", "만료일 설정", "delegate"],
    adminActions: [],
    guardrails: ["approval card에 risk / impact / source links 포함", "중요 write는 사람이 최종 승인", "사유와 만료일을 audit log에 기록"],
  },
  {
    id: "policy-admin",
    role: "운영 관리자",
    defaultScope: "connector_manage / policy_edit / audit_read",
    readActions: ["failed run 분석", "trace / latency / cost 조회"],
    writeActions: ["connector 설정 수정", "fallback rule 추가", "manual replay"],
    adminActions: ["권한 모델 수정", "audit export", "policy tuning"],
    guardrails: ["write/admin tool 분리", "서비스 계정은 background job 전용", "모든 변경은 trace + audit 분리 기록"],
  },
  {
    id: "policy-security",
    role: "보안 리뷰어",
    defaultScope: "read / secondary approval",
    readActions: ["고위험 요청 감사", "scope / expiry / delegated token 검토"],
    writeActions: ["2인 승인", "보안 메모 남기기"],
    adminActions: ["예외 승인 정책 검토"],
    guardrails: ["ADMIN 액션은 approval required", "짧은 토큰 + 만료 시간 기본", "필요 시 보안팀 참조"],
  },
];

export const consoleAuditTrail: ConsoleAuditRecord[] = [
  {
    id: "audit-240401-001",
    actor: "VP Sales",
    event: "approval_requested",
    target: "ACME Corp 할인 검토",
    at: "2026-04-01 10:47",
    outcome: "대기",
    outcomeTone: "warning",
    detail: "상위 승인 요청 카드 생성, source links 4개 첨부",
  },
  {
    id: "audit-240401-002",
    actor: "Agent Gateway",
    event: "policy_check_passed",
    target: "부산 출장 승인 요청",
    at: "2026-04-01 09:14",
    outcome: "완료",
    outcomeTone: "success",
    detail: "국내 출장 일비 한도, 사전 신청 기한, 전결 범위 자동 확인",
  },
  {
    id: "audit-240401-003",
    actor: "IT Ops manager",
    event: "approval_pending",
    target: "Snowflake 읽기 권한 30일",
    at: "2026-04-01 11:32",
    outcome: "대기",
    outcomeTone: "brand",
    detail: "만료일 2026-05-01, 영향 범위 warehouse read only",
  },
  {
    id: "audit-240401-004",
    actor: "Connector monitor",
    event: "write_failed",
    target: "Salesforce CRM note write",
    at: "2026-04-01 07:52",
    outcome: "실패",
    outcomeTone: "danger",
    detail: "CRM 권한 부족으로 fallback human review queue 등록",
  },
  {
    id: "audit-240401-005",
    actor: "Ops Admin",
    event: "policy_updated",
    target: "Jira MCP timeout fallback",
    at: "2026-04-01 06:55",
    outcome: "완료",
    outcomeTone: "success",
    detail: "retry queue와 manual replay rule을 추가해 degraded run을 완화",
  },
];

export const consoleReports: ConsoleReportRecord[] = [
  {
    id: "report-weekly-exec",
    title: "Weekly Executive Brief",
    audience: "부서장 / COO / CIO",
    cadence: "주간",
    summary: "이번 주 자동 처리 124건, 승인 대기 17건, 실패 6건, 평균 응답 42초.",
    highlights: [
      "Deal Desk / People Ops / IT Access pack이 전체 처리량의 78% 차지",
      "승인 병목은 Deal Desk 상위 승인과 IT access 만료형 권한 요청에 집중",
      "주당 12시간 전문가 절감과 approval turnaround 단축이 핵심 가치",
    ],
  },
  {
    id: "report-ops-hotspots",
    title: "Failure Hotspots & Replay Queue",
    audience: "운영 관리자 / 보안",
    cadence: "일간",
    summary: "Jira MCP timeout 42%, CRM 권한 부족 28%, 정책 문서 버전 불일치 15%가 top failure입니다.",
    highlights: [
      "degraded connector는 replay queue와 fallback human review 동시 운영",
      "policy cited answer rate가 낮은 pack은 source-of-truth 문서 정리 필요",
      "trace / cost / latency를 분리 기록해 구조 문제와 prompt 문제를 구분",
    ],
  },
  {
    id: "report-pilot-roadmap",
    title: "30 / 60 / 90 Day Expansion",
    audience: "챔피언 + 예산권자",
    cadence: "격주",
    summary: "작게 시작 → 증명 → 확장 구조를 유지하며 2번째 부서 확장을 준비합니다.",
    highlights: [
      "Day 0-30: 한 부서, 한 요청 유형 선택",
      "Day 31-60: pilot launch + KPI 측정",
      "Day 61-90: 성과 확인 후 두 번째 부서 확장",
    ],
  },
];

export const consoleHighlights = [
  {
    title: "Top failures",
    items: [
      "Jira MCP timeout — 42%",
      "CRM 권한 부족 — 28%",
      "정책 문서 버전 불일치 — 15%",
    ],
  },
  {
    title: "Live action packs",
    items: [
      "Deal Desk approval pack",
      "People Ops request pack",
      "IT Access expiring grant pack",
    ],
  },
  {
    title: "Mock-data note",
    items: [
      "숫자와 상태는 product deck / blueprint 기반의 demo shell용 mock data입니다.",
      "실제 backend integration, auth guard, runtime execution은 T07에서 연결합니다.",
    ],
  },
] as const;

export function getConsoleRequestById(id: string) {
  return consoleRequests.find((request) => request.id === id);
}

export function getApprovalsForRequest(id: string) {
  return consoleApprovals.filter((approval) => approval.requestId === id);
}

export function getRunsForRequest(id: string) {
  return consoleRuns.filter((run) => run.requestId === id);
}
