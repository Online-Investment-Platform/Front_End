"use client";

import { useQuery } from "@tanstack/react-query";

import getFinancialStatements from "@/api/company-details";
import { useStockInfoContext } from "@/context/stock-info-context";
import { FinancialRatio } from "@/types/company-details";

import LoadingSpinner from "../../loading-spinner";

type FinancialRatioKey = keyof FinancialRatio;

type NumberKeys = {
  [K in FinancialRatioKey]: FinancialRatio[K] extends number ? K : never;
}[FinancialRatioKey];

type FinancialMetric = {
  label: string;
  key: NumberKeys;
  isPercentage?: boolean;
};

const FINANCIAL_METRICS: FinancialMetric[] = [
  {
    label: "총마진율",
    key: "grossMarginRatio" as NumberKeys,
    isPercentage: true,
  },
  {
    label: "사업 수익률",
    key: "businessProfitRate" as NumberKeys,
    isPercentage: true,
  },
  {
    label: "순이자율",
    key: "netInterestRate" as NumberKeys,
    isPercentage: true,
  },
  { label: "ROE", key: "roeValue" as NumberKeys, isPercentage: true },
  { label: "EPS(주당순이익)", key: "earningsPerShare" as NumberKeys },
  { label: "SPS(주당매출액)", key: "salesPerShare" as NumberKeys },
  { label: "BPS(주당순자산)", key: "bookValuePerShare" as NumberKeys },
  { label: "주식유보율", key: "reserveRate" as NumberKeys, isPercentage: true },
  { label: "부채율", key: "liabilityRate" as NumberKeys, isPercentage: true },
];

const formatValue = (value: number | null, isPercentage?: boolean) => {
  if (value === null) return "-";
  const formattedNumber = value.toLocaleString();
  return isPercentage ? `${formattedNumber}%` : formattedNumber;
};

function TableHeader({ years }: { years: string[] }) {
  return (
    <thead className="border-y border-solid border-gray-100 bg-green-100">
      <tr className="h-45">
        <th
          rowSpan={2}
          className="border-r border-solid border-gray-100 text-16-500"
        >
          주요재무정보
        </th>
        <th colSpan={years.length} className="text-16-500">
          연간
        </th>
      </tr>
      <tr className="h-45 border-t border-solid border-gray-100">
        {years.map((year) => (
          <th
            key={year}
            className="border-x border-solid border-gray-100 text-16-500 last:border-r-0"
          >
            {year}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow({
  label,
  values,
  isPercentage,
}: {
  label: string;
  values: (number | null)[];
  isPercentage?: boolean;
}) {
  return (
    <tr className="h-45 border-y border-solid border-gray-100">
      <th className="border-r border-solid border-gray-100 text-16-500">
        {label}
      </th>
      {values.map((value, index) => (
        <td
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="border-r border-solid border-gray-100 last:border-r-0"
        >
          {formatValue(value, isPercentage)}
        </td>
      ))}
    </tr>
  );
}

function NoDataMessage() {
  return (
    <div className="w-full p-8 text-center text-gray-500">
      데이터가 없습니다.
    </div>
  );
}

export default function FinancialStatements() {
  const { stockName } = useStockInfoContext();

  const {
    data: financialStatements,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["financialStatements", `${stockName}`],
    queryFn: () => getFinancialStatements(stockName),
  });

  if (!financialStatements || financialStatements.length === 0) {
    return <NoDataMessage />;
  }

  if (isLoading || isPending) {
    return <LoadingSpinner />;
  }

  const years = financialStatements.map(
    (item) => item.stockAccountingYearMonth,
  );

  return (
    <table className="mb-20 w-full">
      <caption className="mb-10 text-left text-16-500">재무비율</caption>
      <TableHeader years={years} />
      <tbody className="text-center">
        {FINANCIAL_METRICS.map((metric) => (
          <TableRow
            key={metric.key}
            label={metric.label}
            values={financialStatements.map((item) =>
              item[metric.key] !== undefined ? Number(item[metric.key]) : null,
            )}
            isPercentage={metric.isPercentage}
          />
        ))}
      </tbody>
    </table>
  );
}
