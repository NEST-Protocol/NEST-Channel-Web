// import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
// import optimismLogoUrl from 'assets/svg/optimism_logo.svg'

export enum SupportedChainId {
  // MAINNET = 1,
  // ROPSTEN = 3,
  RINKEBY = 4,
  // GOERLI = 5,
  // KOVAN = 42,
  BSC = 56,
  BSCTestnet = 97,

  // ARBITRUM_ONE = 42161,
  // ARBITRUM_RINKEBY = 421611,
  // OPTIMISM = 10,
  // OPTIMISTIC_KOVAN = 69,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  // SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  // SupportedChainId.KOVAN,
  SupportedChainId.BSC,
  SupportedChainId.BSCTestnet,

  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,
]

export const L1_CHAIN_IDS = [
  // SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  // SupportedChainId.KOVAN,
  SupportedChainId.BSC,
  SupportedChainId.BSCTestnet,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
  readonly nativeSymbol: string
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
  readonly logoUrl: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  // [SupportedChainId.MAINNET]: {
  //   docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
  //   explorer: 'https://etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Mainnet',
  //   nativeSymbol: 'ETH',
  // },
  [SupportedChainId.RINKEBY]: {
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Rinkeby',
    nativeSymbol: 'ETH',
  },
  // [SupportedChainId.ROPSTEN]: {
  //   docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
  //   explorer: 'https://ropsten.etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Ropsten',
  //   nativeSymbol: 'ETH',
  // },
  // [SupportedChainId.KOVAN]: {
  //   docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
  //   explorer: 'https://kovan.etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Kovan',
  //   nativeSymbol: 'ETH',
  // },
  // [SupportedChainId.GOERLI]: {
  //   docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
  //   explorer: 'https://goerli.etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Görli',
  //   nativeSymbol: 'ETH',
  // },
  [SupportedChainId.BSC]: {
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Binance Smart Chain',
    nativeSymbol: 'BNB',
  },
  [SupportedChainId.BSCTestnet]: {
    docs: 'https://nestprotocol.org/doc/zhnestwhitepaper.pdf',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://nestprotocol.org/',
    label: 'Binance Smart Chain - Testnet',
    nativeSymbol: 'BNB',
  },

  // [SupportedChainId.ARBITRUM_ONE]: {
  //   bridge: 'https://bridge.arbitrum.io/',
  //   docs: 'https://offchainlabs.com/',
  //   explorer: 'https://arbiscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Arbitrum',
  //   logoUrl: arbitrumLogoUrl,
  //   nativeSymbol: 'ETH',
  // },
  // [SupportedChainId.ARBITRUM_RINKEBY]: {
  //   bridge: 'https://bridge.arbitrum.io/',
  //   docs: 'https://offchainlabs.com/',
  //   explorer: 'https://rinkeby-explorer.arbitrum.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Arbitrum Rinkeby',
  //   logoUrl: arbitrumLogoUrl,
  //   nativeSymbol: 'ETH',
  // },
  // [SupportedChainId.OPTIMISM]: {
  //   bridge: 'https://gateway.optimism.io/',
  //   docs: 'https://optimism.io/',
  //   explorer: 'https://optimistic.etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Optimism',
  //   logoUrl: optimismLogoUrl,
  //   nativeSymbol: 'ETH',
  // },
  // [SupportedChainId.OPTIMISTIC_KOVAN]: {
  //   bridge: 'https://gateway.optimism.io/',
  //   docs: 'https://optimism.io/',
  //   explorer: 'https://optimistic.etherscan.io/',
  //   infoLink: 'https://nestprotocol.org/',
  //   label: 'Optimistic Kovan',
  //   logoUrl: optimismLogoUrl,
  //   nativeSymbol: 'ETH',
  // },
}
