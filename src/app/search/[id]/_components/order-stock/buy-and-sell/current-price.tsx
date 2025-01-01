/* eslint-disable react/no-array-index-key */

"use client";

import { useStockInfoContext } from "@/context/stock-info-context";
import { getKoreanPrice } from "@/utils/price";

export default function CurrentPrice() {
  const { stockInfo } = useStockInfoContext();

  if (!stockInfo) {
    return <div>주식 정보를 불러오고 있습니다.</div>;
  }

  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-127 bg-blue-100 py-11 text-center">
          {getKoreanPrice(stockInfo.stockPrice)}
        </div>
      ))}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-127 bg-red-100 py-11 text-center">
          {getKoreanPrice(stockInfo.stockPrice)}
        </div>
      ))}
    </div>
  );
}
