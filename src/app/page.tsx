import { QueryClient } from "@tanstack/react-query";

import getInitialStockData from "@/api/kospi-kosdac/index";
import getNews from "@/api/news";
import { getFluctuation, getTradingVolume } from "@/api/ranking-table/index";
import AssetInfo from "@/app/main/_components/asset-info";
import FluctuationTable from "@/app/main/_components/flucctuate-table";
import NewsCarousel from "@/app/main/_components/news-carousel";
import RankingStock from "@/app/main/_components/ranking-stock";
import SearchStock from "@/app/main/_components/search-stock";
import StockIndexCarousel from "@/app/main/_components/stock-carousel";
import MyStockInfo from "@/app/main/_components/stock-info";
import ErrorBoundary from "@/components/common/error-boundary";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: 1,
      },
    },
  });

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
    <div className="flex xxl:px-230">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-1 flex-col p-10 pt-30 md:px-32 lg:max-w-[calc(100%-320px)]">
        <ErrorBoundary errorMessage="검색 기능을 일시적으로 사용할 수 없습니다">
          <SearchStock />
        </ErrorBoundary>

        <ErrorBoundary errorMessage="주가 정보를 불러올 수 없습니다">
          <StockIndexCarousel initialData={initialStockData} />
        </ErrorBoundary>

        <div className="flex flex-col gap-20">
          <h2 className="mt-80 text-24-700">실시간 랭킹</h2>
          <div className="flex w-full gap-30">
            <div className="mr-50 w-full">
              <ErrorBoundary errorMessage="거래량 순위를 불러올 수 없습니다">
                <RankingStock data={traddata} />
              </ErrorBoundary>
            </div>
            <div className="w-full">
              <ErrorBoundary errorMessage="변동폭 순위를 불러올 수 없습니다">
                <FluctuationTable data={flucdata} />
              </ErrorBoundary>
            </div>
          </div>
          <ErrorBoundary errorMessage="뉴스를 불러올 수 없습니다">
            <NewsCarousel initialData={initialNews} />
          </ErrorBoundary>
        </div>
      </div>
      {/* 우측 사이드바 */}
      <div className="w-330 shrink-0">
        <div className="sticky top-24 flex flex-col gap-16">
          <ErrorBoundary errorMessage="자산 정보를 불러올 수 없습니다">
            <AssetInfo />
          </ErrorBoundary>
          <ErrorBoundary errorMessage="관심 종목을 불러올 수 없습니다">
            <MyStockInfo />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
