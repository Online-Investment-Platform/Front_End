export interface CommonTableColumn<T> {
  key: keyof T;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableHeaderProps<T> {
  columns: CommonTableColumn<T>[];
  className?: string;
  cellClassName?: string;
}

export interface TableBodyProps<T> {
  columns: CommonTableColumn<T>[];
  data: T[];
  rowKeyField: keyof T;
  className?: string;
  cellClassName?: string;
  onRowClick?: (row: T) => void;
}
