import type {
  EducationTrackSlug,
  IndustrySlug,
  SolutionSlug,
} from "@/lib/request-to-resolution-content";

export type SolutionPageDetail = {
  headline: string;
  operatorLens: string;
  fitSignals: string[];
  requiredRoles: string[];
  deliverables: string[];
  nextMoves: string[];
  relatedIndustries: IndustrySlug[];
};

export const solutionPageDetails = {
  "deal-desk": {
    headline: "할인·조건 예외를 Slack 스레드에서 approval-ready 상태로 닫는 pack",
    operatorLens:
      "Deal Desk 병목은 정보 부족보다 승인자가 판단할 카드가 없고, 승인 후 CRM 반영이 다시 사람 손으로 돌아가는 지점에서 생깁니다.",
    fitSignals: [
      "할인 요청이 메일, 스레드, 스프레드시트에 분산되어 있습니다.",
      "승인자가 고객 등급, 마진 영향, 과거 유사 사례를 한 번에 보지 못합니다.",
      "승인 후 CRM stage, note, follow-up task를 사람이 다시 입력합니다.",
    ],
    requiredRoles: [
      "요청자: AE / 영업 담당자",
      "승인자: Sales Manager / RevOps / VP",
      "운영자: Sales Ops 또는 RevOps",
    ],
    deliverables: [
      "Slack thread decision pack",
      "리스크·마진·정책 근거가 포함된 approval card",
      "CRM 반영과 follow-up task 자동화",
      "승인 리드타임과 실패 구간을 보는 ops view",
    ],
    nextMoves: [
      "Renewal exception과 legal handoff까지 확장",
      "상위 승인 라우팅과 만료 규칙 추가",
      "분기별 discount governance 리포트 연결",
    ],
    relatedIndustries: ["saas-it", "investment", "retail-ecommerce"],
  },
  "people-ops": {
    headline: "직원 요청을 정책 확인에서 끝내지 않고 승인과 실행까지 연결하는 pack",
    operatorLens:
      "People Ops는 질문량보다 예외 처리량이 높습니다. 정책 링크만 던지면 업무가 끝나지 않고, 요청·승인·계정/티켓 반영을 한 화면으로 모아야 체감이 납니다.",
    fitSignals: [
      "출장, 장비, 계정, 복지 예외 요청이 반복적으로 들어옵니다.",
      "정책은 있지만 누가 승인하고 어떤 시스템을 바꿔야 하는지 매번 다시 확인합니다.",
      "직원은 상태를 모르고, 운영자는 어디서 막혔는지 숫자로 보지 못합니다.",
    ],
    requiredRoles: [
      "요청자: 일반 직원",
      "승인자: 팀장 또는 운영 리더",
      "운영자: People Ops / Workplace Ops / IT 협업 담당",
    ],
    deliverables: [
      "App Home quick action과 request modal",
      "정책 근거가 포함된 approval card",
      "HRIS / IAM / ticketing 반영",
      "요청 상태 timeline과 운영 실패 replay 포인트",
    ],
    nextMoves: [
      "출장 승인에서 계정·장비 요청까지 pack 확장",
      "정책 예외 라우팅과 만료일 관리",
      "People Ops 주간 브리핑 카드 연결",
    ],
    relatedIndustries: ["healthcare", "saas-it", "logistics-distribution"],
  },
  "it-access": {
    headline: "권한 요청을 근거·승인·만료일과 함께 안전하게 끝내는 pack",
    operatorLens:
      "IT / Security 요청은 read와 write를 구분하고, approval과 expiry를 기본값으로 두어야 합니다. 빠른 답변보다 안전한 실행이 더 중요합니다.",
    fitSignals: [
      "DB / SaaS / 파일 접근 요청이 반복됩니다.",
      "승인자는 영향 범위와 만료일을 매번 수동으로 챙깁니다.",
      "티켓 생성, 권한 부여, audit 기록이 서로 분리되어 있습니다.",
    ],
    requiredRoles: [
      "요청자: 일반 직원 또는 엔지니어",
      "승인자: 매니저 / 보안 승인자",
      "운영자: IT Ops / Security / Platform Engineering",
    ],
    deliverables: [
      "정책·현재 권한·만료 규칙이 합쳐진 preview",
      "기간 / 영향 범위 / 감사 메모가 포함된 approval card",
      "Okta / IAM / ITSM write workflow",
      "trace + audit + expiry 관리 레일",
    ],
    nextMoves: [
      "권한 회수와 periodic review까지 확장",
      "보안 incident evidence pack 연결",
      "관리자 액션에 2인 승인 규칙 추가",
    ],
    relatedIndustries: ["saas-it", "manufacturing", "logistics-distribution"],
  },
  "finance-procurement": {
    headline: "구매와 예외 승인을 증빙 기반 workflow로 묶는 pack",
    operatorLens:
      "Finance / Procurement는 승인만 빨라서는 안 됩니다. 예산, 증빙, vendor context, ERP 반영까지 같이 묶어야 재작업과 예외 비용이 줄어듭니다.",
    fitSignals: [
      "구매 요청과 vendor exception이 메일과 문서로 흩어집니다.",
      "승인자는 예산·정책·증빙을 따로 확인해야 합니다.",
      "최종 승인 후 ERP나 구매 시스템 반영이 다시 수작업으로 돌아갑니다.",
    ],
    requiredRoles: [
      "요청자: 부서 운영자 / 구매 요청자",
      "승인자: Finance / Procurement manager",
      "운영자: Biz Ops / AP / procurement admin",
    ],
    deliverables: [
      "review packet과 evidence completeness 체크",
      "조건부 승인 / 추가 질문 / 반려를 담은 approval card",
      "ERP / procurement system reflection",
      "예외 종료시간과 재작업률을 보는 운영 리포트",
    ],
    nextMoves: [
      "월마감 pack과 vendor exception을 묶어 확장",
      "승인 금액 구간별 라우팅 추가",
      "감사 대응용 evidence export 레일 연결",
    ],
    relatedIndustries: ["investment", "manufacturing", "retail-ecommerce"],
  },
} satisfies Record<SolutionSlug, SolutionPageDetail>;

