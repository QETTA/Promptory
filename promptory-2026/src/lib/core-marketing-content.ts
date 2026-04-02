import { solutionPacks } from "@/lib/request-to-resolution-content";

export const homePilotMetrics = [
  {
    value: "1 부서",
    label: "첫 buyer부터 좁게",
    note: "처음에는 champion 한 명과 승인자 한 명이 보이는 범위만 닫습니다.",
  },
  {
    value: "1 workflow",
    label: "한 요청 유형만",
    note: "할인 승인, 출장 승인, 접근 권한 요청처럼 가장 반복적인 흐름 하나를 고릅니다.",
  },
  {
    value: "3 connectors",
    label: "도구도 작게",
    note: "Slack MCP와 핵심 시스템 두세 개만 연결해 merge-safe한 MVP를 만듭니다.",
  },
  {
    value: "4–6주",
    label: "증명 주기",
    note: "time-to-resolution, approval turnaround, escalation rate로 proof를 만듭니다.",
  },
] as const;

export const bundledAiProblemCards = [
  {
    title: "검색과 요약은 빠르게 번들화됩니다",
    body: "Slack, Notion, Rovo 같은 협업툴은 문서 검색, 요약, recap 기능을 플랫폼 기본 기능으로 흡수하는 방향입니다.",
  },
  {
    title: "답변형 봇은 일을 끝내지 못합니다",
    body: "정책을 찾아도 승인자가 판단할 카드가 없고, 시스템 반영은 결국 사람이 다시 해야 하면 request는 unresolved 상태로 남습니다.",
  },
  {
    title: "남는 자리는 request-to-resolution 입니다",
    body: "Slack에서 요청을 받고, 근거를 모으고, 승인 받고, 외부 시스템에 반영하는 approval-driven action pack이 제품의 핵심이 됩니다.",
  },
] as const;

export const requestResolutionFlow = [
  {
    eyebrow: "Request",
    title: "Slack 안에서 요청을 접수합니다",
    body: "DM, App Home, shortcut, modal로 사용자가 자연어 또는 구조화된 폼으로 요청을 시작합니다.",
  },
  {
    eyebrow: "Evidence",
    title: "근거와 현재 상태를 묶습니다",
    body: "정책 문서, 기존 시스템 상태, 유사 사례를 조회해 decision pack과 preview를 만듭니다.",
  },
  {
    eyebrow: "Approval",
    title: "사람이 판단해야 할 부분만 카드로 올립니다",
    body: "위험도, 영향 범위, 만료일, source links를 approval card에 압축해 승인 리드타임을 줄입니다.",
  },
  {
    eyebrow: "Resolution",
    title: "승인 후 시스템까지 반영합니다",
    body: "Jira, CRM, IAM, HRIS 같은 system of record에 결과를 남기고 Slack에 완료 상태를 돌려줍니다.",
  },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    badge: "빠른 파일럿",
    summary: "한 부서, 한 flow, 기본 approval 템플릿으로 proof를 만드는 시작점입니다.",
    commercial: "설치비 + 파일럿 패키지",
    fit: "첫 buyer 검증 · 4~6주 pilot",
    features: [
      "single department",
      "one request-to-resolution flow",
      "Slack App Home + DM + approval card",
      "Slack MCP + 2 custom connectors",
      "weekly ops review",
    ],
  },
  {
    name: "Department",
    badge: "운영 도입",
    summary: "두세 개의 action pack과 운영 리포트를 묶어 부서 단위로 확장하는 기본 상용 패키지입니다.",
    commercial: "설치비 + 연간 department pack",
    fit: "2~3개 pack · 주간 운영 리포트",
    features: [
      "2~3 action packs",
      "approval workflow 확장",
      "policy tuning + failed case replay",
      "ops dashboard and KPI review",
      "기본 커넥터 운영 지원",
    ],
  },
  {
    name: "Private",
    badge: "보안·배포 강화",
    summary: "고객사 전용 배포와 custom MCP를 포함한 private deployment 레일입니다.",
    commercial: "department pack + private deployment surcharge",
    fit: "customer VPC · custom connectors",
    features: [
      "customer environment deployment",
      "audit export and security review",
      "추가 커넥터 / data scope control",
      "운영 SLA 옵션",
      "보안팀 검토 대응 문서",
    ],
  },
  {
    name: "Enterprise",
    badge: "전사 실행 레이어",
    summary: "멀티 부서, exec briefing, 고급 approval rule까지 포함하는 orchestration 확장 패키지입니다.",
    commercial: "multi-department agreement",
    fit: "cross-department scale · exec reporting",
    features: [
      "multi department packs",
      "exec briefing and portfolio KPIs",
      "고급 approval routing",
      "cross-surface expansion planning",
      "전담 운영 cadence",
    ],
  },
] as const;

