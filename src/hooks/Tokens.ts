import { useTokenContract } from './useContract'
import { useState } from 'react'
import { ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS } from '../constants/misc'
import { parseToBigNumber } from '../utils/bignumberUtil'

export const useToken = (tokenAddress: string) => {
  const contract = useTokenContract(tokenAddress, false)
  const [approveStatus, setApproveStatus] = useState(IDLE)

  const symbol = async () => {
    try {
      return (await contract?.symbol()) ?? 'NaN'
    } catch (e) {
      return 'NaN'
    }
  }

  const balanceOf = async (account: string) => {
    try {
      return parseToBigNumber((await contract?.balanceOf(account)) ?? 'NaN').shiftedBy(-18)
    } catch (e) {
      return 'NaN'
    }
  }

  const approve = async (spender: string, value: string) => {
    try {
      setApproveStatus(PROCESSING)
      const tx = await contract?.approve(spender, value)
      if (!tx) return
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setApproveStatus(ERROR)
          setTimeout(() => {
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setApproveStatus(SUCCESS)
          setTimeout(() => {
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setApproveStatus(ERROR)
      setTimeout(() => {
        setApproveStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    symbol,
    balanceOf,
    approve,
    approveStatus,
  }
}
