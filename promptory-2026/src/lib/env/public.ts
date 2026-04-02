type PublicEnv = {
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
};

type TossPublicEnv = {
  NEXT_PUBLIC_TOSS_CLIENT_KEY: string;
};

function requireNonEmpty(name: string, value: string | undefined) {
  if (!value || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function requireUrl(name: string, value: string | undefined) {
  const candidate = requireNonEmpty(name, value);

  try {
    new URL(candidate);
  } catch {
    throw new Error(`${name} must be a valid URL.`);
  }

  return candidate;
}

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

export function getPublicEnv(): PublicEnv {
  return {
    NEXT_PUBLIC_APP_URL: requireUrl("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL),
    NEXT_PUBLIC_SUPABASE_URL: requireUrl("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: requireNonEmpty(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  };
}

export function getTossPublicEnv(): TossPublicEnv {
  return {
    NEXT_PUBLIC_TOSS_CLIENT_KEY: requireNonEmpty(
      "NEXT_PUBLIC_TOSS_CLIENT_KEY",
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
    ),
  };
}
