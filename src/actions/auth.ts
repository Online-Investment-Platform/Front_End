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

interface AuthActionResult {
  success: boolean;
  error?: string;
  data?: {
    memberId: string;
    memberName: string;
    memberNickName: string;
    annualIncome: string;
    deposit: string;
  };
}

interface SessionResult {
  success: boolean;
  error?: string;
}

// 공통 쿠키 옵션
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 30 * 60, // 30분
  path: "/",
});

/**
 * 로그인 서버 액션
 * @param credentials - 로그인 자격 증명 (이메일, 비밀번호)
 * @returns 로그인 결과 (성공/실패, 사용자 정보)
 */
export async function loginAction(
  credentials: LoginCredentials,
): Promise<AuthActionResult> {
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
    const cookieOptions = getCookieOptions();

    // 모든 인증 정보를 httpOnly 쿠키로 저장
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
    console.error("로그인 서버 액션 오류:", error); //eslint-disable-line
    return {
      success: false,
      error: "로그인 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 로그아웃 서버 액션
 * 모든 인증 관련 쿠키를 삭제하고 로그인 페이지로 리다이렉트
 */
export async function logoutAction(): Promise<void> {
  try {
    const cookieStore = cookies();

    // 모든 인증 관련 쿠키 삭제
    const cookiesToDelete = [
      "token",
      "memberId",
      "memberName",
      "memberNickName",
      "annualIncome",
      "deposit",
    ];

    cookiesToDelete.forEach((cookieName) => {
      cookieStore.delete(cookieName);
    });
  } catch (error) {
    console.error("로그아웃 중 오류:", error); //eslint-disable-line
  } finally {
    // 오류가 발생해도 로그인 페이지로 리다이렉트
    redirect("/login");
  }
}

/**
 * 세션 연장 서버 액션
 * 기존 쿠키들의 만료시간을 연장 (30분)
 * @returns 세션 연장 결과
 */
export async function extendSessionAction(): Promise<SessionResult> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        error: "인증 토큰이 없습니다.",
      };
    }

    // 기존 사용자 정보 가져오기
    const userInfo = {
      token,
      memberId: cookieStore.get("memberId")?.value,
      memberName: cookieStore.get("memberName")?.value,
      memberNickName: cookieStore.get("memberNickName")?.value,
      annualIncome: cookieStore.get("annualIncome")?.value,
      deposit: cookieStore.get("deposit")?.value,
    };

    // 필수 정보가 없으면 실패
    if (!userInfo.memberId) {
      return {
        success: false,
        error: "사용자 정보가 없습니다.",
      };
    }

    // 새로운 만료시간으로 쿠키 재설정
    const cookieOptions = getCookieOptions();

    cookieStore.set("token", userInfo.token, cookieOptions);
    cookieStore.set("memberId", userInfo.memberId, cookieOptions);
    cookieStore.set("memberName", userInfo.memberName || "", cookieOptions);
    cookieStore.set(
      "memberNickName",
      userInfo.memberNickName || "",
      cookieOptions,
    );
    cookieStore.set("annualIncome", userInfo.annualIncome || "", cookieOptions);
    cookieStore.set("deposit", userInfo.deposit || "", cookieOptions);

    return { success: true };
  } catch (error) {
    console.error("세션 연장 중 오류:", error); //eslint-disable-line
    return {
      success: false,
      error: "세션 연장 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 사용자 정보 업데이트 서버 액션
 * 특정 사용자 정보만 업데이트 (예: 예수금 변경)
 * @param updates - 업데이트할 정보
 */
export async function updateUserInfoAction(updates: {
  deposit?: string;
  annualIncome?: string;
}): Promise<SessionResult> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        error: "인증 토큰이 없습니다.",
      };
    }

    const cookieOptions = getCookieOptions();

    // 업데이트할 정보만 새로 설정
    if (updates.deposit !== undefined) {
      cookieStore.set("deposit", updates.deposit, cookieOptions);
    }

    if (updates.annualIncome !== undefined) {
      cookieStore.set("annualIncome", updates.annualIncome, cookieOptions);
    }

    console.log("사용자 정보 업데이트 완료:", updates); //eslint-disable-line

    return { success: true };
  } catch (error) {
    console.error("사용자 정보 업데이트 중 오류:", error); //eslint-disable-line
    return {
      success: false,
      error: "사용자 정보 업데이트 중 오류가 발생했습니다.",
    };
  }
}

/**
 * 토큰 유효성 검증 서버 액션
 * @returns 토큰 유효성 결과
 */
export async function validateTokenAction(): Promise<SessionResult> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        error: "토큰이 없습니다.",
      };
    }

    // 실제 구현에서는 JWT 토큰 검증 로직 추가
    // const isValid = jwt.verify(token, process.env.JWT_SECRET);

    // 현재는 토큰 존재 여부만 확인
    return { success: true };
  } catch (error) {
    console.error("토큰 검증 중 오류:", error); //eslint-disable-line
    return {
      success: false,
      error: "토큰 검증에 실패했습니다.",
    };
  }
}
