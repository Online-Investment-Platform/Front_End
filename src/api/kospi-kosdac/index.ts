import { StockData } from "@/app/main/types";

async function getInitialStockData(): Promise<StockData> {
  try {
    const [kospiRes, kosdaqRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/index/kospi`, {
        cache: "no-store",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/index/kosdaq`, {
        cache: "no-store",
      }),
    ]);

    if (!kospiRes.ok || !kosdaqRes.ok) {
      throw new Error("Failed to fetch stock data");
    }

    const [kospiData, kosdaqData] = await Promise.all([
      kospiRes.json(),
      kosdaqRes.json(),
    ]);

    return {
      kospi: kospiData,
      kosdaq: kosdaqData,
    };
  } catch (error) {
    console.error("Error fetching stock data:", error); //eslint-disable-line
    return {
      kospi: null,
      kosdaq: null,
    };
  }
}

export default getInitialStockData;
