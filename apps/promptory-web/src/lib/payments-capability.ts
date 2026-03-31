import type { getPublicEnvStatus } from "@/lib/env/public";
import type { getServerEnvStatus } from "@/lib/env/server";

type PublicEnvStatus = ReturnType<typeof getPublicEnvStatus>;
type ServerEnvStatus = ReturnType<typeof getServerEnvStatus>;

export type PromptoryCheckoutBlockReason =
  | "missing_public_env"
  | "missing_service_role"
  | "payments_disabled"
  | "missing_toss_secret"
  | "missing_toss_client_key"
  | null;

export function getPromptoryCheckoutCapability(params: {
  publicStatus: PublicEnvStatus;
  serverStatus: ServerEnvStatus;
}) {
  const { publicStatus, serverStatus } = params;

  let blockReason: PromptoryCheckoutBlockReason = null;

  if (!publicStatus.hasPublicEnv) {
    blockReason = "missing_public_env";
  } else if (!serverStatus.hasSupabaseServiceRole) {
    blockReason = "missing_service_role";
  } else if (serverStatus.paymentMode === "disabled") {
    blockReason = "payments_disabled";
  } else if (serverStatus.paymentMode === "toss" && !serverStatus.hasTossSecret) {
    blockReason = "missing_toss_secret";
  } else if (serverStatus.paymentMode === "toss" && !publicStatus.hasTossClientKey) {
    blockReason = "missing_toss_client_key";
  }

  const canCheckout = blockReason === null;

  return {
    blockReason,
    canCheckout,
    canUseDevStub: canCheckout && serverStatus.paymentMode === "dev_stub",
    canUseToss: canCheckout && serverStatus.paymentMode === "toss",
    paymentMode: serverStatus.paymentMode,
  } as const;
}
