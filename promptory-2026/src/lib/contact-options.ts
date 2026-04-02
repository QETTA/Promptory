export const teamTypeLabels = {
  "sales-ops": "Sales Ops / Revenue Ops",
  "people-ops": "People Ops / HR Ops",
  "it-ops": "IT Ops / Access Ops",
  "finance-procurement": "Finance / Procurement",
  other: "기타",
} as const;

export const painPointLabels = {
  "deal-desk-approval": "할인 / 예외 승인 요청",
  "access-request": "계정 / 권한 요청",
  "people-request": "온보딩 / 휴가 / 인사 요청",
  "procurement-request": "구매 / 결재 요청",
  "incident-handoff": "운영 이슈 / 핸드오프",
  "reporting-ops": "주간 보고 / 운영 요약",
  other: "기타",
} as const;

export const teamTypeOptions = [
  { value: "sales-ops", label: "Sales Ops / Revenue Ops" },
  { value: "people-ops", label: "People Ops / HR Ops" },
  { value: "it-ops", label: "IT Ops / Access Ops" },
  { value: "finance-procurement", label: "Finance / Procurement" },
  { value: "other", label: "기타" },
] as const;

export const painPointOptions = [
  { value: "deal-desk-approval", label: "할인 / 예외 승인 요청" },
  { value: "access-request", label: "계정 / 권한 요청" },
  { value: "people-request", label: "온보딩 / 휴가 / 인사 요청" },
  { value: "procurement-request", label: "구매 / 결재 요청" },
  { value: "incident-handoff", label: "운영 이슈 / 핸드오프" },
  { value: "reporting-ops", label: "주간 보고 / 운영 요약" },
  { value: "other", label: "기타" },
] as const;
