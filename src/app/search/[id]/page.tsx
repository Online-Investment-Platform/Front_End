import Link from "next/link";

import CandlestickChartContainer from "./_components/candle-chart-container";
import OrderStock from "./_components/order-stock";
import StockHeader from "./_components/stock-header";
import TutorialContainer from "./_components/tutorial/tutorial-container";
import DetailInfo from "./detail-info";
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
    const stockName = decodeURIComponent(params.id);
    return (
      <div className="p-30">
        <TutorialContainer />
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

          <OrderStock stockName={stockName} stockInfo={initialData.stockData} />
        </div>
        <DetailInfo />
      </div>
    );
  } catch (error) {
    console.error("Error in StockPage:", error); //eslint-disable-line
    return (
      <div className="lg:max-w-2000 flex h-screen w-full min-w-400 flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white px-4 py-8 md:px-12 lg:px-16">
        <div className="shadow-lg w-full max-w-md rounded-20">
          <div className="flex w-full flex-col items-center justify-center p-8">
            <h2 className="mb-4 text-24-700 text-gray-800">검색 결과 없음</h2>
            <p className="mb-2 text-20-700 text-gray-600">
              {decodeURIComponent(params.id)} 종목을 찾을 수 없습니다
            </p>
            <p className="text-16-500 text-gray-500">
              정확한 종목명 또는 종목코드를 입력해주세요
            </p>
            <Link
              href="/"
              className="mt-8 rounded-lg bg-green-400 px-15 py-10 text-14-600 text-white transition-colors hover:bg-green-700"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
