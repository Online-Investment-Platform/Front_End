"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

import { fetchStockInfo } from "@/api/candle-chart";
import { StockInfo } from "@/app/search/[id]/types";

interface StockInfoContextType {
  stockName: string;
  stockInfo: StockInfo | null;
  isLoading: boolean;
}

const StockInfoContext = createContext<StockInfoContextType | undefined>(
  undefined,
);

interface StockInfoProviderProps {
  children: ReactNode;
  value: {
    stockName: string;
    stockInfo?: StockInfo;
  };
}

export function StockInfoProvider({
  children,
  value: { stockName, stockInfo: initialStockInfo },
}: StockInfoProviderProps) {
  const { data: stockInfo, isLoading } = useQuery({
    queryKey: ["stockInfo", stockName],
    queryFn: () => fetchStockInfo(stockName),
    initialData: initialStockInfo,
    // refetchInterval: 5000,
  });

  const contextValue = useMemo(
    () => ({
      stockName,
      stockInfo: stockInfo ?? initialStockInfo ?? null,
      isLoading,
    }),
    [stockName, stockInfo, initialStockInfo, isLoading],
  );

  return (
    <StockInfoContext.Provider value={contextValue}>
      {children}
    </StockInfoContext.Provider>
  );
}

export function useStockInfoContext(): StockInfoContextType {
  const context = useContext(StockInfoContext);
  if (!context) {
    throw new Error(
      "useStockInfoContext must be used within a StockInfoProvider",
    );
  }
  return context;
}
