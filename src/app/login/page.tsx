import Image from "next/image";

import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <div className="mb-15 flex flex-col items-center justify-center gap-13">
          <div className="flex w-250 gap-10">
            <Image src="/icons/Logo.svg" alt="Logo" width={44} height={44} />
            <span className="text-40-600">GrowFolio</span>
          </div>
          <h1 className="mt-20 text-18-700">로그인후 서비스를 이용해주세요</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
