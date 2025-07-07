"use client";

import { useEffect } from "react";

import useAuth from "@/hooks/use-auth";

interface AuthInitializerProps {
  initialUserInfo: {
    memberId: string | null;
    memberName: string | null;
    memberNickName: string | null;
    annualIncome: string | null;
    deposit: string | null;
  };
  isAuthenticated: boolean;
}

export default function AuthInitializer({
  initialUserInfo,
  isAuthenticated,
}: AuthInitializerProps) {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth(initialUserInfo, isAuthenticated);
  }, [initialUserInfo, isAuthenticated, initializeAuth]);

  return null;
}
