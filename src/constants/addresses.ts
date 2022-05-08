import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const NEST_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
  [SupportedChainId.RINKEBY]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
  [SupportedChainId.BSC]: '0x98f8669F6481EbB341B522fCD3663f79A3d1A6A7',
  [SupportedChainId.BSCTestnet]: '0x821edD79cc386E56FeC9DA5793b87a3A52373cdE',
  [SupportedChainId.KCC]: '0x98f8669F6481EbB341B522fCD3663f79A3d1A6A7',
}

export const PUSD_ADDRESS: AddressMap = {
  // [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575',
  [SupportedChainId.BSC]: '0x9b2689525e07406D8A6fB1C40a1b86D2cd34Cbb2',
  [SupportedChainId.BSCTestnet]: '0x3DA5c9aafc6e6D6839E62e2fB65825869019F291',
  [SupportedChainId.KCC]: '0x0C4CD7cA70172Af5f4BfCb7b0ACBf6EdFEaFab31',
}

export const USDT_ADDRESS: AddressMap = {
  // [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x20125a7256EFafd0d4Eec24048E08C5045BC5900',
  [SupportedChainId.BSC]: '0x55d398326f99059ff775485246999027b3197955',
  [SupportedChainId.BSCTestnet]: '0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc',
}

export const HBTC_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
  [SupportedChainId.RINKEBY]: '0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B',
}

export const PBTC_ADDRESS: AddressMap = {
  [SupportedChainId.KCC]: '0x32D4a9a94537a88118e878c56b93009Af234A6ce'
}

export const NEST_OPEN_PLATFORM_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xE544cF993C7d477C7ef8E91D28aCA250D135aa03',
  [SupportedChainId.RINKEBY]: '0xc08E6A853241B9a08225EECf93F3b279FA7A1bE7',
  [SupportedChainId.BSC]: '0x09CE0e021195BA2c1CDE62A8B187abf810951540',
  [SupportedChainId.BSCTestnet]: '0xF2f9E62f52389EF223f5Fa8b9926e95386935277',
  [SupportedChainId.KCC]: '0x7DBe94A4D6530F411A1E7337c7eb84185c4396e6',
}

export const PETH_ADDRESS: AddressMap = {
  // [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0xbe155CDf7F6dA37684A36DCC02076Ed314d5467a',
  [SupportedChainId.BSC]: '0x556d8bF8bF7EaAF2626da679Aa684Bac347d30bB',
  [SupportedChainId.BSCTestnet]: '0xc39dC1385a44fBB895991580EA55FC10e7451cB3',
  [SupportedChainId.KCC]: '0x6cce8b9da777Ab10B11f4EA8510447431ED6ad1E',
}

export const USDC_ADDRESS: AddressMap = {
  // [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
  [SupportedChainId.BSC]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
  [SupportedChainId.BSCTestnet]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
}

export const COFIX_ADDRESS: AddressMap = {
  // [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B',
  [SupportedChainId.BSC]: '0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B',
  [SupportedChainId.BSCTestnet]: '0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B',
}
