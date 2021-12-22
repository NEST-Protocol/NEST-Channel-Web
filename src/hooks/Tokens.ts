import { useTokenContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import {ZERO_ADDRESS} from "../constants/misc";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";

export function useTokenSymbol(validated: string): string {
  const tokenContract = useTokenContract(validated, false)
  const [symbol, setSymbol] = useState('NaN')

  const refresh = useCallback(() => {
    if (!validated) {
      setSymbol('NaN')
    }

    tokenContract
      ?.symbol()
      .then((res) => {
        setSymbol(res)
      })
      .catch((_) => {
        setSymbol('Error!')
      })
  }, [tokenContract, validated])

  useEffect(() => {
    refresh()
  }, [refresh, tokenContract, validated])

  return symbol
}

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

