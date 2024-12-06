"use client";

import { usePathname } from "next/navigation";

import NavMenu from "./_components/nav-menu";

export default function NavBar() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/members") return null;

  return (
    <nav className="flex h-screen flex-col">
      <NavMenu />
    </nav>
  );
}
