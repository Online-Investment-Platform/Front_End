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
import LogoIcon from "@/public/icons/Logo.svg";
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
    href: "/search",
    name: "주식 조회",
    icon: ChartIcon,
    activeIcon: ChartActiveIcon,
  },
  {
    href: "/my-account",
    name: "내 계좌",
    icon: AccountIcon,
    activeIcon: AccountActiveIcon,
  },
  {
    href: "/portfolio",
    name: "포트폴리오",
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
      {isActive && <div className="absolute left-4 h-full w-3 bg-lime-200" />}
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

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <menu className="fixed left-0 top-0 z-[999] flex h-full w-82 flex-col items-center border-r bg-white py-20">
      <LogoIcon />
      <div className="mt-30 flex flex-col items-center space-y-45">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            name={item.name}
            icon={item.icon}
            activeIcon={item.activeIcon}
            isActive={isActiveRoute(item.href)}
          />
        ))}
      </div>
    </menu>
  );
}
