/* eslint-disable*/

"use client";

import { create } from "zustand";

import { deleteCookie, getCookie, setCookie } from "@/utils/next-cookies";

interface LoginResponse {
  memberName: string;
  memberNickName: string;
  token: string;
}

interface AuthStore {
  token: string | null;
  memberName: string | null;
  memberNickName: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // 추가
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
  memberName: null,
  memberNickName: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: async (response: LoginResponse) => {
    const { token, memberName, memberNickName } = response;
    await setCookie("token", token);
    await setCookie("memberName", memberName);
    await setCookie("memberNickName", memberNickName);

    set({
      token,
      memberName,
      memberNickName,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  clearAuth: async () => {
    await deleteCookie("token");
    await deleteCookie("memberName");
    await deleteCookie("memberNickName");

    set({
      token: null,
      memberName: null,
      memberNickName: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initAuth: async () => {
    const token = await getCookie("token");
    const memberName = await getCookie("memberName");
    const memberNickName = await getCookie("memberNickName");

    set({
      token,
      memberName,
      memberNickName,
      isAuthenticated: !!token,
      isInitialized: true,
    });
  },
}));
