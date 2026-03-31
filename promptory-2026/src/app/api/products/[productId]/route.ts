import { NextResponse } from "next/server";

import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { canPublishProduct } from "@/lib/product-editor";
import { getSellerProductById, resolveUniqueSlug } from "@/lib/server/products";
import {
  cleanupUploadedProductAssets,
  deleteProductFileByPath,
  deleteThumbnailByUrl,
  uploadProductFile,
  uploadThumbnail,
} from "@/lib/server/storage";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";
import {
  parseKeywords,
  parsePreviewPoints,
  productFormSchema,
  validateProductFile,
  validateThumbnailFile,
} from "@/lib/validations/product";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ productId: string }> },
) {
  if (!hasSellerWriteRuntime()) {
    return jsonError(
      "실행 팩 수정에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 확인해 주세요.",
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

  const { productId } = await context.params;
  const existing = await getSellerProductById(productId, user.id);

  if (!existing) {
    return jsonError("수정할 실행 팩을 찾지 못했습니다.", 404);
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
  let nextThumbnailUrl: string | null = existing.thumbnail_url;
  let nextFilePath: string | null = existing.file_path;
  let uploadedThumbnailUrl: string | null = null;
  let uploadedFilePath: string | null = null;

  try {
    validateThumbnailFile(thumbnail);
    validateProductFile(asset);

    if (
      parsed.data.status === "published" &&
      !canPublishProduct({ hasProductFile: Boolean(asset || existing.file_path) })
    ) {
      return jsonError("공개 실행 팩으로 전환하려면 실행 팩 파일이 필요합니다.", 400);
    }

    const admin = createAdminSupabaseClient();
    const slug =
      existing.title === parsed.data.title
        ? existing.slug
        : await resolveUniqueSlug(parsed.data.title, existing.id);

    if (thumbnail) {
      uploadedThumbnailUrl = await uploadThumbnail({
        file: thumbnail,
        productId: existing.id,
        sellerId: user.id,
      });
      nextThumbnailUrl = uploadedThumbnailUrl;
    }

    if (asset) {
      uploadedFilePath = await uploadProductFile({
        file: asset,
        productId: existing.id,
        sellerId: user.id,
      });
      nextFilePath = uploadedFilePath;
    }

    const { error } = await admin
      .from("products")
      .update({
        category: parsed.data.category,
        description: parsed.data.description,
        file_path: nextFilePath,
        keywords: parseKeywords(parsed.data.keywordsText),
        preview_points: parsePreviewPoints(parsed.data.previewPointsText),
        price_krw: parsed.data.priceKrw,
        product_type: parsed.data.productType,
        setup_minutes: parsed.data.setupMinutes,
        slug,
        status: parsed.data.status,
        thumbnail_url: nextThumbnailUrl,
        title: parsed.data.title,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) {
      throw new Error(error.message);
    }

    await Promise.allSettled([
      uploadedThumbnailUrl && uploadedThumbnailUrl !== existing.thumbnail_url
        ? deleteThumbnailByUrl(existing.thumbnail_url)
        : Promise.resolve(),
      uploadedFilePath && uploadedFilePath !== existing.file_path
        ? deleteProductFileByPath(existing.file_path)
        : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true, productId: existing.id });
  } catch (error) {
    await cleanupUploadedProductAssets({
      productFilePath: uploadedFilePath,
      thumbnailUrl: uploadedThumbnailUrl,
    });

    return jsonError(error instanceof Error ? error.message : "실행 팩 수정에 실패했습니다.", 400);
  }
}
