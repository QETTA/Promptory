import type { SlackIntakePayload } from "../contracts/slack-events";
import { mockApprovalQueue } from "../mocks/mock-approval-queue";
import { startRequestWorkflow } from "../orchestrator/start-request-workflow";

export async function handleIntakeCommand(payload: SlackIntakePayload) {
  const snapshot = startRequestWorkflow(payload);
  const approval = mockApprovalQueue.enqueue(snapshot);

  return {
    request: snapshot.request,
    evidencePlan: snapshot.evidencePlan,
    executionPlan: snapshot.executionPlan,
    approval,
    message: "Request accepted in Slack and queued for approval.",
  };
}
