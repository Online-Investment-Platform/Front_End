import StockTable from "./_components/stock-table";
import { StockData } from "./types";

async function getStockData(): Promise<StockData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/stock-data`,
  );
  if (!res.ok) throw new Error("데이터 로딩 실패");
  return res.json();
}

export default async function SearchPage() {
  const data = await getStockData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-60 text-24-700">투자 상품 검색하기</h1>
      <div className="mb-4 text-16-500 text-black">
        검색된 투자 상품: {data.length}개
      </div>
      <StockTable initialData={data} />
    </div>
  );
}