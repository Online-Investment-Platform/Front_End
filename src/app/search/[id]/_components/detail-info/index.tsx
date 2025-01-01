"use client";

import { useQuery } from "@tanstack/react-query";

import { getRelativeNews } from "@/api/company-details";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";
import { StockInfoProvider } from "@/context/stock-info-context";

import LoadingSpinner from "../loading-spinner";
import CompanyOverview from "./company-overview";
import RelativeNews from "./relative-news";

interface DetailInfoProps {
  stockName: string;
}
export default function DetailInfo({ stockName }: DetailInfoProps) {
  const {
    data: relativeNews,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["relativeNews", `${stockName}`],
    queryFn: () => getRelativeNews(stockName),
  });

  if (isLoading || isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-16 rounded-10 bg-white p-30">
      <h3 className="mb-25 text-20-700">상세 정보</h3>
      <Tabs defaultValue="company-overview">
        <TabsList>
          <TabsTrigger value="company-overview">기업 개요</TabsTrigger>
          <TabsTrigger value="relative-news">관련 뉴스</TabsTrigger>
        </TabsList>
        <StockInfoProvider value={{ stockName }}>
          <TabsContent value="company-overview">
            <CompanyOverview newsData={relativeNews} />
          </TabsContent>
          <TabsContent value="relative-news">
            <RelativeNews newsData={relativeNews} />
          </TabsContent>
        </StockInfoProvider>
      </Tabs>
    </div>
  );
}
