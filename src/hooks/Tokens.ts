import { useTokenContract } from './useContract'
import { useCallback, useEffect, useState } from 'react'
import { ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS, ZERO_ADDRESS } from '../constants/misc'
import { parseToBigNumber } from '../utils/bignumberUtil'
import { CHAIN_INFO } from '../constants/chains'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from "./useActiveWeb3React";
import {isAddress} from "../utils";

export const useToken = (tokenAddress: string) => {
  const { library } = useActiveWeb3React()
  const contract = useTokenContract(tokenAddress, true)
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const [fetchStatus, setFetchStatus] = useState(IDLE)
  const [symbol, setSymbol] = useState('')
  const { chainId } = useActiveWeb3React()
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))

  const fetch = useCallback(async () => {
    if (!isAddress(tokenAddress)) {
      setSymbol('')
      return
    }

    if (tokenAddress === ZERO_ADDRESS) {
      setSymbol(CHAIN_INFO[chainId ?? 1].nativeSymbol)
      return
    }
    try {
      setFetchStatus(PROCESSING)
      const res = await contract?.symbol()
      const res2 = await contract?.totalSupply()
      if (res) {
        setSymbol(res)
      }
      if (res2) {
        setTotalSupply(parseToBigNumber(res2))
      }
      setFetchStatus(SUCCESS)
      setTimeout(() => {
        setFetchStatus(IDLE)
      }, IDLE_DELAY)
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

  const balanceOf = useCallback(async (account: string) => {
    if (tokenAddress === ZERO_ADDRESS) {
      return parseToBigNumber((await library?.getBalance(account)) ?? new BigNumber(NaN)).shiftedBy(-18)
    }

    try {
      return parseToBigNumber((await contract?.balanceOf(account)) ?? new BigNumber(NaN)).shiftedBy(-18)
    } catch (e) {
      return new BigNumber(0)
    }
  }, [contract, library, tokenAddress])

  const allowance = useCallback(async (owner: string, spender: string) => {
    try {
      return parseToBigNumber((await contract?.allowance(owner, spender)) ?? new BigNumber(NaN)).shiftedBy(-18)
    } catch (e) {
      return new BigNumber(0)
    }
  }, [contract])

  const approve = useCallback( async (spender: string, value: string) => {
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
  }, [contract])

  return {
    symbol,
    totalSupply,
    allowance,
    balanceOf,
    approve,
    approveStatus,
    fetchStatus,
  }
}
