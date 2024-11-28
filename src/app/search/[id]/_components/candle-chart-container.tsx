// candle-chart-container.tsx

"use client";

import { useEffect, useState } from "react";

import { ChartDTO, ChartResponse, PeriodType } from "../types";
import CandlestickChart from "./candle-chart";

interface Props {
  stockName: string;
  initialData: ChartResponse;
}

export default function CandlestickChartContainer({
  stockName,
  initialData,
}: Props) {
  const [period, setPeriod] = useState<PeriodType>("day");
  const [chartData, setChartData] = useState<ChartDTO[]>(initialData.chartDTOS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (currentPeriod: PeriodType) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/chart/${currentPeriod}?stockName=${stockName}`,
      );
      const data: ChartResponse = await response.json();
      setChartData(data.chartDTOS);
    } catch (error) {
      console.error("Error fetching chart data:", error); //eslint-disable-line
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (period !== "day") {
      fetchData(period);
    } else if (period === "day" && chartData !== initialData.chartDTOS) {
      // day로 돌아올 때 데이터가 초기 데이터와 다르면 새로 fetch
      fetchData(period);
    }
  }, [period, stockName, initialData.chartDTOS]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <button
          type="button"
          onClick={() => setPeriod("day")}
          className={`px-4 py-2 ${
            period === "day" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          일간
        </button>
        <button
          type="button"
          onClick={() => setPeriod("week")}
          className={`px-4 py-2 ${
            period === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          주간
        </button>
        <button
          type="button"
          onClick={() => setPeriod("month")}
          className={`px-4 py-2 ${
            period === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          월간
        </button>
      </div>

      <div className="overflow-x-auto">
        <CandlestickChart data={chartData} />
      </div>
    </div>
  );
}
