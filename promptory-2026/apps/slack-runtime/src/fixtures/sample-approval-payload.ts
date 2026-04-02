import type { SlackApprovalPayload } from "../contracts/slack-events";

export const sampleApprovalPayload: SlackApprovalPayload = {
  actionId: "approve_discount_exception",
  approver: {
    userId: "U_APR_09",
    displayName: "Jisoo Park",
    teamId: "T_PROMPTORY",
  },
  requestId: "req_evt_001",
  decision: "approved",
  note: "Approved for pilot account with fallback guardrails.",
};
