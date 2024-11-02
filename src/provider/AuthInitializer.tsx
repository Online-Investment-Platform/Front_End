"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";

export default function AuthInitializer() {
  const { initToken } = useAuth();

  useEffect(() => {
    initToken();
  }, []); //eslint-disable-line

  return null; // 아무것도 렌더링하지 않음
}
