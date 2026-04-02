export type MarketingNavItem = {
  href: string;
  label: string;
};

export const marketingPrimaryNavItems: MarketingNavItem[] = [
  { href: "/packages", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/education", label: "Education" },
  { href: "/security", label: "Security" },
  { href: "/pilot", label: "Pilot" },
];

export const marketingFooterResourceLinks = [
  { href: "/architecture", label: "아키텍처" },
  { href: "/pricing", label: "패키징" },
  { href: "/demo/slack", label: "Slack 데모" },
  { href: "/contact", label: "문의" },
] as const;

export type SolutionSlug = "deal-desk" | "people-ops" | "it-access" | "finance-procurement";

export type SolutionPack = {
  slug: SolutionSlug;
  title: string;
  shortTitle: string;
  summary: string;
  audience: string;
  entryPoint: string;
  firstWorkflow: string;
  systems: string[];
  kpis: string[];
  proofPoint: string;
  steps: string[];
  useCases: string[];
};

export const solutionPacks: SolutionPack[] = [
  {
    slug: "deal-desk",
    title: "Deal Desk Approval Pack",
    shortTitle: "Deal Desk",
    summary:
      "할인·조건·예외 승인을 Slack 스레드에서 검토하고, 승인 카드와 CRM 반영까지 한 흐름으로 닫는 패키지입니다.",
    audience: "Sales Ops · RevOps · Sales Leadership",
    entryPoint: "고객 할인 요청, renewal 조건 검토, terms exception",
    firstWorkflow: "할인 요청 → 정책/CRM 조회 → 승인 카드 → CRM 업데이트",
    systems: ["CRM", "pricing policy", "quote docs", "approval log"],
    kpis: ["approval turnaround time", "discount compliance", "request-to-resolution time"],
    proofPoint: "승인 리드타임과 마진 보호를 동시에 증명하기 가장 쉬운 pack",
    steps: [
      "영업 담당자가 Slack thread 또는 shortcut으로 할인 예외를 요청합니다.",
      "Agent가 CRM, pricing policy, 유사 승인 사례를 묶어 decision pack을 만듭니다.",
      "매니저 또는 VP가 approval card에서 승인·반려·상위 승인 요청을 선택합니다.",
      "최종 상태를 CRM과 follow-up task에 남기고 결과를 Slack에 회신합니다.",
    ],
    useCases: ["할인 승인", "renewal terms", "special pricing", "deal exception"],
  },
  {
    slug: "people-ops",
    title: "People Ops Request Pack",
    shortTitle: "People Ops",
    summary:
      "출장, 계정 생성, 장비 구매, 정책 예외처럼 반복 요청이 많은 People Ops 흐름을 요청·승인·결과 보고까지 연결합니다.",
    audience: "People Ops · Workplace Ops · HR Generalist",
    entryPoint: "출장 승인, 계정 발급, 장비 요청, 휴가·복지 정책 질의",
    firstWorkflow: "요청 생성 → 정책 확인 → 승인 카드 → HRIS/IAM/티켓 반영",
    systems: ["HRIS", "IAM", "docs", "ticketing"],
    kpis: ["approval lead time", "auto-approved rate", "employee response time"],
    proofPoint: "반복 요청 자동화와 직원 체감 개선이 함께 보이는 pack",
    steps: [
      "직원이 App Home quick action 또는 DM에서 요청을 시작합니다.",
      "Agent가 정책 문서와 현재 상태를 읽어 초안과 추천안을 만듭니다.",
      "필요 시 팀장이나 운영자가 approval modal에서 승인 또는 만료일을 결정합니다.",
      "계정 생성, 티켓 등록, 결과 회신과 audit log까지 자동으로 연결됩니다.",
    ],
    useCases: ["출장 승인", "계정 생성", "장비 요청", "정책 예외"],
  },
  {
    slug: "it-access",
    title: "IT Access & Security Pack",
    shortTitle: "IT Access",
    summary:
      "권한 요청, 접근 만료, 보안 증빙 수집, incident bridge 같은 IT/Security 요청을 안전한 승인형 workflow로 운영합니다.",
    audience: "IT Ops · Security · Platform Engineering",
    entryPoint: "DB/SaaS 접근 요청, 권한 변경, 보안 증빙, incident support",
    firstWorkflow: "권한 요청 → 정책/현재 권한 조회 → 승인 + 만료일 → IAM/ITSM 반영",
    systems: ["Okta/IAM", "Jira/ITSM", "Slack logs", "policy docs"],
    kpis: ["median time to resolution", "human escalation rate", "policy-cited answer rate"],
    proofPoint: "읽기 자동화 + 쓰기 preview + 관리자 승인이라는 guardrail이 분명한 pack",
    steps: [
      "직원이 DM 또는 shortcut으로 접근 권한을 요청합니다.",
      "Agent가 Slack context, 정책 문서, IAM 상태를 조회해 근거를 정리합니다.",
      "매니저가 approval card에서 기간·영향 범위를 확인하고 승인합니다.",
      "Temporal workflow가 티켓 생성, 권한 부여, audit 기록을 실행하고 결과를 다시 Slack에 남깁니다.",
    ],
    useCases: ["DB read access", "SaaS access", "security evidence", "incident bridge"],
  },
  {
    slug: "finance-procurement",
    title: "Finance & Procurement Pack",
    shortTitle: "Finance & Procurement",
    summary:
      "지출 승인, vendor exception, 구매 요청, 증빙 수집 같은 재무·구매 흐름을 request-to-resolution 구조로 표준화합니다.",
    audience: "Finance Ops · Procurement · Biz Ops",
    entryPoint: "구매 요청, vendor 예외, 월마감 pack, 지출 승인",
    firstWorkflow: "요청 접수 → 정책/예산/증빙 확인 → 승인 카드 → ERP·구매 시스템 반영",
    systems: ["ERP", "procurement system", "BI", "email/docs"],
    kpis: ["request close time", "rework rate", "evidence completeness"],
    proofPoint: "증빙 수집과 승인 routing이 동시에 필요한 부서에 적합한 pack",
    steps: [
      "직원이 purchase request 또는 vendor exception을 Slack에서 접수합니다.",
      "Agent가 예산, 정책, 관련 문서를 묶어 review packet을 만듭니다.",
      "승인자가 카드에서 조건부 승인·반려·추가 질문을 남깁니다.",
      "최종 상태를 ERP와 운영 로그에 남기고 결과를 Slack에 회신합니다.",
    ],
    useCases: ["purchase request", "vendor exception", "expense approval", "month-end evidence"],
  },
];

export const solutionPackMap = Object.fromEntries(
  solutionPacks.map((pack) => [pack.slug, pack]),
) as Record<SolutionSlug, SolutionPack>;

export type IndustrySlug =
  | "investment"
  | "healthcare"
  | "saas-it"
  | "manufacturing"
  | "retail-ecommerce"
  | "logistics-distribution";

export type IndustryPlaybook = {
  slug: IndustrySlug;
  title: string;
  shortTitle: string;
  summary: string;
  champion: string;
  firstPack: string;
  systems: string[];
  kpis: string[];
  whyItFits: string[];
  flagshipFlow: string[];
  recommendedSolutions: SolutionSlug[];
};

export const industryPlaybooks: IndustryPlaybook[] = [
  {
    slug: "investment",
    title: "투자사 / 금융투자회사",
    shortTitle: "투자사",
    summary:
      "딜 triage, IC decision pack, LP 질의 대응처럼 정보 압축과 승인 trace가 중요한 흐름부터 닫는 vertical입니다.",
    champion: "투자운영 · IR · 파트너실",
    firstPack: "Deal triage + IC decision pack",
    systems: ["CRM", "Drive", "Calendar", "dataroom"],
    kpis: ["memo 작성 시간", "IC 준비 시간", "LP 회신 일관성"],
    whyItFits: [
      "Slack 논의, deck, memo, 모델이 분산되어 있어 decision pack 자동화 효과가 큽니다.",
      "승인 trace와 기록 보존이 중요해 audit-friendly 구조의 가치가 분명합니다.",
      "한 번 만든 engine을 DD, IR, 준법 흐름으로 확장하기 쉽습니다.",
    ],
    flagshipFlow: [
      "인바운드 pitch 또는 미팅 스레드를 감지합니다.",
      "CRM·Drive·Calendar에서 관련 자료를 회수해 pre-screen memo를 만듭니다.",
      "IC agenda, follow-up owner, decision log를 한 흐름으로 연결합니다.",
      "최종 결과를 CRM·dataroom·후속 task에 반영합니다.",
    ],
    recommendedSolutions: ["deal-desk", "finance-procurement"],
  },
  {
    slug: "healthcare",
    title: "의료기관 / 헬스케어",
    shortTitle: "의료",
    summary:
      "임상 판단이 아니라 referral intake, denial management, coordination, privacy evidence처럼 운영 workflow를 우선 공략하는 vertical입니다.",
    champion: "Patient Access · Revenue Cycle · Privacy/Quality",
    firstPack: "Referral intake completeness 또는 denial management pack",
    systems: ["EHR", "docs", "payer portal", "identity"],
    kpis: ["처리 리드타임", "접수 완결률", "재작업률"],
    whyItFits: [
      "문서 completeness와 payer workflow는 체크리스트·승인·증빙 자동화가 잘 맞습니다.",
      "minimum necessary 접근, role-based access, human approval 원칙을 명확하게 적용할 수 있습니다.",
      "Referral, denial, audit 대응처럼 반복 예외가 많은 흐름이 많습니다.",
    ],
    flagshipFlow: [
      "Referral 또는 denial 케이스를 intake 합니다.",
      "필수 문서와 보험 정보를 점검하고 누락 항목을 chase 합니다.",
      "staff review 후 scheduling packet 또는 appeal packet을 만듭니다.",
      "EHR·문서·task 업데이트와 privacy log를 함께 남깁니다.",
    ],
    recommendedSolutions: ["people-ops", "finance-procurement"],
  },
  {
    slug: "saas-it",
    title: "SaaS / IT 서비스 기업",
    shortTitle: "SaaS / IT",
    summary:
      "Slack native 조직이 많아 Deal Desk approval, escalation triage, access request 같은 pack을 가장 빨리 검증할 수 있는 vertical입니다.",
    champion: "Sales Ops · Support Ops · IT/Security",
    firstPack: "Deal Desk approval 또는 escalation triage pack",
    systems: ["CRM", "Jira", "KB", "status page"],
    kpis: ["approval 시간", "SLA", "MTTR"],
    whyItFits: [
      "Slack thread, Jira, CRM, status page가 이미 활성화된 팀이 많아 연결이 빠릅니다.",
      "승인 지연과 cross-team handoff 병목이 명확해 KPI 증명이 쉽습니다.",
      "첫 부서 검증 후 Support, IT, Product로 확장하기 쉽습니다.",
    ],
    flagshipFlow: [
      "할인 예외 또는 고객 escalation 스레드가 시작됩니다.",
      "Agent가 severity, owner, 정책 근거, 유사 사례를 묶습니다.",
      "승인 카드나 incident bridge에서 결정이 내려집니다.",
      "Jira, status page, CRM, postmortem draft까지 이어서 정리합니다.",
    ],
    recommendedSolutions: ["deal-desk", "it-access"],
  },
  {
    slug: "manufacturing",
    title: "제조",
    shortTitle: "제조",
    summary:
      "Shift handoff, NC/CAPA, supplier delay처럼 현장 예외를 owner·증빙·승인과 함께 닫는 pack이 강한 vertical입니다.",
    champion: "Quality · Plant Excellence · Maintenance",
    firstPack: "NC-CAPA pack 또는 shift handoff exception board",
    systems: ["QMS", "MES", "ERP", "vendor portal"],
    kpis: ["handoff 누락률", "NC/CAPA close time", "생산 차질 시간"],
    whyItFits: [
      "현장 문제는 채팅에 남지만 close owner와 evidence가 흩어지는 경우가 많습니다.",
      "품질 이슈와 공급사 예외는 승인 규칙과 재발 방지 로그가 중요합니다.",
      "한 번 만든 exception board를 품질, 정비, 구매로 재사용하기 쉽습니다.",
    ],
    flagshipFlow: [
      "현장 이슈가 shift handoff 또는 품질 deviation으로 보고됩니다.",
      "Agent가 사진, 측정치, 대화, 작업 로그를 evidence pack으로 묶습니다.",
      "Containment·disposition 승인을 받은 뒤 후속 action을 추적합니다.",
      "최종 CAPA와 ERP/QMS 반영으로 close 합니다.",
    ],
    recommendedSolutions: ["finance-procurement", "it-access"],
  },
  {
    slug: "retail-ecommerce",
    title: "리테일 / eCommerce",
    shortTitle: "리테일 / eCom",
    summary:
      "Promo readiness, refund exception, chargeback evidence처럼 cross-functional 예외를 launch 전후로 관리하는 vertical입니다.",
    champion: "Merch Ops · CX Ops · Finance/Fraud",
    firstPack: "Promo readiness pack 또는 refund/chargeback pack",
    systems: ["commerce", "OMS", "CRM", "BI"],
    kpis: ["launch issue율", "refund 처리시간", "chargeback 회수율"],
    whyItFits: [
      "프로모션 하나가 상품, 가격, 재고, CS, finance에 동시에 영향을 줍니다.",
      "예외 처리량이 많고 고객 보상 기준이 자주 문제를 일으킵니다.",
      "readiness board와 approval card만으로도 초기 가치가 잘 드러납니다.",
    ],
    flagshipFlow: [
      "행사나 환불 예외 요청이 생성됩니다.",
      "상품, 가격, 재고, 주문, 정책 정보를 하나의 readiness board로 묶습니다.",
      "담당자와 승인자가 수정·보상·예외 결정을 합니다.",
      "행사 후 이슈 요약과 CS 응대 문구까지 같은 흐름에 남깁니다.",
    ],
    recommendedSolutions: ["deal-desk", "finance-procurement"],
  },
  {
    slug: "logistics-distribution",
    title: "물류 / 유통",
    shortTitle: "물류 / 유통",
    summary:
      "Delay exception, warehouse issue, claim close처럼 handoff가 자주 끊기는 운영 예외를 closure chain으로 바꾸는 vertical입니다.",
    champion: "Ops Excellence · Dispatch · Claims",
    firstPack: "Delay exception resolution pack",
    systems: ["TMS", "WMS", "CRM", "billing"],
    kpis: ["exception close time", "SLA 위반률", "claim cycle time"],
    whyItFits: [
      "실시간 공유보다 누가 무엇을 언제 끝낼지 붙이는 것이 더 중요합니다.",
      "지연, 누락, claims가 빈번해 status brief와 recovery board 효과가 큽니다.",
      "Ops-warehouse-CS-billing을 연결하는 공통 pack으로 확장하기 쉽습니다.",
    ],
    flagshipFlow: [
      "지연 또는 운송 이슈를 감지합니다.",
      "Agent가 severity, owner, recovery option, 고객용 ETA brief를 만듭니다.",
      "필요한 승인과 reroute 결정을 수행합니다.",
      "배송 완료 후 POD, claim, billing update까지 함께 정리합니다.",
    ],
    recommendedSolutions: ["finance-procurement", "it-access"],
  },
];

export const industryPlaybookMap = Object.fromEntries(
  industryPlaybooks.map((playbook) => [playbook.slug, playbook]),
) as Record<IndustrySlug, IndustryPlaybook>;

export type EducationTrackSlug = "diagnostic" | "hands-on" | "team-workshop";

export type EducationTrack = {
  slug: EducationTrackSlug;
  title: string;
  summary: string;
  format: string;
  bestFor: string;
  outcomes: string[];
  fitSignals: string[];
};

export const educationTracks: EducationTrack[] = [
  {
    slug: "diagnostic",
    title: "직장인을 위한 AI 업무자동화 진단",
    summary:
      "현재 반복 업무를 듣고, 어떤 요청·승인·보고 흐름부터 자동화할지 1페이지 액션 플랜으로 정리하는 입문형 진단입니다.",
    format: "60분 진단 · 업무 흐름 인터뷰 · 우선순위 제안",
    bestFor: "개인 실무자, 팀 리더, 초기 문의 리드",
    outcomes: ["반복 업무 진단표", "자동화 우선순위", "추천 툴 조합", "다음 2주 실행안"],
    fitSignals: ["AI를 써보고 싶은데 어디부터 시작할지 모를 때", "내 업무 예제로 먼저 검증하고 싶을 때"],
  },
  {
    slug: "hands-on",
    title: "내 업무로 배우는 AI 자동화 실습",
    summary:
      "Slack·ChatGPT·n8n·Google Sheets를 활용해 내 업무 하나를 실제로 줄여보는 2회 실습형 트랙입니다.",
    format: "2회 실습 · before/after 예시 · 미니 workflow 제작",
    bestFor: "PM, 운영 담당자, People Ops, Sales Ops, 1인 스타트업",
    outcomes: ["미니 자동화 흐름", "실습용 템플릿", "요청/승인/보고 예시", "후속 개선 체크리스트"],
    fitSignals: ["배우고 바로 써먹는 실습형 서비스를 찾을 때", "Slack은 도구 중 하나이고 문제 해결이 더 중요할 때"],
  },
  {
    slug: "team-workshop",
    title: "우리 팀 요청·승인·보고 자동화 워크숍",
    summary:
      "팀이 겪는 승인 병목과 반복 요청을 함께 짚고, 첫 action pack 범위를 잡는 팀 단위 워크숍입니다.",
    format: "팀 워크숍 · 병목 맵핑 · 파일럿 범위 정의",
    bestFor: "팀장, 부서 운영자, 초기 파일럿 챔피언",
    outcomes: ["요청 흐름 맵", "우선 pack 정의", "성공지표 초안", "파일럿 범위 문서"],
    fitSignals: ["강의보다 팀 문제 해결이 중요한 경우", "숨고형 맞춤 진단·미니 구축 문의에 대응할 때"],
  },
];

export const educationTrackMap = Object.fromEntries(
  educationTracks.map((track) => [track.slug, track]),
) as Record<EducationTrackSlug, EducationTrack>;

export const securityPrinciples = [
  {
    title: "원문 최소 보관",
    body: "민감 데이터는 장기 저장하지 않고, 필요할 때 실시간으로 다시 조회하는 방향을 기본값으로 둡니다.",
    bullets: [
      "source-of-truth 재조회 우선",
      "원문 장기 복제 최소화",
      "필요한 범위만 일시 활용",
    ],
  },
  {
    title: "역할 기반 범위 제한",
    body: "일반 직원, 승인자, 운영자별로 읽기·쓰기·관리자 액션을 분리하고, 데이터 범위를 따로 제한합니다.",
    bullets: [
      "read / write / admin 분리",
      "delegated token 우선",
      "팀과 역할별 scope 제한",
    ],
  },
  {
    title: "Human-in-the-loop 승인",
    body: "민감하거나 side-effect가 있는 작업은 preview와 승인 단계를 거친 뒤에만 실행합니다.",
    bullets: [
      "approval card 기본값",
      "만료일과 영향 범위 표기",
      "승인 전 system write 차단",
    ],
  },
  {
    title: "Audit by default",
    body: "누가 어떤 근거로 승인했고 어떤 시스템이 반영됐는지 trace와 audit log로 남깁니다.",
    bullets: [
      "decision trace 저장",
      "실패 run 재검토 가능",
      "운영 리포트와 감사 로그 분리",
    ],
  },
] as const;

export const securityControlRows = [
  {
    area: "데이터 처리",
    defaultRule: "Slack과 원시 시스템을 실시간 조회, 원문 장기복제는 지양",
  },
  {
    area: "권한 모델",
    defaultRule: "RBAC / ABAC + delegated token + scope control",
  },
  {
    area: "승인 규칙",
    defaultRule: "READ 자동, WRITE preview + confirm, ADMIN approval required",
  },
  {
    area: "운영 로그",
    defaultRule: "trace, audit, expiry, 실패 재실행 이력을 분리 기록",
  },
] as const;

export const architectureLayers = [
  {
    title: "Slack UI",
    body: "DM, App Home, shortcuts, modals, approval card가 요청 접수와 결과 회신을 담당합니다.",
  },
  {
    title: "Agent Gateway",
    body: "intent 분류, 계획 수립, retry, memory, human-in-the-loop를 상태 기반으로 운영합니다.",
  },
  {
    title: "MCP Tool Mesh",
    body: "Slack MCP와 custom MCP를 분리해서 검색, 문서, 시스템 액션을 연결합니다.",
  },
  {
    title: "Policy & Auth",
    body: "OpenFGA, delegated token, approval rule, scope control로 실행 범위를 브레이크 합니다.",
  },
  {
    title: "Audit & Ops",
    body: "Postgres/pgvector, traces, cost, latency, failed run을 운영 시야로 제공합니다.",
  },
] as const;

export const recommendedStack = [
  {
    title: "Slack assistant + App Home + shortcuts + modals",
    body: "사용자 요청과 승인, 결과 회신이 모두 Slack 안에서 보이도록 표면을 고정합니다.",
  },
  {
    title: "LangGraph for stateful orchestration",
    body: "요청 상태, evidence gathering, fallback path를 상태 기반으로 조정합니다.",
  },
  {
    title: "Temporal for approvals, retry, long-running jobs",
    body: "Slack timeout 밖에서 approval wait, retry, 재실행을 안전하게 처리합니다.",
  },
  {
    title: "Slack MCP + custom MCP servers",
    body: "검색, 문서, 시스템 액션을 domain boundary에 맞춰 분리 연결합니다.",
  },
  {
    title: "OpenFGA + delegated user token",
    body: "권한 검증과 delegated scope control을 모델 밖의 정책 계층으로 분리합니다.",
  },
  {
    title: "Postgres + pgvector + Langfuse / OTel",
    body: "운영 이력, trace, retrieval context, observability를 한 운영 시야로 묶습니다.",
  },
] as const;

export const pilotPhases = [
  {
    title: "Discover",
    duration: "0-2주",
    summary: "한 부서, 한 요청 유형, 세 개 안팎의 도구만 고르는 단계",
    deliverables: ["scenario map", "policy list", "KPI baseline", "pilot scope"],
  },
  {
    title: "Pilot",
    duration: "3-6주",
    summary: "internal Slack app + approval flow + 1 workflow end-to-end 검증",
    deliverables: ["Slack assistant", "approval card", "ops review cadence", "weekly failed case replay"],
  },
  {
    title: "Scale",
    duration: "7-10주",
    summary: "정책 조정, 운영 대시보드, 두 번째 부서 확장 여부를 판단하는 단계",
    deliverables: ["policy tuning", "dashboard", "ROI review", "next pack plan"],
  },
] as const;

export const pilotMetrics = [
  "Median time to resolution",
  "Approval turnaround time",
  "Auto-resolution rate",
  "Policy-cited answer rate",
  "Human escalation rate",
] as const;

export const marketingNavItems = marketingPrimaryNavItems;

export const marketingFooterGroups = [
  {
    title: "Explore",
    links: marketingPrimaryNavItems,
  },
  {
    title: "Resources",
    links: marketingFooterResourceLinks,
  },
  {
    title: "Quick starts",
    links: [
      { href: "/packages/starter", label: "Starter" },
      { href: "/solutions/deal-desk", label: "Deal Desk" },
      { href: "/industries/saas-it", label: "SaaS / IT" },
      { href: "/education/diagnostic", label: "Diagnostic" },
    ],
  },
] as const;

export const packageTiers = [
  {
    slug: "starter",
    name: "Starter",
    badge: "빠른 파일럿",
    summary: "한 부서, 한 request-to-resolution flow를 빠르게 검증하는 시작 패키지입니다.",
    commercial: "설치비 + 파일럿 패키지",
    fit: "첫 buyer 검증 · 4~6주 pilot",
    features: [
      "single department",
      "one request workflow",
      "Slack App Home + DM + approval card",
      "2~3 connectors",
      "weekly ops review",
    ],
  },
  {
    slug: "department",
    name: "Department",
    badge: "운영 도입",
    summary: "부서 단위로 2~3개 pack을 묶어 운영 리포트까지 포함하는 기본 상용 레벨입니다.",
    commercial: "설치비 + 연간 department pack",
    fit: "2~3 pack · 주간 운영 리포트",
    features: [
      "2~3 action packs",
      "approval workflow expansion",
      "policy tuning",
      "ops dashboard",
      "connector operations",
    ],
  },
  {
    slug: "private",
    name: "Private",
    badge: "보안·배포 강화",
    summary: "고객사 전용 배포와 custom connector, security review를 포함하는 확장 레벨입니다.",
    commercial: "department pack + private deployment surcharge",
    fit: "customer VPC · custom connectors",
    features: [
      "customer deployment",
      "audit export",
      "scope control",
      "custom connector rail",
      "security review support",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    badge: "전사 실행 레이어",
    summary: "멀티 부서와 exec briefing, 고급 approval routing까지 포함하는 orchestration 레벨입니다.",
    commercial: "multi-department agreement",
    fit: "cross-department scale · exec reporting",
    features: [
      "multi department packs",
      "exec briefing",
      "advanced approval routing",
      "portfolio KPI review",
      "dedicated ops cadence",
    ],
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  name: string;
  badge: string;
  summary: string;
  commercial: string;
  fit: string;
  features: readonly string[];
}>;

export type PackageTier = (typeof packageTiers)[number];
export type PackageTierSlug = PackageTier["slug"];

export const packageTierMap = Object.fromEntries(
  packageTiers.map((tier) => [tier.slug, tier]),
) as Record<PackageTierSlug, PackageTier>;

export const packageTierDetails: Record<
  PackageTierSlug,
  {
    eyebrow: string;
    title: string;
    description: string;
    fitSignals: readonly string[];
    scopeNotes: readonly string[];
    successNote: string;
    primaryCta: { href: string; label: string };
    secondaryCta: { href: string; label: string };
  }
> = {
  starter: {
    eyebrow: "Fast proof",
    title: "한 부서, 한 workflow, 세 개 안팎의 도구로 proof를 만드는 시작점",
    description:
      "Starter는 범용 agent를 넓게 여는 단계가 아니라, approval-driven request-to-resolution workflow 하나를 4~6주 안에 닫아보는 패키지입니다.",
    fitSignals: [
      "반복량이 높고 승인 병목이 분명한 요청 유형이 이미 보일 때",
      "Slack 안에서 요청 접수와 approval card를 먼저 검증하고 싶을 때",
      "CRM, Jira, IAM 같은 핵심 시스템 2~3개만 연결해도 proof가 나는 팀일 때",
    ],
    scopeNotes: [
      "single department champion + approver owner 기준으로 scope를 자릅니다.",
      "read 자동화와 write preview/confirm을 기본 가드레일로 둡니다.",
      "주간 ops review에서 failed case와 approval lead time을 함께 봅니다.",
    ],
    successNote: "좋은 Starter는 기능 수보다 time-to-resolution과 approval turnaround 개선이 먼저 보입니다.",
    primaryCta: { href: "/contact?type=starter&plan=starter", label: "Starter 상담 요청" },
    secondaryCta: { href: "/pilot", label: "파일럿 범위 보기" },
  },
  department: {
    eyebrow: "Operational rollout",
    title: "검증된 흐름을 2~3개 pack으로 묶어 부서 운영 레벨로 올립니다",
    description:
      "Department는 하나의 proof를 넘어서, 같은 buyer와 approval owner 아래에서 action pack 두세 개를 운영 리포트와 함께 굴리는 상용 레벨입니다.",
    fitSignals: [
      "첫 workflow proof 이후 비슷한 승인·예외 흐름을 추가하고 싶을 때",
      "ops dashboard, failed-case replay, policy tuning이 필요해질 때",
      "부서 책임자가 KPI와 운영 cadence를 같이 보길 원할 때",
    ],
    scopeNotes: [
      "pack은 buyer와 승인 경로가 비슷한 흐름끼리 묶습니다.",
      "console KPI, connector 상태, policy tuning이 운영 루틴에 들어옵니다.",
      "교육형 funnel이 아니라 실제 부서 운영 pack으로 범위를 고정합니다.",
    ],
    successNote: "Department 단계부터는 action pack 수보다 운영 리포트와 approval consistency가 더 중요해집니다.",
    primaryCta: { href: "/contact?type=department&plan=department", label: "Department 상담 요청" },
    secondaryCta: { href: "/solutions", label: "부서형 pack 보기" },
  },
  private: {
    eyebrow: "Private deployment",
    title: "보안 요구와 connector boundary를 맞춘 private deployment 레일",
    description:
      "Private는 customer environment deployment, delegated access, audit export, custom connector rail까지 같이 설계해야 하는 보안·배포 강화 레벨입니다.",
    fitSignals: [
      "배포 위치와 데이터 경계를 먼저 맞춰야 구매 검토가 열릴 때",
      "approval, expiry, delegated token 같은 guardrail이 필수일 때",
      "custom connector나 customer-specific runtime boundary가 필요한 팀일 때",
    ],
    scopeNotes: [
      "read / write / admin action을 같은 권한 규칙으로 다루지 않습니다.",
      "audit와 trace를 분리 기록해 운영 시야와 감사 시야를 같이 유지합니다.",
      "runtime은 marketing/console과 분리된 별도 execution rail로 봅니다.",
    ],
    successNote: "좋은 Private 설계는 connector를 많이 붙이는 것이 아니라 boundary와 approval 규칙을 명확히 하는 것입니다.",
    primaryCta: { href: "/contact?type=private&plan=private", label: "Private 상담 요청" },
    secondaryCta: { href: "/security", label: "보안 원칙 보기" },
  },
  enterprise: {
    eyebrow: "Cross-department orchestration",
    title: "멀티 부서, exec briefing, 고급 approval routing까지 포함하는 확장 레벨",
    description:
      "Enterprise는 여러 부서의 pack을 포트폴리오처럼 운영하고, exec reporting과 고급 approval routing을 함께 보는 orchestration 단계입니다.",
    fitSignals: [
      "부서 여러 곳에서 request-to-resolution pack을 묶어 운영하려 할 때",
      "exec briefing과 portfolio KPI를 같이 관리해야 할 때",
      "정책, 운영, 배포, connector ownership이 여러 팀에 걸쳐 있을 때",
    ],
    scopeNotes: [
      "부서별 pack은 유지하되 운영 대시보드와 approval policy를 상위 레이어에서 봅니다.",
      "exec reporting과 ROI review가 정기 cadence로 들어옵니다.",
      "runtime, console, audit boundary를 먼저 정리한 뒤 scale 합니다.",
    ],
    successNote: "Enterprise 단계에서는 기능 확장보다 policy consistency와 cross-team handoff가 더 큰 성공 변수입니다.",
    primaryCta: { href: "/contact?type=enterprise&plan=enterprise", label: "Enterprise 상담 요청" },
    secondaryCta: { href: "/architecture", label: "아키텍처 보기" },
  },
};

export const legacyPackageRedirectMap = {
  "website-diagnosis-agent": "/packages",
  "campaign-brief-agent": "/packages",
  "korea-local-ops-agent": "/packages",
} as const satisfies Record<string, string>;

export const pricingPrinciples = [
  {
    title: "Seat-based가 아니라 execution-based",
    body: "검색 seat가 아니라 승인, 실행, 연결, 운영 범위를 가격 단위로 봅니다.",
  },
  {
    title: "설치비 + pack + 업차지",
    body: "초기에는 설치비, 부서형 pack, private deployment/custom connector 업차지 구조가 가장 현실적입니다.",
  },
  {
    title: "액션팩이 가격 단위",
    body: "Deal Desk, People Ops, IT Access 같은 pack 단위로 scope와 KPI를 고정해야 가격 방어가 됩니다.",
  },
] as const;

export const implementationGuardrails = [
  "read / write / admin을 같은 규칙으로 다루지 않습니다.",
  "delegated token을 우선하고 공용 관리자 토큰을 기본값으로 두지 않습니다.",
  "trace와 audit를 분리 기록해 운영 시야와 감사 시야를 동시에 유지합니다.",
  "Slack MCP, IAM, Jira, CRM 같은 도메인 도구는 boundary를 나눠 연결합니다.",
] as const;

export const workflowStages = [
  {
    step: "1",
    title: "Request",
    description: "Slack DM, App Home, shortcut, modal에서 요청을 접수합니다.",
  },
  {
    step: "2",
    title: "Evidence",
    description: "정책, 현재 상태, 유사 사례를 묶어 decision pack을 만듭니다.",
  },
  {
    step: "3",
    title: "Approval",
    description: "위험도와 영향 범위를 approval card로 압축해 사람 판단을 받습니다.",
  },
  {
    step: "4",
    title: "Resolution",
    description: "승인 후 Jira, CRM, IAM, ERP 같은 system of record에 결과를 반영합니다.",
  },
] as const satisfies ReadonlyArray<{ step: string; title: string; description: string }>;

export const pilotChecklist = [
  "반복량이 높은 요청 유형인지 확인",
  "승인자가 분명한 workflow인지 확인",
  "결과를 남길 system of record가 있는지 확인",
  "4~6주 안에 KPI proof가 가능한 범위로 자르기",
] as const;

export const pilotSuccessMetrics = pilotMetrics.map((item, index) => ({
  label: `Metric ${index + 1}`,
  value: item,
  detail: "pilot 동안 주간 ops review에서 추적해야 하는 핵심 지표입니다.",
})) as ReadonlyArray<{ label: string; value: string; detail: string }>;

export const buyerRoles = [
  {
    title: "Business champion",
    body: "반복 요청과 승인 병목을 가장 직접적으로 겪는 부서 리더가 첫 buyer가 됩니다.",
  },
  {
    title: "Approver owner",
    body: "정책과 예외 승인 규칙을 실제로 갖고 있는 승인자가 early design에 들어와야 합니다.",
  },
  {
    title: "Technical approver",
    body: "Slack app, MCP, delegated auth, 운영 범위를 빠르게 검토할 기술 승인자가 필요합니다.",
  },
  {
    title: "Security / ops gate",
    body: "배포와 운영 책임을 맡을 팀이 audit, expiry, fallback 구조를 확인해야 파일럿이 열립니다.",
  },
] as const;

export const actionTypePolicies = [
  {
    action: "READ",
    policy: "자동 조회 허용",
    rationale: "정책과 근거 확인은 최대한 자동화하되 source links와 권한 필터를 남깁니다.",
  },
  {
    action: "WRITE",
    policy: "preview + confirm",
    rationale: "system write 전에는 proposed change와 영향 범위를 먼저 보여 줍니다.",
  },
  {
    action: "ADMIN",
    policy: "approval required",
    rationale: "민감하거나 광범위한 변경은 승인자 판단과 만료일 설정이 필요합니다.",
  },
] as const;
