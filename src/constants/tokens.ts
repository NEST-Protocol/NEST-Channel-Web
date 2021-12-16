import { Token } from "@uniswap/sdk-core"
import {SupportedChainId} from "./chains";
import {
  COFIX_ADDRESS,
  HBTC_ADDRESS,
  NEST_ADDRESS,
  PETH_ADDRESS,
  PUSD_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
} from "./addresses";

export const NEST: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, NEST_ADDRESS[1], 18, 'NEST', 'NEST'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, NEST_ADDRESS[4], 18, "NEST", "NEST"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, NEST_ADDRESS[56], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, NEST_ADDRESS[97], 18, "NEST", "NEST"),
}

export const USDT: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, USDT_ADDRESS[1], 18, 'USDT', 'USDT'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, USDT_ADDRESS[4], 18, "USDT", "USDT"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, USDT_ADDRESS[56], 18, 'USDT', 'USDT'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, USDT_ADDRESS[97], 18, "USDT", "USDT"),
}

export const PUSD: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PUSD_ADDRESS[1], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PUSD_ADDRESS[4], 18, "PUSD", "PUSD"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PUSD_ADDRESS[56], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PUSD_ADDRESS[97], 18, "PUSD", "PUSD"),
}

export const PETH: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PETH_ADDRESS[1], 18, 'PETH', 'PETH'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PETH_ADDRESS[4], 18, "PETH", "PETH"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PETH_ADDRESS[56], 18, 'PETH', 'PETH'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PETH_ADDRESS[97], 18, "PETH", "PETH"),
}

export const COFIX: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, COFIX_ADDRESS[1], 18, 'COFIX', 'COFIX'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, COFIX_ADDRESS[4], 18, "COFIX", "COFIX"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, COFIX_ADDRESS[56], 18, 'COFIX', 'COFIX'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, COFIX_ADDRESS[97], 18, "COFIX", "COFIX"),
}

export const HBTC: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, HBTC_ADDRESS[1], 18, 'HBTC', 'HBTC'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, HBTC_ADDRESS[4], 18, "HBTC", "HBTC"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, HBTC_ADDRESS[56], 18, 'HBTC', 'HBTC'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, HBTC_ADDRESS[97], 18, "HBTC", "HBTC"),
}

export const USDC: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, USDC_ADDRESS[1], 18, 'USDC', 'USDC'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, USDC_ADDRESS[4], 18, "USDC", "USDC"),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, USDC_ADDRESS[56], 18, 'USDC', 'USDC'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, USDC_ADDRESS[97], 18, "USDC", "USDC"),
}

export const SupportTokensList: {[chainId: number]: Token}[] = [NEST, PETH, USDT, PUSD, COFIX, HBTC, USDC]
