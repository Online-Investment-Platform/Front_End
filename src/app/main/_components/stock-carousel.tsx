"use client";

import { useCallback, useEffect, useState } from "react";

import Carousel from "@/components/common/carousel";

import type { StockIndexResponse } from "../types";
import MarketIndexCard from "./stock-card";

function StockIndexCarousel() {
  const [stockData, setStockData] = useState<{
    kospi: StockIndexResponse | null;
    kosdaq: StockIndexResponse | null;
  }>({
    kospi: null,
    kosdaq: null,
  });

  const fetchAllStockData = useCallback(async () => {
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

      setStockData((prev) => {
        const newData = { ...prev };

        if (!prev.kospi || prev.kospi.indexValue !== kospiData.indexValue) {
          newData.kospi = kospiData;
        }
        if (!prev.kosdaq || prev.kosdaq.indexValue !== kosdaqData.indexValue) {
          newData.kosdaq = kosdaqData;
        }

        return newData;
      });
    } catch (error) {
      console.error("Error fetching stock data:", error); //eslint-disable-line
    }
  }, []);

  useEffect(() => {
    fetchAllStockData();
    const intervalId = setInterval(fetchAllStockData, 300000);

    return () => clearInterval(intervalId);
  }, [fetchAllStockData]);

  return (
    <Carousel title="주가 지수" autoPlay autoPlayInterval={10000}>
      <MarketIndexCard endpoint="kospi" data={stockData.kospi} />
      <MarketIndexCard endpoint="kosdaq" data={stockData.kosdaq} />
    </Carousel>
  );
}

export default StockIndexCarousel;
