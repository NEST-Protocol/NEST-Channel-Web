import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import {
  NEST_ADDRESS,
  PETH_ADDRESS,
  PUSD_ADDRESS,
} from './addresses'

export const NEST: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, NEST_ADDRESS[SupportedChainId.MAINNET], 18, 'NEST', 'NEST'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, NEST_ADDRESS[SupportedChainId.RINKEBY], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, NEST_ADDRESS[SupportedChainId.BSC], 18, 'NEST', 'NEST'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, NEST_ADDRESS[SupportedChainId.BSCTestnet], 18, 'NEST', 'NEST'),
  [SupportedChainId.KCC]: new Token(SupportedChainId.KCC, NEST_ADDRESS[SupportedChainId.KCC], 18, 'NEST', 'NEST'),
  [SupportedChainId.POLYGON]: new Token(SupportedChainId.POLYGON, NEST_ADDRESS[SupportedChainId.POLYGON], 18, 'NEST', 'NEST'),
}

export const PUSD: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PUSD_ADDRESS[SupportedChainId.MAINNET], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PUSD_ADDRESS[SupportedChainId.RINKEBY], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PUSD_ADDRESS[SupportedChainId.BSC], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PUSD_ADDRESS[SupportedChainId.BSCTestnet], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.KCC]: new Token(SupportedChainId.KCC, PUSD_ADDRESS[SupportedChainId.KCC], 18, 'PUSD', 'PUSD'),
  [SupportedChainId.POLYGON]: new Token(SupportedChainId.POLYGON, PUSD_ADDRESS[SupportedChainId.POLYGON], 18, 'PUSD', 'PUSD'),
}

export const PETH: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, PETH_ADDRESS[SupportedChainId.MAINNET], 18, 'PETH', 'PETH'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, PETH_ADDRESS[SupportedChainId.RINKEBY], 18, 'PETH', 'PETH'),
  [SupportedChainId.BSC]: new Token(SupportedChainId.BSC, PETH_ADDRESS[SupportedChainId.BSC], 18, 'PETH', 'PETH'),
  [SupportedChainId.BSCTestnet]: new Token(SupportedChainId.BSCTestnet, PETH_ADDRESS[SupportedChainId.BSCTestnet], 18, 'PETH', 'PETH'),
  [SupportedChainId.KCC]: new Token(SupportedChainId.KCC, PETH_ADDRESS[SupportedChainId.KCC], 18, 'PETH', 'PETH'),
  [SupportedChainId.POLYGON]: new Token(SupportedChainId.POLYGON, PETH_ADDRESS[SupportedChainId.POLYGON], 18, 'PETH', 'PETH'),
}

export const SupportTokensList: { [chainId: number]: Token }[] = [NEST, PETH, PUSD]
