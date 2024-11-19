"use client";

import { useQuery } from "@tanstack/react-query";

import getInitialStockData from "@/api/kospi-kosdac/index";
import Carousel from "@/components/common/carousel";

import type { StockIndexResponse } from "../types";
import MarketIndexCard from "./stock-card";

interface StockIndexCarouselProps {
  initialData: {
    kospi: StockIndexResponse | null;
    kosdaq: StockIndexResponse | null;
  };
}

function StockIndexCarousel({ initialData }: StockIndexCarouselProps) {
  const { data: stockData } = useQuery({
    queryKey: ["stockIndex"],
    queryFn: getInitialStockData,
    initialData,
    refetchInterval: 300000,
    refetchOnWindowFocus: false,
  });

  return (
    <Carousel title="주가 지수" autoPlay autoPlayInterval={10000}>
      <MarketIndexCard endpoint="kospi" data={stockData.kospi} />
      <MarketIndexCard endpoint="kosdaq" data={stockData.kosdaq} />
    </Carousel>
  );
}

export default StockIndexCarousel;
