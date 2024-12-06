import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex gap-10" aria-label="홈으로 이동">
        <Image src="/icons/Logo.svg" alt="Logo" width={44} height={44} />
        <span className="text-40-600">GrowFolio</span>
      </div>
    </Link>
  );
}
