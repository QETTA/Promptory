import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

import type { PromptoryEventName, PromptoryEventPayload } from "@/lib/telemetry/contracts";

function getTelemetryLogPath() {
  return path.resolve(process.cwd(), "..", "..", "runs", "promptory-web-telemetry.jsonl");
}

export async function trackServerEvent(name: PromptoryEventName, payload: PromptoryEventPayload = {}) {
  const logPath = getTelemetryLogPath();
  const line = JSON.stringify({
    name,
    payload,
    recordedAt: new Date().toISOString(),
  });

  try {
    await mkdir(path.dirname(logPath), { recursive: true });
    await appendFile(logPath, `${line}\n`, "utf8");
  } catch {
    console.info("[promptory-telemetry]", line);
  }
}
