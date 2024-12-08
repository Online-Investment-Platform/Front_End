/* eslint-disable react/no-array-index-key */

"use client";

import { useStockInfoContext } from "@/context/stock-info-context";
import { getKoreanPrice } from "@/utils/price";

export default function CurrentPrice() {
  const { stockInfo } = useStockInfoContext();

  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-127 bg-[#EDF1FC] py-11 text-center">
          {getKoreanPrice(stockInfo.stockPrice)}
        </div>
      ))}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-127 bg-[#FDEBEB] py-11 text-center">
          {getKoreanPrice(stockInfo.stockPrice)}
        </div>
      ))}
    </div>
  );
}
