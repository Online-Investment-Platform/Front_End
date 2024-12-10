"use client";

import { useEffect, useState } from "react";

import TutorialModal from "./tutorial-modal";

export default function TutorialContainer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem("nav-tutorial-completed");
    if (!hasCompletedTutorial) {
      setIsOpen(true);
      // 튜토리얼을 본 것으로 표시
      localStorage.setItem("nav-tutorial-completed", "true");
    }
  }, []);

  return <TutorialModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
