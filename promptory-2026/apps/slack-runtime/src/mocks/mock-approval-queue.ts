import type { ApprovalDecision, ApprovalRequest } from "../domain/approval";
import type { RequestWorkflowSnapshot } from "../domain/workflow";

type QueueRecord = {
  snapshot: RequestWorkflowSnapshot;
  decision?: ApprovalDecision;
};

export class MockApprovalQueue {
  private readonly records = new Map<string, QueueRecord>();

  enqueue(snapshot: RequestWorkflowSnapshot) {
    this.records.set(snapshot.request.id, { snapshot });
    return snapshot.approval;
  }

  getSnapshot(requestId: string) {
    return this.records.get(requestId)?.snapshot;
  }

  listPending(): ApprovalRequest[] {
    return [...this.records.values()]
      .map((record) => record.snapshot.approval)
      .filter((approval) => approval.state === "pending");
  }

  recordDecision(requestId: string, decision: ApprovalDecision) {
    const record = this.records.get(requestId);
    if (!record) {
      throw new Error(`Unknown request: ${requestId}`);
    }

    record.snapshot.approvalState = decision.decision;
    record.snapshot.approval = {
      ...record.snapshot.approval,
      state: decision.decision,
    };
    record.decision = decision;

    return record.snapshot;
  }

  getDecision(requestId: string) {
    return this.records.get(requestId)?.decision;
  }

  summarizeForHome() {
    const all = [...this.records.values()];
    return {
      openRequests: all.length,
      pendingApprovals: all.filter((record) => record.snapshot.approval.state === "pending").length,
      completedRequests: all.filter((record) => record.decision?.decision === "approved").length,
    };
  }
}

export const mockApprovalQueue = new MockApprovalQueue();
