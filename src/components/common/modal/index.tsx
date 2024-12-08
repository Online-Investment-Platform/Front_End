"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 20,
    transition: { duration: 0.2 },
  },
};
const ModalContent = memo(
  ({
    onClose,
    children,
  }: {
    onClose: () => void;
    children: React.ReactNode;
  }) => (
    <>
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  ),
);

ModalContent.displayName = "ModalContent";

const ModalPortal = memo(({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
});

ModalPortal.displayName = "ModalPortal";

function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    lastActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
      lastActiveElement.current?.focus();
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <ModalPortal>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalContent onClose={onClose}>{children}</ModalContent>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

BaseModal.displayName = "BaseModal";

export default BaseModal;
