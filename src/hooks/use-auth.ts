/*eslint-disable*/
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
  isInitializing: boolean;
  setAuth: (response: LoginResponse) => Promise<void>;
  clearAuth: () => Promise<void>;
  initAuth: () => Promise<void>;
}

/**
 * 인증 상태를 관리하는 Zustand 스토어 훅
 *
 * @description
 * - 로그인/로그아웃 상태 관리
 * - 토큰 및 사용자 정보 관리
 * - 쿠키 기반의 인증 상태 유지
 * - 중복 초기화 방지 로직 포함
 *
 * @example
 * // 1. 로그인 처리
 * const LoginComponent = () => {
 *   const { setAuth } = useAuth();
 *
 *   const handleLogin = async () => {
 *     const response = await loginAPI();
 *     await setAuth(response);
 *   };
 * };
 *
 * @example
 * // 2. 인증이 필요한 API 요청
 * const ProtectedComponent = () => {
 *   const { token, isInitialized } = useAuth();
 *
 *   useEffect(() => {
 *     if (!isInitialized) return;
 *
 *     const fetchData = async () => {
 *       const response = await fetch('/api/protected', {
 *         headers: { Authorization: `Bearer ${token}` }
 *       });
 *     };
 *
 *     fetchData();
 *   }, [isInitialized, token]);
 * };
 *
 * @example
 * // 3. 앱 초기화시 인증 상태 복원
 * const App = () => {
 *   const { initAuth } = useAuth();
 *
 *   useEffect(() => {
 *     initAuth();
 *   }, []);
 * };
 *
 * @example
 * // 4. 로그아웃시 인증 정보 제거
 * function LogoutButton() {
 *   const { clearAuth } = useAuth();
 *
 *   const handleLogout = async () => {
 *     await clearAuth();
 *   };
 * }
 */

export const useAuth = create<AuthStore>((set, get) => {
  let initPromise: Promise<void> | null = null;

  return {
    token: null,
    memberId: null,
    memberName: null,
    memberNickName: null,
    annualIncome: null,
    deposit: null,
    isAuthenticated: false,
    isInitialized: false,
    isInitializing: false,

    setAuth: async (response: LoginResponse) => {
      const {
        token,
        memberId,
        memberName,
        memberNickName,
        annualIncome,
        deposit,
      } = response;

      // 모든 쿠키 설정을 병렬로 처리
      await Promise.all([
        setCookie("token", token),
        setCookie("memberId", memberId.toString()),
        setCookie("memberName", memberName),
        setCookie("memberNickName", memberNickName),
        setCookie("annualIncome", annualIncome.toString()),
        setCookie("deposit", deposit.toString()),
      ]);

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
      // 모든 쿠키 삭제를 병렬로 처리
      await Promise.all([
        deleteCookie("token"),
        deleteCookie("memberId"),
        deleteCookie("memberName"),
        deleteCookie("memberNickName"),
        deleteCookie("annualIncome"),
        deleteCookie("deposit"),
      ]);

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
      if (get().isInitialized) {
        return;
      }

      if (initPromise) {
        return initPromise;
      }

      initPromise = (async () => {
        try {
          set({ isInitializing: true });

          // 모든 쿠키 조회를 병렬로 처리
          const [
            token,
            memberIdStr,
            memberName,
            memberNickName,
            annualIncomeStr,
            depositStr,
          ] = await Promise.all([
            getCookie("token"),
            getCookie("memberId"),
            getCookie("memberName"),
            getCookie("memberNickName"),
            getCookie("annualIncome"),
            getCookie("deposit"),
          ]);

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
            isInitializing: false,
          });
        } catch (error) {
          set({
            isInitialized: true,
            isInitializing: false,
          });
          throw error;
        } finally {
          initPromise = null;
        }
      })();

      return initPromise;
    },
  };
});