export const solutionSelectionCriteria = [
  {
    title: "반복적 예외가 많은가",
    body: "같은 질문이 아니라 같은 예외 처리가 반복되는 흐름일수록 action pack으로 표준화하기 쉽습니다.",
  },
  {
    title: "승인 규칙과 증빙이 필요한가",
    body: "approval card와 source links를 붙였을 때 판단 속도가 빨라지는 workflow가 첫 pack으로 적합합니다.",
  },
  {
    title: "결과가 시스템에 남아야 하는가",
    body: "CRM, Jira, IAM, ERP처럼 system of record 반영이 있는 흐름이 request-to-resolution 가치가 큽니다.",
  },
  {
    title: "proof KPI가 바로 잡히는가",
    body: "처리시간, 승인 turnaround, 재작업률 같은 숫자를 4~6주 안에 보여줄 수 있어야 첫 파일럿이 쉽습니다.",
  },
] as const;

export const packDeliveryDefaults = [
  {
    title: "Slack entry surface",
    body: "App Home, DM, shortcut, modal 중 가장 자연스러운 진입점으로 요청을 받습니다.",
  },
  {
    title: "Approval-ready card",
    body: "근거, 영향 범위, 만료일, 추천 액션을 승인자가 바로 판단할 수 있는 형태로 압축합니다.",
  },
  {
    title: "System reflection",
    body: "승인 뒤 Jira, CRM, IAM, ERP 등 system of record에 결과를 남깁니다.",
  },
  {
    title: "Ops instrumentation",
    body: "실패 원인, 지연 구간, 재문의율을 운영자가 다시 볼 수 있게 남깁니다.",
  },
] as const;

