"use client";

import clsx from "clsx";
import { memo } from "react";

import { DEFAULT_STYLES, TEXT_ALIGN_MAP } from "./constant";
import { CommonTableColumn, TableBodyProps } from "./types";
/**
 * 테이블 바디 컴포넌트
 * @example
 * ```tsx
 * <TableBody<User>
 *   columns={columns}
 *   data={users}
 *   rowKeyField="id"
 *   cellClassName="p-4"
 *   onRowClick={(user) => console.log(user)}
 * />
 * ```
 */
function TableBody<T>({
  columns,
  data,
  rowKeyField,
  className,
  cellClassName = DEFAULT_STYLES.cell,
  onRowClick,
}: TableBodyProps<T>) {
  const renderCell = (row: T, column: CommonTableColumn<T>) => {
    const value = row[column.key];
    return column.render ? column.render(value, row) : String(value ?? "");
  };

  return (
    <tbody className={className}>
      {data.map((row) => {
        const rowKey = String(row[rowKeyField]);

        return (
          <tr
            key={rowKey}
            onClick={() => onRowClick?.(row)}
            className={clsx(onRowClick && "cursor-pointer hover:bg-gray-50")}
          >
            {columns.map((column) => (
              <td
                key={`${rowKey}-${String(column.key)}`}
                className={clsx(
                  cellClassName,
                  TEXT_ALIGN_MAP[column.align ?? "left"],
                )}
              >
                {renderCell(row, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default memo(TableBody);
