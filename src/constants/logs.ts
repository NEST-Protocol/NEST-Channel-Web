import {SupportedChainId} from "./chains";
import {NEST_OPEN_PLATFORM_ADDRESS} from "./addresses";

type ChannelOpenLogsFilter = {
  address: string,
  topics: string[],
  fromBlock: number,
  toBlock: string,
}

export const CHANNEL_OPEN_LOGS_FILTER: {[chainId: number]: ChannelOpenLogsFilter} = {
  [SupportedChainId.MAINNET]: {
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.MAINNET],
    topics: ["0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53"],
    fromBlock: 0,
    toBlock: "latest"
  },
  [SupportedChainId.RINKEBY]: {
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.RINKEBY],
    topics: ["0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53"],
    fromBlock: 9572136,
    toBlock: "latest"
  },
  [SupportedChainId.BSC]: {
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.BSC],
    topics: ["0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53"],
    fromBlock: 13656797,
    toBlock: "latest"
  },
  [SupportedChainId.BSCTestnet]: {
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.BSCTestnet],
    topics: ["0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53"],
    fromBlock: 0,
    toBlock: "latest"
  },
}