export type IndustryPageDetail = {
  gate: string;
  buyerScenarios: { title: string; body: string }[];
  flagshipTitle: string;
  flagshipSteps: string[];
  rolloutNote: string;
  extensionNote: string;
};

export const industryPageDetails = {
  investment: {
    gate: "준법 / 기록보존",
    buyerScenarios: [
      {
        title: "투자팀",
        body: "인바운드 pitch, 미팅노트, 산업 리서치를 묶어 pre-screen memo와 DD to-do를 만듭니다.",
      },
      {
        title: "IC / 파트너",
        body: "모델, deck, 메모, 과거 결정 로그를 합쳐 버전 혼선 없는 decision pack을 구성합니다.",
      },
      {
        title: "IR / 포트폴리오",
        body: "기존 답변, 최신 KPI, 관련 문서를 연결해 LP 회신 초안을 만듭니다.",
      },
      {
        title: "준법 / 운영",
        body: "결정 로그와 관련 파일을 모아 audit-ready pack을 만들고 trace를 남깁니다.",
      },
    ],
    flagshipTitle: "Deal triage to IC pack",
    flagshipSteps: [
      "인바운드 pitch 또는 미팅 스레드를 감지합니다.",
      "CRM, Drive, calendar, dataroom에서 관련 자료를 회수합니다.",
      "1-page pre-screen memo와 DD owner / due date를 만듭니다.",
      "IC agenda와 decision pack을 구성합니다.",
      "결정 결과를 CRM, dataroom, follow-up task에 반영합니다.",
    ],
    rolloutNote:
      "투자사 파일럿은 memo 작성 시간과 IC 준비 시간을 먼저 줄이는 쪽이 가장 설득력이 큽니다.",
    extensionNote:
      "첫 engine을 DD, IR, 준법 흐름으로 재사용하면 buyer와 데이터 연결이 자연스럽게 확장됩니다.",
  },
  healthcare: {
    gate: "privacy / security",
    buyerScenarios: [
      {
        title: "Patient access",
        body: "Referral completeness를 확인하고 누락 문서를 chase해 접수 재작업을 줄입니다.",
      },
      {
        title: "Care coordination",
        body: "입퇴원 / 전원 / follow-up 흐름을 handoff summary와 task로 정리합니다.",
      },
      {
        title: "Revenue cycle",
        body: "Denial, prior auth, payer 문의에 필요한 문서와 과거 사례를 묶어 packet 초안을 만듭니다.",
      },
      {
        title: "Privacy / quality",
        body: "Incident와 예외 review 시 필요한 증빙과 owner를 모아 audit-ready pack을 만듭니다.",
      },
    ],
    flagshipTitle: "Referral intake to scheduling packet",
    flagshipSteps: [
      "Referral을 수신하고 필수 항목을 점검합니다.",
      "누락 문서, 보험, 의뢰 사유를 chase합니다.",
      "staff review와 승인 단계를 거칩니다.",
      "scheduling packet을 생성하고 관련 task를 배정합니다.",
      "EHR, 문서 시스템, privacy log에 결과를 남깁니다.",
    ],
    rolloutNote:
      "의료는 clinical autonomy가 아니라 completeness, coordination, payer workflow에서 먼저 효과를 보여야 합니다.",
    extensionNote:
      "Referral과 denial에서 proof를 만든 뒤 privacy evidence와 care coordination으로 넓히는 순서가 안정적입니다.",
  },
  "saas-it": {
    gate: "IT / legal",
    buyerScenarios: [
      {
        title: "Sales Ops",
        body: "할인과 조건 예외를 CRM, pricing policy, past approvals로 묶어 decision pack을 만듭니다.",
      },
      {
        title: "Support / CS",
        body: "Escalation thread를 severity와 owner 기준으로 정리하고 Jira / status page 업데이트를 엮습니다.",
      },
      {
        title: "Product / Eng",
        body: "버그와 피드백을 cluster하고 spec / release note / postmortem draft를 만듭니다.",
      },
      {
        title: "IT / Security",
        body: "접근권한과 incident evidence 흐름에 approval와 expiry를 붙여 안전하게 실행합니다.",
      },
    ],
    flagshipTitle: "Escalation triage to postmortem",
    flagshipSteps: [
      "고객 escalation thread를 감지하고 severity를 분류합니다.",
      "owner를 지정하고 Jira / status page / exec DM을 업데이트합니다.",
      "필요한 로그와 문서를 모아 대응 pack을 만듭니다.",
      "해결 후 postmortem draft와 action item을 생성합니다.",
      "support KB와 roadmap 후속 작업까지 연결합니다.",
    ],
    rolloutNote:
      "SaaS / IT는 Slack native 환경이 많아 첫 파일럿 전환 속도가 가장 빠른 편입니다.",
    extensionNote:
      "Deal Desk에서 시작한 engine을 Support, IT, Product로 확장하면 cross-team clarity가 빠르게 올라갑니다.",
  },
  manufacturing: {
    gate: "QA / EHS",
    buyerScenarios: [
      {
        title: "Plant ops",
        body: "교대 변경, 라인 이슈, 생산 차질을 shift issue board로 정리해 handoff 누락을 줄입니다.",
      },
      {
        title: "Quality",
        body: "사진, 측정값, 대화를 묶어 NC / CAPA 증빙팩과 승인 흐름을 만듭니다.",
      },
      {
        title: "Maintenance / EHS",
        body: "다운타임, 안전 incident, vendor dispatch를 하나의 closure chain으로 묶습니다.",
      },
      {
        title: "Procurement / SCM",
        body: "부품 shortage와 납기 지연을 영향도 평가와 rush approval로 연결합니다.",
      },
    ],
    flagshipTitle: "Quality deviation to CAPA close",
    flagshipSteps: [
      "현장 이슈를 등록하고 관련 사진 / 문서를 모읍니다.",
      "품질 증빙과 containment action을 정리합니다.",
      "disposition / approval 단계를 거칩니다.",
      "vendor / maintenance follow-up을 연결합니다.",
      "CAPA 완료 로그와 재발 방지 action을 ERP / QMS에 남깁니다.",
    ],
    rolloutNote:
      "제조는 현장 예외를 '보는 것'보다 owner와 근거를 붙여 닫는 경험이 빨리 보여야 합니다.",
    extensionNote:
      "Shift handoff와 CAPA를 먼저 닫으면 품질, 정비, 구매까지 같은 엔진으로 넓히기 쉽습니다.",
  },
  "retail-ecommerce": {
    gate: "finance / fraud",
    buyerScenarios: [
      {
        title: "Merchandising",
        body: "신상품 / 행사 launch 전 상품·가격·재고·콘텐츠 정합성을 readiness board로 묶습니다.",
      },
      {
        title: "Marketing / CRM",
        body: "기획안, 지난 성과, 재고 조건을 연결해 캠페인 승인과 retrospective를 표준화합니다.",
      },
      {
        title: "Customer experience",
        body: "환불, 보상, VIP exception을 주문 정보와 정책을 엮어 approval card로 정리합니다.",
      },
      {
        title: "Finance / Fraud",
        body: "Chargeback evidence와 fraud response draft를 자동화합니다.",
      },
    ],
    flagshipTitle: "Promo readiness to store / CX briefing",
    flagshipSteps: [
      "행사를 생성하고 가격·재고·콘텐츠 정합성을 점검합니다.",
      "owner별 수정 요청과 승인 흐름을 엽니다.",
      "승인 완료 후 store / CX briefing을 배포합니다.",
      "행사 중 발생한 refund / compensation rule을 함께 관리합니다.",
      "후속 chargeback과 performance retrospective까지 연결합니다.",
    ],
    rolloutNote:
      "리테일은 launch 전 정합성과 launch 후 예외를 하나의 pack에서 다뤄야 체감이 큽니다.",
    extensionNote:
      "Promo readiness에서 시작하면 CX, finance, fraud 쪽 예외 처리로 확장하기가 자연스럽습니다.",
  },
  "logistics-distribution": {
    gate: "claims / finance",
    buyerScenarios: [
      {
        title: "Dispatch",
        body: "지연, reroute, 운송장 이슈를 severity별 recovery board로 묶습니다.",
      },
      {
        title: "Warehouse ops",
        body: "입출고 누락, dock 정체, shortage를 order / shipment context와 연결해 owner를 지정합니다.",
      },
      {
        title: "Customer ops",
        body: "대형 고객 상태 문의나 escalation에 대해 ETA brief와 recovery option을 만듭니다.",
      },
      {
        title: "Billing / Claims",
        body: "POD, dispute evidence, billing update를 하나의 claim close 흐름으로 연결합니다.",
      },
    ],
    flagshipTitle: "Delayed shipment to claim close",
    flagshipSteps: [
      "배송 지연을 감지하고 severity / owner를 지정합니다.",
      "고객용 ETA brief와 recovery option을 생성합니다.",
      "창고 / 운송 / CS handoff를 정리합니다.",
      "배송 완료 후 POD와 보상 정보를 billing에 붙입니다.",
      "claim 종료 로그와 SLA 지표를 저장합니다.",
    ],
    rolloutNote:
      "물류는 ETA 자체보다 exception closure chain을 붙였을 때 수익과 SLA가 개선됩니다.",
    extensionNote:
      "Delay exception을 먼저 닫으면 warehouse issue, claims, customer ops briefing으로 넓히기 쉽습니다.",
  },
} satisfies Record<IndustrySlug, IndustryPageDetail>;

