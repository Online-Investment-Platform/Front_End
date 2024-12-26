"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function Logo() {
  return (
    <Link href="/">
      <div className="flex gap-10" aria-label="홈으로 이동">
        <Image src="/icons/Logo.svg" alt="Logo" width={44} height={44} />
        <span className="text-40-600">GrowFolio</span>
      </div>
    </Link>
  );
}

function LoginHeader() {
  return (
    <div className="mb-15 flex flex-col items-center justify-center gap-13">
      <Logo />
      <h1 className="mt-20 text-18-700">로그인후 서비스를 이용해주세요</h1>
    </div>
  );
}

export default memo(LoginHeader);
