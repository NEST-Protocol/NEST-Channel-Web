import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const NEST_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
  [SupportedChainId.RINKEBY]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0x821edD79cc386E56FeC9DA5793b87a3A52373cdE',
}

export const PUSD_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0x3DA5c9aafc6e6D6839E62e2fB65825869019F291',
}

export const USDT_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  [SupportedChainId.RINKEBY]: '0x20125a7256EFafd0d4Eec24048E08C5045BC5900',
  [SupportedChainId.BSC]: '0x55d398326f99059ff775485246999027b3197955',
  [SupportedChainId.BSCTestnet]: '0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc',
}

export const HBTC_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '',
}

export const NEST_GOVERNACE_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0xa52936bD3848567Fbe4bA24De3370ABF419fC1f7',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0x5691dc0770D55B9469a3242DA282754687687935',
}

export const NEST_LEDGER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x005103e352f86e4C32a3CE4B684fe211eB123210',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0x78D5E2fC85969e51580fd2C0Fd6D056a444167cE',
}

export const NEST_OPEN_MINING: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x638461F3Ae49CcC257ef49Fe76CCE5816A9234eF',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0xF2f9E62f52389EF223f5Fa8b9926e95386935277',
}

export const NEST_BATCH_PLATFORM2: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '0x12af92C6e7a1F855008c6B9dDEd7DcA19B49B51B',
  [SupportedChainId.BSC]: '0x98f8669F6481EbB341B522fCD3663f79A3d1A6A7',
  [SupportedChainId.BSCTestnet]: '0x821edD79cc386E56FeC9DA5793b87a3A52373cdE',
}

export const PETH_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD',
  [SupportedChainId.RINKEBY]: '0x4D4B378eFbeb7eE15Aa498F3383C9949391557e0',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '0xc39dC1385a44fBB895991580EA55FC10e7451cB3',
}

export const USDC_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [SupportedChainId.RINKEBY]: '0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '',
}

export const COFIX_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1',
  [SupportedChainId.RINKEBY]: '0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSCTestnet]: '',
}