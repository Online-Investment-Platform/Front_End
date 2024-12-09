import {
  ChartResponse,
  PeriodType,
  StockInfo,
  VolumeResponse,
} from "@/app/search/[id]/types";

interface ChartDataResponse {
  chartData: ChartResponse;
  volumeData: VolumeResponse;
}

export async function fetchChartData(
  stockName: string,
  period: PeriodType,
): Promise<ChartDataResponse> {
  const encodedStockName = encodeURIComponent(stockName);

  const [chartResponse, volumeResponse] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/chart/${period}?stockName=${encodedStockName}`,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/chart/tradingVolume/${period}?stockName=${encodedStockName}`,
    ),
  ]);

  if (!chartResponse.ok || !volumeResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  const [chartData, volumeData] = await Promise.all([
    chartResponse.json() as Promise<ChartResponse>,
    volumeResponse.json() as Promise<VolumeResponse>,
  ]);

  return { chartData, volumeData };
}

export async function fetchStockInfo(stockName: string): Promise<StockInfo> {
  const encodedStockName = encodeURIComponent(stockName);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/stock?stockName=${encodedStockName}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock info");
  }

  return response.json() as Promise<StockInfo>;
}
