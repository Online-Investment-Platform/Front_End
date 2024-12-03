"use client";

import { useId, useMemo } from "react";

import { Stock } from "../types";

interface StockTableProps {
  stocks: Stock[] | null | undefined;
}

export default function StockTable({ stocks }: StockTableProps) {
  const tableId = useId();

  const stockRows = useMemo(() => {
    if (!stocks || !Array.isArray(stocks)) return [];
    return stocks.map((stock) => ({
      ...stock,
      id: `${tableId}-${stock.stockName}`,
    }));
  }, [stocks, tableId]);

  const getPriceColorClass = (value: number) => {
    if (value > 0) return "text-red-500";
    if (value < 0) return "text-blue-500";
    return "";
  };

  return (
    <div className="mt-40">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="w-[16%] border-r border-gray-200 bg-green-50 p-8 text-left text-16-600"
            >
              종목명
            </th>
            <th
              colSpan={2}
              className="w-[42%] border-b border-r border-gray-200 bg-green-50 p-8 text-center text-16-600"
            >
              평가손익
            </th>
            <th
              rowSpan={2}
              className="w-[16%] border-r border-gray-200 bg-green-50 p-8 text-center text-16-600"
            >
              보유수량
            </th>
            <th
              colSpan={2}
              className="w-[26%] border-b border-gray-200 bg-green-50 p-8 text-center text-16-600"
            >
              평가금액
            </th>
          </tr>
          <tr className="bg-green-50">
            <th className="border-r border-gray-200 p-8 text-center text-16-600 ">
              금액
            </th>
            <th className="border-r border-gray-200 p-8 text-center text-16-600 ">
              수익률
            </th>
            <th className="border-r border-gray-200 p-8 text-center text-16-600 ">
              매입가
            </th>
            <th className="p-8 text-center text-16-600">현재가</th>
          </tr>
        </thead>
        <tbody>
          {stockRows.map((stock) => (
            <tr key={stock.id} className="border-b border-gray-200">
              <td className="border-r border-gray-200 p-4 text-18-600">
                {stock.stockName}
              </td>
              <td
                className={`border-r border-gray-200 p-8 text-right text-16-600 ${getPriceColorClass(stock.EvaluationProfit)}`}
              >
                {stock.EvaluationProfit > 0 && "+"}
                {stock.EvaluationProfit?.toLocaleString() ?? 0}
              </td>
              <td
                className={`border-r border-gray-200 p-8 text-right text-16-600 ${getPriceColorClass(stock.ProfitRate)}`}
              >
                {stock.ProfitRate > 0 && "+"}
                {stock.ProfitRate?.toFixed(2) ?? 0} %
              </td>
              <td className="border-r border-gray-200 p-8 text-center text-16-600">
                {stock.stockCount ?? 0}
              </td>
              <td className="border-r border-gray-200 p-8 text-right text-16-600">
                {(stock.purchaseAmount / stock.stockCount)?.toLocaleString() ??
                  0}
              </td>
              <td className="p-4">
                <div className="mb-5 text-right text-16-400">
                  {stock.currentPrice?.toLocaleString() ?? 0}
                </div>
                <div
                  className={`text-right text-14-600 ${getPriceColorClass(stock.prevChangeRate)}`}
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
