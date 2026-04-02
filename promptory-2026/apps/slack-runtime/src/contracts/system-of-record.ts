export type SystemOfRecordWrite = {
  system: string;
  entity: string;
  action: string;
  summary: string;
};

export type SystemOfRecordReflectionResult = {
  system: string;
  entity: string;
  status: "applied" | "skipped" | "failed";
  recordId: string;
  summary: string;
};

export type SystemOfRecordAdapter = {
  reflectWrites(input: {
    requestId: string;
    writes: SystemOfRecordWrite[];
  }): Promise<SystemOfRecordReflectionResult[]>;
};
