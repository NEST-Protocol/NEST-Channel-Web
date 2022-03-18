import { useTokenContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS, ZERO_ADDRESS } from '../constants/misc'
import { parseToBigNumber } from '../utils/bignumberUtil'
import { CHAIN_INFO } from '../constants/chains'
import { useActiveWeb3React } from './web3'
import BigNumber from 'bignumber.js'

export const useToken = (tokenAddress: string) => {
  const { library } = useActiveWeb3React()
  const contract = useTokenContract(tokenAddress, true)
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const [fetchStatus, setFetchStatus] = useState(IDLE)
  const [symbol, setSymbol] = useState('')
  const { chainId } = useActiveWeb3React()

  const fetch = useCallback(async () => {
    if (tokenAddress === ZERO_ADDRESS) {
      setSymbol(CHAIN_INFO[chainId ?? 1].nativeSymbol)
      return
    }
    try {
      setFetchStatus(PROCESSING)
      const res = await contract?.symbol()
      if (res) {
        setSymbol(res)
        setFetchStatus(SUCCESS)
        setTimeout(() => {
          setFetchStatus(IDLE)
        }, IDLE_DELAY)
      } else {
        setSymbol('')
        setFetchStatus(ERROR)
        setTimeout(() => {
          setFetchStatus(IDLE)
        }, IDLE_DELAY)
      }
    } catch (e) {
      setSymbol('Error')
      setFetchStatus(ERROR)
      setTimeout(() => {
        setFetchStatus(IDLE)
      }, IDLE_DELAY)
    }
  }, [chainId, contract, tokenAddress])

  useEffect(() => {
    fetch()
  }, [fetch])

  const balanceOf = async (account: string) => {
    if (tokenAddress === ZERO_ADDRESS) {
      return parseToBigNumber((await library?.getBalance(account)) ?? new BigNumber(NaN)).shiftedBy(-18)
    }

    try {
      return parseToBigNumber((await contract?.balanceOf(account)) ?? new BigNumber(NaN)).shiftedBy(-18)
    } catch (e) {
      return 'Error'
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
      console.log(e)
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
    fetchStatus,
  }
}
