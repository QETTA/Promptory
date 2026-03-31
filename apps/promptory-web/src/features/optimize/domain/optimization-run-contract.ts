import {
  buildOptimizationRunTitle,
  getOptimizationRunRawUrl,
  normalizeOptimizationRunQueryString,
  trimOptimizationSummaryNote,
} from "@/lib/optimization-history";
import { parseOptimizationBrief } from "@/lib/optimization-brief";
import type { OptimizationRunRow } from "@/lib/supabase/types";

type OptimizationRunBriefSnapshot = ReturnType<typeof parseOptimizationBrief>;

export type ReplaySafeOptimizationRun = {
  brief: OptimizationRunBriefSnapshot;
  channel: {
    kind: string;
    label: string;
  };
  createdAt: string;
  derived: {
    focusTitle: string | null;
    recommendedCategory: string | null;
    summaryNote: string | null;
    title: string;
  };
  engine: {
    evidenceSignals: string[];
    mode: string | null;
    rationaleSummary: string | null;
    surfaceReadStatus: string | null;
    version: string | null;
  };
  id: string;
  source: {
    normalizedUrl: string;
    rawUrl: string;
  };
  state: {
    queryString: string;
    stateKey: string;
  };
  updatedAt: string;
};

export type SaveOptimizationRunInput = {
  channelKind: string;
  channelLabel: string;
  engineMode?: string | null;
  engineVersion?: string | null;
  evidenceSignals?: string[] | null;
  focusTitle?: string | null;
  normalizedUrl?: string | null;
  queryString: string;
  rationaleSummary?: string | null;
  rawUrl?: string | null;
  recommendedCategory?: string | null;
  surfaceReadStatus?: string | null;
  summaryNote?: string | null;
  userId: string;
};

type OptimizationRunPersistencePayload = {
  channel_kind: string;
  channel_label: string;
  engine_mode: string | null;
  engine_version: string | null;
  evidence_signals: string[];
  focus_title: string | null;
  normalized_url: string;
  query_string: string;
  rationale_summary: string | null;
  raw_url: string;
  recommended_category: string | null;
  state_key: string;
  summary_note: string | null;
  surface_read_status: string | null;
  title: string;
  user_id: string;
};

function getSearchValue(search: URLSearchParams, key: string) {
  return search.get(key)?.trim() ?? "";
}

function parseBriefFromQueryString(queryString: string) {
  const normalizedQueryString = normalizeOptimizationRunQueryString(queryString);
  const search = new URLSearchParams(normalizedQueryString.replace(/^\?/, ""));

  return parseOptimizationBrief({
    audience: getSearchValue(search, "audience"),
    constraint: getSearchValue(search, "constraint"),
    conversion: getSearchValue(search, "conversion"),
    goal: getSearchValue(search, "goal"),
    pain: getSearchValue(search, "pain"),
    tone: getSearchValue(search, "tone"),
  });
}

export function buildReplaySafeOptimizationRun(input: SaveOptimizationRunInput) {
  const queryString = normalizeOptimizationRunQueryString(input.queryString);
  const rawUrl = getOptimizationRunRawUrl(queryString) || input.rawUrl?.trim() || "";

  if (!queryString || !rawUrl) {
    throw new Error("저장할 현재 진단 상태를 찾지 못했습니다.");
  }

  return {
    brief: parseBriefFromQueryString(queryString),
    channel: {
      kind: input.channelKind.trim(),
      label: input.channelLabel.trim(),
    },
    createdAt: "",
    derived: {
      focusTitle: input.focusTitle?.trim() || null,
      recommendedCategory: input.recommendedCategory?.trim() || null,
      summaryNote: trimOptimizationSummaryNote(input.summaryNote),
      title: buildOptimizationRunTitle({
        channelLabel: input.channelLabel.trim(),
        focusTitle: input.focusTitle,
      }),
    },
    engine: {
      evidenceSignals: input.evidenceSignals?.filter(Boolean) ?? [],
      mode: input.engineMode?.trim() || null,
      rationaleSummary: trimOptimizationSummaryNote(input.rationaleSummary),
      surfaceReadStatus: input.surfaceReadStatus?.trim() || null,
      version: input.engineVersion?.trim() || null,
    },
    id: "",
    source: {
      normalizedUrl: input.normalizedUrl?.trim() || rawUrl,
      rawUrl,
    },
    state: {
      queryString,
      stateKey: queryString,
    },
    updatedAt: "",
  } satisfies ReplaySafeOptimizationRun;
}

export function toOptimizationRunPersistencePayload(
  input: SaveOptimizationRunInput,
): OptimizationRunPersistencePayload {
  const run = buildReplaySafeOptimizationRun(input);

  return {
    channel_kind: run.channel.kind,
    channel_label: run.channel.label,
    engine_mode: run.engine.mode,
    engine_version: run.engine.version,
    evidence_signals: run.engine.evidenceSignals,
    focus_title: run.derived.focusTitle,
    normalized_url: run.source.normalizedUrl,
    query_string: run.state.queryString,
    rationale_summary: run.engine.rationaleSummary,
    raw_url: run.source.rawUrl,
    recommended_category: run.derived.recommendedCategory,
    state_key: run.state.stateKey,
    summary_note: run.derived.summaryNote,
    surface_read_status: run.engine.surfaceReadStatus,
    title: run.derived.title,
    user_id: input.userId,
  };
}

export function mapOptimizationRunRowToReplaySafeRun(row: OptimizationRunRow): ReplaySafeOptimizationRun {
  return {
    brief: parseBriefFromQueryString(row.query_string),
    channel: {
      kind: row.channel_kind,
      label: row.channel_label,
    },
    createdAt: row.created_at,
    derived: {
      focusTitle: row.focus_title,
      recommendedCategory: row.recommended_category,
      summaryNote: row.summary_note,
      title: row.title,
    },
    engine: {
      evidenceSignals: row.evidence_signals ?? [],
      mode: row.engine_mode,
      rationaleSummary: row.rationale_summary,
      surfaceReadStatus: row.surface_read_status,
      version: row.engine_version,
    },
    id: row.id,
    source: {
      normalizedUrl: row.normalized_url,
      rawUrl: row.raw_url,
    },
    state: {
      queryString: row.query_string,
      stateKey: row.state_key,
    },
    updatedAt: row.updated_at,
  };
}
