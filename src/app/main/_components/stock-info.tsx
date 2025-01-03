"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { StockHolding } from "@/api/side-Info/index";
import { fetchMyStocks, fetchStockCount } from "@/api/side-Info/index";
import type { CommonTableColumn } from "@/components/common/table";
import { TableBody } from "@/components/common/table";
import { useAuth } from "@/hooks/use-auth";
import magnifierIcon from "@/images/stockInfo.png";

import { MyStockInfoSkeleton } from "./skeleton";

function StockTable({ data }: { data: StockHolding[] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const columns: CommonTableColumn<StockHolding>[] = [
    {
      key: "stockName",
      header: "종목명",
      width: "50%",
      render: (_, row) => (
        <div className="flex items-center gap-8">
          <div className="size-24 rounded bg-yellow-400 text-center text-16-600">
            M
          </div>
          <div>
            <div className="text-14-600">{row.stockName}</div>
            <div className="text-12-400 text-gray-500">{row.stockCount}주</div>
          </div>
        </div>
      ),
    },
    {
      key: "buyPrice",
      header: "",
      align: "right",
      width: "50%",
      render: (value) => {
        const currentPrice = Number(value);
        return (
          <div className="text-right">
            <div className="text-14-600">{currentPrice.toLocaleString()}원</div>
          </div>
        );
      },
    },
  ];

  return (
    <table className="w-full">
      <TableBody<StockHolding>
        columns={columns}
        data={data}
        rowKeyField="stockName"
        cellClassName="py-12 border-b border-gray-100 last:border-0"
      />
    </table>
  );
}

export default function MyStockInfo() {
  const { isAuthenticated, token, isInitialized } = useAuth();
  const [stockCount, setStockCount] = useState<string | null>(null);

  const { data: stockHoldings } = useQuery({
    queryKey: ["myStocks"],
    queryFn: () => fetchMyStocks(token!),
    enabled: !!isAuthenticated && !!token,
    refetchOnMount: true,
    staleTime: 0,
  });

  useEffect(() => {
    const getStockCount = async () => {
      try {
        const countData = await fetchStockCount(token!);
        setStockCount(countData.count);
      } catch (error) {
        console.error("보유 주식 수 조회 실패:", error); //eslint-disable-line
      }
    };

    if (isAuthenticated && token) {
      getStockCount();
    }
  }, [isAuthenticated, token]);

  if (!isInitialized) {
    return <MyStockInfoSkeleton />;
  }

  if (!isAuthenticated || stockCount === "0") {
    return (
      <div className="relative h-308 w-300 rounded-10 bg-red-300 p-21">
        <div className="mb-10">
          <h2 className="text-20-700">내 투자</h2>
          <p className="mt-12 text-14-600">
            아직 보유 종목이
            <br />
            없어요!
          </p>
        </div>
        <div className="absolute top-4 ml-90">
          <Image
            src={magnifierIcon}
            alt="돋보기 아이콘"
            width={210}
            height={210}
          />
        </div>
        <p className="absolute bottom-21 text-16-600">나의 보유 주식</p>
      </div>
    );
  }

  return (
    <div className="relative h-auto min-h-308 w-300 rounded-10 bg-red-300 p-21">
      <div className="mb-10">
        <h2 className="text-20-700">내 투자</h2>
        <p className="mt-12 text-14-600">
          총 {stockCount}개
          <br />
          투자했어요!
        </p>
      </div>
      <div className="absolute top-4 ml-90">
        <Image src={magnifierIcon} alt="주식 아이콘" width={210} height={210} />
      </div>
      <div className="mt-90">
        <p className="mb-10 text-16-600">나의 보유 주식</p>
        {stockHoldings && stockHoldings.length > 0 && (
          <StockTable data={stockHoldings} />
        )}
      </div>
    </div>
  );
}
