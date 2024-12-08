"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useToast } from "@/store/use-toast-store";

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-500",
  },
  pending: {
    icon: Loader2,
    bgColor: "bg-blue-500",
  },
};

function ToastPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

function Toast() {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (toast) {
      timer = setTimeout(() => {
        hideToast();
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [toast, hideToast]);

  const ToastIcon = toast ? toastConfig[toast.type].icon : CheckCircle;
  const bgColor = toast ? toastConfig[toast.type].bgColor : "";

  if (!toast) return null;

  return (
    <ToastPortal>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed inset-x-0 top-10 z-[9999] mx-auto w-fit"
        >
          <div
            className={`${bgColor} flex items-center gap-4 rounded-lg px-15 py-20 text-white shadow-lg`}
            role="alert"
          >
            <ToastIcon
              className={`size-15 ${toast.type === "pending" ? "animate-spin" : ""}`}
            />
            <p className="font-medium">{toast.message}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </ToastPortal>
  );
}

export default Toast;
