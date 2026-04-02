import type { EvidencePlan, McpToolCall, McpToolResult } from "../contracts/mcp";
import type {
  SystemOfRecordReflectionResult,
  SystemOfRecordWrite,
} from "../contracts/system-of-record";
import type { ApprovalDecision, ApprovalRequest, ApprovalState } from "./approval";
import type { NormalizedRequest } from "./request";

export type ExecutionPlan = {
  requestId: string;
  mode: "preview_then_commit";
  calls: McpToolCall[];
  writes: SystemOfRecordWrite[];
};

export type RequestWorkflowSnapshot = {
  request: NormalizedRequest;
  evidencePlan: EvidencePlan;
  executionPlan: ExecutionPlan;
  approval: ApprovalRequest;
  approvalState: ApprovalState;
};

export type ResolutionReceipt = {
  requestId: string;
  status: "completed" | "rejected";
  requestSummary: string;
  approvalDecision: ApprovalDecision;
  evidencePlan: EvidencePlan;
  executionPlan: ExecutionPlan;
  mcpResults: McpToolResult[];
  reflectionResults: SystemOfRecordReflectionResult[];
  auditSummary: string;
};
