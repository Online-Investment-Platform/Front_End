"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { setCookie } from "@/utils/next-cookies";

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
  const {
    token,
    memberId,
    memberName,
    memberNickName,
    annualIncome,
    deposit,
    clearAuth,
  } = useAuth();

  const router = useRouter();
  const refreshCountRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const sessionTimerRef = useRef<NodeJS.Timeout>();
  const responseTimerRef = useRef<NodeJS.Timeout>();

  const handleLogout = useCallback(async () => {
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    setIsModalOpen(false);
    await clearAuth();
    router.push("/login");
    router.refresh();
  }, [clearAuth, router]);

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

    // Refresh all auth information
    if (token) {
      await setCookie("token", token);
      if (memberId) await setCookie("memberId", memberId.toString());
      if (memberName) await setCookie("memberName", memberName);
      if (memberNickName) await setCookie("memberNickName", memberNickName);
      if (annualIncome)
        await setCookie("annualIncome", annualIncome.toString());
      if (deposit) await setCookie("deposit", deposit.toString());
    }

    setIsWaitingForResponse(false);
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);

    refreshCountRef.current += 1;
    setIsModalOpen(false);
    startSessionTimer();
  }, [
    handleLogout,
    startSessionTimer,
    token,
    memberId,
    memberName,
    memberNickName,
    annualIncome,
    deposit,
  ]);

  const handleRefreshDecline = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    if (token && !isWaitingForResponse) {
      refreshCountRef.current = 0;
      startSessionTimer();
    }

    return () => {
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [token, isWaitingForResponse, startSessionTimer]);

  return {
    isModalOpen,
    remainingRefreshes: MAX_REFRESH_COUNT - refreshCountRef.current,
    onClose: () => setIsModalOpen(false),
    onAccept: handleRefreshAccept,
    onDecline: handleRefreshDecline,
  };
}
