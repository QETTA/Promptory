import { hasPublicEnv } from "@/lib/env/public";
import { getPaymentsMode, getServerEnvStatus } from "@/lib/env/server";

export function hasAuthRuntime() {
  return hasPublicEnv();
}

export function hasSellerWriteRuntime() {
  return hasPublicEnv() && getServerEnvStatus().hasSupabaseServiceRole;
}

export function hasPaymentsRuntime() {
  const serverStatus = getServerEnvStatus();
  if (!hasPublicEnv() || !serverStatus.hasSupabaseServiceRole) {
    return false;
  }

  if (serverStatus.paymentMode === "disabled") {
    return false;
  }

  if (serverStatus.paymentMode === "dev_stub") {
    return true;
  }

  return serverStatus.hasTossSecret;
}

export function isDevStubPaymentsMode() {
  return getPaymentsMode() === "dev_stub";
}

export function isTossPaymentsMode() {
  return getPaymentsMode() === "toss";
}

export function hasDownloadRuntime() {
  return hasPublicEnv() && getServerEnvStatus().hasSupabaseServiceRole;
}
