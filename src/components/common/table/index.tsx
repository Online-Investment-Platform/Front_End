import clsx from "clsx";
import { memo } from "react";

import { CommonTableColumn, CommonTableProps } from "./types";

const TEXT_ALIGN_MAP = {
  center: "text-center",
  right: "text-right",
  left: "",
} as const;

/**
 * 공통 테이블 컴포넌트
 *
 * @template T - 테이블 데이터 타입
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   age: number;
 * }
 *
 * const columns: CommonTableColumn<User>[] = [
 *   {
 *     key: 'name',
 *     header: '이름'
 *   },
 *   {
 *     key: 'age',
 *     header: '나이',
 *     align: 'right',
 *     render: (value) => `${value}세`
 *   }
 * ];
 *
 * const data: User[] = [
 *   { id: 1, name: '홍길동', age: 20 },
 *   { id: 2, name: '김철수', age: 25 }
 * ];
 *
 * <CommonTable<User>
 *   columns={columns}
 *   data={data}
 *   rowKeyField="id"
 *   className="w-full"
 *   onRowClick={(row) => console.log(row)}
 * />
 * ```
 *
 * @remarks
 * - 각 컬럼은 data 객체의 키와 일치하는 key를 가져야 합니다.
 * - rowKeyField는 data의 각 객체에서 고유한 값을 가지는 키여야 합니다.
 * - render 함수를 사용하여 셀의 출력을 커스터마이징할 수 있습니다.
 */
function CommonTable<T>({
  columns,
  data,
  rowKeyField,
  className,
  onRowClick,
}: CommonTableProps<T>) {
  const renderCell = (row: T, column: CommonTableColumn<T>) => {
    const value = row[column.key];
    return column.render ? column.render(value, row) : String(value ?? "");
  };

  const getColumnStyle = (column: CommonTableColumn<T>) => ({
    ...(column.width && { width: column.width }),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className={className}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={clsx("p-3", TEXT_ALIGN_MAP[column.align ?? "left"])}
                style={getColumnStyle(column)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const rowKey = String(row[rowKeyField]);

            return (
              <tr
                key={rowKey}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  onRowClick && "cursor-pointer hover:bg-gray-50",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={`${rowKey}-${String(column.key)}`}
                    className={clsx(
                      "p-3",
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
      </table>
    </div>
  );
}

export default memo(CommonTable);
