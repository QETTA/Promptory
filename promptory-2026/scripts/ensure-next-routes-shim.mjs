import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const nextTypesDir = path.join(repoRoot, ".next", "types");
const routesDeclarationPath = path.join(nextTypesDir, "routes.d.ts");
const routesRuntimeShimPath = path.join(nextTypesDir, "routes.js");

if (fs.existsSync(routesDeclarationPath) && !fs.existsSync(routesRuntimeShimPath)) {
  fs.mkdirSync(nextTypesDir, { recursive: true });
  fs.writeFileSync(routesRuntimeShimPath, "export {};\n", "utf8");
}
