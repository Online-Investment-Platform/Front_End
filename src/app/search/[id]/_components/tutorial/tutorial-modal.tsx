"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useState } from "react";

import BaseModal from "@/components/common/modal";

import TUTORIAL_STEPS from "./constant";
import TutorialContent from "./tutorial-contents";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TUTORIAL_STEPS.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stock-tutorial-completed", "true");
    }
    onClose();
  }, [onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="shadow-xl rounded-lg bg-white px-26 py-20">
        <div className="mb-15 flex items-center justify-between">
          <h2 className="text-24-600 text-gray-900">주식 거래 시작하기</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="size-25 text-gray-500" />
          </button>
        </div>

        <TutorialContent step={TUTORIAL_STEPS[currentStep]} />

        <div className="flex items-center justify-between">
          <div className="text-16-600 text-gray-500">
            {currentStep + 1} / {TUTORIAL_STEPS.length}
          </div>
          <div className="flex gap-10">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-4 rounded-md border border-gray-300 px-8 py-4 text-16-600 text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft className="size-16" />
                이전
              </button>
            )}
            {currentStep < TUTORIAL_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-4 rounded-md bg-green-500 px-8 py-4 text-16-600 text-white hover:bg-green-600"
              >
                다음
                <ChevronRight className="size-16" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="rounded-md bg-green-500 px-8 py-4 text-16-600 text-white hover:bg-green-600"
              >
                시작하기
              </button>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
