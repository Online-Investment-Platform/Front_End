import Image from "next/image";
import Link from "next/link";

import SignUpForm from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <div className="mb-15 flex flex-col items-center justify-center gap-13">
          <Link href="/">
            <div className="flex gap-10">
              <Image src="/icons/Logo.svg" alt="Logo" width={44} height={44} />
              <span className="text-40-600">GrowFolio</span>
            </div>
          </Link>
          <h1 className="text-18-700">회원가입후 서비스를 이용해주세요</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
