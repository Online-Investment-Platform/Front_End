"use client";

import clsx from "clsx";
import { memo } from "react";

import BaseModal from "@/components/common/modal";

interface RefreshModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingRefreshes: number;
  onAccept: () => void;
  onDecline: () => void;
}

const ModalContent = memo(
  ({
    remainingRefreshes,
    onAccept,
    onDecline,
    onClose,
  }: Omit<RefreshModalProps, "isOpen">) => {
    const handleRefresh = () => {
      onAccept();
      onClose();
    };

    const handleLogout = () => {
      onClose();
      onDecline();
    };

    return (
      <div className="shadow-xl h-210 overflow-hidden rounded-2xl bg-white p-20">
        <div className="flex items-center gap-3 text-yellow-600">
          <h2 className="text-24-700 text-gray-900">세션 연장</h2>
        </div>

        <div className="mt-10">
          <p className="text-16-600 text-gray-600">
            로그인 세션이 5분 후에 만료됩니다.
            <br />
            세션을 연장하시겠습니까?
          </p>
        </div>

        <div className="mt-10 rounded-lg bg-blue-50 p-10">
          <p className="text-16-600 text-blue-700">
            남은 연장 횟수:{" "}
            <span className="text-14-600">{remainingRefreshes}회</span>
          </p>
        </div>

        <div className="mt-10 flex justify-end gap-8">
          <button
            type="button"
            onClick={handleLogout}
            className={clsx(
              "rounded-lg border border-gray-300 px-8 py-6",
              "text-16-600 text-gray-800",
              "transition",
              "hover:bg-gray-50",
              "active:bg-gray-100",
            )}
          >
            로그아웃
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={remainingRefreshes <= 0}
            className={clsx(
              "rounded-lg bg-blue-600 px-8 py-6",
              "text-16-600 text-white",
              "transition",
              "hover:bg-blue-700",
              "active:bg-blue-800",
              "disabled:bg-gray-300",
            )}
          >
            연장하기
          </button>
        </div>
      </div>
    );
  },
);

ModalContent.displayName = "RefreshModalContent";

function RefreshModal({
  isOpen,
  onClose,
  remainingRefreshes,
  onAccept,
  onDecline,
}: RefreshModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        remainingRefreshes={remainingRefreshes}
        onAccept={onAccept}
        onDecline={onDecline}
        onClose={onClose}
      />
    </BaseModal>
  );
}

RefreshModal.displayName = "RefreshModal";

export default RefreshModal;
