import Input from "@/components/common/input";

export default function SearchStock() {
  return (
    <div className="mb-30 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white">
        <Input
          className="border-1 !h-32 !w-437 !rounded-80 !border-[#11E977] px-17 py-23 hover:border-[#11E977] focus:border-[#11E977]"
          placeholder="종목명 또는 종목코드를 입력해주세요"
        />
      </div>
    </div>
  );
}
