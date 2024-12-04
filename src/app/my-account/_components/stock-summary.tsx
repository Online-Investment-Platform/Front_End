import { TotalStocks } from "../types";

interface StockSummaryProps {
  totalStocks: TotalStocks;
}

export default function StockSummary({ totalStocks }: StockSummaryProps) {
  const getValueWithColor = (value: number | null | undefined) => {
    if (!value) {
      return { text: "0", className: "" };
    }

    let className = "";
    if (value > 0) {
      className = "text-red-500";
    } else if (value < 0) {
      className = "text-blue-500";
    }

    const text = `${value > 0 ? "+" : ""}${value.toLocaleString()}`;

    return { text, className };
  };

  const evaluationProfit = getValueWithColor(
    totalStocks?.totalEvaluationProfit,
  );

  return (
    <div className="w-full">
      <table className="mb-30 w-full border-collapse">
        <tbody>
          <tr>
            <td className="w-1/4 border border-gray-200 bg-green-50 p-10 text-center text-16-500">
              닉네임
            </td>
            <td className="w-1/4 border border-gray-200 p-10 text-center text-16-500">
              {totalStocks?.memberNickname}
            </td>
            <td className="w-1/4 border border-gray-200 bg-green-50 p-10 text-center text-16-500">
              예수금
            </td>
            <td className="w-1/4 border border-gray-200 p-10 text-center text-16-500">
              {totalStocks?.deposit?.toLocaleString() ?? 0}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse">
        <tbody>
          {/* 총 평가 손익 */}
          <tr>
            <td
              colSpan={2}
              className="border border-gray-200 bg-green-50 p-20 text-center text-20-700"
            >
              총 평가 손익
            </td>
            <td
              colSpan={2}
              className={`border border-gray-200 p-20 text-center text-20-700 ${evaluationProfit.className}`}
            >
              {evaluationProfit.text}
            </td>
          </tr>

          {/* 총 평가 금액과 매입/자산 정보 */}
          <tr>
            <td
              rowSpan={2}
              className="border border-gray-200 p-10 text-center text-16-500"
            >
              총 평가 금액
            </td>
            <td
              rowSpan={2}
              className="border border-gray-200 p-4 text-center text-16-500"
            >
              {totalStocks?.totalEvaluationAmount?.toLocaleString() ?? 0}
            </td>
            <td className="border border-gray-200 p-10 text-center text-16-500">
              총 매입 금액
            </td>
            <td className="border border-gray-200 p-10 text-center text-16-500">
              {totalStocks?.totalPurchaseAmount?.toLocaleString() ?? 0}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-10 text-center text-16-500">
              추정 자산
            </td>
            <td className="border border-gray-200 p-10 text-center text-16-500">
              {totalStocks?.estimatedAsset?.toLocaleString() ?? 0}
            </td>
          </tr>

          {/* 랭킹 */}
          <tr>
            <td className="border border-gray-200 p-10 text-center text-16-500">
              랭킹
            </td>
            <td
              colSpan={3}
              className="border border-gray-200 p-10 text-left text-16-500"
            >
              {totalStocks?.rank ?? 0}등
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
