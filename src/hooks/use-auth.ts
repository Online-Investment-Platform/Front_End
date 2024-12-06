/* eslint-disable*/

"use client";

import { create } from "zustand";

import { deleteCookie, getCookie, setCookie } from "@/utils/next-cookies";

interface LoginResponse {
  token: string;
  memberId: number;
  memberName: string;
  memberNickName: string;
  annualIncome: number;
  deposit: number;
}

interface AuthStore {
  token: string | null;
  memberId: number | null;
  memberName: string | null;
  memberNickName: string | null;
  annualIncome: number | null;
  deposit: number | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAuth: (response: LoginResponse) => Promise<void>;
  clearAuth: () => Promise<void>;
  initAuth: () => Promise<void>;
}

/**
 * 인증 토큰을 관리하는 Zustand 스토어 훅
 *
 * @example
 * // 1. 컴포넌트에서 토큰 관리
 * import { useAuth } from '@/hooks/useAuth';
 *
 * function LoginComponent() {
 *   const { setAuth } = useAuth();
 *
 *   const handleLogin = async () => {
 *     const response = await fetch('/api/login');
 *     const data = await response.json();
 *     await setAuth(data); // 로그인 후 인증 정보 저장
 *   };
 * }
 *
 * @example
 * // 2. API 요청시 토큰 사용
 * function ProtectedComponent() {
 *   const { token } = useAuth();
 *
 *   const fetchData = async () => {
 *     const response = await fetch('/api/protected', {
 *       headers: {
 *         'Authorization': `Bearer ${token}`
 *       }
 *     });
 *   };
 * }
 *
 * @example
 * // 3. 컴포넌트 마운트시 인증 상태 초기화
 * function App() {
 *   const { initAuth } = useAuth();
 *
 *   useEffect(() => {
 *     initAuth(); // 페이지 로드시 쿠키에서 인증 정보 복원
 *   }, []);
 * }
 *
 * @example
 * // 4. 로그아웃시 인증 정보 제거
 * function LogoutButton() {
 *   const { clearAuth } = useAuth();
 *
 *   const handleLogout = async () => {
 *     await clearAuth(); // 로그아웃시 인증 정보 삭제
 *   };
 * }
 */

export const useAuth = create<AuthStore>((set) => ({
  token: null,
  memberId: null,
  memberName: null,
  memberNickName: null,
  annualIncome: null,
  deposit: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: async (response: LoginResponse) => {
    const {
      token,
      memberId,
      memberName,
      memberNickName,
      annualIncome,
      deposit,
    } = response;

    // Store all relevant data in cookies
    await setCookie("token", token);
    await setCookie("memberId", memberId.toString());
    await setCookie("memberName", memberName);
    await setCookie("memberNickName", memberNickName);
    await setCookie("annualIncome", annualIncome.toString());
    await setCookie("deposit", deposit.toString());

    set({
      token,
      memberId,
      memberName,
      memberNickName,
      annualIncome,
      deposit,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  clearAuth: async () => {
    // Clear all cookies
    await deleteCookie("token");
    await deleteCookie("memberId");
    await deleteCookie("memberName");
    await deleteCookie("memberNickName");
    await deleteCookie("annualIncome");
    await deleteCookie("deposit");

    set({
      token: null,
      memberId: null,
      memberName: null,
      memberNickName: null,
      annualIncome: null,
      deposit: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initAuth: async () => {
    try {
      set({ isInitialized: false });

      const token = await getCookie("token");
      const memberIdStr = await getCookie("memberId");
      const memberName = await getCookie("memberName");
      const memberNickName = await getCookie("memberNickName");
      const annualIncomeStr = await getCookie("annualIncome");
      const depositStr = await getCookie("deposit");

      // Convert string values back to numbers
      const memberId = memberIdStr ? parseInt(memberIdStr, 10) : null;
      const annualIncome = annualIncomeStr
        ? parseInt(annualIncomeStr, 10)
        : null;
      const deposit = depositStr ? parseInt(depositStr, 10) : null;

      set({
        token,
        memberId,
        memberName,
        memberNickName,
        annualIncome,
        deposit,
        isAuthenticated: !!token,
        isInitialized: true,
      });
    } catch (error) {
      set({ isInitialized: true });
      throw error;
    }
  },
}));
