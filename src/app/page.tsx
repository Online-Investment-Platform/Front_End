import { QueryClient } from "@tanstack/react-query";

import getInitialStockData from "@/api/kospi-kosdac/index";
import getNews from "@/api/news";
import { getFluctuation, getTradingVolume } from "@/api/ranking-table/index";
import AssetInfo from "@/app/main/_components/asset-info";
import FluctuationTable from "@/app/main/_components/flucctuate-table";
import NewsCarousel from "@/app/main/_components/nes-carousel";
import RankingStock from "@/app/main/_components/ranking-stock";
import SearchStock from "@/app/main/_components/search-stock";
import StockIndexCarousel from "@/app/main/_components/stock-carousel";
import MyStockInfo from "@/app/main/_components/stock-info";

export default async function Home() {
  const queryClient = new QueryClient();

  const initialStockData = await getInitialStockData();
  await queryClient.prefetchQuery({
    queryKey: ["stockIndex"],
    queryFn: getInitialStockData,
    initialData: initialStockData,
  });

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
    <div className="flex">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-1 flex-col p-10 pt-30 md:px-25 lg:max-w-[calc(100%-320px)] lg:px-32">
        <SearchStock />
        <StockIndexCarousel initialData={initialStockData} />
        <div className="flex flex-col gap-20">
          <h2 className="mt-80 text-24-700">실시간 랭킹</h2>
          <div className="flex w-full gap-30">
            <div className="mr-50 w-full">
              <RankingStock data={traddata} />
            </div>
            <div className="w-full">
              <FluctuationTable data={flucdata} />
            </div>
          </div>
          <NewsCarousel initialData={initialNews} />
        </div>
      </div>

      {/* 우측 사이드바 */}
      <div className="w-330 shrink-0">
        <div className="sticky top-24 flex flex-col gap-16">
          <AssetInfo />
          <MyStockInfo />
        </div>
      </div>
    </div>
  );
}
