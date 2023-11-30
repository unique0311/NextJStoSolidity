import React, { useState } from "react";
import { Button, Input, Popover } from "antd";
import style from "./index.module.scss";
const DepositModal: React.FC = () => {
  const [amount, setAmount] = useState("");
  return (
    <div className={style["deposit-modal"]}>
      <h3>Deposit Tokens</h3>
      <div>
        <Input
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          prefix={
            <img
              src={"/img/home/tokenTable/icon-deposit-modal.png"}
              alt="icon-modal"></img>
          }
          suffix={
            <div
              className="max"
              onClick={(e) => {
                e.stopPropagation();
                setAmount("100");
              }}>{`MAX`}</div>
          }></Input>
      </div>

      <div className="deposit-btn">DEPOSIT</div>
      <p>Looking for a different pool? Change your wallet’s network. </p>
    </div>
  );
};
export default DepositModal;
