import { notFound } from "next/navigation";

import { ProductForm } from "@/components/forms/product-form";
import { Hero } from "@/components/marketplace/hero";
import { SetupCallout } from "@/components/ui/setup-callout";
import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { getSellerReadinessLabel, getSellerReadinessSummary } from "@/lib/product-editor";
import { requireUser } from "@/lib/server/auth";
import { getSellerProductById } from "@/lib/server/products";
import shellStyles from "../../seller-product-shell.module.css";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  if (!hasSellerWriteRuntime()) {
    return (
      <div className={shellStyles.setupWrap}>
        <SetupCallout
          title="실행 팩 수정을 시작하려면 Promptory 연결이 필요합니다"
          body="실행 팩 수정과 파일 교체에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 먼저 확인해 주세요."
        />
      </div>
    );
  }

  const { productId } = await params;
  const user = await requireUser(`/seller/products/${productId}/edit`);
  const product = await getSellerProductById(productId, user.id);

  if (!product) {
    notFound();
  }

  const readinessLabel = getSellerReadinessLabel({
    hasProductFile: Boolean(product.file_path),
    hasThumbnail: Boolean(product.thumbnail_url),
  });
  const readinessSummary = getSellerReadinessSummary({
    hasProductFile: Boolean(product.file_path),
    hasThumbnail: Boolean(product.thumbnail_url),
  });

  return (
    <div className={shellStyles.pageShell}>
      <Hero
        eyebrow="Edit execution pack"
        theme="workspace"
        tone="light"
        title={product.title}
        body={`${readinessLabel} · ${readinessSummary}`}
      />

      <div className={shellStyles.contentWrap}>
        <ProductForm mode="edit" product={product} />
      </div>
    </div>
  );
}
