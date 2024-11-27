"use client";

import clsx from "clsx";
import { memo } from "react";

import { TableBody, TableHeader } from "@/components/common/table";
import type {
  CommonTableColumn,
  TableBodyProps,
  TableHeaderProps,
} from "@/components/common/table/types";

interface TradingVolume {
  stockName: string;
  rank: number;
  currentPrice: number;
  totalVolume: number;
  prevVolume: number;
  volumeChangeRate: number;
}

interface Props {
  data: TradingVolume[];
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

const columns: CommonTableColumn<TradingVolume>[] = [
  {
    key: "rank",
    header: "",
    width: "40px",
    render: (value, row) => (
      <span className="text-16-700 text-[#1DA65A]">{row.rank}</span>
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
    key: "totalVolume",
    header: "",
    align: "right",
    render: (value, row) => (
      <div className="text-right">
        <div className="text-14-600">{formatNumber(row.totalVolume)}</div>
        <div
          className={clsx(
            "inline-flex items-center text-12-600",
            row.volumeChangeRate > 0 ? "text-red-500" : "text-blue-500",
          )}
        >
          <div className="inline-flex items-center">
            <span className="mr-0.5">
              {row.volumeChangeRate > 0 ? "+" : "-"}
            </span>
            <span>
              {formatNumber(Math.abs(row.prevVolume - row.totalVolume))}
            </span>
          </div>
          <span className="ml-1">
            ({row.volumeChangeRate > 0 ? "+" : "-"}
            {Math.abs(row.volumeChangeRate)}%)
          </span>
        </div>
      </div>
    ),
  },
];

function TradingVolumeTable({ data }: Props) {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-16-600">거래량</h2>
      <div>
        <table className="w-full">
          <TableHeaderWithGeneric<TradingVolume>
            columns={columns}
            cellClassName="p-2 text-14-600 text-gray-500 border-b"
          />
          <TableBodyWithGeneric<TradingVolume>
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

export default memo(TradingVolumeTable);
