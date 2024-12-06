import { getCookie } from "@/utils/next-cookies";

import StockSummary from "./_components/stock-summary";
import StockTable from "./_components/stock-table";

async function getStocks(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/account/stocks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  return response.json();
}

async function getTotalStocks(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/account/all-stocks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch total stock data");
  }

  return response.json();
}

export default async function StockPortfolioPage() {
  try {
    const token = await getCookie("token");

    if (!token) {
      throw new Error("토큰이 없습니다");
    }

    const [stocks, totalStocks] = await Promise.all([
      getStocks(token),
      getTotalStocks(token),
    ]);

    return (
      <div className="p-30">
        <h1 className="mb-30 ml-20 text-24-700">내 계좌</h1>
        <div className="mx-auto max-w-1200 rounded-10 bg-white p-20">
          <StockSummary totalStocks={totalStocks} />
          <StockTable stocks={stocks} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("데이터 조회 실패:", error); //eslint-disable-line

    // 에러 상태의 기본값 반환
    const defaultTotalStocks = {
      memberNickname: "",
      deposit: 0,
      totalEvaluationProfit: 0,
      totalPurchaseAmount: 0,
      totalEvaluationAmount: 0,
      estimatedAsset: 0,
      rank: 0,
    };

    // 에러 발생 시에도 UI는 표시하되, 빈 데이터로 표시
    return (
      <div className="p-30">
        <h1 className="mb-30 ml-20 text-24-700">내 계좌</h1>
        <div className="mx-auto max-w-1200 rounded-10 bg-white p-20">
          <StockSummary totalStocks={defaultTotalStocks} />
          <StockTable stocks={[]} />
        </div>
      </div>
    );
  }
}
