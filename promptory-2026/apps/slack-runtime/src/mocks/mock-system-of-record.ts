import type { SystemOfRecordAdapter } from "../contracts/system-of-record";

export const mockSystemOfRecord: SystemOfRecordAdapter = {
  async reflectWrites(input) {
    return input.writes.map((write, index) => ({
      system: write.system,
      entity: write.entity,
      status: "applied" as const,
      recordId: `${write.system.toLowerCase()}-${index + 1}`,
      summary: `${write.action}: ${write.summary}`,
    }));
  },
};
