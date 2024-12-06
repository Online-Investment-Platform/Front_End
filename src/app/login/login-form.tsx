"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { EmailInput, PasswordInput } from "@/components/auth-input/index";
import Button from "@/components/common/button/index";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/store/use-toast-store";
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
  const router = useRouter();
  const { setAuth } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AuthFormData) => {
    showToast("로그인 시도 중...", "pending");

    try {
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

      if (response.ok) {
        const responseData: LoginResponse = await response.json();

        await setAuth(responseData);
        showToast("로그인에 성공했습니다.", "success");

        router.push("/");
        router.refresh();
      } else {
        const errorData = await response.json();
        showToast(errorData.message || "로그인에 실패했습니다.", "error");
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("로그인 중 오류가 발생했습니다.", "error");
      }
    }
  };

  return (
    <form className="flex w-443 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} error={errors.memberEmail?.message} />
      <PasswordInput control={control} error={errors.memberPassword?.message} />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-20-700"
        isDisabled={!isValid}
        type="submit"
      >
        로그인
      </Button>
      <FormLinks />
    </form>
  );
}
