import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 페이지 | 온라인 투자플랫폼",
  description: "회원가입 페이지입니다",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:max-w-2000 flex size-full min-w-400 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white px-4 py-8 md:px-12 lg:px-16">
      {children}
    </div>
  );
}
