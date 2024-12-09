"use client";

import clsx from "clsx";
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
  const [showMA, setShowMA] = useState(false);
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

  const getButtonClasses = (isActive: boolean) =>
    clsx(
      "rounded-md px-4 py-2 text-16-700 transition-colors",
      isActive
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "bg-gray-100 hover:bg-gray-200",
    );

  return (
    <div className="shadow-s w-full max-w-1700 rounded-lg bg-white px-30 pt-20">
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
