import type { PaymentsMode } from "@/lib/env/server";
import type { OrderStatus, ProductType } from "@/lib/supabase/types";

export function getProductTypeLabel(productType: ProductType | string) {
  switch (productType) {
    case "automation_system":
      return "실행 시스템";
    case "template_bundle":
      return "템플릿 번들";
    case "prompt_pack":
      return "프롬프트 팩";
    default:
      return productType;
  }
}

export function getCategoryLabel(category: string) {
  switch (category.trim().toLowerCase()) {
    case "automation":
      return "자동화";
    case "marketing":
      return "마케팅";
    case "operations":
      return "운영";
    case "sales":
      return "세일즈";
    case "content":
      return "콘텐츠";
    case "data":
      return "데이터";
    default:
      return category;
  }
}

export function getOrderStatusLabel(status: OrderStatus | string) {
  switch (status) {
    case "draft":
      return "주문 생성";
    case "pending_payment":
      return "결제 준비 중";
    case "paid":
      return "결제 완료";
    case "cancelled":
      return "취소됨";
    default:
      return status;
  }
}

export function getDifficultyLabel(setupMinutes: number) {
  if (setupMinutes <= 15) {
    return "쉬움";
  }

  if (setupMinutes <= 40) {
    return "보통";
  }

  return "집중해서 시작";
}

export function getSellerDisplayName(displayName: string | null | undefined) {
  return displayName ?? "판매자 정보 준비 중";
}

export function getPaymentsModeSummary(mode: PaymentsMode) {
  switch (mode) {
    case "disabled":
      return "현재는 실제 결제 없이 실행 팩 둘러보기와 주문 준비 흐름까지만 열려 있습니다.";
    case "dev_stub":
      return "운영 전 점검용으로 테스트 구매부터 보관함 열기와 다운로드까지 확인할 수 있습니다.";
    case "toss":
      return "현재는 토스 결제창 진입부터 결제 완료 후 보관함 복귀까지 확인할 수 있습니다.";
    default:
      return mode;
  }
}
