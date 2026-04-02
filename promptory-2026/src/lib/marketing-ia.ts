export type MarketingNavItem = {
  href: string;
  label: string;
};

export type MarketingFooterGroup = {
  title: string;
  links: MarketingNavItem[];
};

export const marketingPrimaryNav: MarketingNavItem[] = [
  { href: "/packages", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/education", label: "Education" },
  { href: "/security", label: "Security" },
  { href: "/pilot", label: "Pilot" },
];

export const footerGroups: MarketingFooterGroup[] = [
  {
    title: "Explore",
    links: marketingPrimaryNav,
  },
  {
    title: "Resources",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
      { href: "/architecture", label: "Architecture" },
      { href: "/demo/slack", label: "Demo" },
    ],
  },
  {
    title: "Quick starts",
    links: [
      { href: "/solutions/sales-ops", label: "Sales Ops" },
      { href: "/industries/saas-it", label: "SaaS / IT" },
      { href: "/education/diagnostic", label: "Diagnostic" },
      { href: "/education/team-workshop", label: "Team Workshop" },
    ],
  },
];

export const marketingPrimaryNavItems = marketingPrimaryNav;
export const marketingNavItems = marketingPrimaryNav;
export const marketingFooterGroups = footerGroups;

export const productPillars = [
  {
    title: "Request intake inside Slack",
    description: "DM, App Home, shortcuts, modals를 통해 요청 접수와 상태 확인을 Slack 안에서 끝냅니다.",
  },
  {
    title: "Approval-driven workflow",
    description: "정책 확인, approval card, 사람 승인, 결과 회신을 request-to-resolution 흐름으로 연결합니다.",
  },
  {
    title: "System write-back",
    description: "최종 변경은 Jira, CRM, IAM, ERP 같은 실제 시스템에 남도록 설계합니다.",
  },
] as const;

export const starterActionPacks = [
  {
    title: "Deal Desk approval",
    description: "할인·조건 예외 → 승인 카드 → CRM 반영",
  },
  {
    title: "People request pack",
    description: "출장·계정·정책 예외 → 승인 → HRIS/IAM 반영",
  },
  {
    title: "IT access pack",
    description: "권한 요청 → preview + approval → IAM/ITSM 반영",
  },
] as const;

export const pilotPrinciples = [
  "한 부서, 한 요청 유형, 세 개 안팎의 도구로 시작합니다.",
  "읽기 자동, 쓰기 preview + confirm, 관리자 작업 approval required를 기본으로 둡니다.",
  "internal app + human approval + audit log를 첫 기본값으로 잡습니다.",
] as const;

export const securityPrinciples = [
  {
    title: "원문 최소 보관",
    body: "민감 데이터는 장기 저장하지 않고 필요 시 실시간 재조회하는 구조를 기본값으로 둡니다.",
  },
  {
    title: "역할 기반 범위 제한",
    body: "일반 직원, 승인자, 운영자별로 읽기·쓰기·관리자 액션과 데이터 범위를 분리합니다.",
  },
  {
    title: "Human-in-the-loop",
    body: "side-effect가 있는 작업은 preview와 사람 승인 후 실행합니다.",
  },
  {
    title: "Audit-first",
    body: "누가 어떤 근거로 승인했고 어떤 시스템이 반영됐는지 trace와 audit log로 남깁니다.",
  },
] as const;

export type EducationProgram = {
  title: string;
  summary: string;
  audience: string;
  format: string;
  outcome: string;
  toolset: string[];
};

export const educationProgramBySlug: Record<"diagnostic" | "hands-on" | "team-workshop", EducationProgram> = {
  diagnostic: {
    title: "직장인을 위한 AI 업무자동화 진단",
    summary: "현재 반복 업무를 듣고 어떤 요청·승인·보고 흐름부터 줄일지 정리하는 진단형 front-end offer입니다.",
    audience: "직장인 · 소규모 팀 · 초기 문의 리드",
    format: "60분 진단 · 병목 인터뷰 · 우선순위 정리",
    outcome: "자동화 우선순위 · 추천 툴 조합 · 다음 2주 실행안",
    toolset: ["Slack", "ChatGPT", "n8n", "Google Sheets"],
  },
  "hands-on": {
    title: "내 업무로 배우는 AI 자동화 실습",
    summary: "Slack·ChatGPT·n8n·Google Sheets로 내 업무 하나를 실제로 줄여보는 실습형 offer입니다.",
    audience: "PM · 운영 담당자 · People Ops · Sales Ops",
    format: "2회 실습 · before/after 예시 · 미니 workflow 제작",
    outcome: "실습 흐름 1개 · 재사용 초안 · 후속 개선 체크리스트",
    toolset: ["Slack", "ChatGPT", "n8n", "Google Sheets"],
  },
  "team-workshop": {
    title: "우리 팀 요청·승인·보고 자동화 워크숍",
    summary: "팀의 승인 병목과 반복 요청을 짚고 첫 action pack 범위를 정하는 팀 단위 워크숍입니다.",
    audience: "팀장 · 운영 담당자 · 초기 파일럿 챔피언",
    format: "팀 워크숍 · 병목 맵핑 · 파일럿 범위 정의",
    outcome: "요청 흐름 맵 · pack 정의 · KPI 초안",
    toolset: ["Slack", "Approval flow", "Policy checklist", "MCP map"],
  },
};
