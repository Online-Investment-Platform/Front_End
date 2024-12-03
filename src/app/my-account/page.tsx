import { getCookie } from "@/utils/next-cookies";

import StockSummary from "./_components/stock-summary";
import StockTable from "./_components/stock-table";

async function getStocks() {
  try {
    const token = await getCookie("token");
    const response = await fetch(`your-api-url/account/stocks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("주식 데이터 조회 실패:", error); //eslint-disable-line
    return [];
  }
}

async function getTotalStocks() {
  try {
    const token = await getCookie("token");
    const response = await fetch(`your-api-url/account/all-stocks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("총 주식 데이터 조회 실패:", error); //eslint-disable-line
    return {
      totalEvaluationProfit: 0,
      totalPurchaseAmount: 0,
      totalProfit: 0,
      totalEvaluationAmount: 0,
    };
  }
}

export default async function StockPortfolioPage() {
  const stocks = await getStocks();
  const totalStocks = await getTotalStocks();

  return (
    <div className="p-30">
      <h1 className="mb-30 ml-20 text-24-700 ">내 계좌</h1>
      <div className="mx-auto max-w-1200 rounded-10 bg-white p-20">
        <StockSummary totalStocks={totalStocks} />
        <StockTable stocks={stocks} />
      </div>
    </div>
  );
}
