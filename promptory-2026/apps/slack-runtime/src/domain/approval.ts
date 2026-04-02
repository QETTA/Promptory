export type ApprovalState = "pending" | "approved" | "rejected";

export type ApprovalRequest = {
  id: string;
  requestId: string;
  title: string;
  summary: string;
  approverGroup: string;
  state: ApprovalState;
  requestedAt: string;
};

export type ApprovalDecision = {
  requestId: string;
  approverId: string;
  approverName: string;
  decision: "approved" | "rejected";
  note?: string;
  decidedAt: string;
};
