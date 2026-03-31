import type { PromptoryEventName, PromptoryEventPayload } from "@/lib/telemetry/contracts";

function sanitizeTelemetryValue(value: unknown): boolean | number | string | null | undefined {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value === undefined) {
    return undefined;
  }

  return String(value);
}

function sanitizeTelemetryPayload(payload: Record<string, unknown> | undefined): PromptoryEventPayload {
  if (!payload) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(payload)
      .map(([key, value]) => [key, sanitizeTelemetryValue(value)] as const)
      .filter(([, value]) => value !== undefined),
  );
}

export function trackClientTelemetryEvent(params: {
  name: PromptoryEventName;
  payload?: Record<string, unknown>;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    name: params.name,
    occurredAt: new Date().toISOString(),
    payload: sanitizeTelemetryPayload(params.payload),
    source: "client",
  });

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/events", blob);
      return;
    }

    void fetch("/api/events", {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      method: "POST",
    });
  } catch {
    // Telemetry must never block the primary flow.
  }
}
