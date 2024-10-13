import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 페이지 | 온라인 투자플랫폼",
  description: "로그인 페이지입니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="px-470 py-125">{children}</body>
    </html>
  );
}
