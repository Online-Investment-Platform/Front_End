"use client";

import { Fragment, useId, useMemo } from "react";

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

  return (
    <div className="mt-30">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-1/4 border-r border-gray-200 bg-green-50 p-4 text-left font-normal">
              종목명
            </th>
            <th className="w-1/4 border-r border-gray-200 bg-green-50 p-4 font-normal">
              <div className="border-b border-gray-200 pb-2 text-center">
                매입가
              </div>
              <div className="pt-2 text-center text-gray-600">현재가</div>
            </th>
            <th className="w-1/4 border-r border-gray-200 bg-green-50 p-4 font-normal">
              <div className="border-b border-gray-200 pb-2 text-center">
                보유 수량
              </div>
              <div className="pt-2 text-center text-gray-600">가능 수량</div>
            </th>
            <th className="w-1/4 bg-green-50 p-4 font-normal">
              <div className="border-b border-gray-200 pb-2 text-center">
                평가 손익
              </div>
              <div className="pt-2 text-center text-gray-600">수익률</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stockRows.map((stock) => (
            <Fragment key={stock.id}>
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 p-4" rowSpan={2}>
                  {stock.stockName}
                </td>
                <td className="border-r border-gray-200 p-4 text-right">
                  {stock.purchaseAmount?.toLocaleString() ?? 0}원
                </td>
                <td className="border-r border-gray-200 p-4 text-center">
                  {stock.stockCount ?? 0}
                </td>
                <td className="p-4 text-right">
                  {stock.ProfitRate?.toFixed(1) ?? 0}%
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="border-r border-gray-200 p-4 text-right">
                  {stock.currentPrice?.toLocaleString() ?? 0}원
                </td>
                <td className="border-r border-gray-200 p-4 text-center">
                  {stock.stockCount ?? 0}
                </td>
                <td className="p-4 text-right">
                  {stock.prevChangeRate?.toFixed(1) ?? 0}%
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
