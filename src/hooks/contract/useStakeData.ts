import { ethers } from "ethers";
import { EthereumAddress } from "@/types/web3";
import { CHAIN_CONFIG, ChainId } from "@/config";
import { useWallet } from "../walletConnect";
import { abi } from "./abi";
import useSWR from "swr";
import { utils } from "ethers";

export default function useStakeData() {
  const { account, chainId, signer } = useWallet();
  const stakeProvider = chainId ? CHAIN_CONFIG[chainId as ChainId]?.address?.stakeProvider : undefined;
  const { data: contractData } = useSWR(
    stakeProvider ? ["stakeContract", stakeProvider] : null,
    (key: string, stakeProvider: EthereumAddress) => getContract(stakeProvider!)
  );

  const getContract = async (address: EthereumAddress) => {
    let contract;
    try {
      contract = new ethers.Contract(address, abi, signer);
    } catch (error) {
      console.log(error, "error");
    }

    try {
      // As implemented, it seems to be pulling this data after connecting to a wallet. This function call does not need a signer to be invoked
      // Ideally this information is queried with or without a wallet connected. 
      const frontData = await contract?.getFrontendData();
      const [isSuper, superMultiplier, dayAmount, weekAmount, totalStaked, winningAmounts, winningTokens] = ethers.utils.defaultAbiCoder.decode([ "bool", "uint32", "uint256", "uint256", "uint256", "uint256[7] memory", "uint256[7] memory" ], frontData);

      const recentWindfall = getRecentWindfallData({ isSuper, winningAmounts, winningTokens });
      const tokenTableData = getTokenTableData({ dayAmount, weekAmount, totalStaked });
      return { contract, isSuper, superMultiplier, dayAmount, weekAmount, totalStaked, winningAmounts, winningTokens, recentWindfall, tokenTableData};
    } catch (e) {
      console.log(e, "eee");
      return {};
    }
  };

  const getRecentWindfallData = ({ isSuper, winningAmounts, winningTokens }: any) => {
    const recentWindfall = [];
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      let currentHour = currentDate.getHours();

      if (currentHour < 17) {
        currentDate.setDate(currentDate.getDate() - i - 1);
      } else {
        currentDate.setDate(currentDate.getDate() - i);
      }

      let formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      let item = {
        title: isSuper ? "WEEKLY" : "DAILY",
        date: formattedDate,
        nft: "C-" + winningTokens?.[i].toString(),
        amount: winningAmounts?.[i] ? parseFloat(utils?.formatEther(winningAmounts?.[i])).toPrecision(3) + " CANTO": 0,
      };
      recentWindfall.push(item);
    }
    console.log(recentWindfall, "recentWindfall");
    return recentWindfall;
  };

  const getTokenTableData = ({ dayAmount, weekAmount, totalStaked }: any) => {
    const networkList = ["CANTO", "Ethereum", "Matic"];
    const list = networkList.map((item) => {
      return item === "CANTO"
        ? {
            token: item,
            deposit: parseFloat(utils.formatEther(totalStaked)).toPrecision(4),
            daily: parseFloat(utils.formatEther(dayAmount)).toPrecision(4),
            super: parseFloat(utils.formatEther(weekAmount)).toPrecision(4)
          }
        : {
            token: item,
            deposit: 0,
            daily: 0,
            super: 0,
          };
    });

    return list;
  };

  return {
    // price: contractData?.drawCounter || null,
    // pastData: contractData?.pastData || null,
    // winningAmount: contractData?.winningAmount || null,
    recentWindfall: contractData?.recentWindfall || [],
    tokenTableData: contractData?.tokenTableData || [],
  };
}
