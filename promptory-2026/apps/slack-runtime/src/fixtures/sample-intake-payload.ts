import type { SlackIntakePayload } from "../contracts/slack-events";

export const sampleIntakePayload: SlackIntakePayload = {
  eventId: "evt_001",
  surface: "message",
  actor: {
    userId: "U_REQ_01",
    displayName: "Minji Kim",
    teamId: "T_PROMPTORY",
  },
  channel: {
    channelId: "C_DEAL_DESK",
    channelName: "deal-desk",
    threadTs: "1712345678.000100",
  },
  requestType: "discount-approval",
  summary: "Enterprise deal discount exception and CRM note update",
  evidenceTargets: ["Salesforce opportunity", "pricing policy", "recent approval history"],
  desiredOutcome: "Approve the exception or return a policy-safe fallback package",
  requestedSystemWrites: ["Update CRM opportunity", "Post approval note to Slack thread"],
};
