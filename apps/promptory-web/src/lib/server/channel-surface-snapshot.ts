import { createHash } from "node:crypto";

import type { ParsedChannelInputSuccess } from "@/lib/channel-intake";
import type { ChannelSurfaceRead } from "@/lib/server/channel-surface-read";
import { readChannelSurface } from "@/lib/server/channel-surface-read";
import { trackServerEvent } from "@/lib/server/telemetry";

const SURFACE_SNAPSHOT_TTL_MS = 10 * 60 * 1000;

type CachedSurfaceSnapshot = {
  snapshot: ChannelSurfaceSnapshot;
};

const surfaceSnapshotCache = new Map<string, CachedSurfaceSnapshot>();

export type ChannelSurfaceSnapshot = {
  cacheStatus: "fresh" | "miss" | "stale";
  cacheTtlMs: number;
  contentHash: string;
  normalizedUrl: string;
  read: ChannelSurfaceRead;
  snapshotTakenAt: string;
};

function buildContentHash(read: ChannelSurfaceRead) {
  return createHash("sha256").update(JSON.stringify(read)).digest("hex");
}

export async function getChannelSurfaceSnapshot(parsed: ParsedChannelInputSuccess): Promise<ChannelSurfaceSnapshot> {
  const cached = surfaceSnapshotCache.get(parsed.normalizedUrl);
  const now = Date.now();

  if (cached) {
    const ageMs = now - Date.parse(cached.snapshot.snapshotTakenAt);
    if (ageMs < SURFACE_SNAPSHOT_TTL_MS) {
      return {
        ...cached.snapshot,
        cacheStatus: "fresh",
      };
    }
  }

  await trackServerEvent("surface_read_started", {
    channelKind: parsed.kind,
    normalizedUrl: parsed.normalizedUrl,
  });

  const read = await readChannelSurface(parsed);
  const snapshot: ChannelSurfaceSnapshot = {
    cacheStatus: cached ? "stale" : "miss",
    cacheTtlMs: SURFACE_SNAPSHOT_TTL_MS,
    contentHash: buildContentHash(read),
    normalizedUrl: parsed.normalizedUrl,
    read,
    snapshotTakenAt: new Date().toISOString(),
  };

  surfaceSnapshotCache.set(parsed.normalizedUrl, { snapshot });

  await trackServerEvent(read.status === "unavailable" ? "surface_read_failed" : "surface_read_succeeded", {
    cacheStatus: snapshot.cacheStatus,
    channelKind: parsed.kind,
    normalizedUrl: parsed.normalizedUrl,
    surfaceStatus: read.status,
  });

  return snapshot;
}
