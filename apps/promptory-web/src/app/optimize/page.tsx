import { OptimizeWorkspaceScreen } from "@/features/optimize/components/optimize-workspace-screen";
import { loadOptimizeWorkspace } from "@/features/optimize/loaders/load-optimize-workspace";
import { presentOptimizeWorkspace } from "@/features/optimize/presenters/present-optimize-workspace";

import type { OptimizePageSearchParams } from "@/features/optimize/types/optimize-page-data";

export default async function OptimizePage({
  searchParams,
}: {
  searchParams?: Promise<OptimizePageSearchParams>;
}) {
  const data = await loadOptimizeWorkspace((await searchParams) ?? {});
  const view = presentOptimizeWorkspace(data);

  return <OptimizeWorkspaceScreen view={view} />;
}
