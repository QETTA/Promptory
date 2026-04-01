export const promptoryEventNames = [
  "channel_url_submitted",
  "surface_read_started",
  "surface_read_succeeded",
  "surface_read_failed",
  "ask_started",
  "ask_completed",
  "recommendation_generated",
  "execution_pack_clicked",
  "package_estimate_clicked",
  "quick_audit_clicked",
  "pricing_cta_clicked",
  "pricing_bottom_cta_clicked",
  "optimization_run_saved",
  "order_created",
  "payment_confirmed",
  "download_started",
  "optimize_upsell_clicked",
] as const;

export type PromptoryEventName = (typeof promptoryEventNames)[number];

export type PromptoryEventPayload = Record<string, boolean | number | string | null | undefined>;
