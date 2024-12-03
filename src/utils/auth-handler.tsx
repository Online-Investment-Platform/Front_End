"use client";

import RefreshModal from "@/components/common/auth/refresh-modal";
import useTokenRefresh from "@/hooks/use-token-refresh";

export default function AuthRefreshHandler() {
  const { isModalOpen, remainingRefreshes, onClose, onAccept, onDecline } =
    useTokenRefresh();

  return (
    <RefreshModal
      isOpen={isModalOpen}
      onClose={onClose}
      remainingRefreshes={remainingRefreshes}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
}
