import { memo } from "react";

import FluctuationTable from "@/app/main/_components/flucctuate-table";
import NewsCarousel from "@/app/main/_components/news-carousel";
import RankingStock from "@/app/main/_components/ranking-stock";
import SearchStock from "@/app/main/_components/search-stock";
import StockIndexCarousel from "@/app/main/_components/stock-carousel";
import ErrorBoundary from "@/components/common/error-boundary";

import { Fluctuation, News, StockData, TradingVolume } from "../types";

interface MainContentProps {
  initialStockData: StockData;
  initialNews: News[];
  traddata: TradingVolume[];
  flucdata: Fluctuation[];
}

function MainContent({
  initialStockData,
  initialNews,
  traddata,
  flucdata,
}: MainContentProps) {
  return (
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
  );
}

export default memo(MainContent);