export const pricingModelPrinciples = [
  {
    title: "Seat-based가 아니라 execution-based",
    body: "문서 검색 seat 과금이 아니라 승인·실행·연결 비용을 반영한 패키지로 설계합니다.",
  },
  {
    title: "설치비 + pack + 업차지",
    body: "초기에는 설치비, 부서형 연간 패키지, private deployment/custom connector 업차지 구조가 가장 현실적입니다.",
  },
  {
    title: "액션팩이 가격 단위",
    body: "Deal Desk, People Ops, IT Access 같은 pack 단위로 scope와 KPI를 명확히 해야 가격 방어가 됩니다.",
  },
] as const;

export const architectureGuardrails = [
  {
    title: "read / write / admin 분리",
    body: "검색과 조회는 자동화하되, side-effect가 있는 작업은 preview와 approval을 강제합니다.",
  },
  {
    title: "delegated token 우선",
    body: "공용 super-bot 대신 on-behalf-of-user 범위를 기본값으로 두고 서비스 계정은 background job으로 제한합니다.",
  },
  {
    title: "trace와 audit를 분리 기록",
    body: "사용자 행위는 audit log, 모델과 도구 경로는 trace로 나눠 저장해 운영과 감사 시야를 동시에 확보합니다.",
  },
  {
    title: "도메인별 MCP boundary",
    body: "Slack MCP, IAM, Jira, CRM, HRIS를 하나의 도구 서버에 몰아넣지 않고 domain boundary를 나눕니다.",
  },
] as const;

export const securityRoleCards = [
  {
    role: "일반 직원",
    rules: ["정책 질문", "요청 초안", "권한 요청", "읽기 작업 자동 허용"],
  },
  {
    role: "매니저 / 승인자",
    rules: ["승인 / 반려", "만료일 설정", "예외 승인", "영향 범위 검토"],
  },
  {
    role: "운영관리자",
    rules: ["connector 관리", "policy 조정", "실패 재실행", "audit 조회"],
  },
  {
    role: "게스트 / 외부인",
    rules: ["read-only 안내", "사람 handoff", "action tools 차단", "시간제 접근"],
  },
] as const;

export const contactFitSignals = [
  "Slack을 이미 쓰고 있고 요청·승인·보고 병목이 분명한 팀",
  "People Ops, Sales Ops, IT Ops처럼 반복 예외가 많은 부서",
  "검색봇이 아니라 실제 시스템 반영까지 닫히는 구조가 필요한 팀",
] as const;

export const contactPreparationChecklist = [
  "가장 자주 막히는 요청 유형 1개",
  "지금 사람이 직접 옮겨 적는 시스템 2~3개",
  "승인자가 판단할 때 꼭 필요한 근거",
  "현재 처리시간 또는 승인 리드타임의 대략적인 기준",
] as const;

export const contactAfterInquirySteps = [
  {
    title: "Workflow fit 확인",
    body: "현재 요청 흐름과 승인 병목이 action pack 구조와 맞는지 빠르게 확인합니다.",
  },
  {
    title: "Pilot 범위 제안",
    body: "한 부서·한 workflow·세 개 안팎 도구로 시작하는 가장 작은 proof scope를 제안합니다.",
  },
  {
    title: "Demo / next-step 정리",
    body: "Slack surface 예시, approval card, KPI baseline, 다음 4~6주 계획을 한 번에 정리합니다.",
  },
] as const;

export const pilotDonts = [
  "처음부터 전사 공통 agent를 만들기",
  "모든 시스템을 하나의 MCP 서버에 넣기",
  "공용 관리자 토큰으로 사용자 액션을 대행하기",
  "감사 로그 없이 자율 실행을 허용하기",
] as const;

export const homeMetricCards = homePilotMetrics.map((item) => ({
  label: item.label,
  value: item.value,
  detail: item.note,
})) as ReadonlyArray<{ label: string; value: string; detail: string }>;

export const searchExecutionGapCards = bundledAiProblemCards.map((item, index) => ({
  eyebrow: index === 2 ? "Opportunity" : "Shift",
  title: item.title,
  description: item.body,
  highlight: index === 2,
})) as ReadonlyArray<{ eyebrow: string; title: string; description: string; highlight: boolean }>;

export const actionPackHighlights = solutionPacks.slice(0, 3).map((pack) => ({
  slug: pack.slug,
  audience: pack.audience,
  title: pack.title,
  summary: pack.summary,
  workflow: pack.firstWorkflow,
  systems: pack.systems,
})) as ReadonlyArray<{
  slug: string;
  audience: string;
  title: string;
  summary: string;
  workflow: string;
  systems: readonly string[];
}>;

export const pilotRoadmap = homePilotMetrics.slice(0, 3).map((item) => ({
  title: item.label,
  body: item.note,
})) as ReadonlyArray<{ title: string; body: string }>;
