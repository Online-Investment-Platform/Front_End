import { createContext, ReactNode, useContext } from "react";

import { StockInfo } from "@/app/search/[id]/types";

interface StockInfoContextType {
  stockName: string;
  stockInfo: StockInfo;
}

const StockInfoContext = createContext<StockInfoContextType | undefined>(
  undefined,
);

export function useStockInfoContext(): StockInfoContextType {
  const context = useContext(StockInfoContext);
  if (!context) {
    throw new Error(
      "useStockInfoContext must be used within a StockInfoProvider",
    );
  }
  return context;
}

export function StockInfoProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: StockInfoContextType;
}) {
  return (
    <StockInfoContext.Provider value={value}>
      {children}
    </StockInfoContext.Provider>
  );
}
