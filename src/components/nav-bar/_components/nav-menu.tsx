"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

import ChartIcon from "@/public/icons/chart.svg";
import ChartActiveIcon from "@/public/icons/chart-active.svg";
import ContentIcon from "@/public/icons/contents.svg";
import ContentActiveIcon from "@/public/icons/contents-active.svg";
import HomeIcon from "@/public/icons/home.svg";
import HomeActiveIcon from "@/public/icons/home-active.svg";
import AccountIcon from "@/public/icons/mypage.svg";
import AccountActiveIcon from "@/public/icons/mypage-active.svg";

import IconButton from "./nav-icon-button";

const NAV_ITEMS = [
  {
    href: "/",
    name: "홈",
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  {
    href: "/shows",
    name: "주식 조회",
    icon: ChartIcon,
    activeIcon: ChartActiveIcon,
  },
  {
    href: "/mypage",
    name: "내 계좌",
    icon: AccountIcon,
    activeIcon: AccountActiveIcon,
  },
  {
    href: "/contents",
    name: "주식 컨텐트",
    icon: ContentIcon,
    activeIcon: ContentActiveIcon,
  },
] as const;

const NavLink = memo(
  ({
    href,
    icon: Icon,
    activeIcon: ActiveIcon,
    label,
    isActive,
  }: {
    href: string;
    icon: React.FC<{ className?: string }>;
    activeIcon: React.FC<{ className?: string }>;
    label: string;
    isActive: boolean;
  }) => (
    <Link href={href}>
      <IconButton
        icon={isActive ? ActiveIcon : Icon}
        label={label}
        isActive={isActive}
      />
    </Link>
  ),
);
NavLink.displayName = "NavLink";

const NavItem = memo(
  ({
    href,
    name,
    icon,
    activeIcon,
    isActive,
  }: {
    href: string;
    name: string;
    icon: React.FC<{ className?: string }>;
    activeIcon: React.FC<{ className?: string }>;
    isActive: boolean;
  }) => (
    <li className="relative flex w-82 justify-center">
      {isActive && <div className="absolute left-4 h-full w-3 bg-[#0FED78]" />}
      <NavLink
        href={href}
        icon={icon}
        activeIcon={activeIcon}
        label={name}
        isActive={isActive}
      />
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
            activeIcon={item.activeIcon}
            isActive={pathname === item.href}
          />
        ))}
      </ul>
    </menu>
  );
}
