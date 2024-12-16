import Image from "next/image";
import Link from "next/link";

export default function LoginNotice() {
  return (
    <div className="relative">
      <Image
        src="/images/login-guard.png"
        alt="보안 아이콘"
        width={300}
        height={300}
        className="absolute right-1/2 top-40 translate-x-1/2"
      />
      <div className="relative top-250 w-full text-center leading-8">
        <span className="text-20-700">로그인이 필요해요!</span>
        <br />
        <span className="text-16-500 text-gray-500">
          가상 거래를 하기 위해서는 로그인이 필수적이에요!
        </span>
        <Link
          href="/login"
          className="m-auto mt-40 block w-150 rounded-4 bg-lime-500 py-16 text-center text-16-700"
        >
          로그인 하기
        </Link>
      </div>
    </div>
  );
}
