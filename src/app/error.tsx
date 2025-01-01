"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="lg:max-w-2000 flex h-screen w-full min-w-400 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white px-4 py-8 md:px-12 lg:px-16">
      <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
        <div className="flex w-full flex-col items-center justify-center p-4">
          <div className="mb-15 flex flex-col items-center justify-center gap-13">
            <Image src="/icons/Logo.svg" alt="Logo" width={44} height={44} />
            <span className="text-40-600">GrowFolio</span>
            <h1 className="mt-20 text-24-700">서비스 업데이트 준비중입니다</h1>
            <p className="text-18-600 text-gray-600">
              빠른 시일 내에 찾아뵙겠습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
