"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useTransition } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "@/actions/auth";
import { EmailInput, PasswordInput } from "@/components/auth-input/index";
import Button from "@/components/common/button/index";
import useAuth from "@/hooks/use-auth";
import { useToast } from "@/store/use-toast-store";
import { AuthFormData } from "@/types/auth";
import { loginSchema } from "@/validation/schema/auth/index";

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
  const { setUserInfo, setAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AuthFormData) => {
    startTransition(async () => {
      showToast("로그인 시도 중...", "pending");

      const result = await loginAction({
        memberEmail: data.memberEmail,
        memberPassword: data.memberPassword,
      });

      if (result.success && result.data) {
        // 클라이언트 스토어에는 사용자 정보만 저장 (토큰 제외)
        setUserInfo(result.data);
        setAuthenticated(true);

        showToast("로그인에 성공했습니다.", "success");
        router.push("/");
        router.refresh();
      } else {
        showToast(result.error || "로그인에 실패했습니다.", "error");
      }
    });
  };

  return (
    <form className="flex w-443 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} error={errors.memberEmail?.message} />
      <PasswordInput control={control} error={errors.memberPassword?.message} />
      <Button
        className="mb-20 mt-15 h-66 w-full rounded-10 text-20-700"
        isDisabled={!isValid || isPending}
        type="submit"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      <FormLinks />
    </form>
  );
}
