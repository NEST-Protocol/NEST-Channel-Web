import { atom } from 'recoil'
import { IDLE } from '../../constants/misc'

// 计价代币
export const priceTokenNameAtom = atom({
  key: 'priceTokenName',
  default: 'PUSD',
})

// Step 2: Configuration
// 计价代币单位，uint96
export const priceTokenUnitAtom = atom({
  key: 'priceTokenUnit',
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

export const statusAtom = atom({
  key: 'createPoolStatus',
  default: IDLE,
})

export const priceTokenAddressAtom = atom({
  key: 'priceTokenAddress',
  default: '',
})
