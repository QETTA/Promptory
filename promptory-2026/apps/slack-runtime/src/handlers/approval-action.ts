import type { SlackApprovalPayload } from "../contracts/slack-events";
import { mockMcpClient } from "../mocks/mock-mcp-client";
import { mockApprovalQueue } from "../mocks/mock-approval-queue";
import { mockSystemOfRecord } from "../mocks/mock-system-of-record";
import type { ResolutionReceipt } from "../domain/workflow";

function nowIso() {
  return new Date().toISOString();
}

export async function handleApprovalAction(payload: SlackApprovalPayload): Promise<ResolutionReceipt> {
  const snapshot = mockApprovalQueue.getSnapshot(payload.requestId);
  if (!snapshot) {
    throw new Error(`No workflow found for request ${payload.requestId}`);
  }

  const decision = {
    requestId: payload.requestId,
    approverId: payload.approver.userId,
    approverName: payload.approver.displayName,
    decision: payload.decision,
    note: payload.note,
    decidedAt: nowIso(),
  } as const;

  const updatedSnapshot = mockApprovalQueue.recordDecision(payload.requestId, decision);

  if (payload.decision === "rejected") {
    return {
      requestId: updatedSnapshot.request.id,
      status: "rejected",
      requestSummary: updatedSnapshot.request.summary,
      approvalDecision: decision,
      evidencePlan: updatedSnapshot.evidencePlan,
      executionPlan: updatedSnapshot.executionPlan,
      mcpResults: [],
      reflectionResults: [],
      auditSummary: "Rejected by approver before execution.",
    };
  }

  const mcpResults = await mockMcpClient.executePlan({
    requestId: updatedSnapshot.request.id,
    mode: "commit",
    calls: updatedSnapshot.executionPlan.calls,
  });

  const reflectionResults = await mockSystemOfRecord.reflectWrites({
    requestId: updatedSnapshot.request.id,
    writes: updatedSnapshot.executionPlan.writes,
  });

  return {
    requestId: updatedSnapshot.request.id,
    status: "completed",
    requestSummary: updatedSnapshot.request.summary,
    approvalDecision: decision,
    evidencePlan: updatedSnapshot.evidencePlan,
    executionPlan: updatedSnapshot.executionPlan,
    mcpResults,
    reflectionResults,
    auditSummary: "Approved, executed through mock MCP, and reflected to mock systems.",
  };
}
