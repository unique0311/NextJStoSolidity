import { Popover } from "antd";

import StateMessage from "@/components/StateMessage";
import { InfoCircleOutlined } from "@ant-design/icons";

import type { TableListProps, columnProps } from "./types";
import Loading from "../Loading";
import style from "./index.module.scss";
export const getColumnWidth = (columns: columnProps[]): string => {
  // let len = columns.length;
  // const haveWidth = columns.reduce((preV, item) => {
  //   if (item.width) {
  //     len -= 1;
  //     return preV + parseInt(item.width);
  //   } else {
  //     return preV;
  //   }
  // }, 0);
  // const defaultArr = (100 - haveWidth) / len + "%";
  const widthArr = columns.map((item) => item.width || "1fr");
  const widthStr = widthArr.join(" ");
  return widthStr;
};
const Table: React.FC<TableListProps> = ({ loading, columns, dataSource, rowClick, stateMessage, refreshTable }) => {
  return (
    <div className={style["table-list-component"]}>
      <div
        className="table-header"
        style={{ gridTemplateColumns: getColumnWidth(columns) }}>
        {columns.map((column) => {
          return (
            <div
              className={`header-item ${column.align}`}
              key={column.title?.toString()}>
              <div>
                <p className="title">{column.title}</p>
                {column.label ? <p className="label">{column.label}</p> : null}
              </div>

              {column.tooltip ? (
                <Popover content={column.tooltip}>
                  <InfoCircleOutlined />
                </Popover>
              ) : null}
            </div>
          );
        })}
      </div>

      {loading ? (
        <Loading />
      ) : dataSource?.length ? (
        <div className="table-body">
          {dataSource.map((item, index) => {
            return (
              <div
                className="list-row-wrap"
                key={index}>
                <div
                  className="list-row"
                  style={{ gridTemplateColumns: getColumnWidth(columns) }}
                  onClick={() => rowClick?.(item)}>
                  {columns.map((column) => {
                    const text = item[column.dataIndex as any] || "";
                    const renderTextDom = column.render?.(text, item, index);
                    return (
                      <div
                        key={column.title?.toString()}
                        className={`list-column ellipsis ${column.align} ${
                          !text && !renderTextDom ? "list-loading" : ""
                        }`}>
                        {renderTextDom ?? text}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <StateMessage {...stateMessage} />
      )}
    </div>
  );
};
export default Table;
