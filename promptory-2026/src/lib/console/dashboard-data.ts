import type { ConsoleReportRecord, ConsoleStat } from "@/lib/console/types";

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
