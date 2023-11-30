"use client";
import { useModalContext } from "./useModalContext";
import { useMyResponsive } from "@/hooks/useMyResponsive";
import style from "./index.module.scss";
import { Drawer, Modal } from "antd";
import { OmitProps } from "antd/lib/transfer/ListBody";

const CloseIcon = () => {
  return <i className="iconfont icon-close"></i>;
};

const WrapModal: React.FC<{
  modalProps?: Record<string, any>;
  children: React.ReactNode;
}> = ({ modalProps, children }) => {
  const { contentVisible, closeModal } = useModalContext();
  const responsive = useMyResponsive();
  let WrapComponent: any = Drawer;
  let wrapProps: any = {
    className: style["modal-content-wrap"],
    height: "auto",
    placement: "bottom",
    open: contentVisible,

    closable: true,
    closeIcon: <CloseIcon />,
    onClose: () => closeModal(),
  };
  if (responsive?.sm) {
    WrapComponent = Modal;
    wrapProps = {
      footer: null,
      wrapClassName: wrapProps.className,
      className: wrapProps.className,
      width: modalProps?.width,
      onCancel: wrapProps.onClose,
      open: wrapProps.open,
      closable: wrapProps.closable,
      closeIcon: wrapProps.closeIcon,
    };
  }
  return <WrapComponent {...wrapProps}>{children}</WrapComponent>;
};
export default WrapModal;
