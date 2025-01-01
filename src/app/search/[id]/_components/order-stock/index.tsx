"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";
import { StockInfoProvider } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

import { StockInfo, TradeType } from "../../types";
import LoadingSpinner from "../loading-spinner";
import BuyAndSell from "./buy-and-sell";
import EditCancel from "./edit-cancel";
import OrderStockLayout from "./layout";
import LoginNotice from "./login-notice";
import OrderHistory from "./order-history";

interface OrderStockProps {
  stockName: string;
  stockInfo: StockInfo;
}

export default function OrderStock({ stockName, stockInfo }: OrderStockProps) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <OrderStockLayout>
        <LoadingSpinner />
      </OrderStockLayout>
    );
  }

  return (
    <OrderStockLayout>
      {isAuthenticated ? (
        <StockInfoProvider
          value={{
            stockName,
            stockInfo,
          }}
        >
          <Tabs defaultValue="buy" areaLabel="거래옵션">
            <TabsList>
              <TabsTrigger value="buy" buttonColor="red">
                매수
              </TabsTrigger>
              <TabsTrigger value="sell" buttonColor="blue">
                매도
              </TabsTrigger>
              <TabsTrigger value="history">체결내역</TabsTrigger>
              <TabsTrigger value="edit-cancel">정정 / 취소</TabsTrigger>
            </TabsList>
            <TabsContent value={TradeType.Buy}>
              <BuyAndSell type={TradeType.Buy} />
            </TabsContent>
            <TabsContent value={TradeType.Sell}>
              <BuyAndSell type={TradeType.Sell} />
            </TabsContent>
            <TabsContent value="history">
              <OrderHistory />
            </TabsContent>
            <TabsContent value="edit-cancel">
              <EditCancel />
            </TabsContent>
          </Tabs>
        </StockInfoProvider>
      ) : (
        // 로그인 안되어있으면 로그인 유도
        <LoginNotice />
      )}
    </OrderStockLayout>
  );
}
