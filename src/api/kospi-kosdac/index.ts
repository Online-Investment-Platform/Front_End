export interface StockIndexResponse {
  indexName: string;
  indexValue: string;
  fluctuationRate: string;
}

interface StockData {
  kospi: StockIndexResponse | null;
  kosdaq: StockIndexResponse | null;
}

async function getInitialStockData(): Promise<StockData> {
  try {
    const [kospiRes, kosdaqRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/index/kospi`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/index/kosdaq`),
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
