"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { extendSessionAction, logoutAction } from "@/actions/auth"; // 서버 액션만 사용
import useAuth from "@/hooks/use-auth";

const MAX_REFRESH_COUNT = 4;
const SESSION_DURATION = 30 * 60 * 1000; // 30분
const MODAL_SHOW_BEFORE = 5 * 60 * 1000; // 5분

interface UseTokenRefreshReturn {
  isModalOpen: boolean;
  remainingRefreshes: number;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export default function useTokenRefresh(): UseTokenRefreshReturn {
  const { isAuthenticated, clearAuth } = useAuth();
  const refreshCountRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const sessionTimerRef = useRef<NodeJS.Timeout>();
  const responseTimerRef = useRef<NodeJS.Timeout>();
  const [isPending, startTransition] = useTransition();

  const handleLogout = useCallback(async () => {
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    setIsModalOpen(false);

    clearAuth(); // 클라이언트 상태 먼저 정리
    startTransition(async () => {
      await logoutAction(); // 서버 액션으로 쿠키 정리 및 리다이렉트
    });
  }, [clearAuth]);

  const startResponseTimer = useCallback(() => {
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);

    setIsWaitingForResponse(true);
    responseTimerRef.current = setTimeout(() => {
      if (isModalOpen) {
        handleLogout();
      }
    }, MODAL_SHOW_BEFORE);
  }, [handleLogout, isModalOpen]);

  const startSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);

    sessionTimerRef.current = setTimeout(() => {
      if (refreshCountRef.current < MAX_REFRESH_COUNT) {
        setIsModalOpen(true);
        startResponseTimer();
      } else {
        handleLogout();
      }
    }, SESSION_DURATION - MODAL_SHOW_BEFORE);
  }, [handleLogout, startResponseTimer]);

  const handleRefreshAccept = useCallback(async () => {
    if (refreshCountRef.current >= MAX_REFRESH_COUNT) {
      handleLogout();
      return;
    }

    // ✅ API Route 없이 서버 액션 직접 사용
    startTransition(async () => {
      try {
        const result = await extendSessionAction(); // 서버 액션 직접 호출

        if (result.success) {
          setIsWaitingForResponse(false);
          if (responseTimerRef.current) clearTimeout(responseTimerRef.current);

          refreshCountRef.current += 1;
          setIsModalOpen(false);
          startSessionTimer();
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("세션 연장 실패:", error); //eslint-disable-line
        handleLogout();
      }
    });
  }, [handleLogout, startSessionTimer]);

  const handleRefreshDecline = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    if (isAuthenticated && !isWaitingForResponse && !isPending) {
      refreshCountRef.current = 0;
      startSessionTimer();
    }

    return () => {
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [isAuthenticated, isWaitingForResponse, isPending, startSessionTimer]);

  return {
    isModalOpen,
    remainingRefreshes: MAX_REFRESH_COUNT - refreshCountRef.current,
    onClose: () => setIsModalOpen(false),
    onAccept: handleRefreshAccept,
    onDecline: handleRefreshDecline,
  };
}
