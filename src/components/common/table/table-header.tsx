"use client";

import clsx from "clsx";
import { memo } from "react";

import { DEFAULT_STYLES, TEXT_ALIGN_MAP } from "./constant";
import { TableHeaderProps } from "./types";

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

export default memo(TableHeader) as <T>(
  props: TableHeaderProps<T>,
) => React.ReactElement;
