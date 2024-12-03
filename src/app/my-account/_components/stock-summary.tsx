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
            <td className="w-1/3 border border-gray-200 bg-green-50 p-10 text-center text-18-600">
              총 손익
            </td>
            <td className="w-1/3 border border-gray-200 p-10 text-right text-18-400">
              {totalStocks?.totalEvaluationProfit?.toLocaleString() ?? 0}원
            </td>
            <td className="w-1/3 border border-gray-200 p-10 text-right text-18-400 text-green-500">
              {totalStocks?.totalProfit?.toFixed(1) ?? 0}%
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-10 text-center text-18-600">
              총 매입
            </td>
            <td
              colSpan={2}
              className="border border-gray-200 p-10 text-right text-18-400"
            >
              {totalStocks?.totalPurchaseAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-10 text-center text-18-600">
              총 평가
            </td>
            <td
              colSpan={2}
              className="border border-gray-200 p-10 text-right text-18-400"
            >
              {totalStocks?.totalEvaluationAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-10 text-center text-18-600">
              실현 손익
            </td>
            <td
              colSpan={2}
              className="border border-gray-200 p-10 text-right text-18-400"
            >
              {totalStocks?.totalEvaluationProfit?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-10 text-center text-18-600">
              추정 자산
            </td>
            <td
              colSpan={2}
              className="border border-gray-200 p-10 text-right text-18-400"
            >
              {totalStocks?.totalEvaluationAmount?.toLocaleString() ?? 0}원
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="border border-gray-200 p-10 text-18-600 text-gray-600"
            >
              총 순위 {totalStocks?.rank.toLocaleString() ?? 0}위
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
