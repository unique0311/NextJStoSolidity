import { Spin, SpinProps } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import style from "./index.module.scss";

interface LoadingProps extends SpinProps {
  type?: "circle";
  fontSize?: number;
}

const defaultFontSize = 28;
const Loading: FC<LoadingProps> = (props) => {
  const loadingIcon = (
    <Loading3QuartersOutlined
      style={{ fontSize: props.fontSize || defaultFontSize, color: "#48BDCD" }}
      spin
    />
  );

  if (props.type === "circle") {
    return (
      <div>
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", width: "100%" }}>{loadingIcon}</div>

    // <div style={{ padding: "40px", width: "100%" }}>
    //   <div className="loader triangle">
    //     <svg viewBox="0 0 86 80">
    //       <polygon points="43 8 79 72 7 72"></polygon>
    //     </svg>
    //   </div>
    // </div>
  );
};

export default Loading;
