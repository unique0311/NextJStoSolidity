import React, { createContext, FC, useCallback, useContext, useMemo } from "react";

import { CHAIN_CONFIG, ChainId, isDev } from "@/config";
import {
  useNetwork,
  useAccount,
  useSwitchNetwork,
  useDisconnect,
  configureChains,
  WagmiConfig,
  createClient,
  useSigner,
  useProvider,
} from "wagmi";

import "@rainbow-me/rainbowkit/styles.css";

import { canto } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, lightTheme, Theme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  coinbaseWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import merge from "lodash/merge";

interface WalletContextType {
  chainId?: number;
  account?: string;
  isConnected: boolean;

  // the switch chain method we should use across the app
  switchChain: (chainId: ChainId) => Promise<{ error?: string }>;
  disconnect: () => void;
  /**
   * the signer, which WebProvider.getSigner returns
   * A Signer is a class which (usually) in some way directly or indirectly has access to a private key,
   * which can sign messages and transactions to authorize the network to charge your account ether to perform operations.
   */
  signer?: any;
  /**
   * whether the app has tried to connect to the wallet.
   * Note: tried does not mean the user is logged in, nor does it mean the wallet is connected.
   * It just means the action of connected to the wallet has been performed.
   * It can indicate the state of the app more clearly:
   * tried but not active: the wallet might be locked. Or the window.ethereum is not installed.
   * tried and active: the wallet is connected.
   * connecting to the wallet also does not mean the user is logged in.
   * because login is an request to our backend server, while connecting to the wallet is not.
   *
   * true: has tried to connected to the wallet
   * false: hasn't tried
   */
  provider: any;
}
export const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const error = { error: "Your wallet needs to switch networks manually." };
type AppWebProviderProps = {
  children: React.ReactNode;
};

const { chains, provider, webSocketProvider } = configureChains(
  isDev ? [CHAIN_CONFIG[ChainId.CantoTestnet]] : [canto],
  [publicProvider()]
);

const projectId = "acd532ccb5b241a06e27ffc22bcd4a3b";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      coinbaseWallet({ appName: "Bluez", chains }),
      rainbowWallet({ chains, projectId }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
});

const rainbowKitTheme = merge(lightTheme(), {
  blurs: {
    modalOverlay: "blur(10px)",
  },
} as Theme);

export const WalletProvider: FC<AppWebProviderProps> = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        theme={rainbowKitTheme}
        modalSize="wide"
        chains={chains}>
        <WalletProviderContent>{children}</WalletProviderContent>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export const WalletProviderContent: FC<AppWebProviderProps> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { data: signer, isError } = useSigner();
  const { disconnect } = useDisconnect();
  const provider = useProvider();

  const switchChain = async (chainId: ChainId) => {
    try {
      await switchNetworkAsync?.(chainId);
      return {};
    } catch (e: any) {
      return error;
    }
  };
  console.log(chain, "chain");
  const contextValue: WalletContextType = {
    chainId: chain?.id,
    isConnected,
    account: address?.toLowerCase(),
    signer,
    switchChain,
    disconnect,
    provider,
  };

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  return useContext(WalletContext);
};
