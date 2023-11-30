"use client";
import React from "react";
import { Button, Input, Popover } from "antd";
import style from "./index.module.scss";
import TableList from "@/components/TableList";
import { useMyResponsive } from "@/hooks/useMyResponsive";
import useStakeData from "@/hooks/contract/useStakeData";
const CantoDeposit: React.FC = () => {
  const responsive = useMyResponsive();
  const { recentWindfall } = useStakeData();

  const columns = [
    {
      title: "WINDFALL",
      align: "left" as const,
      render: (text: string, record: any, index: number) => {
        return (
          <div className="column-windfall">
            <div className="element">
              <span className={`${record.title.toLowerCase()}`}>{record.title}</span>
              {/* <span className={`${record.type.toLowerCase()}`}>{record.type}</span> */}
            </div>
            {responsive.md ? null : <div>{record.date}</div>}
          </div>
        );
      },
    },
    {
      title: "NFT",
      render: (text: string, record: any, index: number) => {
        return (
          <div className="column-nft">
            <div className={`${record.nft.toLowerCase()}`}>{record.nft}</div>
          </div>
        );
      },
    },
    {
      title: "AMOUNT",
      align: "right" as const,
      render: (text: string, record: any, index: number) => {
        const mapNumberToClassName = (number: Number) => {
          const amount = parseFloat(record.amount);
          if (amount === 250 || amount === 0.01 || amount === 123) {
            return "yellow";
          }
          return "";
        };

        const amountClassName = mapNumberToClassName(record.amount);
        return (
          <div className="column-amount">
            <span className={amountClassName}>{record.amount}</span>
            {/* <span className={`${record.amountUnit.toLowerCase()}`}>{record.amountUnit}</span> */}
          </div>
        );
      },
    },
  ];
  if (responsive.md) {
    columns.splice(1, 0, {
      title: "DATE",
      render: (text: string, record: any, index: number) => {
        const isYellowDate = record.date === "June 24,2023";
        const dateClassName = isYellowDate ? "yellow" : "";
        return (
          <div className="column-date">
            <div className={`${dateClassName}`}>{record.date}</div>
          </div>
        );
      },
    });
  }

  return (
    <div className="home-recent-windfalls">
      <div className="con-main-wrap">
        <h3>Recent Windfalls</h3>
        <div className="hr"></div>
        <div className="table-list">
          <TableList
            columns={columns}
            dataSource={recentWindfall}
          />
        </div>
      </div>
    </div>
  );
};
export default CantoDeposit;
