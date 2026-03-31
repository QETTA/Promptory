import { getProductTypeLabel } from "@/lib/promptory-display";
import type { ProductType } from "@/lib/supabase/types";

export function getOutcomeHeadline(productType: ProductType) {
  if (productType === "automation_system") {
    return "반복 업무를 줄이고 바로 실행 가능한 작업 흐름을 얻습니다.";
  }

  if (productType === "template_bundle") {
    return "복사해서 바로 적용할 수 있는 실전 템플릿과 구조를 얻습니다.";
  }

  return "지금 바로 결과를 낼 수 있는 프롬프트 구조와 사용 가이드를 얻습니다.";
}

export function getAudienceCopy(category: string) {
  return [
    `${category} 관련 작업을 더 빠르게 정리하고 싶은 1인 제작자나 실무자`,
    "AI를 활용하고 싶지만 처음부터 구조를 짜는 시간이 부족한 사람",
    "추상적인 설명보다 실제 구성과 활용 예시를 보고 판단하고 싶은 사람",
  ];
}

export function getGoodFitCopy(category: string) {
  return [
    "반복하던 작업을 더 짧은 시간 안에 정리하고 싶은 사람",
    `${category} 영역에서 바로 적용할 수 있는 실행 구조가 필요한 사람`,
    "복잡한 설정 없이 먼저 써보면서 감을 잡고 싶은 초보 사용자",
  ];
}

export function getNotYetFitCopy() {
  return [
    "아직 어떤 문제를 해결하고 싶은지 스스로도 정리되지 않은 상태",
    "완전히 맞춤 제작이나 1:1 구축 서비스가 바로 필요한 경우",
    "실행 팩 구매 후 실시간 운영 지원까지 함께 기대하는 경우",
  ];
}

export function getUsageSteps(setupMinutes: number) {
  return [
    "상세 화면에서 구성과 활용 예시를 보고 내 작업 흐름에 맞는지 먼저 판단합니다.",
    "구매 후 주문 내역과 라이브러리에서 바로 다시 확인할 수 있습니다.",
    `${setupMinutes}분 안에 시작할 수 있는 가이드를 따라 바로 적용해 봅니다.`,
  ];
}

export function getResultExample(category: string) {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("마케팅")) {
    return [
      "캠페인 기획안 초안",
      "광고 문구 10개",
      "랜딩 페이지 섹션 구조",
      "콘텐츠 게시 일정 초안",
    ];
  }

  if (normalizedCategory.includes("운영") || normalizedCategory.includes("자동화")) {
    return [
      "반복 요청 처리 체크리스트",
      "응답 템플릿 초안",
      "자동화 연결 순서 문서",
      "실행 전 점검표",
    ];
  }

  if (normalizedCategory.includes("영업") || normalizedCategory.includes("세일즈")) {
    return [
      "리드 분류 기준표",
      "첫 제안 메시지 초안",
      "후속 연락 스크립트",
      "거절 대응 문구 모음",
    ];
  }

  return [
    "바로 적용 가능한 템플릿",
    "실행 순서 문서",
    "결과 예시 샘플",
    "초보자용 사용 가이드",
  ];
}

export function getPreviewBlock(previewPoints: string[]) {
  const points = previewPoints.slice(0, 3);

  if (points.length > 0) {
    return points;
  }

  return [
    "초보자용 시작 가이드",
    "바로 복사해 써볼 수 있는 기본 템플릿",
    "실제 결과물을 만드는 순서 설명",
  ];
}

export function getIncludedItems(setupMinutes: number, productType: ProductType) {
  return [
    `${setupMinutes}분 안에 시작할 수 있는 실행 가이드`,
    `${getProductTypeLabel(productType)} 형태로 정리된 핵심 자료`,
    "구매 전에 확인할 수 있는 미리보기 정보",
  ];
}

export function getWhatThisIs(category: string, productType: ProductType) {
  return [
    `${getProductTypeLabel(productType)} 형태로 정리된 실행형 디지털 상품`,
    `${category} 관련 작업을 더 빠르게 처리하도록 만든 결과 중심 구성`,
    "열어보는 데서 끝나지 않고 바로 적용 순서까지 따라갈 수 있는 형태",
  ];
}

export function getPrimaryPreviewPoint(previewPoints: string[]) {
  return previewPoints[0] ?? "바로 적용할 수 있는 구성과 사용 가이드를 포함합니다.";
}
