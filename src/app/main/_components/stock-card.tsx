"use client";

import clsx from "clsx";
import { memo } from "react";

import ArrowDownIcon from "@/icons/arrow-down.svg";
import ArrowUpIcon from "@/icons/arrow-up.svg";
import DownGraphIcon from "@/icons/down-graph.svg";
import HighGraphIcon from "@/icons/high-graph.svg";

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
      className={clsx(
        "relative h-116 w-308 shrink-0 flex-col items-start gap-12 rounded-10 p-20",
        {
          "bg-[#EFF6FB]": isNegative,
          "bg-[#FDEDED]": !isNegative,
        },
      )}
      aria-label={`${endpoint} market index`}
    >
      <div className="space-y-2">
        <h3 className="text-14-600 text-black">{data.indexName} 종합</h3>
        <div className="flex flex-col gap-1">
          <span className="text-28-700">
            {parseFloat(data.indexValue).toLocaleString("ko-KR")}
          </span>
          <div
            className={clsx("flex items-center", {
              "text-[#1A00DF]": isNegative,
              "text-[#F12E35]": !isNegative,
            })}
          >
            {isNegative ? <ArrowDownIcon /> : <ArrowUpIcon />}
            <span className="ml-3 text-14-600">
              {Math.abs(fluctuationValue)}%
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-30 top-35 h-43 w-82">
        {isNegative ? <DownGraphIcon /> : <HighGraphIcon />}
      </div>
    </div>
  );
}

export default memo(MarketIndexCard);
