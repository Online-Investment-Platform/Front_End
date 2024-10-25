"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ContentIcon from "@/public/icons/contents.svg";
import AccountIcon from "@/public/icons/mypage.svg";

import IconButton from "./nav-icon-button";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: ContentIcon },
  { href: "/shows", name: "주식 조회", icon: ContentIcon },
  { href: "/mypage", name: "내 계좌", icon: AccountIcon },
  { href: "/contents", name: "주식 컨텐트", icon: ContentIcon },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <menu className="fixed left-0 top-0 flex h-screen w-82 flex-col items-center border-r bg-white py-4">
      <div className="mb-40 text-16-600">로고</div>
      <ul className="flex flex-col items-center space-y-45">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              {isActive && (
                <div className="rounded-r-m absolute -left-2 h-full w-1" />
              )}
              <Link href={item.href}>
                <IconButton
                  icon={item.icon}
                  label={item.name}
                  isActive={isActive}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </menu>
  );
}
