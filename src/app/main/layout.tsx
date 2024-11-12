import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메인 페이지 | 온라인 투자플랫폼",
  description: "메인 페이지입니다",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:max-w-2000 flex h-screen w-full flex-col items-center justify-center px-4 py-8 md:px-12 lg:px-16">
      {children}
    </div>
  );
}
