import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 서버에서 사용자 정보 가져오기
export async function getServerAuth() {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;
  const memberId = cookieStore.get("memberId")?.value;
  const memberName = cookieStore.get("memberName")?.value;
  const memberNickName = cookieStore.get("memberNickName")?.value;
  const annualIncome = cookieStore.get("annualIncome")?.value;
  const deposit = cookieStore.get("deposit")?.value;

  const isAuthenticated = Boolean(token);

  return {
    isAuthenticated,
    userInfo: {
      memberId: memberId || null,
      memberName: memberName || null,
      memberNickName: memberNickName || null,
      annualIncome: annualIncome || null,
      deposit: deposit || null,
    },
  };
}

export async function requireAuth() {
  const { isAuthenticated } = await getServerAuth();

  if (!isAuthenticated) {
    redirect("/login");
  }
}

// API 요청을 위한 서버 유틸
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
