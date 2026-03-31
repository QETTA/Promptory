import { z } from "zod";

const paymentsModeSchema = z.enum(["disabled", "dev_stub", "toss"]);

const supabaseServerEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

const tossServerEnvSchema = z.object({
  TOSS_SECRET_KEY: z.string().min(1),
});

export type PaymentsMode = z.infer<typeof paymentsModeSchema>;

export function getPaymentsMode() {
  return paymentsModeSchema.parse(process.env.PAYMENTS_MODE ?? "dev_stub");
}

export function getServerEnvStatus() {
  const paymentMode = getPaymentsMode();

  return {
    hasSupabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasTossSecret: Boolean(process.env.TOSS_SECRET_KEY),
    paymentMode,
  };
}

export function getSupabaseServerEnv() {
  return supabaseServerEnvSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export function getTossServerEnv() {
  return tossServerEnvSchema.parse({
    TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  });
}
