/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useAuth from "./use-auth";

const useApi = () => {
  const router = useRouter();
  const { setAuthenticated, clearAuth } = useAuth();

  const apiCall = useCallback(
    async (url: string, options: RequestInit = {}) => {
      try {
        const response = await fetch(url, {
          ...options,
          credentials: "include", // 항상 쿠키 포함
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        // 인증 실패시 자동 처리
        if (response.status === 401) {
          setAuthenticated(false);
          clearAuth();
          router.push("/login");
          throw new Error("인증이 만료되었습니다.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        console.error("API 요청 오류:", error); //eslint-disable-line
        throw error;
      }
    },
    [router, setAuthenticated, clearAuth],
  );

  const get = useCallback(
    (url: string) => apiCall(url, { method: "GET" }),
    [apiCall],
  );

  const post = useCallback(
    (url: string, data?: any) =>
      apiCall(url, {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      }),
    [apiCall],
  );

  const put = useCallback(
    (url: string, data?: any) =>
      apiCall(url, {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      }),
    [apiCall],
  );

  const del = useCallback(
    (url: string) => apiCall(url, { method: "DELETE" }),
    [apiCall],
  );

  return { get, post, put, delete: del, apiCall };
};
export default useApi;
