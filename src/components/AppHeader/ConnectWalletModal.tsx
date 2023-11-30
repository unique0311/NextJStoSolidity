import React from "react";
import { Button, Input, Popover, Radio } from "antd";
import style from "./index.module.scss";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "@wagmi/core";
const ConnectWalletModal: React.FC = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const connectWallet = () => {
    connect();
  };
  return (
    <div className={style["connect-wallet-modal"]}>
      <h4>Connect your wallet</h4>
      <div className="label-wrap">
        <div className={`radio ${address ? "active" : ""}`}>
          <div className="radio-inner"></div>
        </div>
        <p>
          By connecting a wallet, I have read and agree to Windfall’s <span>Terms of Use</span>, <span>Risks</span>,
          <span>Cookies Policy</span>, use of <span>3rd party services</span>, and <span>Privacy Policy</span>.
        </p>
      </div>
      <div
        className={"connect-btn"}
        onClick={connectWallet}>
        <img
          src="/img/common/metamask.png"
          alt=""
        />
        <span>Metamask</span>
      </div>
    </div>
  );
};
export default ConnectWalletModal;
