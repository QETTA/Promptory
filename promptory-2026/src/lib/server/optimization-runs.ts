import { hasPublicEnv } from "@/lib/env/public";
import {
  buildOptimizationRunTitle,
  getOptimizationRunRawUrl,
  normalizeOptimizationRunQueryString,
  trimOptimizationSummaryNote,
} from "@/lib/optimization-history";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OptimizationRunRow } from "@/lib/supabase/types";

type OptimizationRunTableError = {
  code?: string;
  message?: string;
};

export class OptimizationRunsTableMissingError extends Error {
  constructor() {
    super("optimization_runs table is missing");
    this.name = "OptimizationRunsTableMissingError";
  }
}

function isOptimizationRunsTableMissing(error: OptimizationRunTableError | null | undefined) {
  return (
    error?.code === "42P01" ||
    error?.code === "PGRST205" ||
    error?.message?.includes("optimization_runs") === true
  );
}

export async function getSavedOptimizationRuns(userId: string, limit = 6): Promise<OptimizationRunRow[]> {
  if (!hasPublicEnv()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("optimization_runs")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limit)
    .overrideTypes<OptimizationRunRow[]>();

  if (error) {
    if (isOptimizationRunsTableMissing(error)) {
      return [];
    }

    throw new Error(`저장한 진단을 불러오지 못했습니다. ${error.message}`);
  }

  return data ?? [];
}

export async function saveOptimizationRun(params: {
  channelKind: string;
  channelLabel: string;
  focusTitle?: string | null;
  queryString: string;
  rawUrl?: string | null;
  recommendedCategory?: string | null;
  summaryNote?: string | null;
  userId: string;
}): Promise<OptimizationRunRow> {
  const normalizedQueryString = normalizeOptimizationRunQueryString(params.queryString);
  const rawUrl = getOptimizationRunRawUrl(normalizedQueryString) || params.rawUrl?.trim() || "";

  if (!normalizedQueryString || !rawUrl) {
    throw new Error("저장할 현재 진단 상태를 찾지 못했습니다.");
  }

  const supabase = await createServerSupabaseClient();
  const payload = {
    channel_kind: params.channelKind.trim(),
    channel_label: params.channelLabel.trim(),
    focus_title: params.focusTitle?.trim() || null,
    query_string: normalizedQueryString,
    raw_url: rawUrl,
    recommended_category: params.recommendedCategory?.trim() || null,
    state_key: normalizedQueryString,
    summary_note: trimOptimizationSummaryNote(params.summaryNote),
    title: buildOptimizationRunTitle({
      channelLabel: params.channelLabel.trim(),
      focusTitle: params.focusTitle,
    }),
    user_id: params.userId,
  };

  const { data, error } = await supabase
    .from("optimization_runs")
    .upsert(payload, { onConflict: "user_id,state_key" })
    .select("*")
    .single()
    .overrideTypes<OptimizationRunRow>();

  if (error) {
    if (isOptimizationRunsTableMissing(error)) {
      throw new OptimizationRunsTableMissingError();
    }

    throw new Error(`현재 진단을 저장하지 못했습니다. ${error.message}`);
  }

  return data;
}
