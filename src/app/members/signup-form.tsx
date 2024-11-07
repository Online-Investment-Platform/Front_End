/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { Path, useForm, useWatch } from "react-hook-form";

import {
  AnnualIncomeInput,
  ConfirmPasswordInput,
  EmailInput,
  NameInput,
  NicknameInput,
  PasswordInput,
} from "@/components/auth-input/index";
import Button from "@/components/common/button";
import { AuthFormData } from "@/types/auth";
import { signupSchema } from "@/validation/schema/auth";

const FormLinks = memo(() => (
  <div className="flex flex-col items-center justify-center gap-13">
    <Link href="/login">
      <div className="text-16-400">이미 계정이 있으신가요? 로그인</div>
    </Link>
  </div>
));

FormLinks.displayName = "FormLinks";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "memberPassword" as Path<AuthFormData>,
  });

  const confirmPassword = useWatch({
    control,
    name: "confirmPassword" as Path<AuthFormData>,
  });

  const passwordMatchError = confirmPassword && password !== confirmPassword;

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    const { confirmPassword: _, ...signupData } = data;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify(signupData),
        },
      );

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error("회원가입 실패:", errorData.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex w-443 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} error={errors.memberEmail?.message} />
      <NameInput control={control} error={errors.memberName?.message} />
      <NicknameInput control={control} error={errors.memberNickName?.message} />
      <PasswordInput control={control} error={errors.memberPassword?.message} />
      <ConfirmPasswordInput
        control={control}
        error={errors.confirmPassword?.message}
      />
      <AnnualIncomeInput
        control={control}
        error={errors.annualIncome?.message}
      />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-18-700"
        isDisabled={!isValid || isLoading || passwordMatchError}
        type="submit"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>
      <FormLinks />
    </form>
  );
}
