import "./globals.css";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";

import MainContent from "@/components/main-content";
import NavBar from "@/components/nav-bar";
import AuthInitializer from "@/provider/AuthInitializer";
import AuthRefreshHandler from "@/utils/auth-handler";

import Providers from "./provider";

export const metadata: Metadata = {
  title: "GrowFoilo | 온라인 투자플랫폼",
  icons: {
    icon: "/logo.ico", // 기본 파비콘
    shortcut: "/logo.ico", // 브라우저 즐겨찾기에서 표시
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <body className="flex">
        <Providers dehydratedState={dehydratedState}>
          <AuthInitializer />
          <AuthRefreshHandler />
          <NavBar />
          <MainContent>{children}</MainContent>
        </Providers>
      </body>
    </html>
  );
}
