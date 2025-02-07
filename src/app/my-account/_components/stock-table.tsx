"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

import { Stock } from "../types";

interface StockTableProps {
  stocks: Stock[] | null | undefined;
}

export default function StockTable({ stocks }: StockTableProps) {
  const stockRows = useMemo(() => {
    if (!stocks || !Array.isArray(stocks)) return [];
    return stocks.map((stock) => ({
      ...stock,
      id: stock.stockName,
    }));
  }, [stocks]);

  const getEvaluationProfitWithSign = (profit: number, rate: number) => {
    const absProfit = Math.abs(profit);
    return rate < 0 ? -absProfit : absProfit;
  };

  return (
    <div className="mt-40">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="w-[16%] border-r border-gray-200 bg-green-50 p-8 text-left text-16-500"
            >
              종목명
            </th>
            <th
              colSpan={2}
              className="w-[42%] border-b border-r border-gray-200 bg-green-50 p-8 text-center text-16-500"
            >
              평가손익
            </th>
            <th
              rowSpan={2}
              className="w-[16%] border-r border-gray-200 bg-green-50 p-8 text-center text-16-500"
            >
              보유수량
            </th>
            <th
              colSpan={2}
              className="w-[26%] border-b border-gray-200 bg-green-50 p-8 text-center text-16-500"
            >
              평가금액
            </th>
          </tr>
          <tr className="bg-green-50">
            <th className="border-r border-gray-200 p-8 text-center text-16-500">
              금액
            </th>
            <th className="border-r border-gray-200 p-8 text-center text-16-500">
              수익률
            </th>
            <th className="border-r border-gray-200 p-8 text-center text-16-500">
              매입가
            </th>
            <th className="p-8 text-center text-16-500">현재가</th>
          </tr>
        </thead>
        <tbody>
          {stockRows.map((stock) => (
            <tr key={stock.id} className="border-b border-gray-200">
              <td className="border-r border-gray-200 p-4">
                <Link
                  href={`/search/${encodeURIComponent(stock.stockName)}`}
                  className="cursor-pointer text-16-500 hover:text-blue-600 hover:underline"
                >
                  {stock.stockName}
                </Link>
              </td>
              <td
                className={clsx(
                  "border-r border-gray-200 p-8 text-right text-16-500",
                  {
                    "text-red-500": stock.ProfitRate > 0,
                    "text-blue-500": stock.ProfitRate < 0,
                  },
                )}
              >
                {getEvaluationProfitWithSign(
                  stock.EvaluationProfit,
                  stock.ProfitRate,
                ) > 0 && "+"}
                {getEvaluationProfitWithSign(
                  stock.EvaluationProfit,
                  stock.ProfitRate,
                ).toLocaleString()}
              </td>
              <td
                className={clsx(
                  "border-r border-gray-200 p-8 text-right text-16-500",
                  {
                    "text-red-500": stock.ProfitRate > 0,
                    "text-blue-500": stock.ProfitRate < 0,
                  },
                )}
              >
                {stock.ProfitRate > 0 && "+"}
                {stock.ProfitRate?.toFixed(2) ?? 0} %
              </td>
              <td className="border-r border-gray-200 p-8 text-center text-16-500">
                {stock.stockCount ?? 0}
              </td>
              <td className="border-r border-gray-200 p-8 text-right text-16-500">
                {stock.purchaseAmount?.toLocaleString() ?? 0}
              </td>
              <td className="p-4">
                <div className="mb-5 text-right text-16-500">
                  {stock.currentPrice?.toLocaleString() ?? 0}
                </div>
                <div
                  className={clsx("text-right text-14-500", {
                    "text-red-500": stock.prevChangeRate > 0,
                    "text-blue-500": stock.prevChangeRate < 0,
                  })}
                >
                  <span className="text-14-600 text-gray-500">어제보다 </span>
                  {stock.prevChangeRate > 0 && "+"}
                  {stock.prevChangeRate?.toFixed(2) ?? 0} %
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
