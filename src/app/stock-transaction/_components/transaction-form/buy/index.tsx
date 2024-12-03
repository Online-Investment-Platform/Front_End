"use client";

import { useState } from "react";

import Button from "@/components/common/button";
import Input from "@/components/common/input";

import CountDropdown from "./count-dropdown";
import PriceTypeDropdown from "./price-type-dropdown";

export default function Buy() {
  const [priceType, setPriceType] = useState("지정가");
  const [count, setCount] = useState<number | null>(null);
  const [bidding, setBidding] = useState<number | null>(null);

  return (
    <div className="flex">
      <div>
        <div className="w-127 bg-[#EDF1FC] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#EDF1FC] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#EDF1FC] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#EDF1FC] py-11 text-center">35,850</div>

        <div className="w-127 bg-[#FDEBEB] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#FDEBEB] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#FDEBEB] py-11 text-center">35,850</div>
        <div className="w-127 bg-[#FDEBEB] py-11 text-center">35,850</div>
      </div>

      <div className="flex w-270 flex-col gap-16 pl-11">
        <div className="flex gap-8">
          <PriceTypeDropdown
            priceType={priceType}
            setPriceType={setPriceType}
          />
          <div className="mb-4 w-100 rounded-2 border border-solid border-[#B6B6B6] p-13">
            시장가
          </div>
        </div>

        <div className="relative flex justify-between gap-6">
          <CountDropdown
            title="수량"
            state={count ?? ""}
            setState={(value) => setCount(value ? Number(value) : null)}
            number={10}
          />
          <Input
            isForm
            placeholder="수량입력"
            inputSuffix="원"
            value={count ?? ""}
          />
        </div>

        <div className="relative flex justify-between gap-6">
          <label htmlFor="possible-stock" className="w-150">
            매수 가능 주식
          </label>
          <Input
            isForm
            placeholder="300"
            inputSuffix="주"
            className="w-full placeholder:!bottom-8"
          />
        </div>

        <div className="relative flex justify-between gap-6">
          <CountDropdown
            title="호가"
            state={bidding ?? ""}
            setState={(value) => setBidding(value ? Number(value) : null)}
            number={10}
          />
          <Input
            isForm
            placeholder="호가 입력"
            inputSuffix="원"
            value={bidding ?? ""}
          />
        </div>

        <div className="flex items-center gap-14">
          <div>총 주문 금액</div>
          <div className="flex-1 rounded-8 bg-[#F5F6F8] p-8 text-right">
            0원
          </div>
        </div>
        <div className="p-8 text-right text-[#EB0000]">0원</div>

        <div className="relative top-90">
          <Button variant="outline-gray">초기화</Button>
          <Button variant="red" className="ml-7 w-160">
            매수
          </Button>
        </div>
      </div>
    </div>
  );
}
