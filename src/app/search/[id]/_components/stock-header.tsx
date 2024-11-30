"use client";

import clsx from "clsx";

import { StockInfo } from "../types";

interface StockHeaderProps {
  stockName: string;
  initialStockInfo: StockInfo;
}

function StockHeader({ stockName, initialStockInfo }: StockHeaderProps) {
  const isPositive = parseFloat(initialStockInfo.contrastRatio) > 0;
  const isNegative = parseFloat(initialStockInfo.contrastRatio) < 0;

  const formatPrice = (price: string) =>
    parseInt(price, 10).toLocaleString("ko-KR");

  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex flex-col gap-8">
        <div className="mr-20 text-24-700">{decodeURIComponent(stockName)}</div>
        <div className="flex items-center gap-4">
          <div className="text-16-700">
            현재가 {formatPrice(initialStockInfo.stockPrice)}원
          </div>
          <div
            className={clsx("text-14-500", {
              "text-red-500": isPositive,
              "text-blue-500": isNegative,
              "text-gray-500": !isPositive && !isNegative,
            })}
          >
            {isPositive ? "+" : ""}
            {formatPrice(initialStockInfo.contrastRatio)}원 (
            {initialStockInfo.contrastRatio}
            %)
          </div>
        </div>
      </div>
      <div className="mr-40 flex gap-10 text-16-600">
        <div className="flex flex-col gap-5">
          <div className="text-gray-600">1일 최저</div>
          <div className="text-right">
            {formatPrice(initialStockInfo.lowStockPrice)}원
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-gray-600">1일 최고</div>
          <div className="text-right">
            {formatPrice(initialStockInfo.highStockPrice)}원
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockHeader;
