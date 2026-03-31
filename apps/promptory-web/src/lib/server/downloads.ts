import { createAdminSupabaseClient } from "@/lib/supabase/server";
import type { DownloadRow } from "@/lib/supabase/types";

import { getOrderForBuyer } from "@/lib/server/orders";

export class DownloadAccessError extends Error {
  status: number;

  constructor(message: string, status = 403) {
    super(message);
    this.name = "DownloadAccessError";
    this.status = status;
  }
}

export function isUniqueConstraintError(error: { code?: string | null } | null | undefined) {
  return error?.code === "23505";
}

async function persistDownloadRecord(params: {
  buyerId: string;
  orderId: string;
  productId: string;
  supabase: ReturnType<typeof createAdminSupabaseClient>;
}) {
  const timestamp = new Date().toISOString();
  const { data: existing, error: existingError } = await params.supabase
    .from("downloads")
    .select("*")
    .eq("order_id", params.orderId)
    .maybeSingle()
    .overrideTypes<DownloadRow | null>();

  if (existingError) {
    throw new Error(`다운로드 기록을 확인하지 못했습니다. ${existingError.message}`);
  }

  if (existing) {
    const typedExisting = existing as DownloadRow;
    const { error: updateError } = await params.supabase
      .from("downloads")
      .update({
        download_count: typedExisting.download_count + 1,
        last_downloaded_at: timestamp,
        updated_at: timestamp,
      })
      .eq("id", typedExisting.id);

    if (updateError) {
      throw new Error(`다운로드 기록을 갱신하지 못했습니다. ${updateError.message}`);
    }

    return;
  }

  const { error: insertError } = await params.supabase.from("downloads").insert({
    buyer_id: params.buyerId,
    download_count: 1,
    last_downloaded_at: timestamp,
    order_id: params.orderId,
    product_id: params.productId,
  });

  if (!insertError) {
    return;
  }

  if (!isUniqueConstraintError(insertError)) {
    throw new Error(`다운로드 기록을 저장하지 못했습니다. ${insertError.message}`);
  }

  const { data: concurrent, error: concurrentError } = await params.supabase
    .from("downloads")
    .select("*")
    .eq("order_id", params.orderId)
    .maybeSingle()
    .overrideTypes<DownloadRow | null>();

  if (concurrentError) {
    throw new Error(`다운로드 기록을 다시 확인하지 못했습니다. ${concurrentError.message}`);
  }

  if (!concurrent) {
    throw new Error("다운로드 기록을 다시 찾지 못했습니다.");
  }

  const typedConcurrent = concurrent as DownloadRow;
  const { error: retryUpdateError } = await params.supabase
    .from("downloads")
    .update({
      download_count: typedConcurrent.download_count + 1,
      last_downloaded_at: timestamp,
      updated_at: timestamp,
    })
    .eq("id", typedConcurrent.id);

  if (retryUpdateError) {
    throw new Error(`다운로드 기록을 갱신하지 못했습니다. ${retryUpdateError.message}`);
  }
}

export async function createDownloadUrl(orderId: string, buyerId: string): Promise<string> {
  const order = await getOrderForBuyer(orderId, buyerId);

  if (!order) {
    throw new DownloadAccessError("다운로드할 수 있는 주문을 찾지 못했습니다.");
  }

  if (order.status !== "paid") {
    throw new DownloadAccessError("결제가 완료된 실행 팩만 다운로드할 수 있습니다.");
  }

  if (!order.product?.file_path) {
    throw new DownloadAccessError("판매자가 아직 다운로드 파일을 준비하지 않았습니다.");
  }

  const supabase = createAdminSupabaseClient();
  const { data: signed, error: signedError } = await supabase.storage
    .from("product-files")
    .createSignedUrl(order.product.file_path, 60);

  if (signedError || !signed) {
    throw new Error(`다운로드 URL을 만들지 못했습니다. ${signedError?.message ?? "unknown"}`);
  }

  await persistDownloadRecord({
    buyerId,
    orderId: order.id,
    productId: order.product_id,
    supabase,
  });

  return signed.signedUrl;
}
