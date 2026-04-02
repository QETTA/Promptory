import { z } from "zod";

export const teamTypeValues = [
  "sales-ops",
  "people-ops",
  "it-ops",
  "finance-procurement",
  "other",
] as const;

export const workPainValues = [
  "deal-desk-approval",
  "access-request",
  "people-request",
  "procurement-request",
  "incident-handoff",
  "reporting-ops",
  "other",
] as const;

export const contactFormSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(2, "팀 이름을 입력해 주세요.")
    .max(100, "팀 이름은 100자 이내로 입력해 주세요."),
  contactName: z
    .string()
    .trim()
    .min(2, "담당자 이름을 입력해 주세요.")
    .max(50, "담당자 이름은 50자 이내로 입력해 주세요."),
  email: z
    .string()
    .trim()
    .email("업무용 이메일 형식으로 입력해 주세요."),
  teamType: z
    .enum(teamTypeValues)
    .refine((val) => val !== undefined, {
      message: "팀 유형을 선택해 주세요.",
    }),
  companyUrl: z
    .string()
    .trim()
    .url("URL 형식으로 입력해 주세요."),
  painPoints: z
    .array(z.enum(workPainValues))
    .min(1, "현재 가장 밀리는 작업을 하나 이상 선택해 주세요."),
  contextNote: z
    .string()
    .trim()
    .max(1200, "설명은 1200자 이내로 입력해 주세요.")
    .optional()
    .or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
