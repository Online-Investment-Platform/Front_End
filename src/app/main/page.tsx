import { QueryClient } from "@tanstack/react-query";

import getInitialStockData from "@/api/kospi-kosdac/index";
import getNews from "@/api/news";
import { getFluctuation, getTradingVolume } from "@/api/ranking-table/index";
import FluctuationTable from "@/app/main/_components/flucctuate-table";
import NewsCarousel from "@/app/main/_components/news-carousel";
import RankingStock from "@/app/main/_components/ranking-stock";
import SearchStock from "@/app/main/_components/search-stock";
import StockIndexCarousel from "@/app/main/_components/stock-carousel";

export default async function Home() {
  const queryClient = new QueryClient();

  // Pre-fetch initial data
  const initialStockData = await getInitialStockData();
  await queryClient.prefetchQuery({
    queryKey: ["stockIndex"],
    queryFn: getInitialStockData,
    initialData: initialStockData,
  });

  // 뉴스 데이터도 프리페치
  const initialNews = await getNews();
  await queryClient.prefetchQuery({
    queryKey: ["news"],
    queryFn: getNews,
    initialData: initialNews,
  });

  const [traddata, flucdata] = await Promise.all([
    getTradingVolume(),
    getFluctuation(),
  ]);

  return (
    <div className="lg:max-w-2000 flex h-screen flex-col px-4 py-10 pt-30 md:px-25 lg:px-32">
      <SearchStock />
      <StockIndexCarousel initialData={initialStockData} />
      <div className="flex flex-col gap-20">
        <h2 className="mt-80 text-24-700">실시간 랭킹</h2>
        <div className="flex w-full gap-30">
          <div className="w-full">
            <RankingStock data={traddata} />
          </div>
          <div className="w-full">
            <FluctuationTable data={flucdata} />
          </div>
        </div>
        <NewsCarousel initialData={initialNews} />
      </div>
    </div>
  );
}
