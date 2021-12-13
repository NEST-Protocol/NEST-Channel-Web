import {atom} from "recoil";
import {ZERO_ADDRESS} from "../../constants/misc";

// Step 1: Token Address
// 报价代币，0表示eth，address
export const quotationTokenAtom = atom({
  key: 'quotationToken',
  default: ZERO_ADDRESS,
})

// 计价代币，0表示eth，address
export const priceTokenAtom = atom({
  key: 'priceToken',
  default: ZERO_ADDRESS,
})

// 矿币地址，矿币地址如果和token0或者token1是一种币，可能导致挖矿资产被当成矿币挖走，address
export const miningTokenAtom = atom({
  key: 'miningToken',
  default: ZERO_ADDRESS,
})

// Step 2: Configuration
// 计价代币单位，uint96
export const priceTokenUnitAtom = atom({
  key: 'priceTokenUnit',
  default: 0,
})

// 每个区块的标准出矿量，uint96
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








