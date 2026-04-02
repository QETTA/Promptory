export type PaymentsMode = "disabled" | "dev_stub" | "toss";

type SupabaseServerEnv = {
  SUPABASE_SERVICE_ROLE_KEY: string;
};

type TossServerEnv = {
  TOSS_SECRET_KEY: string;
};

const allowedPaymentsModes: PaymentsMode[] = ["disabled", "dev_stub", "toss"];

function requireNonEmpty(name: string, value: string | undefined) {
  if (!value || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

export function getPaymentsMode(): PaymentsMode {
  const paymentMode = process.env.PAYMENTS_MODE ?? "dev_stub";

  if (allowedPaymentsModes.includes(paymentMode as PaymentsMode)) {
    return paymentMode as PaymentsMode;
  }

  throw new Error(`PAYMENTS_MODE must be one of ${allowedPaymentsModes.join(", ")}.`);
}

export function getServerEnvStatus() {
  const paymentMode = getPaymentsMode();

  return {
    hasSupabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasTossSecret: Boolean(process.env.TOSS_SECRET_KEY),
    paymentMode,
  };
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  return {
    SUPABASE_SERVICE_ROLE_KEY: requireNonEmpty(
      "SUPABASE_SERVICE_ROLE_KEY",
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    ),
  };
}

export function getTossServerEnv(): TossServerEnv {
  return {
    TOSS_SECRET_KEY: requireNonEmpty("TOSS_SECRET_KEY", process.env.TOSS_SECRET_KEY),
  };
}
