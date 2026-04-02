import type { ConsoleApprovalRecord } from "@/lib/console/types";

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

export function getApprovalsForRequest(id: string) {
  return consoleApprovals.filter((approval) => approval.requestId === id);
}
