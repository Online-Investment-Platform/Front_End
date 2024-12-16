import { memo } from "react";

import NewsCarousel from "@/app/main/_components/news-carousel";
import SearchStock from "@/app/main/_components/search-stock";
import StockIndexCarousel from "@/app/main/_components/stock-carousel";
import ErrorBoundary from "@/components/common/error-boundary";

import { Fluctuation, News, StockData, TradingVolume } from "../types";
import RankingSection from "./ranking-section";

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

      <RankingSection traddata={traddata} flucdata={flucdata} />

      <ErrorBoundary errorMessage="뉴스를 불러올 수 없습니다">
        <NewsCarousel initialData={initialNews} />
      </ErrorBoundary>
    </div>
  );
}

export default memo(MainContent);
