import { ColumnsType, TableProps } from "antd/lib/table";
import { StateMessageType } from "../StateMessage";

export type columnProps<T = Record<string, any>> = {
  title: string | React.ReactNode;
  label?: string;
  dataIndex?: string;
  width?: string;
  tooltip?: string;
  align?: "left" | "right" | "center";

  render?: (text: string, record: T, index: number) => React.ReactNode;
};

export type TableListProps<T = Record<string, any>> = {
  columns: columnProps<T>[];
  dataSource: T[];
  rowClick?: (item: T) => void;
  pagination?: {
    pageSize: number;
    page: number;
    totalCount: number;
    changePagination: (page: number, pageSize: number) => void;
  };
  stateMessage?: StateMessageType;
  refreshTable?: () => void;
} & TableProps<T>;
