"use client";

import clsx from "clsx";
import { memo } from "react";

import { TableBody, TableHeader } from "@/components/common/table";
import type {
  CommonTableColumn,
  TableBodyProps,
  TableHeaderProps,
} from "@/components/common/table/types";

interface Fluctuation {
  rank: number;
  stockName: string;
  currentPrice: number;
  prevChangePrice: number;
  prevSign: string;
  prevChangeRate: number;
}

interface Props {
  data: Fluctuation[];
}

const TableHeaderWithGeneric = TableHeader as <T>(
  props: TableHeaderProps<T>,
) => JSX.Element;
const TableBodyWithGeneric = TableBody as <T>(
  props: TableBodyProps<T>,
) => JSX.Element;

// 숫자 포맷 함수
const formatNumber = (value: number) =>
  new Intl.NumberFormat("ko-KR").format(value);

const columns: CommonTableColumn<Fluctuation>[] = [
  {
    key: "rank",
    header: "",
    width: "40px",
    render: (value, row) => (
      <span className="text-16-700 text-green-500">{row.rank}</span>
    ),
  },
  {
    key: "stockName",
    header: "",
    render: (value, row) => (
      <span className="text-14-600">{row.stockName}</span>
    ),
  },
  {
    key: "currentPrice",
    header: "",
    align: "right",
    render: (value, row) => (
      <div className="text-right">
        <div className="text-14-600">{formatNumber(row.currentPrice)}원</div>
        <div
          className={clsx(
            "inline-flex items-center text-12-600",
            row.prevChangeRate > 0 ? "text-red-500" : "text-blue-500",
          )}
        >
          <div className="inline-flex items-center">
            <span className="mr-0.5">{row.prevChangeRate > 0 ? "+" : "-"}</span>
            <span>{formatNumber(Math.abs(row.prevChangePrice))}원</span>
          </div>
          <span className="ml-1">
            ({row.prevChangeRate > 0 ? "+" : "-"}
            {Math.abs(row.prevChangeRate)}%)
          </span>
        </div>
      </div>
    ),
  },
];

function FluctuationTable({ data }: Props) {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-16-600">등락률</h2>
      <div>
        <table className="w-full">
          <TableHeaderWithGeneric<Fluctuation>
            columns={columns}
            cellClassName="p-2 text-14-600 text-gray-500 border-b"
          />
          <TableBodyWithGeneric<Fluctuation>
            columns={columns}
            data={data}
            rowKeyField="rank"
            cellClassName="p-2 border-b"
          />
        </table>
      </div>
    </div>
  );
}

export default memo(FluctuationTable);
