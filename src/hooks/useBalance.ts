import { useActiveWeb3React } from './web3'
import { isAddress } from '../utils'
import { useCallback, useEffect, useState } from 'react'
import { ERROR, IDLE, IDLE_DELAY, PROCESSING } from '../constants/misc'
import useInterval from '@use-it/interval'
import { parseToBigNumber } from '../utils/bignumberUtil'
import BigNumber from 'bignumber.js'

export const useBalance = (uncheckedAddresses: string | null | undefined) => {
  const { library } = useActiveWeb3React()
  const [balance, setBalance] = useState(new BigNumber(0))
  const [status, setStatus] = useState(IDLE)

  const refresh = useCallback(async () => {
    if (!uncheckedAddresses || !isAddress(uncheckedAddresses || !library)) {
      return
    }
    try {
      setStatus(PROCESSING)
      const res = await library?.getBalance(uncheckedAddresses)
      if (res === undefined) {
        setBalance(new BigNumber(NaN))
      } else {
        setBalance(parseToBigNumber(res).shiftedBy(-18))
        setStatus(IDLE)
        setTimeout(() => {
          setStatus(IDLE)
        }, IDLE_DELAY)
      }
    } catch (e) {
      setStatus(ERROR)
      setBalance(new BigNumber(NaN))
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }, [library, uncheckedAddresses])

  useEffect(() => {
    refresh()
  }, [library, uncheckedAddresses, refresh])
  useInterval(refresh, 3000)

  return {
    balance,
    status,
  }
}
