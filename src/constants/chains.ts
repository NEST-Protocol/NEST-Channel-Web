// import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
// import optimismLogoUrl from 'assets/svg/optimism_logo.svg'
import kccLogoUrl from '../assets/svg/KCC.svg'
import ETHLogoUrl from '../assets/svg/ETH.svg'
import BNBLogoUrl from '../assets/svg/BNB.svg'
import PolygonLogoUrl from '../assets/svg/polygon.svg'

export enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
  GOERLI = 5,
  BSC = 56,
  BSCTestnet = 97,
  POLYGON = 137,
  KCC = 321,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.BSC,
  SupportedChainId.BSCTestnet,
  SupportedChainId.POLYGON,
  SupportedChainId.KCC,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.BSC,
  SupportedChainId.BSCTestnet,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [
  SupportedChainId.POLYGON,
  SupportedChainId.KCC,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly chainId: number
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
  readonly nativeSymbol: string
  readonly logoUrl: string
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    chainId: SupportedChainId.MAINNET,
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Mainnet',
    nativeSymbol: 'ETH',
    logoUrl: ETHLogoUrl
  },
  [SupportedChainId.RINKEBY]: {
    chainId: SupportedChainId.RINKEBY,
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Rinkeby',
    nativeSymbol: 'ETH',
    logoUrl: ETHLogoUrl
  },
  [SupportedChainId.GOERLI]: {
    chainId: SupportedChainId.GOERLI,
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Goerli',
    nativeSymbol: 'ETH',
    logoUrl: ETHLogoUrl
  },
  [SupportedChainId.BSC]: {
    chainId: SupportedChainId.BSC,
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://nestprotocol.org/',
    label: 'BNB',
    nativeSymbol: 'BNB',
    logoUrl: BNBLogoUrl
  },
  [SupportedChainId.BSCTestnet]: {
    chainId: SupportedChainId.BSCTestnet,
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://nestprotocol.org/',
    label: 'BNB - Testnet',
    nativeSymbol: 'BNB',
    logoUrl: BNBLogoUrl
  },
  [SupportedChainId.KCC]: {
    chainId: SupportedChainId.KCC,
    bridge: '',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://scan.kcc.io/',
    infoLink: 'https://nestprotocol.org/',
    label: 'KCC',
    logoUrl: kccLogoUrl,
    nativeSymbol: 'KCS',
  },
  [SupportedChainId.POLYGON]: {
    chainId: SupportedChainId.POLYGON,
    bridge: '',
    docs: '',
    explorer: 'https://polygonscan.com',
    infoLink: 'https://nestprotocol.org/',
    label: 'Polygon',
    logoUrl: PolygonLogoUrl,
    nativeSymbol: 'MATIC',
  },
}
