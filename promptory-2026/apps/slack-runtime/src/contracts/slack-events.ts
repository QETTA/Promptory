export type SlackSurface = "message" | "shortcut" | "modal" | "app-home";

export type SlackActor = {
  userId: string;
  displayName: string;
  teamId: string;
};

export type SlackChannelRef = {
  channelId: string;
  channelName: string;
  threadTs?: string;
};

export type SlackIntakePayload = {
  eventId: string;
  surface: SlackSurface;
  actor: SlackActor;
  channel: SlackChannelRef;
  requestType: string;
  summary: string;
  evidenceTargets: string[];
  desiredOutcome: string;
  requestedSystemWrites: string[];
};

export type SlackApprovalPayload = {
  actionId: string;
  approver: SlackActor;
  requestId: string;
  decision: "approved" | "rejected";
  note?: string;
};

export type SlackHomeCard = {
  title: string;
  value: string;
  tone: "neutral" | "good" | "warn";
};

export type SlackAppHomeSnapshot = {
  actor: SlackActor;
  cards: SlackHomeCard[];
  pendingApprovals: number;
  openRequests: number;
};
