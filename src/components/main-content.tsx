"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/members"];
  const isHiddenPath = hiddenPaths.includes(pathname);

  return (
    <main className={`${isHiddenPath ? "w-full" : "ml-82 flex-1"}`}>
      {children}
    </main>
  );
}
