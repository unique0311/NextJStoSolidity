import { Empty, EmptyProps } from "antd";
import style from "./index.module.scss";
export type StateMessageType = EmptyProps & {
  text?: string;
  img?: string;
  render?: () => React.ReactNode;
};

const StateMessage: React.FC<StateMessageType> = (props) => {
  return (
    <div className={style["state-message-wrap"]}>
      {props.render ? (
        props.render()
      ) : (
        // <>
        //   <img src={img || require("@img/hero_bg.png")} alt="" />
        //   <span>{text || `No Data`}</span>
        // </>
        <Empty
          {...props}
          description={props.text || `No Data`}
        />
      )}
    </div>
  );
};
export default StateMessage;
