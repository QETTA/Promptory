// ============================================================
// Promptory Marketing Content - Centralized Content Source
// ============================================================
// All public-facing copy for the Promptory Slack Agent Packages site
// This file serves as the single source of truth for marketing copy

export type PackageSlug = "website-diagnosis-agent" | "campaign-brief-agent" | "korea-local-ops-agent";

// ============================================================
// HOMEPAGE CONTENT
// ============================================================

export const homeContent = {
  hero: {
    eyebrow: "Custom Slack Agent Package",
    title: {
      line1: "Slack에 URL을내면,",
      line2: "진단부터 실행 초안까지",
      line3: "팀 대화 안에서 끝납니다",
    },
    body: "프롬프토리는 홈페이지, 랜딩, 문서 링크를 읽고 몇 가지 질문으로 목표를 고정한 뒤 비교표, 카피 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다.",
    primaryCta: "데모 요청하기",
    secondaryCta: "샘플 대화 보기",
    microCopy: "맞춤 세팅 · Slack DM/채널/모달 · 저장 후 이어보기",
  },

  segment: {
    eyebrow: "Built for teams with too much to draft",
    title: "자료는 많은데, 초안과 비교가 계속 밀리는 팀에게 맞습니다",
    cards: [
      {
        badge: "한국 B2B 중소기업 팀",
        description: "홈페이지와 채널은 있는데 마케팅·기획 인력이 적어서 비교표, 카피 초안, 보고 정리가 자주 밀리는 팀",
        cta: "중소기업용 패키지 보기",
        href: "/packages",
      },
      {
        badge: "외국계 한국지사 팀",
        description: "한국 시장용 채널 진단과 본사 공유용 KR/EN 정리를 동시에 빠르게 해야 하는 팀",
        cta: "외국계 팀용 패키지 보기",
        href: "/packages/korea-local-ops-agent",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "설명보다 먼저, Slack 안에서 바로 일합니다",
    cards: [
      {
        step: "01",
        title: "URL 또는 문서 입력",
        description: "홈페이지, 랜딩, 문서 링크를 Slack에 붙여 넣습니다",
        icon: "📎",
      },
      {
        step: "02",
        title: "질문으로 목표 고정",
        description: "문의, 구매, 콘텐츠, 보고 중 무엇이 급한지 짧게 확인합니다",
        icon: "🎯",
      },
      {
        step: "03",
        title: "실행 초안 생성",
        description: "비교표, 카피, 브리프, 보고용 요약이 바로 이어집니다",
        icon: "✨",
      },
    ],
  },

  packagesPreview: {
    eyebrow: "Agent packages",
    title: "팀의 반복 업무에 맞춰 Slack 에이전트를 패키지로 붙입니다",
  },

  outputs: {
    eyebrow: "Outputs",
    title: "대화가 끝나면 답변이 아니라 실행물이 남습니다",
    items: [
      { title: "경쟁사 비교표", icon: "📊" },
      { title: "전환 문구 초안", icon: "📝" },
      { title: "캠페인 브리프", icon: "📄" },
      { title: "팀장 보고용 요약", icon: "📑" },
      { title: "KR/EN executive summary", icon: "🌐" },
      { title: "다음 액션 체크리스트", icon: "✅" },
    ],
  },

  slackSurfaces: {
    eyebrow: "Slack surfaces",
    title: "대화는 메시지에서, 이어보기는 App Home에서, 입력은 모달에서 처리합니다",
    cards: [
      { title: "Slack 메시지", description: "URL 입력, 1차 진단, 빠른 실행 버튼", icon: "💬" },
      { title: "모달", description: "목표, 결과 형식, 언어 옵션 입력", icon: "🪟" },
      { title: "스레드", description: "비교표, 초안, 요약 결과 공유", icon: "🧵" },
      { title: "App Home", description: "저장한 진단, 최근 작업, 다시 열기", icon: "🏠" },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    items: [
      {
        q: "우리 팀 상황에 맞게 바꿀 수 있나요?",
        a: "네, 패키지 도입 시 팀의 입력물, 질문 흐름, 출력 형식을 맞춤 세팅합니다. 기본 패키지 구조는 유지하면서 팀에 맞게 조정됩니다.",
      },
      {
        q: "Slack 안에서만 써야 하나요?",
        a: "주요 흐름은 Slack 안에서 완료됩니다. 결과물은 필요시 웹에서도 확인할 수 있지만, 입력부터 출력까지 Slack에서 이어지는 것이 핵심입니다.",
      },
      {
        q: "결과물은 저장되나요?",
        a: "네, 모든 진단과 초안은 App Home에 자동 저장됩니다. 이전 작업을 다시 열어서 수정하거나 이어서 작업할 수 있습니다.",
      },
      {
        q: "영어 요약도 가능한가요?",
        a: "네, Korea Local Ops Agent를 포함한 모든 패키지에서 KR/EN 요약 옵션을 선택할 수 있습니다. HQ 공유용 EN executive summary도 함께 생성됩니다.",
      },
      {
        q: "도입 전에 샘플을 볼 수 있나요?",
        a: "네, 회사 URL이나 현재 쓰는 자료 예시를 보내주시면 실제 패키지 흐름으로 데모를 보여드립니다. /contact 페이지에서 요청하세요.",
      },
    ],
  },

  finalCta: {
    title: "우리 팀 Slack에 맞는 에이전트 패키지 데모를 받아보세요",
    body: "회사 사이트나 채널 URL을 보내주시면 프롬프토리 방식으로 실제 진단 예시를 보여드립니다",
    primaryCta: "회사 URL 보내기",
    secondaryCta: "문의하기",
  },
};

// ============================================================
// PACKAGES PAGE CONTENT
// ============================================================

export const packagesPageContent = {
  hero: {
    eyebrow: "Slack Agent Packages",
    title: {
      line1: "반복되는 진단, 비교, 초안 작업을",
      line2: "패키지로 붙입니다",
    },
    body: "프롬프토리는 범용 챗봇을 파는 게 아니라 팀의 실무 흐름에 맞춘 Slack agent 패키지를 제안합니다",
  },

  filters: {
    useCases: [
      { label: "사이트 진단", value: "사이트 진단" },
      { label: "브리프 생성", value: "브리프 생성" },
      { label: "보고 정리", value: "보고 정리" },
      { label: "KR/EN summary", value: "KR/EN summary" },
    ],
    teamTypes: [
      { label: "중소기업 팀", value: "중소기업 팀" },
      { label: "외국계 한국지사", value: "외국계 한국지사" },
    ],
  },

  cardHelperText: "맞춤 세팅 포함 · Slack DM/채널/모달 지원 · 저장 후 이어보기",
  cardCta: "상세 보기",

  bottomCta: {
    title: "어떤 패키지가 우리 팀에 맞을지 unsure하신가요?",
    body: "회사 URL이나 현재 업무 상황을 보내주시면 적합한 패키지를 추천해드립니다",
    cta: "데모 요청하기",
  },
};

// ============================================================
// PACKAGE DEFINITIONS
// ============================================================

export interface PackageDefinition {
  slug: PackageSlug;
  title: string;
  shortDescription: string;
  fullDescription: string;
  footer: string;
  useCase: string;
  teamType: string;
  color: "blue" | "emerald" | "indigo";
  icon: string;
  badge: string;
  heroTitle: {
    line1: string;
    highlight: string;
    line2: string;
  };
  heroBody: string;
  microCopy: string;
  bestFit: {
    good: string[];
    notGood: string[];
  };
  slackFlow: {
    eyebrow: string;
    title: string;
    steps: { step: string; title: string; description: string; icon: string }[];
  };
  outputs: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; icon: string }[];
  };
  conversation: {
    eyebrow: string;
    title: string;
    messages: { type: "user" | "agent"; content: string; buttons?: string[] }[];
  };
  rollout: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  included: {
    eyebrow: string;
    title: string;
    items: string[];
    optionalItems: string[];
  };
  trustBoundary: {
    eyebrow: string;
    title: string;
    body: string;
  };
  faq: { title: string; content: string }[];
  finalCta: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const packageDefinitions: Record<PackageSlug, PackageDefinition> = {
  "website-diagnosis-agent": {
    slug: "website-diagnosis-agent",
    title: "Website Diagnosis Agent",
    shortDescription: "사이트 URL을 읽고 핵심 병목, 경쟁사 비교, CTA 초안, 보고용 요약까지 만듭니다",
    fullDescription: "회사 홈페이지나 랜딩 URL을 읽고 핵심 전환 병목을 짚은 뒤 경쟁사 비교, CTA 문구 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다",
    footer: "사이트 진단 · 전환 문구 · 보고 초안",
    useCase: "사이트 진단",
    teamType: "중소기업 팀",
    color: "blue",
    icon: "🔍",
    badge: "Website Diagnosis Agent",
    heroTitle: {
      line1: "Slack에 사이트 URL을내면,",
      highlight: "병목 진단과 실행 초안",
      line2: "이 바로 이어집니다",
    },
    heroBody: "회사 홈페이지나 랜딩 URL을 읽고 핵심 전환 병목을 짚은 뒤 경쟁사 비교, CTA 문구 초안, 보고용 요약까지 Slack 안에서 이어서 만듭니다",
    microCopy: "Slack DM · 모달 · App Home · 맞춤 세팅",
    bestFit: {
      good: [
        "홈페이지/자료는 있는데 비교와 초안이 자주 밀리는 팀",
        "Slack 안에서 바로 결과를 보고 공유하고 싶은 팀",
        "도입 전에 결과 예시를 먼저 보고 싶은 팀",
        "범용 AI보다 특정 업무 패키지를 원하는 팀",
      ],
      notGood: [
        "자체 사내 시스템 연동이 핵심인 대규모 엔터프라이즈",
        "정교한 내부 보안 승인 절차가 먼저 필요한 조직",
        "범용 업무비서 전체를 원하는 팀",
      ],
    },
    slackFlow: {
      eyebrow: "In Slack",
      title: "링크 하나로 시작해서, 결과 공유까지 Slack 안에서 이어집니다",
      steps: [
        { step: "1", title: "메시지에서 입력", description: "URL, 문서, 메모를 보냅니다", icon: "💬" },
        { step: "2", title: "모달에서 목표 고정", description: "문의, 구매, 보고, 캠페인 등 목적을 확인합니다", icon: "🎯" },
        { step: "3", title: "스레드에서 결과 생성", description: "비교표, 초안, 요약을 팀과 바로 공유합니다", icon: "📊" },
        { step: "4", title: "App Home에서 다시 열기", description: "저장된 작업과 최근 실행 결과를 이어서 봅니다", icon: "🏠" },
      ],
    },
    outputs: {
      eyebrow: "Outputs",
      title: "이 패키지가 내놓는 결과물",
      items: [
        { title: "핵심 병목 진단", description: "사이트 구조와 메시지에서 전환을 방해하는 핵심 병목 3가지", icon: "🔍" },
        { title: "경쟁사 비교표", description: "동일 시장/카테고리 경쟁사와의 메시지 및 CTA 비교", icon: "📈" },
        { title: "실행 초안", description: "CTA 문구, 헤드라인 초안, 페이지 구조 제안", icon: "✍️" },
        { title: "내부 공유용 요약", description: "팀장/대표 보고용 1페이지 요약", icon: "📋" },
      ],
    },
    conversation: {
      eyebrow: "Conversation",
      title: "실제 대화 예시",
      messages: [
        { type: "user", content: "https://회사사이트URL" },
        { type: "agent", content: "사이트로 인식했어요.\n지금은 유입보다 문의 전환 장치가 약합니다.\n문의 기준으로 다시 볼까요?" },
        { type: "user", content: "네, 문의가 목표예요." },
        { type: "agent", content: "좋아요. 현재 병목은 3가지예요.\n1. 상단 신뢰 요소가 약합니다\n2. CTA 위치가 늦습니다\n3. 메시지가 분산돼 있습니다", buttons: ["경쟁사 비교", "전환 문구 초안", "보고용 요약"] },
      ],
    },
    rollout: {
      eyebrow: "Rollout",
      title: "패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다",
      items: [
        "주요 입력물 정의",
        "질문 플로우 설정",
        "출력 형식 정의",
        "공유 채널/DM 흐름 설정",
        "KR only 또는 KR/EN 옵션 설정",
        "저장/이어보기 구조 설정",
      ],
    },
    included: {
      eyebrow: "What's included",
      title: "기본 패키지와 맞춤 세팅 범위",
      items: [
        "Slack 기본 인터랙션 설계",
        "핵심 질문 플로우",
        "결과물 포맷",
        "기본 App Home 구조",
        "초기 운영 가이드",
      ],
      optionalItems: [
        "KR/EN summary",
        "패키지별 추가 출력 형식",
        "팀 전용 공유 플로우",
        "후속 자동화 연결",
      ],
    },
    trustBoundary: {
      eyebrow: "Trust boundary",
      title: "처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다",
      body: "초기 진단은 링크와 공개 표면 중심으로 시작합니다. 이후 더 깊은 결과물이 필요할 때만 질문과 설정을 추가합니다.",
    },
    faq: [
      { title: "어떤 사이트 URL을 보낼 수 있나요?", content: "홈페이지, 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 비밀번호가 걸린 페이지는 접근이 제한됩니다." },
      { title: "경쟁사 비교는 어떤 기준으로 하나요?", content: "같은 산업/카테고리에서 공개된 메시지, CTA, 페이지 구조를 중심으로 비교합니다. 희망하시는 특정 경쟁사가 있으면 미리 알려주세요." },
      { title: "결과물은 수정할 수 있나요?", content: "네, 생성된 초안은 스레드에서 바로 수정 요청을 할 수 있습니다. '더 간결하게', '더 공식적으로' 등의 피드백을 주시면 반영됩니다." },
      { title: "저장된 진단은 나중에 다시 볼 수 있나요?", content: "네, 모든 진단과 초안은 App Home에 자동 저장됩니다. 이전 작업을 다시 열어서 수정하거나 이어서 작업할 수 있습니다." },
      { title: "맞춤 세팅은 어떤 것을 조정할 수 있나요?", content: "질문 흐름, 출력 형식, 공유 채널, KR/EN 옵션 등을 팀에 맞게 조정합니다. 기본 패키지 구조는 유지하면서 팀의 입력물과 산출물에 맞게 세팅합니다." },
    ],
    finalCta: {
      title: "우리 사이트 기준으로 먼저 진단 예시를 받아보세요",
      body: "회사 URL이나 현재 쓰는 자료 예시를 보내주시면 실제 패키지 흐름으로 데모를 보여드립니다",
      primaryCta: "데모 요청하기",
      secondaryCta: "회사 URL 보내기",
    },
  },

  "campaign-brief-agent": {
    slug: "campaign-brief-agent",
    title: "Campaign Brief Agent",
    shortDescription: "회의 메모, 링크, 기존 자료를 바탕으로 브리프, 메시지 방향, 액션 리스트를 정리합니다",
    fullDescription: "기존 자료, 회의 메모, 참고 링크를 읽고 캠페인 방향을 정리한 뒤 핵심 메시지, 카피 초안, 액션 리스트까지 Slack 안에서 이어서 만듭니다",
    footer: "브리프 생성 · 카피 초안 · 실행 정리",
    useCase: "브리프 생성",
    teamType: "중소기업 팀",
    color: "emerald",
    icon: "📋",
    badge: "Campaign Brief Agent",
    heroTitle: {
      line1: "회의 메모와 링크를 Slack에내면,",
      highlight: "브리프와 실행 정리",
      line2: "가 바로 이어집니다",
    },
    heroBody: "기존 자료, 회의 메모, 참고 링크를 읽고 캠페인 방향을 정리한 뒤 핵심 메시지, 카피 초안, 액션 리스트까지 Slack 안에서 이어서 만듭니다",
    microCopy: "Slack DM · 모달 · App Home · 맞춤 세팅",
    bestFit: {
      good: [
        "회의는 끝났는데 브리프 정리가 늦어지는 팀",
        "캠페인 방향은 있는데 메시지 초안이 비는 팀",
        "팀장 보고와 실무 액션 분리를 동시에 해야 하는 팀",
        "자료는 많은데 핵심을 정리할 인력이 부족한 팀",
      ],
      notGood: [
        "내부 캠페인 관리 시스템이 이미 갖춰진 대규모 조직",
        "외부 에이전시와의 모든 커뮤니케이션이 정해진 조직",
        "창의적 컨셉 단계부터 외부와 함께 하는 팀",
      ],
    },
    slackFlow: {
      eyebrow: "In Slack",
      title: "링크 하나로 시작해서, 결과 공유까지 Slack 안에서 이어집니다",
      steps: [
        { step: "1", title: "메시지에서 입력", description: "회의 메모, 링크, 자료를 보냅니다", icon: "📝" },
        { step: "2", title: "모달에서 목표 고정", description: "리드, 구매, 인지 등 캠페인 목표를 확인합니다", icon: "🎯" },
        { step: "3", title: "스레드에서 결과 생성", description: "브리프, 메시지, 액션 리스트를 공유합니다", icon: "📋" },
        { step: "4", title: "App Home에서 다시 열기", description: "저장된 브리프와 버전 히스토리를 봅니다", icon: "🏠" },
      ],
    },
    outputs: {
      eyebrow: "Outputs",
      title: "이 패키지가 내놓는 결과물",
      items: [
        { title: "캠페인 브리프", description: "목표, 타겟, 메시지 방향, 채널이 정리된 1페이지 브리프", icon: "📄" },
        { title: "핵심 메시지 정리", description: "주요 메시지 3가지와 각각의 근거", icon: "💡" },
        { title: "카피 초안", description: "헤드라인, 서브카피, CTA 문구 초안", icon: "✍️" },
        { title: "실행 액션 리스트", description: "채널별 실행 항목과 담당/일정 가이드", icon: "✅" },
        { title: "보고용 요약", description: "팀장/대표 보고용 캠페인 개요", icon: "📊" },
      ],
    },
    conversation: {
      eyebrow: "Conversation",
      title: "실제 대화 예시",
      messages: [
        { type: "user", content: "회의 메모랑 참고 랜딩 2개 보낼게요" },
        { type: "agent", content: "확인했어요.\n지금은 캠페인 방향은 있는데 메시지 우선순위가 섞여 있어요.\n리드 확보 기준으로 다시 정리할까요?" },
        { type: "user", content: "네, 이번 목적은 리드예요." },
        { type: "agent", content: "좋아요.\n브리프는 리드 확보 기준으로 다시 정리하고\n핵심 메시지 3개와 CTA 초안까지 같이 만들게요.", buttons: ["브리프 만들기", "카피 초안", "팀장 보고용 요약"] },
      ],
    },
    rollout: {
      eyebrow: "Rollout",
      title: "패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다",
      items: [
        "주요 입력물 형식 정의",
        "캠페인 유형별 질문 플로우 설정",
        "브리프/카피 출력 형식 정의",
        "팀 공유 채널 연결",
        "버전 관리 방식 설정",
        "승인 플로우 연결 (옵션)",
      ],
    },
    included: {
      eyebrow: "What's included",
      title: "기본 패키지와 맞춤 세팅 범위",
      items: [
        "Slack 기본 인터랙션 설계",
        "캠페인 목표별 질문 플로우",
        "브리프/카피/액션리스트 출력 포맷",
        "기본 App Home 구조",
        "초기 운영 가이드",
      ],
      optionalItems: [
        "승인 플로우 연동",
        "버전 히스토리 관리",
        "팀 전용 템플릿 추가",
        "후속 자동화 연결",
      ],
    },
    trustBoundary: {
      eyebrow: "Trust boundary",
      title: "처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다",
      body: "초기 진단은 회의 메모와 공개 자료 중심으로 시작합니다. 이후 더 정교한 브리프가 필요할 때만 질문과 설정을 추가합니다.",
    },
    faq: [
      { title: "어떤 자료를 입력할 수 있나요?", content: "회의 메모, 참고 링크, 노션 문서, 기존 캠페인 자료 등 텍스트 기반 자료면 됩니다. 여러 자료를 한꺼번에 보내주시면 종합해서 분석합니다." },
      { title: "브리프 형식은 바꿀 수 있나요?", content: "네, 팀의 브리프 템플릿에 맞게 출력 형식을 맞춤 세팅합니다. 기본 제공되는 형식 외에도 원하는 구조로 조정 가능합니다." },
      { title: "생성된 카피는 수정할 수 있나요?", content: "네, Slack 스레드에서 바로 수정 요청을 할 수 있습니다. '더 짧게', '더 공식적으로', '톤 바꿔줘' 등의 피드백을 주시면 반영됩니다." },
      { title: "여러 캠페인 버전을 관리할 수 있나요?", content: "네, App Home에서 이전 브리프와 카피 초안을 확인하고 버전별로 비교할 수 있습니다. 승인 플로우 연동도 옵션으로 제공됩니다." },
      { title: "도입 전 샘플을 볼 수 있나요?", content: "네, 회의 메모나 참고 자료 예시를 보내주시면 실제 Campaign Brief Agent 흐름으로 데모를 보여드립니다. /contact 페이지에서 요청하세요." },
    ],
    finalCta: {
      title: "다음 캠페인 회의 메모를 브리프 초안으로 바로 바꿔보세요",
      body: "회의 메모나 참고 자료를 보내주시면 실제 Campaign Brief Agent 흐름으로 데모를 보여드립니다",
      primaryCta: "데모 요청하기",
      secondaryCta: "샘플 보내기",
    },
  },

  "korea-local-ops-agent": {
    slug: "korea-local-ops-agent",
    title: "Korea Local Ops Agent",
    shortDescription: "한국 채널을 진단하고 KR/EN summary와 HQ 공유용 action memo를 만듭니다",
    fullDescription: "한국 웹사이트와 채널을 읽고 로컬 시장 기준 병목을 짚은 뒤 Korea competitor scan, KR/EN summary, HQ 공유용 action memo까지 Slack 안에서 이어서 만듭니다",
    footer: "Korea scan · KR/EN summary · HQ memo",
    useCase: "보고 정리",
    teamType: "외국계 한국지사",
    color: "indigo",
    icon: "🌏",
    badge: "Korea Local Ops Agent",
    heroTitle: {
      line1: "한국 채널 진단과",
      highlight: "HQ 공유용 요약",
      line2: "을 Slack 안에서 한 흐름으로",
    },
    heroBody: "한국 웹사이트와 채널을 읽고 로컬 시장 기준 병목을 짚은 뒤 Korea competitor scan, KR/EN summary, HQ 공유용 action memo까지 Slack 안에서 이어서 만듭니다",
    microCopy: "Slack DM · 모달 · App Home · KR/EN 옵션 · 맞춤 세팅",
    bestFit: {
      good: [
        "한국 시장 담당 인력이 적은 외국계 한국지사",
        "본사 공유용 요약까지 동시에 정리해야 하는 팀",
        "현지 경쟁사와 채널 메시지를 빨리 파악해야 하는 팀",
        "KR/EN bilingual 문서 작성이 반복되는 팀",
      ],
      notGood: [
        "한국 시장 진단을 외부 리서치사에 위임하는 조직",
        "본사와의 모든 커뮤니케이션이 이미 정해진 절차로 진행되는 조직",
        "한국 시장만의 독립적인 전략 수립이 어려운 구조",
      ],
    },
    slackFlow: {
      eyebrow: "In Slack",
      title: "링크 하나로 시작해서, KR/EN 요약까지 Slack 안에서 이어집니다",
      steps: [
        { step: "1", title: "메시지에서 입력", description: "한국 사이트 URL, 채널 링크를 보냅니다", icon: "💬" },
        { step: "2", title: "모달에서 목표 고정", description: "KR only 또는 KR/EN 옵션, 보고 방식을 선택합니다", icon: "🌐" },
        { step: "3", title: "스레드에서 결과 생성", description: "Korea scan, KR/EN summary를 공유합니다", icon: "📊" },
        { step: "4", title: "App Home에서 관리", description: "HQ 보고용 파일과 히스토리를 관리합니다", icon: "🏠" },
      ],
    },
    outputs: {
      eyebrow: "Outputs",
      title: "이 패키지가 내놓는 결과물",
      items: [
        { title: "한국 채널 진단", description: "한국 시장용 메시지, CTA, 페이지 구조 진단", icon: "🇰🇷" },
        { title: "Korea competitor scan", description: "주요 경쟁사 채널과의 메시지/포지셔닝 비교", icon: "🔍" },
        { title: "KR summary", description: "한국 팀 내부용 상세 진단 요약", icon: "📝" },
        { title: "EN executive summary", description: "본사 보고용 1페이지 영문 요약", icon: "📄" },
        { title: "HQ action memo", description: "본사 결정/지원이 필요한 액션 리스트", icon: "✅" },
      ],
    },
    conversation: {
      eyebrow: "Conversation",
      title: "실제 대화 예시",
      messages: [
        { type: "user", content: "한국 사이트 URL 보낼게요" },
        { type: "agent", content: "사이트를 확인했어요.\n제품 정보는 충분하지만 한국 시장용 메시지와 CTA는 약한 편입니다.\nHQ 보고용 요약도 같이 만들까요?" },
        { type: "user", content: "네, KR/EN 둘 다 필요해요." },
        { type: "agent", content: "좋아요.\n한국 채널 기준 진단과 경쟁사 스캔을 먼저 정리한 뒤\nKR/EN summary로 이어서 만들게요.", buttons: ["Korea scan", "KR summary", "EN summary"] },
      ],
    },
    rollout: {
      eyebrow: "Rollout",
      title: "패키지 설치가 아니라, 팀 흐름에 맞춘 세팅으로 시작합니다",
      items: [
        "한국 주요 채널/입력물 정의",
        "KR/EN 출력 형식 및 템플릿 설정",
        "HQ 보고 방식 및 주기 정의",
        "한국팀-HQ 공유 플로우 설정",
        "경쟁사 모니터링 대상 설정",
        "승인 및 버전 관리 설정",
      ],
    },
    included: {
      eyebrow: "What's included",
      title: "기본 패키지와 맞춤 세팅 범위",
      items: [
        "Slack 기본 인터랙션 설계",
        "한국 시장 진단 질문 플로우",
        "KR/EN summary 출력 포맷",
        "HQ action memo 기본 구조",
        "기본 App Home 구조",
        "초기 운영 가이드",
      ],
      optionalItems: [
        "특정 경쟁사 모니터링",
        "HQ 보고 주기/템플릿 커스텀",
        "KR/EN 출력 비율 조정",
        "본사 승인 플로우 연동",
      ],
    },
    trustBoundary: {
      eyebrow: "Trust boundary",
      title: "처음엔 가볍게 시작하고, 필요한 만큼만 깊게 갑니다",
      body: "초기 진단은 한국 사이트와 공개 채널 중심으로 시작합니다. 이후 HQ 보고나 경쟁사 분석이 필요할 때만 깊이를 추가합니다.",
    },
    faq: [
      { title: "어떤 한국 채널을 분석할 수 있나요?", content: "홈페이지, 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 특정 경쟁사를 지정하시면 해당 채널과의 비교도 포함됩니다." },
      { title: "KR/EN summary는 동시에 생성되나요?", content: "네, 한국 채널 진단 후 KR summary와 EN executive summary를 한 흐름으로 생성합니다. HQ 보고용과 한국팀 내부용을 모두 준비할 수 있습니다." },
      { title: "HQ action memo는 어떤 내용이 들어가나요?", content: "한국 시장 진단 결과, 본사 결정/지원이 필요한 사항, 권장 액션 아이템이 포함됩니다. 본사의 리소스 할당 결정을 돕는 내용 중심으로 정리합니다." },
      { title: "경쟁사는 어떤 기준으로 선정하나요?", content: "기본적으로는 동일 카테고리/산업의 주요 한국 플레이어를 기준으로 합니다. 특정 경쟁사를 지정하시면 해당 채널과의 비교를 추가합니다." },
      { title: "도입 전 샘플을 볼 수 있나요?", content: "네, 한국 사이트 URL이나 채널 링크를 보내주시면 Korea Local Ops Agent 흐름으로 실제 KR/EN 데모를 보여드립니다. /contact 페이지에서 요청하세요." },
    ],
    finalCta: {
      title: "한국 채널 기준의 첫 진단과 HQ 공유용 예시를 먼저 받아보세요",
      body: "한국 사이트 URL이나 채널 링크를 보내주시면 Korea Local Ops Agent 흐름으로 실제 KR/EN 데모를 보여드립니다",
      primaryCta: "데모 요청하기",
      secondaryCta: "한국 URL 보내기",
    },
  },
};

// Array version for easy iteration
export const packagesArray = Object.values(packageDefinitions);

// ============================================================
// DEMO PAGE CONTENT
// ============================================================

export const demoPageContent = {
  hero: {
    eyebrow: "Slack Agent Demo",
    title: "Slack 안에서 어떻게 작동하는지 보여드립니다",
    body: "패키지별로 Slack에서 URL을 입력했을 때의 대화 흐름을 확인하세요. 실제 화면은 더 많은 인터랙션을 포함합니다.",
  },

  tabs: [
    { id: "website", label: "Website Diagnosis", color: "blue" },
    { id: "campaign", label: "Campaign Brief", color: "emerald" },
    { id: "korea", label: "Korea Local Ops", color: "indigo" },
  ],

  tabContent: {
    website: {
      badge: "Website Diagnosis Agent",
      title: "사이트 진단에서 실행 초안까지",
      description: "URL을 입력하면 1차 병목 진단이 바로 나옵니다. 목표를 확인한 뒤 경쟁사 비교, CTA 초안, 보고용 요약 중 선택해서 이어갑니다.",
      steps: [
        "URL 입력 → 사이트 분석 시작",
        "1차 병목 진단 수신",
        "목표 확인 (문의/구매/콘텐츠)",
        "실행 버튼 선택 → 결과 생성",
      ],
    },
    campaign: {
      badge: "Campaign Brief Agent",
      title: "회의에서 브리프까지",
      description: "회의 메모와 참고 자료를 입력하면 캠페인 방향을 정리하고 브리프, 메시지, 카피 초안까지 이어서 만듭니다.",
      steps: [
        "회의 메모/링크 입력",
        "캠페인 방향 및 메시지 우선순위 분석",
        "목표 확인 (리드/구매/인지)",
        "브리프/카피/보고 선택 → 결과 생성",
      ],
    },
    korea: {
      badge: "Korea Local Ops Agent",
      title: "한국 채널과 HQ 공유",
      description: "한국 사이트 URL을 입력하면 한국 시장용 진단과 KR/EN summary, HQ action memo를 한 흐름으로 생성합니다.",
      steps: [
        "한국 사이트/채널 URL 입력",
        "한국 시장 진단 및 경쟁사 스캔",
        "KR/EN 옵션 및 HQ 보고 방식 선택",
        "KR/EN summary 및 action memo 생성",
      ],
    },
  },

  slackSurfaces: {
    eyebrow: "Slack Surfaces",
    title: "4개의 Slack Surface로 구성됩니다",
    cards: [
      {
        title: "Messages / DM / Channel",
        description: "URL 입력, 1차 진단, 빠른 실행 버튼. 팀과 실시간으로 대화하며 결과를 공유합니다.",
        icon: "💬",
      },
      {
        title: "Modals",
        description: "목표 설정, 결과 형식 선택, KR/EN 옵션. 집중된 입력을 받아 정확한 결과물을 만듭니다.",
        icon: "🪟",
      },
      {
        title: "Threads",
        description: "생성된 비교표, 초안, 요약을 스레드로 정리해 팀이 쉽게 따라갈 수 있습니다.",
        icon: "🧵",
      },
      {
        title: "App Home",
        description: "저장된 작업, 최근 실행 결과, 다시 열기. 사용자별 1:1 공간에서 히스토리를 관리합니다.",
        icon: "🏠",
      },
    ],
  },

  finalCta: {
    title: "실제로 우리 팀 Slack에서 체험해보세요",
    body: "데모 요청하시면 회사 URL 기준으로 실제 패키지 흐름을 보여드립니다.",
    primaryCta: "데모 요청하기",
    secondaryCta: "패키지 보기",
  },
};

// ============================================================
// CONTACT PAGE CONTENT
// ============================================================

export const contactPageContent = {
  hero: {
    eyebrow: "Contact",
    title: {
      line1: "우리 팀 Slack에 맞는",
      highlight: "에이전트 패키지 데모",
      line2: "를 받아보세요",
    },
    body: "회사 사이트나 채널 URL을 보내주시면 프롬프토리 방식으로 실제 진단 예시를 보여드립니다",
  },

  demoCard: {
    badge: "Demo Request",
    title: "URL로 데모 요청하기",
    description: "회사 홈페이지 URL, 랜딩 페이지, 또는 현재 운영 중인 채널 링크를 보내주세요. 해당 URL을 기준으로 실제 패키지 흐름으로 진단 예시를 만들어드립니다.",
    cta: "이메일로 데모 요청",
    helperText: "또는 hello@promptory.kr로 직접 이메일 보내주세요",
    emailSubject: "데모 요청 - [회사명]",
    emailBody: `안녕하세요,

회사 URL: [URL을 입력해주세요]

팀 상황:
- 팀 규모:
- 주요 고민:
- 관심 패키지: (Website Diagnosis / Campaign Brief / Korea Local Ops)

감사합니다.`,
  },

  inquiryCard: {
    badge: "General Inquiry",
    title: "일반 문의하기",
    description: "패키지 구성, 도입 절차, 맞춤 세팅 범위 등에 대해 궁금한 점이 있으시면 언제든 문의해주세요.",
    cta: "문의 이메일 보내기",
    helperText: "평일 24시간 내 답변드립니다",
    emailSubject: "프롬프토리 문의",
  },

  process: {
    eyebrow: "What to expect",
    title: "데모 요청 후 과정",
    steps: [
      { step: "01", title: "URL 수신", description: "보내주신 URL로 실제 패키지 흐름 테스트", icon: "📥" },
      { step: "02", title: "데모 준비", description: "해당 URL 기준 진단 예시 및 결과물 샘플 준비 (영업일 1-2일)", icon: "⚙️" },
      { step: "03", title: "온라인 미팅", description: "화면 공유로 Slack 흐름과 결과물 설명 (30분)", icon: "💻" },
    ],
  },

  infoSection: {
    title: "데모 요청 시 포함하면 좋은 정보",
    items: [
      { text: "홈페이지 또는 주요 채널 URL", icon: "🔗" },
      { text: "팀 규모와 주요 업무 (마케팅/기획/운영 등)", icon: "👥" },
      { text: "현재 겪고 있는 가장 큰 고민 (브리프 작성/보고 정리/경쟁사 분석 등)", icon: "🎯" },
      { text: "관심 있는 패키지 (Website Diagnosis / Campaign Brief / Korea Local Ops)", icon: "📦" },
      { text: "Slack 워크스페이스 사용 여부", icon: "💬" },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    items: [
      { q: "데모는 무료인가요?", a: "네, URL 기준 진단 예시와 Slack 흐름 데모는 무료로 제공됩니다. 실제 패키지 도입 시 맞춤 세팅 비용은 별도로 안내드립니다." },
      { q: "어떤 URL을내면 되나요?", a: "회사 홈페이지, 서비스 랜딩 페이지, 블로그, 노션 문서 등 공개 접근 가능한 URL이면 됩니다. 여러 URL을 함께 보내주셔도 좋습니다." },
      { q: "Slack이 없으면 어떻게 하나요?", a: "프롬프토리는 Slack 기반으로 설계되었습니다. 데모는 웹에서 보여드리지만, 실제 사용을 위해서는 Slack 워크스페이스가 필요합니다." },
    ],
  },
};

// ============================================================
// SHARED COMPONENT CONTENT
// ============================================================

export const sharedContent = {
  nav: {
    brand: "프롬프토리",
    items: [
      { label: "홈", href: "/" },
      { label: "패키지", href: "/packages" },
      { label: "데모", href: "/demo/slack" },
      { label: "문의", href: "/contact" },
    ],
  },
  footer: {
    brand: "Promptory",
    tagline: "맞춤형 Slack Agent Package",
    copyright: "© 2025 Promptory. All rights reserved.",
  },
};
