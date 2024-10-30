"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

import ContentIcon from "@/public/icons/contents.svg";
import AccountIcon from "@/public/icons/mypage.svg";

import IconButton from "./nav-icon-button";

const NAV_ITEMS = [
  { href: "/", name: "홈", icon: ContentIcon },
  { href: "/shows", name: "주식 조회", icon: ContentIcon },
  { href: "/mypage", name: "내 계좌", icon: AccountIcon },
  { href: "/contents", name: "주식 컨텐트", icon: ContentIcon },
] as const;

// Link와 IconButton을 함께 메모이제이션
const NavLink = memo(
  ({
    href,
    icon: Icon,
    label,
    isActive,
  }: {
    href: string;
    icon: React.FC<{ className?: string }>;
    label: string;
    isActive: boolean;
  }) => (
    <Link href={href}>
      <IconButton icon={Icon} label={label} isActive={isActive} />
    </Link>
  ),
);
NavLink.displayName = "NavLink";

const NavItem = memo(
  ({
    href,
    name,
    icon,
    isActive,
  }: {
    href: string;
    name: string;
    icon: React.FC<{ className?: string }>;
    isActive: boolean;
  }) => (
    <li className="relative">
      {isActive && <div className="rounded-r-m absolute -left-2 h-full w-1" />}
      <NavLink href={href} icon={icon} label={name} isActive={isActive} />
    </li>
  ),
);
NavItem.displayName = "NavItem";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <menu className="fixed left-0 top-0 flex h-screen w-82 flex-col items-center border-r bg-white py-4">
      <div className="mb-40 text-16-600">로고</div>
      <ul className="flex flex-col items-center space-y-45">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            name={item.name}
            icon={item.icon}
            isActive={pathname === item.href}
          />
        ))}
      </ul>
    </menu>
  );
}
