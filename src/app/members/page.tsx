import Logo from "@/components/common/auth/logo";

import SignUpForm from "./signup-form";

export default function SignUpPage() {
  return (
    <div className="bg-gray w-full min-w-400 shrink-0 rounded-20">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <Logo />
        <SignUpForm />
      </div>
    </div>
  );
}
