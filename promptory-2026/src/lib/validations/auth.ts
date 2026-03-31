import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(2, "이름 또는 활동명을 입력해 주세요.").max(40),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
