import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const PUSD_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0',
  [SupportedChainId.RINKEBY]: '0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575',
  [SupportedChainId.BSC]: '0x9b2689525e07406D8A6fB1C40a1b86D2cd34Cbb2',
  [SupportedChainId.BSCTestnet]: '0x3DA5c9aafc6e6D6839E62e2fB65825869019F291',
  [SupportedChainId.KCC]: '0x0C4CD7cA70172Af5f4BfCb7b0ACBf6EdFEaFab31',
  [SupportedChainId.Polygon]: '0xf26D86043a3133Cc042221Ea178cAED7Fe0eE362',
}

export const NEST_OPEN_PLATFORM_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xE544cF993C7d477C7ef8E91D28aCA250D135aa03',
  [SupportedChainId.RINKEBY]: '0xc08E6A853241B9a08225EECf93F3b279FA7A1bE7',
  [SupportedChainId.BSC]: '0x09CE0e021195BA2c1CDE62A8B187abf810951540',
  [SupportedChainId.BSCTestnet]: '0xF2f9E62f52389EF223f5Fa8b9926e95386935277',
  [SupportedChainId.KCC]: '0x7DBe94A4D6530F411A1E7337c7eb84185c4396e6',
  [SupportedChainId.Polygon]: '0x09CE0e021195BA2c1CDE62A8B187abf810951540',
}

export const PETH_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xbe155CDf7F6dA37684A36DCC02076Ed314d5467a',
  [SupportedChainId.BSC]: '0x556d8bF8bF7EaAF2626da679Aa684Bac347d30bB',
  [SupportedChainId.BSCTestnet]: '0xc39dC1385a44fBB895991580EA55FC10e7451cB3',
  [SupportedChainId.KCC]: '0x6cce8b9da777Ab10B11f4EA8510447431ED6ad1E',
  [SupportedChainId.Polygon]: '0x1E0967e10B5Ef10342d4D71da69c30332666C899'
}

