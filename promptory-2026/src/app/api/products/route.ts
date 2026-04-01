import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

// Cloudflare Pages Static Export 설정
export const dynamic = "force-static";

import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { canPublishProduct } from "@/lib/product-editor";
import { resolveUniqueSlug } from "@/lib/server/products";
import { cleanupUploadedProductAssets, uploadProductFile, uploadThumbnail } from "@/lib/server/storage";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";
import {
  parseKeywords,
  parsePreviewPoints,
  productFormSchema,
  validateProductFile,
  validateThumbnailFile,
} from "@/lib/validations/product";

export async function POST(request: Request) {
  if (!hasSellerWriteRuntime()) {
    return jsonError(
      "실행 팩 등록에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 확인해 주세요.",
      503,
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return jsonError("로그인이 필요합니다.", 401);
  }

  const formData = await request.formData();
  const parsed = productFormSchema.safeParse({
    category: formData.get("category"),
    description: formData.get("description"),
    keywordsText: formData.get("keywordsText"),
    previewPointsText: formData.get("previewPointsText"),
    priceKrw: formData.get("priceKrw"),
    productType: formData.get("productType"),
    setupMinutes: formData.get("setupMinutes"),
    status: formData.get("status"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "실행 팩 입력값을 다시 확인해 주세요.", 400);
  }

  const thumbnailFile = formData.get("thumbnailFile");
  const productFile = formData.get("productFile");
  const thumbnail = thumbnailFile instanceof File && thumbnailFile.size > 0 ? thumbnailFile : null;
  const asset = productFile instanceof File && productFile.size > 0 ? productFile : null;
  const productId = randomUUID();
  let thumbnailUrl: string | null = null;
  let filePath: string | null = null;

  try {
    validateThumbnailFile(thumbnail);
    validateProductFile(asset);

    if (parsed.data.status === "published" && !canPublishProduct({ hasProductFile: Boolean(asset) })) {
      return jsonError("공개 실행 팩으로 전환하려면 실행 팩 파일이 필요합니다.", 400);
    }

    const admin = createAdminSupabaseClient();
    const slug = await resolveUniqueSlug(parsed.data.title);

    if (thumbnail) {
      thumbnailUrl = await uploadThumbnail({
        file: thumbnail,
        productId,
        sellerId: user.id,
      });
    }

    if (asset) {
      filePath = await uploadProductFile({
        file: asset,
        productId,
        sellerId: user.id,
      });
    }

    const { data: product, error } = await admin
      .from("products")
      .insert({
        id: productId,
        category: parsed.data.category,
        description: parsed.data.description,
        file_path: filePath,
        keywords: parseKeywords(parsed.data.keywordsText),
        preview_points: parsePreviewPoints(parsed.data.previewPointsText),
        price_krw: parsed.data.priceKrw,
        product_type: parsed.data.productType,
        seller_id: user.id,
        setup_minutes: parsed.data.setupMinutes,
        slug,
        status: parsed.data.status,
        thumbnail_url: thumbnailUrl,
        title: parsed.data.title,
      })
      .select("*")
      .single()
      .overrideTypes<ProductRow>();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ ok: true, productId: product.id });
  } catch (error) {
    await cleanupUploadedProductAssets({
      productFilePath: filePath,
      thumbnailUrl,
    });

    return jsonError(error instanceof Error ? error.message : "실행 팩 생성에 실패했습니다.", 400);
  }
}
