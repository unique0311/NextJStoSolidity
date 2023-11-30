import { canto } from "wagmi/chains";

import type { NetworkConfig } from "./types";

export enum ChainId {
  CantoTestnet = 7701,
  Canto = 7700,
}

export function isSupportChain(chainId: number): chainId is ChainId {
  return Object.values(ChainId).includes(chainId);
}

export const CHAIN_CONFIG: Record<ChainId, NetworkConfig> = {
  [ChainId.CantoTestnet]: {
    id: 7701,
    name: "Canto Testnet",
    network: "canto",
    nativeCurrency: {
      name: "Canto",
      symbol: "CANTO",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [`https://canto-testnet.plexnode.wtf`],
      },
      public: {
        http: [`https://canto-testnet.plexnode.wtf`],
      },
    },
    address: {
      tokenProvider: "0x3210bB0082366a80c3C0722038410526f8BF0757",
      stakeProvider: "0x85a441989AA875EF02D673940417a4A4ED9942eC",
    },
    testnet: true,
  },

  [ChainId.Canto]: {
    ...canto,
    address: {
      tokenProvider: "0x3210bB0082366a80c3C0722038410526f8BF0757",
      stakeProvider: "0x85a441989AA875EF02D673940417a4A4ED9942eC",
    },
  },
};
