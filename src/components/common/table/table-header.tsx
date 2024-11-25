import clsx from "clsx";
import { memo } from "react";

import { DEFAULT_STYLES, TEXT_ALIGN_MAP } from "./constant";
import { TableHeaderProps } from "./types";

/**
 * 테이블 헤더 컴포넌트
 * @example
 * ```tsx
 * <TableHeader<User>
 *   columns={columns}
 *   className="bg-gray-100"
 *   cellClassName="p-4 font-medium"
 * />
 * ```
 */
function TableHeader<T>({
  columns,
  className,
  cellClassName = DEFAULT_STYLES.cell,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className={className}>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={clsx(
              cellClassName,
              TEXT_ALIGN_MAP[column.align ?? "left"],
            )}
            style={column.width ? { width: column.width } : undefined}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default memo(TableHeader);
