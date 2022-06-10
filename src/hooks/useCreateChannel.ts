import { useState } from 'react'
import { useNestOpenPlatformContract } from './useContract'
import { parseToBigNumber } from '../utils/bignumberUtil'
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from '../constants/misc'
import {PUSD_ADDRESS} from "../constants/addresses";
import useActiveWeb3React from "./useActiveWeb3React";

export const useCreateChannel = () => {
  const [status, setStatus] = useState(IDLE)
  const nestOpenPlatform = useNestOpenPlatformContract(true)
  const { chainId } = useActiveWeb3React()

  const create = async (quotationTokenList: string[], miningTokenAddress: string, standardOutput: number) => {
    setStatus(PROCESSING)
    const config = {
      // 标准出矿量 uint96
      rewardPerBlock: parseToBigNumber(standardOutput).shiftedBy(18).toFixed(0),
      // postFee uint16
      postFeeUnit: parseToBigNumber(0).shiftedBy(4).toFixed(0),
      // singleFee uint16
      singleFee: parseToBigNumber(0).shiftedBy(4).toFixed(0),
      // 衰减系数 uint16，万分制
      reductionRate: parseToBigNumber(80).shiftedBy(2).toFixed(0),
    }

    const args = {
      // 计价代币地址 address
      token0: PUSD_ADDRESS[chainId ?? 1],
      // 计价单位 uint96
      unit: parseToBigNumber(2000).shiftedBy(18).toFixed(0),
      // 出矿代币地址 address
      reward: miningTokenAddress,
      // 报价代币地址 address
      tokens: quotationTokenList,
    }

    try {
      if (nestOpenPlatform) {
        const tx = await nestOpenPlatform.open(args.token0, args.unit, args.reward, args.tokens, config)
        const res = await tx.wait()
        switch (res.status) {
          case 0:
            setStatus(ERROR)
            setTimeout(() => {
              setStatus(IDLE)
            }, IDLE_DELAY)
            break
          case 1:
            setStatus(SUCCESS)
            setTimeout(() => {
              setStatus(IDLE)
            }, IDLE_DELAY)
            break
        }
      }
    } catch (e) {
      setStatus(ERROR)
      setTimeout(() => {
        setStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    create,
    status,
  }
}
