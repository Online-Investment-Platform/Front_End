"use client";

import Link from "next/link";

import {
  CommonTableColumn,
  TableBody,
  TableHeader,
} from "@/components/common/table";

import { StockData } from "../types";

interface Props {
  initialData: StockData[];
}

export default function StockTable({ initialData }: Props) {
  const getChangeColor = (rate: string): string => {
    const numRate = Number(rate);
    if (numRate > 0) return "text-red-500";
    if (numRate < 0) return "text-blue-500";
    return "text-gray-500";
  };

  const formatChange = (value: string): string => {
    const numValue = Number(value);
    return numValue > 0 ? `+${value}` : value;
  };

  const columns: CommonTableColumn<StockData>[] = [
    {
      key: "rank",
      header: "",
      width: "60px",
      align: "center",
      render: (value) => (
        <span className="text-15-400 font-medium text-[#757575]">{value}</span>
      ),
    },
    {
      key: "stockName",
      header: "투자 상품 종류",
      render: (_, row) => (
        <Link href={`/search/${row.stockName}`}>
          <div className="flex items-center">
            <div className="size-30 min-w-30 rounded-full bg-blue-600" />
            <div className="relative ml-4 flex items-center">
              <span className="text-15-600 mr-2 hover:text-blue-600">
                {row.stockName}
              </span>
              <div className="inline-flex items-center rounded bg-[#E8F5E9] px-2 py-0.5">
                <span className="whitespace-nowrap text-14-600 text-black">
                  주식
                </span>
              </div>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: "stockPrice",
      header: "현재가",
      align: "right",
      render: (value) => `${Number(value).toLocaleString()}원`,
    },
    {
      key: "prevChangeRate",
      header: "등락률",
      align: "right",
      render: (rate, row) => (
        <div className={`flex flex-col items-end ${getChangeColor(rate)}`}>
          <div>{formatChange(rate)}%</div>
          <div>{formatChange(row.prevChangePrice)}원</div>
        </div>
      ),
    },
    {
      key: "marketCapitalization",
      header: "시가총액",
      align: "right",
      render: (value) => `${(Number(value) / 1000).toFixed(1)}조`,
    },
    {
      key: "tradingVolume",
      header: "거래량",
      align: "right",
      render: (value) => `${Number(value).toLocaleString()}주`,
    },
  ];

  return (
    <div>
      <table className="w-full min-w-1024">
        <TableHeader
          columns={columns}
          className="h-12"
          cellClassName="px-6 text-15-500 text-[#757575] font-normal"
        />
        <TableBody
          columns={columns}
          data={initialData}
          rowKeyField="rank"
          cellClassName="px-6 py-4 text-sm"
        />
      </table>
    </div>
  );
}
