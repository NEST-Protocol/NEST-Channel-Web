import {
  attenuationFactorAtom,
  priceTokenAddressAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  statusAtom,
} from '../state/Create/form'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { useNestOpenPlatformContract } from './useContract'
import { PETH_ADDRESS, PUSD_ADDRESS } from '../constants/addresses'
import { parseToBigNumber } from '../utils/bignumberUtil'
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from '../constants/misc'
import useActiveWeb3React from "./useActiveWeb3React";

export const useCreateChannel = () => {
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const quotationFee = '0'
  const priceCallingFee = '0'
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)
  const [status, setStatus] = useRecoilState(statusAtom)

  const { chainId } = useActiveWeb3React()

  const nestOpenPlatform = useNestOpenPlatformContract(true)

  const [priceTokenAddress, setPriceTokenAddress] = useRecoilState(priceTokenAddressAtom)

  useEffect(() => {
    if (priceTokenName === 'PETH') {
      setPriceTokenAddress(PETH_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === 'PUSD') {
      setPriceTokenAddress(PUSD_ADDRESS[chainId ?? 1])
    } else {
      setPriceTokenAddress('Invalid Token')
    }
  }, [chainId, priceTokenName, setPriceTokenAddress])

  const create = async (quotationTokenList: string[], miningTokenAddress: string, standardOutput: string) => {
    setStatus(PROCESSING)
    const config = {
      // 标准出矿量 uint96
      rewardPerBlock: parseToBigNumber(standardOutput).shiftedBy(18).toFixed(0),
      // postFee uint16
      postFeeUnit: parseToBigNumber(quotationFee).shiftedBy(4).toFixed(0),
      // singleFee uint16
      singleFee: parseToBigNumber(priceCallingFee).shiftedBy(4).toFixed(0),
      // 衰减系数 uint16，万分制
      reductionRate: parseToBigNumber(attenuationFactor).shiftedBy(2).toFixed(0),
    }

    const args = {
      // 计价代币地址 address
      token0: priceTokenAddress,
      // 计价单位 uint96
      unit: parseToBigNumber(priceTokenUnit).shiftedBy(18).toFixed(0),
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
    priceTokenAddress,
  }
}
