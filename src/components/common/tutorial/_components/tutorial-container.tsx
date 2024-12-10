"use client";

import { useEffect, useState } from "react";

import TutorialModal from "./tutorial-modal";

export default function TutorialContainer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return <TutorialModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
