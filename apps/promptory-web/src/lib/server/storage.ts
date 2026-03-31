import path from "node:path";

import { createAdminSupabaseClient } from "@/lib/supabase/server";

function getFileExtension(fileName: string) {
  const ext = path.extname(fileName).replace(".", "").trim().toLowerCase();
  return ext || "bin";
}

function getObjectPathFromPublicUrl(publicUrl: string, bucketName: string) {
  const url = new URL(publicUrl);
  const marker = `/storage/v1/object/public/${bucketName}/`;
  const index = url.pathname.indexOf(marker);

  if (index < 0) {
    throw new Error("공개 스토리지 URL 형식이 올바르지 않습니다.");
  }

  return decodeURIComponent(url.pathname.slice(index + marker.length));
}

async function fileToBuffer(file: File) {
  return Buffer.from(await file.arrayBuffer());
}

async function deleteStorageObject(params: { bucket: string; objectPath: string }) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.storage.from(params.bucket).remove([params.objectPath]);

  if (error) {
    throw new Error(`스토리지 파일 삭제에 실패했습니다: ${error.message}`);
  }
}

export async function deleteThumbnailByUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) {
    return;
  }

  const objectPath = getObjectPathFromPublicUrl(publicUrl, "product-thumbnails");
  await deleteStorageObject({ bucket: "product-thumbnails", objectPath });
}

export async function deleteProductFileByPath(objectPath: string | null | undefined) {
  if (!objectPath) {
    return;
  }

  await deleteStorageObject({ bucket: "product-files", objectPath });
}

export async function cleanupUploadedProductAssets(params: {
  thumbnailUrl?: string | null;
  productFilePath?: string | null;
}) {
  await Promise.allSettled([
    deleteThumbnailByUrl(params.thumbnailUrl),
    deleteProductFileByPath(params.productFilePath),
  ]);
}

export async function uploadThumbnail(params: {
  file: File;
  productId: string;
  sellerId: string;
}) {
  const supabase = createAdminSupabaseClient();
  const ext = getFileExtension(params.file.name);
  const objectPath = `${params.sellerId}/${params.productId}/thumbnail-${Date.now()}.${ext}`;
  const buffer = await fileToBuffer(params.file);

  const { error } = await supabase.storage.from("product-thumbnails").upload(objectPath, buffer, {
    cacheControl: "3600",
    contentType: params.file.type || "application/octet-stream",
    upsert: true,
  });

  if (error) {
    throw new Error(`썸네일 업로드에 실패했습니다: ${error.message}`);
  }

  const { data } = supabase.storage.from("product-thumbnails").getPublicUrl(objectPath);
  return data.publicUrl;
}

export async function uploadProductFile(params: {
  file: File;
  productId: string;
  sellerId: string;
}) {
  const supabase = createAdminSupabaseClient();
  const ext = getFileExtension(params.file.name);
  const objectPath = `${params.sellerId}/${params.productId}/asset-${Date.now()}.${ext}`;
  const buffer = await fileToBuffer(params.file);

  const { error } = await supabase.storage.from("product-files").upload(objectPath, buffer, {
    cacheControl: "3600",
    contentType: params.file.type || "application/octet-stream",
    upsert: true,
  });

  if (error) {
    throw new Error(`실행 팩 파일 업로드에 실패했습니다: ${error.message}`);
  }

  return objectPath;
}
