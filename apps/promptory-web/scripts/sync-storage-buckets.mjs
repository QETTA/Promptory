import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const localPath = path.join(appDir, ".env.local");

const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const requiredBuckets = [
  { id: "product-thumbnails", isPublic: true },
  { id: "product-files", isPublic: false },
];

function parseEnvFile(content) {
  const entries = {};

  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
}

async function getEnv() {
  const file = await readFile(localPath, "utf8");
  const parsed = parseEnvFile(file);
  const env = Object.fromEntries(
    requiredVars.map((key) => [key, process.env[key] ?? parsed[key] ?? ""]),
  );

  const missing = requiredVars.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing Supabase env: ${missing.join(", ")}`);
  }

  return env;
}

async function main() {
  const env = await getEnv();
  const client = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const { data: buckets, error: listError } = await client.storage.listBuckets();

  if (listError) {
    throw new Error(`Storage bucket listing failed: ${listError.message}`);
  }

  const existing = new Set((buckets ?? []).map((bucket) => bucket.id));

  for (const bucket of requiredBuckets) {
    if (existing.has(bucket.id)) {
      console.log(`OK      bucket already exists: ${bucket.id}`);
      continue;
    }

    const { error } = await client.storage.createBucket(bucket.id, {
      public: bucket.isPublic,
    });

    if (error) {
      throw new Error(`Failed to create bucket ${bucket.id}: ${error.message}`);
    }

    console.log(`CREATED bucket: ${bucket.id}`);
  }

  console.log("Promptory storage buckets are ready.");
}

main().catch((error) => {
  console.error("[Promptory] Storage bucket sync failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
