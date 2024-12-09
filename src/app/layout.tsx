import "./globals.css";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";

import Toast from "@/components/common/toast/index";
import MainContent from "@/components/main-content";
import NavBar from "@/components/nav-bar";
import AuthInitializer from "@/provider/AuthInitializer";
import AuthRefreshHandler from "@/utils/auth-handler";

import Providers from "./provider";

export const metadata: Metadata = {
  title: "GrowFoilo | 온라인 투자플랫폼",
  description: "당신의 투자 포트폴리오를 관리하세요",
  openGraph: {
    title: "GrowFoilo | 온라인 투자플랫폼",
    description: "당신의 투자 포트폴리오를 관리하세요",
    url: "https://growfolio-nu.vercel.app/",
    siteName: "GrowFoilo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GrowFoilo Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
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
          <Toast />
          <MainContent>{children}</MainContent>
        </Providers>
      </body>
    </html>
  );
}
