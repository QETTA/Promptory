import { NextResponse } from "next/server";

import { hasAuthRuntime } from "@/lib/env/runtime";
import { jsonError } from "@/lib/http";
import { OptimizationRunsTableMissingError, saveOptimizationRun } from "@/lib/server/optimization-runs";
import { trackServerEvent } from "@/lib/server/telemetry";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { saveOptimizationRunSchema } from "@/lib/validations/optimization-run";

export async function POST(request: Request) {
  if (!hasAuthRuntime()) {
    return jsonError("저장 기능을 쓰려면 공개 Supabase 설정이 필요합니다. /setup을 먼저 확인해 주세요.", 503);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return jsonError("로그인이 필요합니다.", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = saveOptimizationRunSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "저장 요청을 다시 확인해 주세요.", 400);
  }

  try {
    const run = await saveOptimizationRun({
      ...parsed.data,
      userId: user.id,
    });

    await trackServerEvent("optimization_run_saved", {
      channelKind: parsed.data.channelKind,
      engineMode: parsed.data.engineMode ?? null,
      engineVersion: parsed.data.engineVersion ?? null,
      normalizedUrl: parsed.data.normalizedUrl || parsed.data.rawUrl,
      queryString: parsed.data.queryString,
      recommendedCategory: parsed.data.recommendedCategory ?? null,
      userId: user.id,
    });

    return NextResponse.json({ ok: true, runId: run.id, updatedAt: run.updatedAt });
  } catch (error) {
    if (error instanceof OptimizationRunsTableMissingError) {
      return jsonError("저장 기능을 쓰려면 최신 Promptory schema.sql을 Supabase에 다시 적용해 주세요.", 503);
    }

    return jsonError(
      error instanceof Error ? error.message : "현재 진단을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      500,
    );
  }
}