export const industryWhyCards = [
  {
    title: "검색이 아니라 예외 종료 흐름을 판다",
    body: "산업별로 buyer가 다르고, 각 buyer는 승인 규칙과 증빙 방식이 다릅니다. 그래서 pack도 vertical별 언어로 팔아야 합니다.",
  },
  {
    title: "vertical-specific pack + common pack 조합이 강하다",
    body: "투자사라면 IC pack, 의료라면 referral / denial pack처럼 산업 전용 흐름 1개와 공통 기능 pack 1개를 같이 묶어야 도입 체감이 큽니다.",
  },
  {
    title: "buyer · MCP · approval rule이 같이 바뀐다",
    body: "같은 engine 위에서 산업별 MCP, approval gate, KPI만 바꾸면 playbook을 확장할 수 있습니다.",
  },
] as const;

export const industryExtensionCards = [
  {
    title: "보험",
    body: "Underwriting ops / Claims ops 중심으로 underwriting exception, claims evidence pack이 자연스럽습니다.",
  },
  {
    title: "공공 / 공기업",
    body: "결재, 민원, 조달 approval chain처럼 문서 completeness와 감사 대응이 중심입니다.",
  },
  {
    title: "제약 / 바이오",
    body: "QA evidence, deviation pack, medical info response처럼 quality review와 문서 버전 통제가 중요합니다.",
  },
  {
    title: "건설 / 부동산",
    body: "현장 이슈, change order, vendor payment 승인처럼 site issue closure chain이 강합니다.",
  },
] as const;

