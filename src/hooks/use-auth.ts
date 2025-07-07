"use client";

import { create } from "zustand";

export interface UserInfo {
  memberId: string | null;
  memberName: string | null;
  memberNickName: string | null;
  annualIncome: string | null;
  deposit: string | null;
}

interface AuthStore {
  userInfo: UserInfo;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setUserInfo: (info: Partial<UserInfo>) => void;
  setAuthenticated: (authenticated: boolean) => void;
  clearAuth: () => void;
  initializeAuth: (initialUserInfo: UserInfo, authenticated: boolean) => void;
}

const useAuth = create<AuthStore>((set) => ({
  userInfo: {
    memberId: null,
    memberName: null,
    memberNickName: null,
    annualIncome: null,
    deposit: null,
  },
  isAuthenticated: false,
  isInitialized: false,

  setUserInfo: (info) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...info },
    })),

  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  clearAuth: () =>
    set({
      userInfo: {
        memberId: null,
        memberName: null,
        memberNickName: null,
        annualIncome: null,
        deposit: null,
      },
      isAuthenticated: false,
    }),

  initializeAuth: (initialUserInfo, authenticated) =>
    set({
      userInfo: initialUserInfo,
      isAuthenticated: authenticated,
      isInitialized: true,
    }),
}));

export default useAuth;
export const getAuthState = () => useAuth.getState();
