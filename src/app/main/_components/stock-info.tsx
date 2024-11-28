"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { CommonTableColumn } from "@/components/common/table";
import { TableBody } from "@/components/common/table";
import { useAuth } from "@/hooks/use-auth";
import magnifierIcon from "@/images/stockInfo.png";

interface StockHolding {
  stockName: string;
  currentPrice: number;
  prevChangeRate: number;
}

interface StockCountResponse {
  count: string;
}

type MyStockResponse = StockHolding[];

function StockTable({ data }: { data: StockHolding[] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const getTextColorByRate = (rate: number) => {
    if (rate > 0) return "text-red-500";
    if (rate < 0) return "text-blue-500";
    return "text-gray-500";
  };

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
            <div className="text-12-400 text-gray-500">5주</div>
          </div>
        </div>
      ),
    },
    {
      key: "currentPrice",
      header: "",
      align: "right",
      width: "50%",
      render: (value, row) => {
        const currentPrice = Number(value);
        const rateColor = getTextColorByRate(row.prevChangeRate);
        const priceChange = Math.round(
          (row.prevChangeRate * currentPrice) / 100,
        );

        return (
          <div className="text-right">
            <div className="text-14-600">{currentPrice.toLocaleString()}원</div>
            <div className={`text-12-400 ${rateColor}`}>
              {row.prevChangeRate > 0 ? "+" : ""}
              {priceChange.toLocaleString()}원 ({row.prevChangeRate.toFixed(1)}
              %)
            </div>
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
  const { isAuthenticated, token } = useAuth();
  const [stockCount, setStockCount] = useState<string | null>(null);
  const [stockHoldings, setStockHoldings] = useState<StockHolding[]>([]);

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const [countResponse, stockResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/home/sidebar/myStockCount`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/sidebar/myStock`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (countResponse.ok && stockResponse.ok) {
          const countData: StockCountResponse = await countResponse.json();
          const stockData: MyStockResponse = await stockResponse.json();

          console.log("API Response:", stockData); //eslint-disable-line

          setStockCount(countData.count);
          setStockHoldings(stockData);
        }
      } catch (error) {
        console.error("보유 주식 정보 조회 실패:", error); //eslint-disable-line
        setStockHoldings([]);
      }
    };

    if (isAuthenticated && token) {
      fetchStockInfo();
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated || stockCount === "0") {
    return (
      <div className="relative h-308 w-300 rounded-10 bg-[#F5F5F5] p-21">
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
    <div className="relative h-auto min-h-308 w-300 rounded-10 bg-[#F5F5F5] p-21">
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
