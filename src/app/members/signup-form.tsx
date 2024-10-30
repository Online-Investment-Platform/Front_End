/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/button/index";
import Input from "@/components/common/input/index";
import { SignupFormData, signupSchema } from "@/validation/schema/auth/index";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("memberPassword");
  const confirmedPassword = watch("confirmPassword") || "";

  const passwordMatchError =
    confirmedPassword && password !== confirmedPassword
      ? "비밀번호가 일치하지 않습니다."
      : "";

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const { confirmPassword, ...signupData } = data;

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
        error={passwordMatchError || errors.confirmPassword?.message}
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
        isDisabled={!isValid || isLoading || Boolean(passwordMatchError)}
        type="submit"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>
      <div className="flex flex-col items-center justify-center gap-13">
        <Link href="/login">
          <div className="text-16-400">이미 계정이 있으신가요? 로그인</div>
        </Link>
      </div>
    </form>
  );
}
