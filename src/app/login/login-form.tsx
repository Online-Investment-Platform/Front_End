"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/button/index";
import Input from "@/components/common/input/index";
import {
  LoginFormData,
  LoginResponse,
  loginSchema,
} from "@/validation/schema/auth/index";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ LoginRequest: data }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }

      const responseData: { LoginResponse: LoginResponse } =
        await response.json();
      localStorage.setItem("token", responseData.LoginResponse.token);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(`로그인에 실패했습니다: ${error.message}`);
      } else {
        setLoginError("로그인 중 알 수 없는 오류가 발생했습니다.");
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
        id="memberPassword"
        className="mt-15 h-66 w-full rounded-10 bg-[#F3F4F6]"
        placeholder="비밀번호"
        type="password"
        error={errors.memberPassword?.message}
        {...register("memberPassword")}
      />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-20-600"
        isDisabled={!isValid || isLoading}
        type="submit"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      {loginError && (
        <p className="mb-4 text-center text-red-500">{loginError}</p>
      )}
      <div className="flex flex-col items-center justify-center gap-13">
        <Link href="/signup">
          <div className="text-16-400">회원가입</div>
        </Link>
        <Link href="/forgot-password">
          <div className="text-16-400">비밀번호 찾기</div>
        </Link>
      </div>
    </form>
  );
}
