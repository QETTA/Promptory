import { NextResponse } from "next/server";
import { z } from "zod";

import { trackServerEvent } from "@/lib/server/telemetry";
import { promptoryEventNames } from "@/lib/telemetry/contracts";

const eventSchema = z.object({
  name: z.enum(promptoryEventNames),
  payload: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await trackServerEvent(parsed.data.name, parsed.data.payload ?? {});
  return NextResponse.json({ ok: true });
}
