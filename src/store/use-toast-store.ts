"use client";

import { create } from "zustand";

export type ToastType = "success" | "error" | "pending";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toast: Toast | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToast = create<ToastStore>((set) => ({
  toast: null,
  showToast: (message: string, type: ToastType) => {
    set({
      toast: {
        id: Date.now().toString(),
        message,
        type,
      },
    });

    setTimeout(() => {
      set({ toast: null });
    }, 1500);
  },
  hideToast: () => set({ toast: null }),
}));
