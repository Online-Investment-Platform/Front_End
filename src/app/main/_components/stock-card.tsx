"use client";

import { memo, useCallback, useEffect, useState } from "react";

import ArrowDownIcon from "@/icons/arrow-down.svg";
import ArrowUpIcon from "@/icons/arrow-up.svg";

import { StockIndexResponse } from "../types/index";

interface MarketIndexCardProps {
  endpoint: string; // 'kospi' or 'kosdaq'
}

function MarketIndexCard({ endpoint }: MarketIndexCardProps) {
  const [stockData, setStockData] = useState<StockIndexResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/home/index/${endpoint}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data: StockIndexResponse = await response.json();
      setStockData((prevData) => {
        if (
          !prevData ||
          prevData.indexValue !== data.indexValue ||
          prevData.fluctuationRate !== data.fluctuationRate
        ) {
          return data;
        }
        return prevData;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [endpoint]);

  useEffect(() => {
    fetchStockData();
    const intervalId = setInterval(fetchStockData, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchStockData]);

  if (error) {
    return (
      <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-md">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!stockData) return null;

  const fluctuationValue = parseFloat(stockData.fluctuationRate);
  const isNegative = fluctuationValue < 0;

  return (
    <div
      className={`h-116 w-308 shrink-0 flex-col items-start gap-12 rounded-10 p-20
          ${isNegative ? "bg-[#EFF6FB]" : "bg-[#FDEDED]"}`}
    >
      <div className="space-y-2">
        <h3 className="text-14-600 text-black">{stockData.indexName} 종합</h3>
        <div className="flex flex-col gap-1">
          <span className="text-28-700">
            {parseFloat(stockData.indexValue).toLocaleString("ko-KR")}
          </span>
          <div
            className={`flex items-center ${
              isNegative ? "text-[#1A00DF]" : "text-[#F12E35]"
            }`}
          >
            {isNegative ? <ArrowDownIcon /> : <ArrowUpIcon />}
            <span className="ml-3 text-14-600">
              {Math.abs(fluctuationValue)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MarketIndexCard);
