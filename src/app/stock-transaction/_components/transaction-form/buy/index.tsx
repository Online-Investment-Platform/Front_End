"use client";

import { useState } from "react";

import Button from "@/components/common/button";
import Dropdown from "@/components/common/dropdown";

export default function Buy() {
  const [price, setPrice] = useState("지정가");
  const [count, setCount] = useState("수량 입력");

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
      <form className="flex w-270 flex-col gap-16 pl-11">
        <div className="flex gap-8">
          <Dropdown
            selectedValue={price}
            onSelect={(value) => setPrice(value as string)}
            className="flex-1"
          >
            <Dropdown.Toggle>{price}</Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="지정가">지정가</Dropdown.Item>
              <Dropdown.Item value="현재가">현재가</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
          <div className="mb-4 w-100 rounded-2 border border-solid border-[#B6B6B6] p-13">
            시장가
          </div>
        </div>

        <div className="relative flex justify-between gap-6">
          <Dropdown
            selectedValue={count}
            onSelect={(value) => setCount(value as string)}
          >
            <Dropdown.Toggle border={false}>
              <span className="pr-10">수량</span>
            </Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="1">1</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
          <input
            type="text"
            placeholder="수량입력"
            className="flex-1 border-b border-solid border-[#505050] placeholder:absolute placeholder:bottom-6 placeholder:right-20 focus:outline-none"
          />
          <span className="absolute bottom-6 right-0">주</span>
        </div>

        <div className="relative flex justify-between gap-6">
          <label htmlFor="possible-stock" className="w-150">
            매수 가능 주식
          </label>
          <input
            id="possible-stock"
            type="text"
            placeholder="300"
            className="w-full border-b border-solid border-[#505050] placeholder:absolute placeholder:bottom-8 placeholder:right-20 focus:outline-none"
          />
          <span className="absolute bottom-6 right-0">주</span>
        </div>

        <div className="relative flex justify-between gap-6">
          <Dropdown
            selectedValue={count}
            onSelect={(value) => setCount(value as string)}
          >
            <Dropdown.Toggle border={false}>
              <span className="pr-10">호가</span>
            </Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="1">1</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
          <input
            type="text"
            placeholder="호가 입력"
            className="flex-1 border-b border-solid border-[#505050] placeholder:absolute placeholder:bottom-6 placeholder:right-20 focus:outline-none"
          />
          <span className="absolute bottom-6 right-0">원</span>
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
      </form>
    </div>
  );
}
