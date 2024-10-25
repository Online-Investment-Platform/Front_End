/* eslint-disable no-console */

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

    try {
      console.log("Sending login data:", data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let responseData: LoginResponse;
        if (responseText) {
          try {
            responseData = JSON.parse(responseText);
            console.log("로그인 성공:", responseData);

            if (responseData.token) {
              localStorage.setItem("token", responseData.token);
              router.push("/");
            } else {
              throw new Error("토큰이 없습니다.");
            }
          } catch (error) {
            console.error("Invalid JSON response:", error);
            throw new Error("서버 응답을 처리하는 중 오류가 발생했습니다.");
          }
        } else {
          throw new Error("서버 응답이 비어있습니다.");
        }
      } else {
        const errorData = await response.text();
        console.error("Error data:", errorData);
        throw new Error(errorData || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      } else {
        console.error("로그인 오류:", error);
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
