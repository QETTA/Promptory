import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const appRoot = path.join(repoRoot, "src", "app");

const movedLegacyPaths = [
  "src/app/buy/[productId]/route.ts",
  "src/app/checkout/[orderId]/page.tsx",
  "src/app/contact/actions.ts",
  "src/app/contact/error.tsx",
  "src/app/contact/loading.tsx",
  "src/app/contact/page.tsx",
  "src/app/contact/success/page.tsx",
  "src/app/demo/slack/page.tsx",
  "src/app/library/error.tsx",
  "src/app/library/loading.tsx",
  "src/app/library/page.tsx",
  "src/app/login/page.tsx",
  "src/app/optimize/loading.tsx",
  "src/app/optimize/page.tsx",
  "src/app/orders/page.tsx",
  "src/app/packages/[slug]/page.tsx",
  "src/app/packages/campaign-brief-agent/page.tsx",
  "src/app/packages/error.tsx",
  "src/app/packages/korea-local-ops-agent/page.tsx",
  "src/app/packages/loading.tsx",
  "src/app/packages/page.tsx",
  "src/app/packages/website-diagnosis-agent/page.tsx",
  "src/app/page.tsx",
  "src/app/payments/fail/page.tsx",
  "src/app/payments/success/page.tsx",
  "src/app/pricing/error.tsx",
  "src/app/pricing/loading.tsx",
  "src/app/pricing/page.tsx",
  "src/app/products/[slug]/page.tsx",
  "src/app/products/page.tsx",
  "src/app/proposal/loading.tsx",
  "src/app/proposal/page.tsx",
  "src/app/seller/products/[productId]/edit/page.tsx",
  "src/app/seller/products/new/page.tsx",
  "src/app/seller/products/page.tsx",
  "src/app/setup/page.tsx",
  "src/app/signup/page.tsx",
];

const groupedStaticPackagePages = [
  "src/app/(marketing)/packages/website-diagnosis-agent/page.tsx",
  "src/app/(marketing)/packages/campaign-brief-agent/page.tsx",
  "src/app/(marketing)/packages/korea-local-ops-agent/page.tsx",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function toRouteKey(absPath) {
  const rel = path.relative(appRoot, absPath);
  const parts = rel.split(path.sep);
  const fileName = parts.at(-1);
  if (fileName !== "page.tsx" && fileName !== "route.ts") {
    return null;
  }

  const routeParts = [];
  for (const part of parts.slice(0, -1)) {
    if (part.startsWith("(") && part.endsWith(")")) {
      continue;
    }
    routeParts.push(part);
  }

  const url = `/${routeParts.join("/")}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  return `${fileName}:${url}`;
}

const files = walk(appRoot);
const routeMap = new Map();
for (const file of files) {
  const key = toRouteKey(file);
  if (!key) continue;
  const rel = path.relative(repoRoot, file);
  const list = routeMap.get(key) ?? [];
  list.push(rel);
  routeMap.set(key, list);
}

const duplicateRoutes = [...routeMap.entries()].filter(([, paths]) => paths.length > 1);
const staleMovedPaths = movedLegacyPaths.filter((rel) => fs.existsSync(path.join(repoRoot, rel)));
const staleStaticPackagePages = groupedStaticPackagePages.filter((rel) =>
  fs.existsSync(path.join(repoRoot, rel)),
);

let hasFailure = false;

if (duplicateRoutes.length > 0) {
  hasFailure = true;
  console.error("\n[FAIL] Duplicate public routes detected:\n");
  for (const [key, paths] of duplicateRoutes) {
    console.error(`- ${key}`);
    for (const rel of paths) {
      console.error(`  - ${rel}`);
    }
  }
}

if (staleMovedPaths.length > 0) {
  hasFailure = true;
  console.error("\n[FAIL] Stale pre-route-group files still exist:\n");
  for (const rel of staleMovedPaths) {
    console.error(`- ${rel}`);
  }
}

if (staleStaticPackagePages.length > 0) {
  hasFailure = true;
  console.error("\n[FAIL] Static grouped package detail pages still exist. Keep /packages/[slug] as canonical:\n");
  for (const rel of staleStaticPackagePages) {
    console.error(`- ${rel}`);
  }
}

const mustExist = [
  "src/app/(marketing)/layout.tsx",
  "src/app/(marketing)/packages/[slug]/page.tsx",
  "src/app/(console)/console/page.tsx",
  "src/lib/request-to-resolution-content.ts",
  "apps/slack-runtime/src/handlers/intake-command.ts",
  "apps/slack-runtime/src/handlers/approval-action.ts",
  "apps/slack-runtime/src/handlers/app-home.ts",
  "apps/slack-runtime/src/orchestrator/start-request-workflow.ts",
];

const missingRequired = mustExist.filter((rel) => !fs.existsSync(path.join(repoRoot, rel)));
if (missingRequired.length > 0) {
  hasFailure = true;
  console.error("\n[FAIL] Required consolidated files are missing:\n");
  for (const rel of missingRequired) {
    console.error(`- ${rel}`);
  }
}

if (hasFailure) {
  console.error("\nT08 verification failed. Clean up stale files and re-run.\n");
  process.exit(1);
}

console.log("\n[OK] T08 verification passed.");
console.log("- No duplicate public routes remain.");
console.log("- No stale pre-route-group files remain.");
console.log("- Marketing package detail routing is consolidated.");
console.log("- Console shell and Slack runtime scaffold are present.\n");
