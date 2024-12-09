"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

import Input from "@/components/common/input";

export default function SearchStock() {
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      router.push(
        `/search/${encodeURIComponent(e.currentTarget.value.trim())}`,
      );
    }
  };

  return (
    <div className="mx-auto mb-30 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white">
        <Input
          className="!border-1 !h-32 !w-437 !rounded-80 !border-[#11E977] px-17 py-23 pl-20 hover:border-[#11E977] focus:border-[#11E977]"
          placeholder="종목명 또는 종목코드를 입력해주세요"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
