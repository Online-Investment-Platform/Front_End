import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 페이지 | 온라인 투자플랫폼",
  description: "회원가입 페이지입니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 py-8 md:px-12 lg:max-w-7xl lg:px-16">
      {children}
    </div>
  );
}
