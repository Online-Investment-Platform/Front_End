/* eslint-disable*/

"use client";

import { create } from "zustand";

import { deleteCookie, getCookie, setCookie } from "@/utils/next-cookies";

interface AuthStore {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
  initToken: () => Promise<void>;
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

  setToken: async (token: string) => {
    await setCookie("token", token);
    set({ token });
  },

  clearToken: async () => {
    await deleteCookie("token");
    set({ token: null });
  },

  initToken: async () => {
    const token = await getCookie("token");
    if (token) set({ token });
  },
}));
