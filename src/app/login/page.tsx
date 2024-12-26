import LoginHeader from "@/components/common/auth/logo";

import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
}
