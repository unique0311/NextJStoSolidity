import React, { createContext, useContext, useState } from "react";

import WrapModal from "./WrapModal";

export type ModalType = "login" | "others";

export type ModalContextType = {
  contentVisible: boolean;
  setContentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (data: any) => void;

  args: any;
  setArgs: React.Dispatch<React.SetStateAction<any>>;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [args, setArgs] = useState<any>({});

  const closeModal = () => {
    setArgs({});
    setContentVisible(false);
  };

  const openModal = (data: any) => {
    console.log(data, "data");
    setArgs(data);
    setContentVisible(true);
  };

  return (
    <ModalContext.Provider
      value={{
        contentVisible,
        setContentVisible,
        openModal,

        args,
        setArgs,
        closeModal,
      }}>
      {children}

      <WrapModal modalProps={args.modalProps}>
        {args.dom ? args.dom : null}
      </WrapModal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
