import { z } from "zod";

export const saveOptimizationRunSchema = z.object({
  channelKind: z.string().trim().min(1, "채널 종류를 확인해 주세요.").max(80),
  channelLabel: z.string().trim().min(1, "채널 라벨을 확인해 주세요.").max(120),
  focusTitle: z.string().trim().max(160).optional().or(z.literal("")),
  queryString: z.string().trim().min(1, "현재 진단 상태를 찾지 못했습니다.").max(4000),
  rawUrl: z.string().trim().min(1, "원본 URL을 확인해 주세요.").max(1600),
  recommendedCategory: z.string().trim().max(120).optional().or(z.literal("")),
  summaryNote: z.string().trim().max(280).optional().or(z.literal("")),
});
