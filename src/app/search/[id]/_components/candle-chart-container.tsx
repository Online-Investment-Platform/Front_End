"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

import { fetchChartData } from "@/api/candle-chart";

import { ChartResponse, PeriodType, VolumeResponse } from "../types";
import CandlestickChart from "./candle-chart";

interface Props {
  stockName: string;
  initialChartData: ChartResponse;
  initialVolumeData: VolumeResponse;
}

export default function CandlestickChartContainer({
  stockName,
  initialChartData,
  initialVolumeData,
}: Props) {
  const [period, setPeriod] = useState<PeriodType>("day");
  const [showMA, setShowMA] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["chart", stockName, period],
    queryFn: () => fetchChartData(stockName, period),
    initialData:
      period === "day"
        ? { chartData: initialChartData, volumeData: initialVolumeData }
        : undefined,
    // refetchInterval: 5000,
  });

  const chartData = data?.chartData.chartDTOS ?? [];
  const volumeData = data?.volumeData.dtoList ?? [];

  const getButtonClasses = (isActive: boolean) =>
    clsx(
      "rounded-md px-4 py-2 text-16-700 transition-colors",
      isActive
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "bg-gray-100 hover:bg-gray-200",
    );

  return (
    <div className="shadow-s w-full min-w-765 max-w-1700 rounded-lg bg-white px-30 pt-20">
      <div className="mb-40 flex justify-between">
        <div>
          <span className="text-18-700">차트</span>
        </div>
        <div className="flex gap-10">
          <button
            type="button"
            onClick={() => setPeriod("day")}
            className={getButtonClasses(period === "day")}
          >
            일
          </button>
          <button
            type="button"
            onClick={() => setPeriod("week")}
            className={getButtonClasses(period === "week")}
          >
            주
          </button>
          <button
            type="button"
            onClick={() => setPeriod("month")}
            className={getButtonClasses(period === "month")}
          >
            월
          </button>
          <button
            type="button"
            onClick={() => setShowMA(!showMA)}
            className={getButtonClasses(showMA)}
          >
            MA
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <CandlestickChart
          data={chartData}
          volumeData={volumeData}
          isLoading={isLoading}
          showMA={showMA}
        />
      </div>
    </div>
  );
}
