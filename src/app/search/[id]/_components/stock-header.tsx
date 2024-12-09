"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { fetchStockInfo } from "@/api/candle-chart";
import BackIcon from "@/icons/arrow-left.svg";

import { StockInfo } from "../types";

interface StockHeaderProps {
  stockName: string;
  initialStockInfo: StockInfo;
}

function StockHeader({ stockName, initialStockInfo }: StockHeaderProps) {
  const router = useRouter();

  const { data: stockInfo } = useQuery({
    queryKey: ["stockInfo", stockName],
    queryFn: () => fetchStockInfo(stockName),
    initialData: initialStockInfo,
    // refetchInterval: 5000,
  });

  const isPositive = parseFloat(stockInfo.contrastRatio) > 0;
  const isNegative = parseFloat(stockInfo.contrastRatio) < 0;

  const formatPrice = (price: string) =>
    parseInt(price, 10).toLocaleString("ko-KR");

  return (
    <div className="mb-20 flex w-full items-center justify-between gap-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-15">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex size-13 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <BackIcon className="size-16" />
          </button>
          <div className="text-24-700">{decodeURIComponent(stockName)}</div>
        </div>
        <div className="ml-30 flex items-center gap-4">
          <div className="text-16-700">
            현재가 {formatPrice(stockInfo.stockPrice)}원
          </div>
          <div
            className={clsx("text-14-500", {
              "text-red-500": isPositive,
              "text-blue-500": isNegative,
              "text-gray-500": !isPositive && !isNegative,
            })}
          >
            {isPositive ? "+" : ""}
            {formatPrice(stockInfo.previousStockPrice)}원 (
            {stockInfo.contrastRatio}
            %)
          </div>
        </div>
      </div>
      <div className="mr-40 flex gap-10 text-16-600">
        <div className="flex flex-col gap-5">
          <div className="text-gray-600">1일 최저</div>
          <div className="text-right">
            {formatPrice(stockInfo.lowStockPrice)}원
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-gray-600">1일 최고</div>
          <div className="text-right">
            {formatPrice(stockInfo.highStockPrice)}원
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockHeader;
