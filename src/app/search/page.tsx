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
    <div className="lg:max-w-2000 container mx-auto flex h-screen flex-col p-4 py-8 pt-30 md:px-12 lg:px-32">
      <h1 className="mb-60 text-24-700">TOP10 주식 조회하기</h1>
      <div className="mb-4 text-16-500 text-black">
        검색된 투자 상품: {data.length}개
      </div>
      <StockTable initialData={data} />
    </div>
  );
}
