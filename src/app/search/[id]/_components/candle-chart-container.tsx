// candle-chart-container.tsx

"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    // day인 경우에는 초기 데이터를 그대로 사용
    if (period === "day") {
      setChartData(initialChartData.chartDTOS);
      setVolumeData(initialVolumeData.dtoList);
      return;
    }

    // day가 아닌 경우에만 새로운 데이터를 가져옴
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
  }, [period, stockName]);

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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CandlestickChart data={chartData} volumeData={volumeData} />
        )}
      </div>
    </div>
  );
}
