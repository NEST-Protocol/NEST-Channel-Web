import { useCallback, useState } from 'react'
import { ZERO_ADDRESS } from '../constants/misc'
import { formatNumber, parseToBigNumber } from '../utils/bignumberUtil'
import { useTokenContract } from './useContract'

export const useTokenBalance = (tokenAddress: string | undefined, account: string | null | undefined) => {
  const token = useTokenContract(tokenAddress)
  const [balance, setBalance] = useState('0')

  const refresh = useCallback(async () => {
    if (!token) return
    try {
      const res = await token.balanceOf(account ?? ZERO_ADDRESS)
      setBalance(formatNumber(parseToBigNumber(res).shiftedBy(-18)))
    } catch (e) {
      setBalance('NaN')
    }
  }, [account, token])
  setImmediate(refresh, 3000)

  return balance
}
