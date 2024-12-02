"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ChartDTO,
  ChartResponse,
  PeriodType,
  VolumeDTO,
  VolumeResponse,
} from "../types";
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
  const [chartData, setChartData] = useState<ChartDTO[]>(
    initialChartData.chartDTOS,
  );
  const [volumeData, setVolumeData] = useState<VolumeDTO[]>(
    initialVolumeData.dtoList,
  );
  const [isLoading, setIsLoading] = useState(false);

  const resetToInitialData = useCallback(() => {
    setChartData(initialChartData.chartDTOS);
    setVolumeData(initialVolumeData.dtoList);
  }, [initialChartData.chartDTOS, initialVolumeData.dtoList]);

  useEffect(() => {
    if (period === "day") {
      resetToInitialData();
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [chartResponse, volumeResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/search/chart/${period}?stockName=${stockName}`,
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/search/chart/tradingVolume/${period}?stockName=${stockName}`,
          ),
        ]);

        if (!chartResponse.ok || !volumeResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [newChartData, newVolumeData] = await Promise.all([
          chartResponse.json() as Promise<ChartResponse>,
          volumeResponse.json() as Promise<VolumeResponse>,
        ]);

        setChartData(newChartData.chartDTOS);
        setVolumeData(newVolumeData.dtoList);
      } catch (error) {
        console.error("Error fetching data:", error); //eslint-disable-line
      }
      setIsLoading(false);
    };

    fetchData();
  }, [period, stockName, resetToInitialData]);

  return (
    <div className="w-650 rounded-lg bg-white p-10 pl-20 shadow-sm">
      <div className="mb-4 space-x-8">
        <button
          type="button"
          onClick={() => setPeriod("day")}
          className={`rounded-md px-4 py-2 text-16-400 transition-colors ${
            period === "day"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          일
        </button>
        <button
          type="button"
          onClick={() => setPeriod("week")}
          className={`rounded-md px-4 py-2 text-16-400 transition-colors ${
            period === "week"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          주
        </button>
        <button
          type="button"
          onClick={() => setPeriod("month")}
          className={`rounded-md px-4 py-2 text-16-400 transition-colors ${
            period === "month"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          월
        </button>
      </div>

      <div className="overflow-x-auto">
        <CandlestickChart
          data={chartData}
          volumeData={volumeData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
