import { atom } from 'recoil'

// Step 1: Token Address
// 报价代币，0表示eth，address
export const quotationTokenAddressAtom = atom({
  key: 'quotationTokenAddress',
  default: '',
})

// 计价代币
export const priceTokenNameAtom = atom({
  key: 'priceTokenName',
  default: '',
})

// 矿币地址，矿币地址如果和token0或者token1是一种币，可能导致挖矿资产被当成矿币挖走，address
export const miningTokenAddressAtom = atom({
  key: 'miningTokenAddress',
  default: '',
})

// Step 2: Configuration
// 计价代币单位，uint96
export const priceTokenUnitAtom = atom({
  key: 'priceTokenUnit',
  default: '0',
})

// 每个区块的标准出矿量，uint96
export const standardOutputAtom = atom({
  key: 'standardOutput',
  default: '0',
})

export const quotationFeeAtom = atom({
  key: 'quotationFee',
  default: '0',
})

export const priceCallingFeeAtom = atom({
  key: 'priceCallingFee',
  default: '0',
})

export const attenuationFactorAtom = atom({
  key: 'attenuationFactor',
  default: '0',
})

export const invalidTokenAddressAtom = atom({
  key: 'isTokenAddressValid',
  default: false,
})

export const invalidConfigurationAtom = atom({
  key: 'isConfigurationValid',
  default: false,
})
