import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const tossPublicEnvSchema = z.object({
  NEXT_PUBLIC_TOSS_CLIENT_KEY: z.string().min(1),
});

export function hasPublicEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_APP_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getPublicEnvStatus() {
  return {
    hasPublicEnv: hasPublicEnv(),
    hasPublicUrl: Boolean(process.env.NEXT_PUBLIC_APP_URL),
    hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasTossClientKey: Boolean(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY),
  };
}

export function getPublicEnv() {
  return publicEnvSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getTossPublicEnv() {
  return tossPublicEnvSchema.parse({
    NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
  });
}
