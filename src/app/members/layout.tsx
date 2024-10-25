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
    <html lang="ko">
      <body className="flex size-full max-w-1400 flex-col items-center justify-center px-470 py-125">
        {children}
      </body>
    </html>
  );
}
