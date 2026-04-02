export type ConsoleTone = "neutral" | "brand" | "success" | "warning" | "danger";

export interface ConsoleStat {
  key: string;
  label: string;
  value: string;
  hint: string;
  tone: ConsoleTone;
}

export interface ConsoleRequestTimelineStep {
  step: string;
  detail: string;
  state: "done" | "current" | "upcoming";
}

export interface ConsoleRequestRecord {
  id: string;
  title: string;
  requester: string;
  pack: string;
  department: string;
  status: string;
  statusTone: ConsoleTone;
  submittedAt: string;
  dueAt: string;
  approver: string;
  destination: string;
  summary: string;
  sourceLinks: number;
  risk: "low" | "medium" | "high";
  policyNotes: string[];
  evidence: string[];
  systemWrites: string[];
  timeline: ConsoleRequestTimelineStep[];
}

export interface ConsoleApprovalRecord {
  id: string;
  requestId: string;
  title: string;
  requester: string;
  approver: string;
  pack: string;
  risk: "low" | "medium" | "high";
  submittedAt: string;
  dueAt: string;
  recommendation: string;
  detail: string;
  impact: string;
}

export interface ConsoleRunRecord {
  id: string;
  workflow: string;
  requestId: string;
  status: string;
  statusTone: ConsoleTone;
  duration: string;
  startedAt: string;
  retryPolicy: string;
  owner: string;
  note: string;
}

export interface ConsoleConnectorRecord {
  id: string;
  name: string;
  status: string;
  statusTone: ConsoleTone;
  scope: string;
  mode: string;
  lastSync: string;
  note: string;
}

export interface ConsolePolicyRecord {
  id: string;
  role: string;
  defaultScope: string;
  readActions: string[];
  writeActions: string[];
  adminActions: string[];
  guardrails: string[];
}

export interface ConsoleAuditRecord {
  id: string;
  actor: string;
  event: string;
  target: string;
  at: string;
  outcome: string;
  outcomeTone: ConsoleTone;
  detail: string;
}

export interface ConsoleReportRecord {
  id: string;
  title: string;
  audience: string;
  cadence: string;
  summary: string;
  highlights: string[];
}
