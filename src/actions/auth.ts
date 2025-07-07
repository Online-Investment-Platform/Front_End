"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginCredentials {
  memberEmail: string;
  memberPassword: string;
}

interface LoginResponse {
  token: string;
  memberId: number;
  memberName: string;
  memberNickName: string;
  annualIncome: number;
  deposit: number;
}

// 로그인 서버 액션
export async function loginAction(credentials: LoginCredentials) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "로그인에 실패했습니다.",
      };
    }

    const data: LoginResponse = await response.json();

    // 서버에서만 httpOnly 쿠키 설정
    const cookieStore = cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 30 * 60, // 30분
      path: "/",
    };

    cookieStore.set("token", data.token, cookieOptions);
    cookieStore.set("memberId", data.memberId.toString(), cookieOptions);
    cookieStore.set("memberName", data.memberName, cookieOptions);
    cookieStore.set("memberNickName", data.memberNickName, cookieOptions);
    cookieStore.set(
      "annualIncome",
      data.annualIncome.toString(),
      cookieOptions,
    );
    cookieStore.set("deposit", data.deposit.toString(), cookieOptions);

    return {
      success: true,
      data: {
        memberId: data.memberId.toString(),
        memberName: data.memberName,
        memberNickName: data.memberNickName,
        annualIncome: data.annualIncome.toString(),
        deposit: data.deposit.toString(),
      },
    };
  } catch (error) {
    console.error("로그인 중 오류 발생:", error); //eslint-disable-line
    return {
      success: false,
      error: "로그인 중 오류가 발생했습니다.",
    };
  }
}

// 로그아웃 서버 액션
export async function logoutAction() {
  const cookieStore = cookies();

  // 모든 인증 관련 쿠키 삭제
  cookieStore.delete("token");
  cookieStore.delete("memberId");
  cookieStore.delete("memberName");
  cookieStore.delete("memberNickName");
  cookieStore.delete("annualIncome");
  cookieStore.delete("deposit");

  redirect("/login");
}
