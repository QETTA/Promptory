import { redirect } from "next/navigation";

import { buildLoginHref } from "@/lib/auth-redirect";
import { hasPublicEnv } from "@/lib/env/public";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/supabase/types";

type UserLabelSource = {
  email?: string | null;
  id: string;
};

export async function getOptionalUser() {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser(next?: string) {
  const user = await getOptionalUser();

  if (!user) {
    redirect(buildLoginHref(next));
  }

  return user;
}

export async function ensureProfile(params: { displayName: string | null; userId: string }) {
  const supabase = createAdminSupabaseClient();

  const { error } = await supabase.from("profiles").upsert(
    {
      display_name: params.displayName,
      id: params.userId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`프로필을 저장하지 못했습니다. ${error.message}`);
  }
}

export async function getProfileByUserId(userId: string): Promise<ProfileRow | null> {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, seller_bio, created_at, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as ProfileRow | null;
}

export async function getUserDisplayLabel(user: UserLabelSource | null) {
  if (!user) {
    return "로그인 전";
  }

  const profile = await getProfileByUserId(user.id);
  return profile?.display_name?.trim() || user.email || "로그인 전";
}

export async function getCurrentProfile() {
  const user = await getOptionalUser();

  if (!user) {
    return null;
  }

  return getProfileByUserId(user.id);
}
