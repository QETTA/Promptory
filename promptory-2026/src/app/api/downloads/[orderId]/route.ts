import { NextResponse } from "next/server";

import { hasDownloadRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { DownloadAccessError, createDownloadUrl } from "@/lib/server/downloads";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  if (!hasDownloadRuntime()) {
    return jsonError(
      "다운로드를 열려면 Promptory 연결 설정과 `SUPABASE_SERVICE_ROLE_KEY`가 필요합니다. 먼저 /setup에서 환경 상태를 확인해 주세요.",
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

  const { orderId } = await context.params;

  try {
    const url = await createDownloadUrl(orderId, user.id);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    if (error instanceof DownloadAccessError) {
      return jsonError(error.message, error.status);
    }

    return jsonError(error instanceof Error ? error.message : "다운로드 요청에 실패했습니다.", 500);
  }
}
