import { memo } from "react";
import { Control, Controller, useWatch } from "react-hook-form";

import Input from "@/components/common/input";
import { AuthFormData } from "@/types/auth";

type FormInputProps = {
  control: Control<AuthFormData>;
  error?: string;
};

// 이메일 입력 컴포넌트
export const EmailInput = memo(({ control, error }: FormInputProps) => {
  useWatch({
    control,
    name: "memberEmail",
  });

  return (
    <Controller
      name="memberEmail"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id="memberEmail"
          className="h-66 w-full rounded-10 bg-[#F3F4F6]"
          placeholder="이메일"
          type="email"
          error={error}
        />
      )}
    />
  );
});

EmailInput.displayName = "EmailInput";

// 비밀번호 입력 컴포넌트
export const PasswordInput = memo(({ control, error }: FormInputProps) => {
  useWatch({
    control,
    name: "memberPassword",
  });

  return (
    <Controller
      name="memberPassword"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id="memberPassword"
          className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
          placeholder="비밀번호"
          type="password"
          error={error}
        />
      )}
    />
  );
});

PasswordInput.displayName = "PasswordInput";

// 이름 입력 컴포넌트
export const NameInput = memo(({ control, error }: FormInputProps) => {
  useWatch({
    control,
    name: "memberName",
  });

  return (
    <Controller
      name="memberName"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id="memberName"
          className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
          placeholder="이름"
          type="text"
          error={error}
        />
      )}
    />
  );
});

NameInput.displayName = "NameInput";

// 닉네임 입력 컴포넌트
export const NicknameInput = memo(({ control, error }: FormInputProps) => {
  useWatch({
    control,
    name: "memberNickName",
  });

  return (
    <Controller
      name="memberNickName"
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id="memberNickName"
          className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
          placeholder="닉네임"
          type="text"
          error={error}
        />
      )}
    />
  );
});

NicknameInput.displayName = "NicknameInput";

// 비밀번호 확인 컴포넌트
export const ConfirmPasswordInput = memo(
  ({ control, error }: FormInputProps) => {
    const password = useWatch({
      control,
      name: "memberPassword",
    });

    const confirmPassword = useWatch({
      control,
      name: "confirmPassword",
    });

    const passwordMatchError =
      confirmPassword && password !== confirmPassword
        ? "비밀번호가 일치하지 않습니다."
        : "";

    return (
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="confirmPassword"
            className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
            placeholder="비밀번호 확인"
            type="password"
            error={passwordMatchError || error}
          />
        )}
      />
    );
  },
);

ConfirmPasswordInput.displayName = "ConfirmPasswordInput";

// 연간 소득 입력 컴포넌트
export const AnnualIncomeInput = memo(({ control, error }: FormInputProps) => {
  useWatch({
    control,
    name: "annualIncome",
  });

  return (
    <Controller
      name="annualIncome"
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <Input
          {...field}
          onChange={(e) => onChange(Number(e.target.value))}
          id="annualIncome"
          className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
          placeholder="연간 소득"
          type="number"
          error={error}
        />
      )}
    />
  );
});

AnnualIncomeInput.displayName = "AnnualIncomeInput";
