import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검색 페이지 | 온라인 투자플랫폼",
  description: "검색 페이지입니다",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lg:max-w-2000 flex flex-col">{children}</div>;
}
