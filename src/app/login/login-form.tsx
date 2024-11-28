/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";

import { EmailInput, PasswordInput } from "@/components/auth-input/index";
import Button from "@/components/common/button/index";
import { useAuth } from "@/hooks/use-auth";
import { AuthFormData } from "@/types/auth";
import { LoginResponse, loginSchema } from "@/validation/schema/auth/index";

const FormLinks = memo(() => (
  <div className="flex flex-col items-center justify-center gap-13">
    <Link href="/members">
      <div className="text-16-400">회원가입</div>
    </Link>
    <Link href="/forgot-password">
      <div className="text-16-400">비밀번호 찾기</div>
    </Link>
  </div>
));

FormLinks.displayName = "FormLinks";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AuthFormData) => {
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
        const responseData: LoginResponse = await response.json();
        console.log("로그인 성공:", responseData);

        // useAuth 스토어 업데이트 및 쿠키 저장
        await setAuth(responseData);

        router.push("/");
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.message || "로그인에 실패했습니다.");
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
      <EmailInput control={control} error={errors.memberEmail?.message} />
      <PasswordInput control={control} error={errors.memberPassword?.message} />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-20-700"
        isDisabled={!isValid || isLoading}
        type="submit"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      <FormLinks />
    </form>
  );
}
