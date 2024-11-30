"use client";

import { memo } from "react";

import ArrowDownIcon from "@/icons/arrow-down.svg";
import ArrowUpIcon from "@/icons/arrow-up.svg";

import type { StockIndexResponse } from "../types";

interface MarketIndexCardProps {
  endpoint: string;
  data: StockIndexResponse | null;
}

function MarketIndexCard({ endpoint, data }: MarketIndexCardProps) {
  if (!data) return null;

  const fluctuationValue = parseFloat(data.fluctuationRate);
  const isNegative = fluctuationValue < 0;

  return (
    <div
      className={`h-116 w-308 shrink-0 flex-col items-start gap-12 rounded-10 p-20
          ${isNegative ? "bg-[#EFF6FB]" : "bg-[#FDEDED]"}`}
      aria-label={`${endpoint} market index`}
    >
      <div className="space-y-2">
        <h3 className="text-14-600 text-black">{data.indexName} 종합</h3>
        <div className="flex flex-col gap-1">
          <span className="text-28-700">
            {parseFloat(data.indexValue).toLocaleString("ko-KR")}
          </span>
          <div
            className={`flex items-center ${
              isNegative ? "text-[#1A00DF]" : "text-[#F12E35]"
            }`}
          >
            {isNegative ? (
              <ArrowDownIcon className="fill-[#1A00DF]" />
            ) : (
              <ArrowUpIcon />
            )}
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
