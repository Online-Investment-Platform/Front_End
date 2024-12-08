"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";
import { StockInfoProvider } from "@/context/stock-info-context";

import { StockInfo } from "../../types";
import EditCancel from "./edit-cancel";
import History from "./history";
import Trade from "./trade";

interface TransactionFormProps {
  stockName: string;
  stockInfo: StockInfo;
}

export default function TransactionForm({
  stockName,
  stockInfo,
}: TransactionFormProps) {
  return (
    <div className="ml-17 h-657 w-443 rounded-10 bg-white px-22 py-30">
      <h3 className="mb-16 text-20-700">거래하기</h3>
      <StockInfoProvider
        value={{
          stockName,
          stockInfo,
        }}
      >
        <Tabs defaultValue="buy">
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

          <TabsContent value="buy">
            <Trade type="buy" />
          </TabsContent>
          <TabsContent value="sell">
            <Trade type="sell" />
          </TabsContent>
          <TabsContent value="history">
            <History />
          </TabsContent>
          <TabsContent value="edit-cancel">
            <EditCancel />
          </TabsContent>
        </Tabs>
      </StockInfoProvider>
    </div>
  );
}
