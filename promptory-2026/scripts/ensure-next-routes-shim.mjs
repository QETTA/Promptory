import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const nextTypesDir = path.join(repoRoot, ".next", "types");
const routesDeclarationPath = path.join(nextTypesDir, "routes.d.ts");
const routesRuntimeShimPath = path.join(nextTypesDir, "routes.js");
const validatorShimPath = path.join(nextTypesDir, "validator.ts");

fs.mkdirSync(nextTypesDir, { recursive: true });

if (!fs.existsSync(routesDeclarationPath)) {
  fs.writeFileSync(
    routesDeclarationPath,
    [
      'export type AppRoutes = never;',
      'export type LayoutRoutes = never;',
      'export type AppRouteHandlerRoutes = never;',
      'export type ParamMap = Record<string, never>;',
      '',
    ].join("\n"),
    "utf8",
  );
}

if (!fs.existsSync(routesRuntimeShimPath)) {
  fs.writeFileSync(routesRuntimeShimPath, "export {};\n", "utf8");
}

if (!fs.existsSync(validatorShimPath)) {
  fs.writeFileSync(validatorShimPath, "export {};\n", "utf8");
}
