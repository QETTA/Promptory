import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const localPath = path.join(appDir, ".env.local");

const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
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

async function ensureAnonRead(client) {
  const { data, error } = await client
    .from("products")
    .select("id")
    .eq("status", "published")
    .limit(1);

  if (error) {
    throw new Error(`Anon published products query failed: ${error.message}`);
  }

  return data?.length ?? 0;
}

async function ensureTableReadable(client, table) {
  const { data, error } = await client.from(table).select("*").limit(1);

  if (error) {
    throw new Error(`${table} table check failed: ${error.message}`);
  }

  return data?.length ?? 0;
}

async function ensureBuckets(client) {
  const { data, error } = await client.storage.listBuckets();

  if (error) {
    throw new Error(`Storage bucket listing failed: ${error.message}`);
  }

  const ids = new Set((data ?? []).map((bucket) => bucket.id));
  const requiredBuckets = ["product-thumbnails", "product-files"];
  const missing = requiredBuckets.filter((bucket) => !ids.has(bucket));

  if (missing.length > 0) {
    throw new Error(`Missing storage buckets: ${missing.join(", ")}`);
  }
}

async function main() {
  const env = await getEnv();

  const anonClient = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
  const adminClient = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  console.log("[Promptory] Supabase readiness");
  console.log(`App path: ${appDir}`);

  const publishedCount = await ensureAnonRead(anonClient);
  console.log(`OK      anon published products query (${publishedCount} rows)`);

  for (const table of ["profiles", "products", "orders", "downloads"]) {
    const count = await ensureTableReadable(adminClient, table);
    console.log(`OK      service role table access: ${table} (${count} rows)`);
  }

  await ensureBuckets(adminClient);
  console.log("OK      storage buckets: product-thumbnails, product-files");
  console.log("Promptory Supabase readiness passed.");
}

main().catch((error) => {
  console.error("[Promptory] Supabase readiness failed.");
  console.error(error instanceof Error ? error.message : String(error));
  console.error(
    `Apply the schema in Supabase SQL Editor first: ${path.join(appDir, "supabase", "schema.sql")}`,
  );
  process.exitCode = 1;
});
