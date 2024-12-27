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

    /**
     * 로그인 응답을 받아 인증 상태를 설정하는 함수
     *
     * @param response - 로그인 API 응답 데이터
     * @returns Promise<void>
     *
     * @description
     * - 토큰과 사용자 정보를 쿠키에 저장
     * - 스토어의 상태를 업데이트
     * - 인증 상태를 true로 설정
     */
    setAuth: async (response: LoginResponse) => {
      const {
        token,
        memberId,
        memberName,
        memberNickName,
        annualIncome,
        deposit,
      } = response;

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

    /**
     * 인증 상태를 초기화하고 로그아웃하는 함수
     *
     * @returns Promise<void>
     *
     * @description
     * - 모든 인증 관련 쿠키를 삭제
     * - 스토어의 상태를 초기화
     * - 인증 상태를 false로 설정
     */
    clearAuth: async () => {
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

    /**
     * 페이지 로드시 쿠키에서 인증 상태를 복원하는 함수
     *
     * @returns Promise<void>
     *
     * @description
     * - 중복 초기화 방지를 위한 Promise 캐싱 포함
     * - 쿠키에서 인증 정보를 읽어와 스토어에 설정
     * - 초기화 상태를 추적하기 위한 플래그 관리
     * - 에러 발생시 초기화 상태 정리
     */
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

          const token = await getCookie("token");
          const memberIdStr = await getCookie("memberId");
          const memberName = await getCookie("memberName");
          const memberNickName = await getCookie("memberNickName");
          const annualIncomeStr = await getCookie("annualIncome");
          const depositStr = await getCookie("deposit");

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
