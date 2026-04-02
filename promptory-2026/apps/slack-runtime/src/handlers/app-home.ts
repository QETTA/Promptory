import type { SlackActor, SlackAppHomeSnapshot } from "../contracts/slack-events";
import { mockApprovalQueue } from "../mocks/mock-approval-queue";

export async function buildAppHomeSnapshot(actor: SlackActor): Promise<SlackAppHomeSnapshot> {
  const summary = mockApprovalQueue.summarizeForHome();

  return {
    actor,
    pendingApprovals: summary.pendingApprovals,
    openRequests: summary.openRequests,
    cards: [
      {
        title: "Open requests",
        value: String(summary.openRequests),
        tone: "neutral",
      },
      {
        title: "Pending approvals",
        value: String(summary.pendingApprovals),
        tone: summary.pendingApprovals > 0 ? "warn" : "good",
      },
      {
        title: "Completed today",
        value: String(summary.completedRequests),
        tone: "good",
      },
    ],
  };
}
