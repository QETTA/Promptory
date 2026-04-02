import { ProductForm } from "@/components/forms/product-form";
import { Hero } from "@/components/marketplace/hero";
import { SetupCallout } from "@/components/ui/setup-callout";
import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { requireUser } from "@/lib/server/auth";

export default async function NewProductPage() {
  if (!hasSellerWriteRuntime()) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="실행 팩 등록을 시작하려면 Promptory 연결이 필요합니다"
          body="실행 팩 등록과 파일 업로드에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 먼저 확인해 주세요."
        />
      </div>
    );
  }

  await requireUser("/seller/products/new");

  return (
    <div className="pb-16">
      <Hero
        eyebrow="New execution pack"
        theme="workspace"
        tone="light"
        title="새 실행 팩 초안을 바로 만드세요"
        body="기본 정보, 설명, 파일 업로드, 미리보기 순서로 입력을 묶어서 공개 가능 여부가 바로 보이게 정리했습니다."
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
