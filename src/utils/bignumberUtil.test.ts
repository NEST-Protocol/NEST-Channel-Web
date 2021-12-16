import { formatNumber, parseToBigNumber } from "./bignumberUtil"
import BigNumber from 'bignumber.js'

describe('#bignumber format and parse', () => {
  it('parse to bigNumber', () => {
    expect(parseToBigNumber(0)).toEqual(new BigNumber(0))
    expect(parseToBigNumber("")).toEqual(new BigNumber(0))
    expect(parseToBigNumber("0")).toEqual(new BigNumber(0))
  })

  it('format bignumber', ()=>{
    console.log(formatNumber(new BigNumber(239.93023933), 18, 18))
  })
})

