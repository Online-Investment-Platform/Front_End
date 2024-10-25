import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="bg-gray h-150 w-full min-w-400 shrink-0 rounded-20 ">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <div className="mb-15 flex flex-col items-center justify-center gap-13">
          <div>로고</div>
          <h1 className="text-2xl font-bold">로그인후 서비스를 이용해주세요</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
