import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import {
  NEST_ADDRESS,
  PETH_ADDRESS,
  PUSD_ADDRESS,
} from './addresses'

export const NEST: { [chainId: number]: Token } = {
  // [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, NEST_ADDRESS[1], 18, 'NEST', 'NEST'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, NEST_ADDRESS[4], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, NEST_ADDRESS[56], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, NEST_ADDRESS[97], 18, 'NEST', 'NEST'),
}

export const PUSD: { [chainId: number]: Token } = {
  // [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PUSD_ADDRESS[1], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PUSD_ADDRESS[4], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PUSD_ADDRESS[56], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PUSD_ADDRESS[97], 18, 'PUSD', 'PUSD'),
}

export const PETH: { [chainId: number]: Token } = {
  // [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PETH_ADDRESS[1], 18, 'PETH', 'PETH'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PETH_ADDRESS[4], 18, 'PETH', 'PETH'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PETH_ADDRESS[56], 18, 'PETH', 'PETH'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PETH_ADDRESS[97], 18, 'PETH', 'PETH'),
}

export const SupportTokensList: { [chainId: number]: Token }[] = [NEST, PETH, PUSD,]
