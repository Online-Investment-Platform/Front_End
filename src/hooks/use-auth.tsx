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
 *   const { setToken } = useAuth();
 *
 *   const handleLogin = async () => {
 *     const response = await fetch('/api/login');
 *     const { token } = await response.json();
 *     await setToken(token); // 로그인 후 토큰 저장
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
 * // 3. 컴포넌트 마운트시 토큰 초기화
 * function App() {
 *   const { initToken } = useAuth();
 *
 *   useEffect(() => {
 *     initToken(); // 페이지 로드시 쿠키에서 토큰 복원
 *   }, []);
 * }
 *
 * @example
 * // 4. 로그아웃시 토큰 제거
 * function LogoutButton() {
 *   const { clearToken } = useAuth();
 *
 *   const handleLogout = async () => {
 *     await clearToken(); // 로그아웃시 토큰 삭제
 *   };
 * }
 */

export const useAuth = create<AuthStore>((set) => ({
  token: null,
  memberName: null,
  memberNickName: null,
  isAuthenticated: false,

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
    });
  },
}));
