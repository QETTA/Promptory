import type { McpClient } from "../contracts/mcp";

export const mockMcpClient: McpClient = {
  async executePlan(input) {
    return input.calls.map((call, index) => ({
      toolName: call.toolName,
      status: "succeeded" as const,
      evidence: [
        `${call.targetSystem} context loaded`,
        `policy-safe preview generated for ${call.inputSummary}`,
      ],
      proposedWrite: `mock-write-${index + 1}: ${call.targetSystem} <- ${call.inputSummary}`,
    }));
  },
};
