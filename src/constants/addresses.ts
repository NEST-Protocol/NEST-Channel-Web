import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

export const NEST_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x04abeda201850ac0124161f037efd70c74ddc74c',
  [SupportedChainId.RINKEBY]: '0x8d6b97c482ecc00d83979dac4a703dbff04fd84f',
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
)

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}

// ### Rinkeby

// pusd: 0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575
// nest: 0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25
// usdt: 0x20125a7256EFafd0d4Eec24048E08C5045BC5900
// hbtc: 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B
// nestGovernance: 0xa52936bD3848567Fbe4bA24De3370ABF419fC1f7
// nestLedger: 0x005103e352f86e4C32a3CE4B684fe211eB123210
// nestOpenMining: 0x638461F3Ae49CcC257ef49Fe76CCE5816A9234eF
// nestBatchPlatform2: 0x12af92C6e7a1F855008c6B9dDEd7DcA19B49B51B


// ### BSC Testnet

// nest: 0x821edD79cc386E56FeC9DA5793b87a3A52373cdE
// pusd: 0x3DA5c9aafc6e6D6839E62e2fB65825869019F291
// peth: 0xc39dC1385a44fBB895991580EA55FC10e7451cB3
// nestGovernance: 0x5691dc0770D55B9469a3242DA282754687687935
// nestLedger: 0x78D5E2fC85969e51580fd2C0Fd6D056a444167cE
// nestOpenMining: 0xF2f9E62f52389EF223f5Fa8b9926e95386935277