export type EducationTrackDetail = {
  heroEyebrow: string;
  agenda: string[];
  leaveWith: string[];
  nextStep: string;
  operatorNote: string;
};

export const educationTrackDetails = {
  diagnostic: {
    heroEyebrow: "Entry diagnostic",
    agenda: [
      "현재 반복 업무와 병목 요청 유형을 인터뷰합니다.",
      "승인·보고·시스템 반영이 어디서 끊기는지 맵으로 정리합니다.",
      "어떤 툴 조합으로 먼저 검증할지 우선순위를 제안합니다.",
      "다음 2주 안에 직접 해볼 수 있는 작은 실행안을 잡습니다.",
    ],
    leaveWith: [
      "반복 업무 진단표",
      "자동화 우선순위 1페이지",
      "추천 툴 조합과 quick win 후보",
      "후속 hands-on 또는 starter pack 제안 범위",
    ],
    nextStep:
      "진단 결과가 명확하면 hands-on 실습으로 한 업무를 직접 줄여보거나, 팀 워크숍으로 첫 action pack 범위를 자르면 됩니다.",
    operatorNote:
      "교육 카테고리의 가장 가벼운 입구입니다. 매출보다 fit 확인과 후기 확보에 좋은 front-end 상품입니다.",
  },
  "hands-on": {
    heroEyebrow: "Practical track",
    agenda: [
      "내 업무 하나를 고르고 before / after 목표를 정합니다.",
      "Slack·ChatGPT·n8n·Google Sheets를 조합해 미니 workflow를 직접 만듭니다.",
      "요청 / 승인 / 보고 흐름이 실제로 얼마나 줄어드는지 같이 확인합니다.",
      "재사용 가능한 템플릿과 다음 개선 체크리스트를 정리합니다.",
    ],
    leaveWith: [
      "내 업무 기준 미니 자동화 예시",
      "요청 / 승인 / 보고 실습 템플릿",
      "반복 가능한 prompt / automation skeleton",
      "팀에 적용할 다음 단계 체크리스트",
    ],
    nextStep:
      "한 업무에서 효과가 보이면 팀 워크숍으로 승격하거나, Starter pack 범위로 바로 이어서 pilot을 설계할 수 있습니다.",
    operatorNote:
      "배우고 끝나는 강의가 아니라 내 업무 하나를 실제로 줄이는 실습형 트랙입니다.",
  },
  "team-workshop": {
    heroEyebrow: "Team workshop",
    agenda: [
      "팀의 요청·승인·보고 병목을 같이 맵핑합니다.",
      "가장 반복적인 예외 처리 흐름 하나를 고릅니다.",
      "첫 action pack 범위, 역할, approval gate, proof KPI를 합의합니다.",
      "파일럿으로 넘어갈 수 있는 4~6주 실행안을 정리합니다.",
    ],
    leaveWith: [
      "요청 흐름 맵",
      "우선 pack 정의 문서",
      "KPI 초안과 운영 cadence",
      "Starter / Department 전환용 scope note",
    ],
    nextStep:
      "워크숍이 끝나면 교육이 아니라 제품 범위 논의 단계로 넘어갑니다. 바로 pilot 설계와 connector scope를 잡는 것이 자연스럽습니다.",
    operatorNote:
      "강의보다 팀 문제 해결이 더 중요한 단계에서 쓰는 워크숍형 카테고리입니다.",
  },
} satisfies Record<EducationTrackSlug, EducationTrackDetail>;

export const educationTargetCards = [
  {
    title: "운영 / PM / Generalist",
    body: "반복 업무는 많은데 어디부터 자동화할지 감이 없는 개인 실무자에게 맞습니다.",
  },
  {
    title: "People Ops / Sales Ops / CS Lead",
    body: "요청·승인·보고 병목을 직접 겪는 운영형 팀 리더에게 맞습니다.",
  },
  {
    title: "Slack을 이미 쓰는 디지털 조직",
    body: "Slack이 메인 키워드가 아니라도, 실무 자동화 결과물을 빨리 검증하기 좋은 환경입니다.",
  },
] as const;

export const educationJourney = [
  {
    title: "진단",
    body: "현재 반복 업무와 quick win을 파악합니다.",
  },
  {
    title: "실습",
    body: "내 업무 예제로 미니 자동화를 같이 만듭니다.",
  },
  {
    title: "팀 워크숍",
    body: "요청·승인·보고 병목을 팀 단위로 정의합니다.",
  },
  {
    title: "Starter pack",
    body: "fit가 확인되면 제품형 pilot로 넘어갑니다.",
  },
] as const;
