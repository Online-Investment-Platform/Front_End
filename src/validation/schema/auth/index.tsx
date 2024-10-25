import { z } from "zod";

export const loginSchema = z.object({
  memberEmail: z.string().email("올바른 이메일 주소를 입력해주세요."),
  memberPassword: z.string().min(3, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export const signupSchema = z.object({
  memberEmail: z.string().email("올바른 이메일 주소를 입력해주세요."),
  memberName: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  memberPassword: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.",
    ),
  confirmPassword: z.string(),
  memberNickName: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  annualIncome: z.number().int().positive("연간 소득은 양의 정수여야 합니다."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface LoginResponse {
  token: string;
}

export interface SignUpResponse {
  id: number;
  memberNickname: string;
}
