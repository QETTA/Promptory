import { hasPublicEnv } from "@/lib/env/public";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OptimizationRunRow } from "@/lib/supabase/types";

import {
  mapOptimizationRunRowToReplaySafeRun,
  toOptimizationRunPersistencePayload,
  type ReplaySafeOptimizationRun,
  type SaveOptimizationRunInput,
} from "@/features/optimize/domain/optimization-run-contract";

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

export async function getSavedOptimizationRuns(userId: string, limit = 6): Promise<ReplaySafeOptimizationRun[]> {
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

  return (data ?? []).map(mapOptimizationRunRowToReplaySafeRun);
}

export async function saveOptimizationRun(input: SaveOptimizationRunInput): Promise<ReplaySafeOptimizationRun> {
  const payload = toOptimizationRunPersistencePayload(input);
  const supabase = await createServerSupabaseClient();
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

  return mapOptimizationRunRowToReplaySafeRun(data);
}
