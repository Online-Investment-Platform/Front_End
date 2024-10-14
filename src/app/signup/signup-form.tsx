"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/button/index";
import Input from "@/components/common/input/index";
import {
  SignupFormData,
  SignUpResponse,
  signupSchema,
} from "@/validation/schema/auth/index";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setSignupError(null);

    const { confirmPassword, ...signupData } = data;

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ SignUpRequest: signupData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      const responseData: { SignUpResponse: SignUpResponse } =
        await response.json();
      console.log("회원가입 성공:", responseData.SignUpResponse); //eslint-disable-line

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setSignupError(`회원가입에 실패했습니다: ${error.message}`);
      } else {
        setSignupError("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex w-443 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="memberEmail"
        className="h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="이메일"
        type="email"
        error={errors.memberEmail?.message}
        {...register("memberEmail")}
      />
      <Input
        id="memberName"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="이름"
        type="text"
        error={errors.memberName?.message}
        {...register("memberName")}
      />
      <Input
        id="memberNickName"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="닉네임"
        type="text"
        error={errors.memberNickName?.message}
        {...register("memberNickName")}
      />
      <Input
        id="memberPassword"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="비밀번호"
        type="password"
        error={errors.memberPassword?.message}
        {...register("memberPassword")}
      />
      <Input
        id="confirmPassword"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="비밀번호 확인"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Input
        id="annualIncome"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="연간 소득"
        type="number"
        error={errors.annualIncome?.message}
        {...register("annualIncome", { valueAsNumber: true })}
      />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-20-600"
        isDisabled={!isValid || isLoading}
        type="submit"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>
      {signupError && (
        <p className="mb-4 text-center text-red-500">{signupError}</p>
      )}
      <div className="flex flex-col items-center justify-center gap-13">
        <Link href="/login">
          <div className="text-16-400">이미 계정이 있으신가요? 로그인</div>
        </Link>
      </div>
    </form>
  );
}
