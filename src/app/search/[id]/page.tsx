import CandlestickChartContainer from "./_components/candle-chart-container";
import { ChartResponse, VolumeResponse } from "./types/index";

async function getInitialData(id: string) {
  try {
    const [chartResponse, volumeResponse] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/chart/day?stockName=${id}`,
        {
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/chart/tradingVolume/day?stockName=${id}`,
        {
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        },
      ),
    ]);

    if (!chartResponse.ok || !volumeResponse.ok) {
      throw new Error(`HTTP error! status: ${chartResponse.status}`);
    }

    const [chartData, volumeData] = await Promise.all([
      chartResponse.json() as Promise<ChartResponse>,
      volumeResponse.json() as Promise<VolumeResponse>,
    ]);

    return {
      chartData,
      volumeData,
    };
  } catch (error) {
    console.error("Error fetching data:", error); //eslint-disable-line
    throw error;
  }
}

export default async function StockPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const initialData = await getInitialData(params.id);
    const stockName = decodeURIComponent(params.id);
    return (
      <>
        <div className="mb-40 text-24-700">{stockName}</div>
        <CandlestickChartContainer
          stockName={params.id}
          initialChartData={initialData.chartData}
          initialVolumeData={initialData.volumeData}
        />
      </>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl mb-2 font-bold">데이터 로딩 실패</h2>
        <p>{errorMessage}</p>
        <p className="mt-2">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }
}
