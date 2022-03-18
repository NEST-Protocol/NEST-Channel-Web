import { SupportedChainId } from './chains'
import { NEST_OPEN_PLATFORM_ADDRESS } from './addresses'

type ChannelOpenLogsFilter = {
  hostname: string
  address: string
  topics: string[]
  fromBlock: number
  toBlock: string
  apikey: string
}

export const CHANNEL_OPEN_LOGS_FILTER: { [chainId: number]: ChannelOpenLogsFilter } = {
  // [SupportedChainId.MAINNET]: {
  //   hostname: 'https://api.etherscan.io',
  //   address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.MAINNET],
  //   topics: ['0xde1433d3525be2096f0e9653e6f408254f9a4b2975bbb4415d2afcd24182fb53'],
  //   fromBlock: 0,
  //   toBlock: 'latest',
  //   apikey: process.env.REACT_APP_ETHERSCAN_KEY ?? 'YourApiKey',
  // },
  [SupportedChainId.RINKEBY]: {
    hostname: 'https://api-rinkeby.etherscan.io',
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.RINKEBY],
    topics: ['0xd5d675c43c23a6c1e3ad060a603f30590f57c52d5e4a71994bf009848e8fe9e1'],
    fromBlock: 0,
    toBlock: 'latest',
    apikey: process.env.REACT_APP_ETHERSCAN_KEY ?? 'YourApiKey',
  },
  [SupportedChainId.BSC]: {
    hostname: 'https://api.bscscan.com',
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.BSC],
    topics: ['0xd5d675c43c23a6c1e3ad060a603f30590f57c52d5e4a71994bf009848e8fe9e1'],
    fromBlock: 0,
    toBlock: 'latest',
    apikey: process.env.REACT_APP_BSCSCAN_KEY ?? 'YourApiKey',
  },
  [SupportedChainId.BSCTestnet]: {
    hostname: 'https://api-testnet.bscscan.com',
    address: NEST_OPEN_PLATFORM_ADDRESS[SupportedChainId.BSCTestnet],
    topics: ['0xd5d675c43c23a6c1e3ad060a603f30590f57c52d5e4a71994bf009848e8fe9e1'],
    fromBlock: 0,
    toBlock: 'latest',
    apikey: process.env.REACT_APP_BSCSCAN_KEY ?? 'YourApiKey',
  },
}
