import CandlestickChartContainer from "./_components/candle-chart-container";
import StockHeader from "./_components/stock-header";
import TransactionForm from "./_components/transaction-form";
import { ChartResponse, StockInfo, VolumeResponse } from "./types";

async function getInitialData(id: string) {
  try {
    const [chartResponse, volumeResponse, stockResponse] = await Promise.all([
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/stock?stockName=${id}`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    if (!chartResponse.ok || !volumeResponse.ok || !stockResponse.ok) {
      throw new Error(`HTTP error! status: ${chartResponse.status}`);
    }

    const [chartData, volumeData, stockData] = await Promise.all([
      chartResponse.json() as Promise<ChartResponse>,
      volumeResponse.json() as Promise<VolumeResponse>,
      stockResponse.json() as Promise<StockInfo>,
    ]);

    return {
      chartData,
      volumeData,
      stockData,
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
    return (
      <div className="px-40 py-30">
        <StockHeader
          stockName={params.id}
          initialStockInfo={initialData.stockData}
        />
        <div className="flex justify-around">
          <CandlestickChartContainer
            stockName={params.id}
            initialChartData={initialData.chartData}
            initialVolumeData={initialData.volumeData}
          />
          <TransactionForm />
        </div>
      </div>
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
