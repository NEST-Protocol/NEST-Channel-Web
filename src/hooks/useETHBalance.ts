import {useActiveWeb3React} from './web3'
import {isAddress} from '../utils'
import {useEffect, useState} from 'react'
import {ERROR, IDLE, IDLE_DELAY, PROCESSING} from '../constants/misc'
import useInterval from '@use-it/interval'
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";

export const useETHBalance = (uncheckedAddresses: string | null | undefined) => {
  const {library} = useActiveWeb3React()
  const [balance, setBalance] = useState('0')
  const [status, setStatus] = useState(IDLE)

  async function update() {
    if (!uncheckedAddresses || !isAddress(uncheckedAddresses)) {
      return
    }

    try {
      setStatus(PROCESSING)
      const res = await library?.getBalance(uncheckedAddresses)
      if (res === undefined) {
        setBalance('NaN')
      } else {
        setBalance(formatNumber(parseToBigNumber(res).shiftedBy(-18)))
        setStatus(IDLE)
        setTimeout(() => {
          setStatus(IDLE)
        }, IDLE_DELAY)
      }
    } catch (e) {
      setStatus(ERROR)
      setBalance('NaN')
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  useEffect(() => {
    if (library) {
      update()
    }
  }, [library, uncheckedAddresses])
  useInterval(update, 3000)

  return {
    balance,
    status,
  }
}
