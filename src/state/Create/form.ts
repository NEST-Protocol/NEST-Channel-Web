import {atom} from "recoil";
import {ZERO_ADDRESS} from "../../constants/misc";

// Step 1: Token Address
export const quotationTokenAtom = atom({
  key: 'quotationToken',
  default: ZERO_ADDRESS,
})

export const priceTokenAtom = atom({
  key: 'priceToken',
  default: ZERO_ADDRESS,
})

export const miningTokenAtom = atom({
  key: 'miningToken',
  default: ZERO_ADDRESS,
})

// Step 2: Configuration
export const priceTokenUnitAtom = atom({
  key: 'priceTokenUnit',
  default: 0,
})

export const standardOutputAtom = atom({
  key: 'standardOutput',
  default: 0,
})

export const quotationFeeAtom = atom({
  key: 'quotationFee',
  default: "0",
})

export const priceCallingFeeAtom = atom({
  key: 'priceCallingFee',
  default: "0",
})

export const attenuationFactorAtom = atom({
  key: 'attenuationFactor',
  default: 0,
})








