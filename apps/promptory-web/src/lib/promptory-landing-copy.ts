export const promptoryAudienceTabs = [
  {
    id: "smb",
    ctaHref: "/optimize",
    ctaLabel: "중소기업 데모 보기",
    body: "마케팅팀이 작아도 괜찮습니다. 프롬프토리는 URL 기준으로 병목을 먼저 잡고, 바로 실행 초안까지 이어줍니다.",
    bullets: [
      "경쟁사 비교표 자동 초안",
      "카피·CTA 문구 초안",
      "보고용 요약본 생성",
      "저장 후 이어서 작업",
    ],
    title: "사람을 더 뽑기 전에, 조사·비교·초안부터 줄이세요",
    label: "중소기업 팀용",
  },
  {
    id: "global",
    ctaHref: "/optimize",
    ctaLabel: "외국계 팀 데모 보기",
    body: "한국 채널을 현지 맥락으로 읽고, 로컬 액션안과 KR/EN 요약까지 한 번에 정리합니다.",
    bullets: [
      "Korea competitor scan",
      "한국 채널 메시지 진단",
      "KR/EN summary",
      "HQ 공유용 action memo",
    ],
    title: "Korea 시장 진단과 HQ 공유용 요약을 한 흐름으로",
    label: "외국계 한국팀용",
  },
] as const;

export const promptoryHowItWorks = [
  {
    body: "회사 사이트·유튜브·스토어 URL을 붙여 넣으면 공개 표면부터 읽습니다.",
    kicker: "URL 입력",
    title: "설명보다 먼저, URL부터 읽습니다",
  },
  {
    body: "목표와 제약만 짧게 확인해 병목을 고정합니다.",
    kicker: "질문 3개",
    title: "질문은 짧고 맥락 있게 갑니다",
  },
  {
    body: "비교표, 카피 초안, 보고 요약 같은 다음 액션을 바로 시작합니다.",
    kicker: "실행 선택",
    title: "대화가 끝나면 바로 일이 진행됩니다",
  },
] as const;

export const promptoryResultBento = [
  {
    body: "채널 구조, 후킹 패턴, CTA 위치를 한 번에 정리합니다.",
    title: "경쟁사 비교표",
  },
  {
    body: "상단 신뢰 문장, CTA, 후킹 문구를 바로 붙일 수 있게 초안으로 냅니다.",
    title: "전환 문구 초안",
  },
  {
    body: "병목, 공개 표면 신호, 다음 액션 우선순위를 요약합니다.",
    title: "채널 진단 요약",
  },
  {
    body: "로컬 팀과 HQ가 같은 문서로 볼 수 있게 양언어 요약을 만듭니다.",
    title: "KR/EN executive summary",
  },
  {
    body: "오늘 바로 손댈 것부터, 나중에 검토할 것까지 순서를 정리합니다.",
    title: "다음 액션 체크리스트",
  },
  {
    body: "어제 하던 진단과 초안을 다시 열어 같은 맥락에서 이어갑니다.",
    title: "저장 후 이어보기",
  },
] as const;

export const promptoryUseCases = [
  {
    body: "작은 팀도 경쟁사 비교, 카피 초안, 보고용 요약을 한 흐름으로 줄일 수 있습니다.",
    eyebrow: "중소기업 팀",
    points: [
      "캠페인 랜딩 병목 정리",
      "콘텐츠/스토어 메시지 정리",
      "대표 보고용 요약본 생성",
    ],
    title: "사이트 하나만 던져도 실행 초안까지 바로 이어집니다",
  },
  {
    body: "한국 채널을 현지 맥락으로 읽고, 본사 공유용 summary까지 한 번에 연결합니다.",
    eyebrow: "외국계 한국팀",
    points: [
      "한국 경쟁사 scan",
      "KR/EN 핵심 요약",
      "HQ 공유용 action memo",
    ],
    title: "로컬 진단과 HQ 보고를 같은 대화 흐름으로 묶습니다",
  },
] as const;

export const promptoryTrustBoundary = [
  "첫 진단은 공개 표면 기준으로 시작합니다.",
  "목표를 확인한 뒤에만 더 깊은 실행으로 넘어갑니다.",
  "결과는 저장하고 다시 열 수 있습니다.",
  "팀 내부 검토용 초안부터 빠르게 확보합니다.",
] as const;

export const promptoryFaqItems = [
  {
    answer: "회사 사이트, 유튜브 채널, 스토어 URL처럼 공개 표면을 먼저 읽을 수 있는 주소부터 시작하는 흐름에 맞춰져 있습니다.",
    question: "어떤 URL부터 넣으면 되나요?",
  },
  {
    answer: "처음에는 공개 표면과 짧은 질문만으로 병목을 고정하고, 필요한 다음 액션만 선택해 깊게 들어갑니다.",
    question: "처음부터 긴 설문을 해야 하나요?",
  },
  {
    answer: "경쟁사 비교, 전환 문구 초안, 보고용 요약, KR/EN summary처럼 바로 검토 가능한 실행물 중심으로 반환합니다.",
    question: "결과는 답변형인가요, 문서형인가요?",
  },
  {
    answer: "지금 웹 표면은 저장과 이어보기 허브 역할이고, 핵심 와우는 채팅형 진단과 후속 실행 흐름에서 만들어집니다.",
    question: "웹 페이지보다 채팅이 더 중요한가요?",
  },
] as const;
