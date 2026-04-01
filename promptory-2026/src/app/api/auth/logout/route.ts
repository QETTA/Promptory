import { NextResponse } from "next/server";

// Cloudflare Pages Static Export 설정
export const dynamic = "force-static";

import { hasAuthRuntime } from "@/lib/env/runtime";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  if (!hasAuthRuntime()) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}
