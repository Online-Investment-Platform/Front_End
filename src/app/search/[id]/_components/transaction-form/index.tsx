"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/tabs";
import { StockInfoProvider } from "@/context/stock-info-context";
import { useAuth } from "@/hooks/use-auth";

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
  const { isAuthenticated } = useAuth();

  return (
    <div className="ml-17 h-630 min-w-450 rounded-10 bg-white px-22 py-30">
      <h3 className="mb-16 text-20-700">거래하기</h3>
      {isAuthenticated ? (
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
      ) : (
        <div className="relative">
          <Image
            src="/images/login-guard.png"
            alt="보안 아이콘"
            width={300}
            height={300}
            className="absolute right-1/2 top-40 translate-x-1/2"
          />
          <div className="relative top-250 w-full text-center leading-8">
            <span className="text-20-700">로그인이 필요해요!</span>
            <br />
            <span className="text-16-500 text-gray-500">
              가상 거래를 하기 위해서는 로그인이 필수적이에요!
            </span>
            <Link
              href="/login"
              className="m-auto mt-40 block w-150 rounded-4 bg-[#11E977] py-16 text-center text-16-700"
            >
              로그인 하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
