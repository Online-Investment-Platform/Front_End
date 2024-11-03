import { FieldValues } from "react-hook-form";

// 모든 폼에서 사용할 기본 타입
export interface AuthFormData extends FieldValues {
  memberEmail: string;
  memberPassword: string;
  confirmPassword?: string;
  memberName?: string;
  memberNickName?: string;
  annualIncome?: number;
}
