import type { SlackIntakePayload } from "../contracts/slack-events";

export type RequestStatus = "pending_approval" | "approved" | "rejected" | "completed";

export type NormalizedRequest = {
  id: string;
  sourceEventId: string;
  type: string;
  summary: string;
  desiredOutcome: string;
  evidenceTargets: string[];
  requestedSystemWrites: string[];
  requesterId: string;
  requesterName: string;
  teamId: string;
  channelId: string;
  channelName: string;
  surface: SlackIntakePayload["surface"];
  status: RequestStatus;
};

export function normalizeRequest(payload: SlackIntakePayload): NormalizedRequest {
  const requestId = `req_${payload.eventId}`;

  return {
    id: requestId,
    sourceEventId: payload.eventId,
    type: payload.requestType,
    summary: payload.summary,
    desiredOutcome: payload.desiredOutcome,
    evidenceTargets: payload.evidenceTargets,
    requestedSystemWrites: payload.requestedSystemWrites,
    requesterId: payload.actor.userId,
    requesterName: payload.actor.displayName,
    teamId: payload.actor.teamId,
    channelId: payload.channel.channelId,
    channelName: payload.channel.channelName,
    surface: payload.surface,
    status: "pending_approval",
  };
}
