import type { Metadata } from "next";

export type StubSection = {
  title: string;
  body: string;
  points?: string[];
};

export type StubDefinition = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  quickFacts?: { label: string; value: string }[];
  sections: StubSection[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export const solutionDefinitions: Record<string, StubDefinition> = {
  "sales-ops": {
    slug: "sales-ops",
    label: "Sales Ops",
    eyebrow: "Department pack",
    title: "Deal Desk와 승인 병목부터 닫는 Sales Ops pack",
    description:
      "할인 요청, 조건 예외, CRM 반영, 승인 카드 흐름을 하나로 묶는 request-to-resolution 솔루션 스텁입니다.",
    summary: "할인 검토 → 승인 카드 → CRM 반영까지 1개 플로우로 묶습니다.",
    quickFacts: [
      { label: "Starter flow", value: "Deal desk approval" },
      { label: "Core tools", value: "CRM · pricing policy · approval card" },
      { label: "Pilot KPI", value: "승인 리드타임 · 재문의율" },
    ],
    sections: [
      {
        title: "Trigger",
        body: "영업 담당자가 Slack에서 할인·조건 예외 요청을 시작합니다.",
        points: ["고객 등급 조회", "유사 사례 확인", "마진 영향 계산"],
      },
      {
        title: "Workflow",
        body: "정책 근거와 CRM 데이터를 묶어 승인 카드와 추천안을 만듭니다.",
        points: ["요청 초안", "팀장 승인", "상위 승인 분기"],
      },
      {
        title: "Outcome",
        body: "승인 이후 CRM 업데이트와 후속 task 생성까지 같은 흐름에서 닫습니다.",
        points: ["상태 타임라인", "감사 로그", "결과 회신"],
      },
    ],
    primaryCta: { href: "/pilot", label: "Sales Ops 파일럿 보기" },
    secondaryCta: { href: "/contact", label: "도입 문의" },
  },
  "people-ops": {
    slug: "people-ops",
    label: "People Ops",
    eyebrow: "Department pack",
    title: "출장·계정·정책 예외를 묶는 People Ops pack",
    description:
      "반복 HR 요청을 정책 확인, 승인, 계정 생성·수정까지 연결하는 운영형 솔루션 스텁입니다.",
    summary: "출장 승인과 계정 요청 같은 반복 요청을 더 짧은 승인 흐름으로 줄입니다.",
    quickFacts: [
      { label: "Starter flow", value: "Travel approval" },
      { label: "Core tools", value: "HRIS · IAM · docs" },
      { label: "Pilot KPI", value: "자동 승인율 · 평균 처리시간" },
    ],
    sections: [
      {
        title: "Trigger",
        body: "직원이 Slack에서 출장·계정·장비 요청을 시작합니다.",
        points: ["정책 질문", "요청 생성", "승인 대기"],
      },
      {
        title: "Workflow",
        body: "정책과 현재 사용자 상태를 바탕으로 preview와 approval flow를 생성합니다.",
        points: ["정책 근거 링크", "승인자 지정", "만료일 설정"],
      },
      {
        title: "Outcome",
        body: "People Ops는 예외 검토와 사람 중심 업무에 더 집중하고 반복 요청은 더 빠르게 닫습니다.",
        points: ["주당 절감시간", "정책 준수율", "직원 만족도"],
      },
    ],
    primaryCta: { href: "/education/team-workshop", label: "팀 워크숍 보기" },
    secondaryCta: { href: "/contact", label: "People Ops 상담" },
  },
  "it-ops": {
    slug: "it-ops",
    label: "IT Ops",
    eyebrow: "Department pack",
    title: "권한 요청과 인시던트 실행을 묶는 IT Ops pack",
    description:
      "읽기 권한 요청, 계정 생성, 인시던트 브리지 운영을 Slack 승인형 워크플로로 정리하는 스텁입니다.",
    summary: "권한 요청은 preview + approval, 인시던트는 trace + audit 중심으로 운영합니다.",
    quickFacts: [
      { label: "Starter flow", value: "Access request" },
      { label: "Core tools", value: "Okta · Jira · policy layer" },
      { label: "Pilot KPI", value: "해결 시간 · human review rate" },
    ],
    sections: [
      {
        title: "Trigger",
        body: "직원이 접근권한 요청이나 보안성 높은 작업을 Slack에서 시작합니다.",
        points: ["읽기 자동", "쓰기 preview", "관리자 승인"],
      },
      {
        title: "Workflow",
        body: "정책 레이어가 허용 범위를 계산하고 승인 카드가 필요한 경우만 사람 판단을 요청합니다.",
        points: ["OpenFGA check", "만료 권한", "audit note"],
      },
      {
        title: "Outcome",
        body: "중요 액션은 계속 통제하면서도 반복적인 요청 분류와 후속 실행은 더 빨라집니다.",
        points: ["latency", "failed runs", "재시도 정책"],
      },
    ],
    primaryCta: { href: "/security", label: "보안 원칙 보기" },
    secondaryCta: { href: "/contact", label: "기술 검토 요청" },
  },
  "finance-ops": {
    slug: "finance-ops",
    label: "Finance Ops",
    eyebrow: "Department pack",
    title: "지출·예외·마감 흐름을 닫는 Finance Ops pack",
    description:
      "비용 승인, vendor exception, 월마감 준비 같은 승인 중심 흐름을 빠르게 검증하기 위한 솔루션 스텁입니다.",
    summary: "승인 속도와 증빙 completeness를 동시에 보는 finance-first pack입니다.",
    quickFacts: [
      { label: "Starter flow", value: "Spend / vendor exception" },
      { label: "Core tools", value: "ERP · AP · BI" },
      { label: "Pilot KPI", value: "승인 처리시간 · 증빙 완결률" },
    ],
    sections: [
      {
        title: "Trigger",
        body: "반복 지출 요청이나 예외 승인 요청이 Slack에서 접수됩니다.",
        points: ["정책 요약", "필수 문서 확인", "예산 상태"],
      },
      {
        title: "Workflow",
        body: "요청 근거와 재무 데이터 범위를 묶어 승인 카드와 결과 보고를 생성합니다.",
        points: ["approval routing", "evidence pack", "fallback review"],
      },
      {
        title: "Outcome",
        body: "Finance Ops는 재작업과 누락을 줄이고, 승인 경로는 더 짧게 운영합니다.",
        points: ["close time", "exception rate", "audit readiness"],
      },
    ],
    primaryCta: { href: "/pilot", label: "Finance 파일럿 설계" },
    secondaryCta: { href: "/pricing", label: "패키지 보기" },
  },
};

export const solutionOrder = ["sales-ops", "people-ops", "it-ops", "finance-ops"] as const;

export const industryDefinitions: Record<string, StubDefinition> = {
  investment: {
    slug: "investment",
    label: "투자사",
    eyebrow: "Industry playbook",
    title: "Deal triage와 IC pack부터 시작하는 투자사 플레이북",
    description:
      "딜 triage, IC decision pack, IR·준법 흐름을 internal app 기반으로 여는 산업 스텁입니다.",
    summary: "정보 압축, 승인 trace, 기록 보존 가치가 높은 산업군입니다.",
    quickFacts: [
      { label: "First buyer", value: "투자운영 / IR" },
      { label: "Starter pack", value: "Deal triage + IC pack" },
      { label: "Pilot KPI", value: "memo 작성시간 · IC 준비시간" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "Slack 논의, 드라이브 문서, CRM, dataroom이 흩어져 있어 의사결정 pack 구성 비용이 큽니다.",
        points: ["pre-screen memo", "decision log", "audit pack"],
      },
      {
        title: "Flagship flow",
        body: "인바운드 소싱 또는 미팅노트가 들어오면 1-page memo, DD task, IC agenda까지 이어집니다.",
        points: ["source links", "approval trace", "follow-up task"],
      },
      {
        title: "Pilot lens",
        body: "처리 건수보다 파트너 준비 시간과 버전 혼선을 얼마나 줄였는지부터 봅니다.",
        points: ["6-8주 파일럿", "기록보존 검토", "준법 게이트"],
      },
    ],
    primaryCta: { href: "/pilot", label: "투자사 파일럿 설계" },
    secondaryCta: { href: "/contact", label: "산업 제안 문의" },
  },
  healthcare: {
    slug: "healthcare",
    label: "의료",
    eyebrow: "Industry playbook",
    title: "Referral intake와 denial workflow부터 여는 의료 플레이북",
    description:
      "임상 판단이 아니라 intake completeness, coordination, revenue cycle 운영 흐름에 붙이는 산업 스텁입니다.",
    summary: "PHI 최소 접근, minimum necessary, 사람 승인 원칙이 핵심입니다.",
    quickFacts: [
      { label: "First buyer", value: "Access Ops / RCM" },
      { label: "Starter pack", value: "Referral or denial pack" },
      { label: "Pilot KPI", value: "접수 완결률 · 재작업률" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "문서 completeness와 payer workflow 병목은 반복적이고, role-based review가 필수입니다.",
        points: ["missing doc chase", "handoff summary", "appeal draft"],
      },
      {
        title: "Flagship flow",
        body: "referral 수신 → 누락 항목 chase → staff review → scheduling packet 생성 흐름으로 시작합니다.",
        points: ["privacy log", "role-based access", "audit-ready pack"],
      },
      {
        title: "Pilot lens",
        body: "리드타임 단축과 completeness 개선이 먼저고, clinical autonomy를 건드리지 않습니다.",
        points: ["6-8주 파일럿", "minimum necessary", "보안 리뷰"],
      },
    ],
    primaryCta: { href: "/security", label: "보안 설계 보기" },
    secondaryCta: { href: "/contact", label: "헬스케어 문의" },
  },
  "saas-it": {
    slug: "saas-it",
    label: "SaaS / IT",
    eyebrow: "Industry playbook",
    title: "Slack-native 검증이 가장 빠른 SaaS / IT 플레이북",
    description:
      "Deal desk approval, escalation triage, access request처럼 Slack 상호작용이 많은 팀을 위한 산업 스텁입니다.",
    summary: "CRM, Jira, status page, docs가 이미 활발한 조직에서 가장 빨리 검증됩니다.",
    quickFacts: [
      { label: "First buyer", value: "Sales Ops / Support Ops" },
      { label: "Starter pack", value: "Deal desk or escalation" },
      { label: "Pilot KPI", value: "approval time · SLA · MTTR" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "이미 Slack-native로 협업하고 있어 approval + action pack 효과가 빨리 드러납니다.",
        points: ["discount approval", "escalation triage", "postmortem draft"],
      },
      {
        title: "Flagship flow",
        body: "고객 escalation thread를 감지해 severity, owner, Jira, status, exec update를 하나로 엮습니다.",
        points: ["owner routing", "status timeline", "after-action follow-up"],
      },
      {
        title: "Pilot lens",
        body: "가장 먼저 approval 시간, MTTR, cross-team clarity를 KPI로 봅니다.",
        points: ["4-6주 파일럿", "internal app", "policy-cited answers"],
      },
    ],
    primaryCta: { href: "/solutions/sales-ops", label: "Sales Ops solution 보기" },
    secondaryCta: { href: "/pilot", label: "SaaS / IT 파일럿 설계" },
  },
  manufacturing: {
    slug: "manufacturing",
    label: "제조",
    eyebrow: "Industry playbook",
    title: "NC-CAPA와 shift handoff를 닫는 제조 플레이북",
    description:
      "현장 예외, 품질 증빙, vendor follow-up처럼 닫히지 않는 일을 owner와 근거까지 붙여 관리하는 산업 스텁입니다.",
    summary: "문제를 보는 것이 아니라 evidence와 closure owner를 붙여 닫는 흐름이 핵심입니다.",
    quickFacts: [
      { label: "First buyer", value: "Quality / Plant excellence" },
      { label: "Starter pack", value: "NC-CAPA or handoff" },
      { label: "Pilot KPI", value: "handoff 누락률 · close time" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "현장, 품질, 정비, 공급사 사이 handoff가 잦고, 증빙 수집이 느리면 close time이 길어집니다.",
        points: ["shift issue board", "containment approval", "vendor dispatch"],
      },
      {
        title: "Flagship flow",
        body: "현장 이슈 등록 → 증빙 수집 → disposition 승인 → CAPA close를 ERP/QMS까지 연결합니다.",
        points: ["QMS", "MES", "ERP"],
      },
      {
        title: "Pilot lens",
        body: "예외 close time과 handoff 안정성을 먼저 증명하는 것이 유리합니다.",
        points: ["6-8주 파일럿", "QA/EHS gate", "사진·문서 접근 통제"],
      },
    ],
    primaryCta: { href: "/industries/logistics-distribution", label: "물류 플레이북도 보기" },
    secondaryCta: { href: "/contact", label: "제조 도입 상담" },
  },
  "retail-ecommerce": {
    slug: "retail-ecommerce",
    label: "리테일 / eCommerce",
    eyebrow: "Industry playbook",
    title: "Promo readiness와 refund exception을 묶는 리테일 플레이북",
    description:
      "프로모션 launch 전 정합성 점검과 launch 후 고객 예외 처리를 같은 운영 계층에서 보는 산업 스텁입니다.",
    summary: "매출 이벤트는 cross-functional이므로 merch, CX, finance가 함께 보는 흐름이 중요합니다.",
    quickFacts: [
      { label: "First buyer", value: "Merch Ops / CX Ops" },
      { label: "Starter pack", value: "Promo or refund pack" },
      { label: "Pilot KPI", value: "launch issue율 · refund 처리시간" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "하나의 프로모션이 상품·가격·재고·CS·finance에 동시에 영향을 주기 때문입니다.",
        points: ["launch checklist", "compensation rule", "chargeback evidence"],
      },
      {
        title: "Flagship flow",
        body: "행사 생성 → 정합성 점검 → owner 수정 → 승인 완료 후 store/CX brief 배포 흐름으로 시작합니다.",
        points: ["OMS", "commerce", "CRM", "BI"],
      },
      {
        title: "Pilot lens",
        body: "launch 오류 감소와 CS 일관성 향상을 먼저 보여주는 것이 좋습니다.",
        points: ["6-8주 파일럿", "fraud review", "고객데이터 최소 접근"],
      },
    ],
    primaryCta: { href: "/solutions/finance-ops", label: "Finance Ops solution 보기" },
    secondaryCta: { href: "/contact", label: "리테일 상담" },
  },
  "logistics-distribution": {
    slug: "logistics-distribution",
    label: "물류 / 유통",
    eyebrow: "Industry playbook",
    title: "Delay exception closure chain을 여는 물류 플레이북",
    description:
      "지연, 누락, 클레임을 severity와 owner까지 묶어 closing chain으로 만드는 산업 스텁입니다.",
    summary: "중요한 것은 ETA를 보여주는 것보다 exception closure chain을 닫는 것입니다.",
    quickFacts: [
      { label: "First buyer", value: "Ops excellence / Claims" },
      { label: "Starter pack", value: "Delay exception pack" },
      { label: "Pilot KPI", value: "exception close time · SLA 위반률" },
    ],
    sections: [
      {
        title: "Why this vertical",
        body: "Ops, 창고, 고객대응, billing 사이 handoff가 잦고, 고객 커뮤니케이션 품질이 수익과 SLA에 직접 연결됩니다.",
        points: ["severity routing", "account-ready brief", "POD evidence"],
      },
      {
        title: "Flagship flow",
        body: "지연 감지 → owner 지정 → 고객용 ETA brief → recovery action → billing update로 이어집니다.",
        points: ["TMS", "WMS", "CRM", "billing"],
      },
      {
        title: "Pilot lens",
        body: "예외 종료 속도와 고객 상태 공유 일관성이 핵심 측정치입니다.",
        points: ["6-8주 파일럿", "claims review", "데이터 범위 통제"],
      },
    ],
    primaryCta: { href: "/pilot", label: "물류 파일럿 범위 보기" },
    secondaryCta: { href: "/contact", label: "물류 도입 문의" },
  },
};

export const industryOrder = [
  "investment",
  "healthcare",
  "saas-it",
  "manufacturing",
  "retail-ecommerce",
  "logistics-distribution",
] as const;

export const educationDefinitions: Record<string, StubDefinition> = {
  diagnostic: {
    slug: "diagnostic",
    label: "AI 업무자동화 진단",
    eyebrow: "Education",
    title: "직장인을 위한 AI 업무자동화 진단",
    description:
      "현재 반복 업무를 듣고, 어떤 요청·승인·보고 흐름부터 줄일지 정리하는 진단형 교육 스텁입니다.",
    summary: "배우는 것에서 멈추지 않고, 내 업무 하나를 어디서부터 줄일지 정리합니다.",
    quickFacts: [
      { label: "형태", value: "60분 진단" },
      { label: "대상", value: "직장인 · 소규모 팀" },
      { label: "결과물", value: "자동화 우선순위 · 툴 추천" },
    ],
    sections: [
      {
        title: "진단 범위",
        body: "반복 보고, 승인 요청, 문서 정리, 알림 흐름 중 무엇이 가장 비효율적인지 먼저 확인합니다.",
        points: ["업무 인터뷰", "병목 분류", "우선순위 정리"],
      },
      {
        title: "도구 관점",
        body: "Slack, ChatGPT, n8n, Google Sheets 같은 도구를 문제 중심으로 매칭합니다.",
        points: ["도구 조합", "난이도", "다음 단계"],
      },
      {
        title: "후속 연결",
        body: "진단 후에는 hands-on 실습이나 팀 워크숍으로 이어갈 수 있습니다.",
        points: ["개인 실습", "팀 적용", "파일럿 설계"],
      },
    ],
    primaryCta: { href: "/contact", label: "진단 문의" },
    secondaryCta: { href: "/education", label: "교육 개요 보기" },
  },
  "hands-on": {
    slug: "hands-on",
    label: "AI 자동화 실습",
    eyebrow: "Education",
    title: "내 업무로 배우는 AI 자동화 실습",
    description:
      "실제 보고·요청·승인 흐름 하나를 대상으로 Slack, ChatGPT, n8n, Sheets 조합을 체험하는 실습형 교육 스텁입니다.",
    summary: "교육이 아니라 실습에 가깝게, 내 업무 하나를 실제로 줄여보는 구성이 핵심입니다.",
    quickFacts: [
      { label: "형태", value: "2회 실습" },
      { label: "대상", value: "직장인 · 운영/PM" },
      { label: "결과물", value: "실습 흐름 1개 · 재사용 초안" },
    ],
    sections: [
      {
        title: "실습 주제",
        body: "회의 후 액션 정리, 신청서 접수 후 알림, 승인 요청 초안 작성 같은 주제로 진행할 수 있습니다.",
        points: ["요청 자동화", "보고 자동화", "알림 연결"],
      },
      {
        title: "학습 방식",
        body: "개념 설명보다 직접 만들고 테스트하면서 개선 포인트를 찾는 방식입니다.",
        points: ["실습 과제", "결과 검토", "다음 확장"],
      },
      {
        title: "후속 연결",
        body: "개인 실습 후 팀 워크숍이나 starter pack 상담으로 이어질 수 있습니다.",
        points: ["팀 전환", "업무 적용", "MVP 범위"],
      },
    ],
    primaryCta: { href: "/contact", label: "실습 문의" },
    secondaryCta: { href: "/education/team-workshop", label: "팀 워크숍 보기" },
  },
  "team-workshop": {
    slug: "team-workshop",
    label: "팀 워크숍",
    eyebrow: "Education",
    title: "우리 팀 요청·승인·보고 자동화 워크숍",
    description:
      "팀장, 운영 담당자, PM, HR/People Ops, Sales Ops를 위해 팀 단위 병목을 짚고 작은 MVP 범위를 잡는 워크숍 스텁입니다.",
    summary: "교육 상품이지만 실제로는 부서형 request-to-resolution pack 도입 전 워크숍 역할을 합니다.",
    quickFacts: [
      { label: "형태", value: "팀 워크숍" },
      { label: "대상", value: "리더 · 운영 담당자" },
      { label: "결과물", value: "파일럿 범위 · KPI baseline" },
    ],
    sections: [
      {
        title: "워크숍 범위",
        body: "팀의 반복 요청과 승인 병목을 한 흐름으로 매핑하고 어떤 action pack으로 시작할지 정합니다.",
        points: ["workflow map", "승인 규칙", "KPI baseline"],
      },
      {
        title: "실행 관점",
        body: "단순 강의가 아니라 internal app 또는 starter pack으로 옮길 수 있는 수준의 범위를 남깁니다.",
        points: ["pilot candidate", "owner", "도구 연결"],
      },
      {
        title: "후속 연결",
        body: "워크숍 후에는 파일럿 제안, starter pack, private deployment 논의로 이어갑니다.",
        points: ["Starter", "Department", "Private"],
      },
    ],
    primaryCta: { href: "/pilot", label: "파일럿 설계 보기" },
    secondaryCta: { href: "/contact", label: "워크숍 문의" },
  },
};

export const educationOrder = ["diagnostic", "hands-on", "team-workshop"] as const;

export function buildMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} - 프롬프토리`,
    description,
  };
}

export function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}
