"use client";

import { useEffect, useState } from "react";

import ChartTutorialModal from "./tutorial-modal";

export default function ChartTutorialContainer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem(
      "chart-tutorial-completed",
    );
    if (!hasCompletedTutorial) {
      setIsOpen(true);
      localStorage.setItem("chart-tutorial-completed", "true");
    }
  }, []);

  return (
    <ChartTutorialModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
