import type { EvidencePlan } from "../contracts/mcp";
import type { SlackIntakePayload } from "../contracts/slack-events";
import type { SystemOfRecordWrite } from "../contracts/system-of-record";
import type { ApprovalRequest } from "../domain/approval";
import { normalizeRequest } from "../domain/request";
import type { ExecutionPlan, RequestWorkflowSnapshot } from "../domain/workflow";

function nowIso() {
  return new Date().toISOString();
}

function buildEvidencePlan(requestId: string, payload: SlackIntakePayload): EvidencePlan {
  return {
    requestId,
    summary: `Collect evidence for ${payload.requestType}`,
    targets: payload.evidenceTargets.map((target) => ({
      system: target,
      entity: target,
      reason: `Needed to support ${payload.desiredOutcome}`,
    })),
  };
}

function buildExecutionPlan(requestId: string, payload: SlackIntakePayload): ExecutionPlan {
  const writes: SystemOfRecordWrite[] = payload.requestedSystemWrites.map((write) => ({
    system: write.split(" ")[0] ?? "system",
    entity: write,
    action: "reflect-approved-change",
    summary: write,
  }));

  return {
    requestId,
    mode: "preview_then_commit",
    calls: payload.evidenceTargets.map((target, index) => ({
      toolName: `mcp_${index + 1}`,
      targetSystem: target,
      inputSummary: `${payload.requestType}: ${payload.summary}`,
    })),
    writes,
  };
}

function buildApproval(requestId: string, payload: SlackIntakePayload): ApprovalRequest {
  return {
    id: `apr_${requestId}`,
    requestId,
    title: `${payload.requestType} approval`,
    summary: payload.summary,
    approverGroup: "ops-approvers",
    state: "pending",
    requestedAt: nowIso(),
  };
}

export function startRequestWorkflow(payload: SlackIntakePayload): RequestWorkflowSnapshot {
  const request = normalizeRequest(payload);
  const evidencePlan = buildEvidencePlan(request.id, payload);
  const executionPlan = buildExecutionPlan(request.id, payload);
  const approval = buildApproval(request.id, payload);

  return {
    request,
    evidencePlan,
    executionPlan,
    approval,
    approvalState: "pending",
  };
}
