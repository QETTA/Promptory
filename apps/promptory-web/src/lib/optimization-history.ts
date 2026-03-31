const optimizationRunQueryKeys = [
  "url",
  "pain",
  "goal",
  "audience",
  "tone",
  "conversion",
  "constraint",
  "ask",
] as const;

type OptimizationRunQueryKey = (typeof optimizationRunQueryKeys)[number];

type OptimizationRunSearchParams = Partial<Record<OptimizationRunQueryKey, string | string[]>>;

function getFirstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function buildOptimizationRunSearch(entries: Array<[OptimizationRunQueryKey, string]>) {
  const search = new URLSearchParams();

  for (const [key, value] of entries) {
    if (!value) {
      continue;
    }

    search.set(key, value);
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

export function buildOptimizationRunQueryString(params: OptimizationRunSearchParams) {
  return buildOptimizationRunSearch(
    optimizationRunQueryKeys.map((key) => [key, getFirstValue(params[key])] satisfies [OptimizationRunQueryKey, string]),
  );
}

export function normalizeOptimizationRunQueryString(queryString: string) {
  const normalized = new URLSearchParams(queryString.trim().replace(/^\?/, ""));

  return buildOptimizationRunSearch(
    optimizationRunQueryKeys.map((key) => [key, normalized.get(key)?.trim() ?? ""] satisfies [OptimizationRunQueryKey, string]),
  );
}

export function getOptimizationRunRawUrl(queryString: string) {
  const normalized = normalizeOptimizationRunQueryString(queryString);
  if (!normalized) {
    return "";
  }

  return new URLSearchParams(normalized.slice(1)).get("url")?.trim() ?? "";
}

export function buildOptimizationRunTitle(params: {
  channelLabel: string;
  focusTitle?: string | null;
}) {
  const focusTitle = params.focusTitle?.trim();

  if (focusTitle) {
    return `${params.channelLabel} · ${focusTitle}`;
  }

  return `${params.channelLabel} 진단 결과`;
}

export function trimOptimizationSummaryNote(note?: string | null, maxLength = 180) {
  const trimmed = note?.trim() ?? "";

  if (!trimmed) {
    return null;
  }

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}
