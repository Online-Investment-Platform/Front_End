/* eslint-disable */
import CandlestickChartContainer from "./_components/candle-chart-container";
import { ChartResponse } from "./types/index";

async function getInitialChartData(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/search/chart/day?stockName=${id}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response status:", response.status);
      console.error("Response text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Promise를 await으로 처리
    return (await response.json()) as ChartResponse;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw new Error("Failed to fetch chart data");
  }
}

export default async function StockPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const initialData = await getInitialChartData(params.id);
    return (
      <CandlestickChartContainer
        stockName={params.id}
        initialData={initialData}
      />
    );
  } catch (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl mb-2 font-bold">데이터 로딩 실패</h2>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }
}
