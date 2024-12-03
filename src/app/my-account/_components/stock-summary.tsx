"use client";

import { useAuth } from "@/hooks/use-auth";

import { TotalStocks } from "../types";

interface StockSummaryProps {
  totalStocks: TotalStocks;
}

export default function StockSummary({ totalStocks }: StockSummaryProps) {
  const { memberNickName } = useAuth();

  return (
    <div>
      <div className="mb-4">
        <div className="text-gray-600">성명</div>
        <div>{memberNickName}</div>
      </div>

      <table className="mt-20 w-full border-collapse">
        <tbody>
          <tr>
            <td className="w-1/3 border border-gray-200 bg-green-50 p-4">
              총 손익
            </td>
            <td className="w-1/3 border border-gray-200 p-4 text-right">
              {totalStocks?.totalEvaluationProfit?.toLocaleString() ?? 0}원
            </td>
            <td className="w-1/3 border border-gray-200 p-4 text-right text-green-500">
              {totalStocks?.totalProfit?.toFixed(1) ?? 0}%
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-4">총 매입</td>
            <td colSpan={2} className="border border-gray-200 p-4 text-right">
              {totalStocks?.totalPurchaseAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-4">총 평가</td>
            <td colSpan={2} className="border border-gray-200 p-4 text-right">
              {totalStocks?.totalEvaluationAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-4">실현 손익</td>
            <td colSpan={2} className="border border-gray-200 p-4 text-right">
              {totalStocks?.totalEvaluationProfit?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-4">추정 자산</td>
            <td colSpan={2} className="border border-gray-200 p-4 text-right">
              {totalStocks?.totalEvaluationAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="border border-gray-200 p-4 text-14-600 text-gray-600"
            >
              내 순위: 월 손익률 순위 조회 (모두 전체)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
