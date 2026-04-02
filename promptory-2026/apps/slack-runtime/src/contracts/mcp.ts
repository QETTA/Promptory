export type EvidenceTarget = {
  system: string;
  entity: string;
  reason: string;
};

export type EvidencePlan = {
  requestId: string;
  summary: string;
  targets: EvidenceTarget[];
};

export type McpToolCall = {
  toolName: string;
  targetSystem: string;
  inputSummary: string;
};

export type McpToolResult = {
  toolName: string;
  status: "succeeded" | "skipped" | "failed";
  evidence: string[];
  proposedWrite: string;
};

export type McpExecutionMode = "preview" | "commit";

export type McpClient = {
  executePlan(input: {
    requestId: string;
    mode: McpExecutionMode;
    calls: McpToolCall[];
  }): Promise<McpToolResult[]>;
};
