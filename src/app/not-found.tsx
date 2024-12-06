import Link from "next/link";
import React from "react";

import Logo from "@/components/common/auth/logo";

export default function NotFound() {
  return (
    <div className="lg:max-w-2000 flex h-screen w-full min-w-400 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white px-4 py-8 md:px-12 lg:px-16">
      <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
        <div className="flex w-full flex-col items-center justify-center p-4">
          <div className="mb-15 flex flex-col items-center justify-center gap-13">
            <Logo />
            <h1 className="mt-20 text-18-700">서비스 준비중입니다</h1>
            <p className="text-gray-600">빠른 시일 내에 찾아뵙겠습니다</p>
          </div>

          <Link
            href="/"
            className="mt-8 rounded-lg bg-green-400 px-15 py-10 text-14-600 text-white transition-colors hover:bg-green-700"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
