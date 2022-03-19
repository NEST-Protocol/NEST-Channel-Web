import {
  attenuationFactorAtom,
  invalidConfigurationAtom,
  invalidTokenAddressAtom,
  miningTokenAddressAtom,
  priceCallingFeeAtom,
  priceTokenAddressAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenListAtom,
  standardOutputAtom,
  statusAtom,
} from '../state/Create/form'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { useNestOpenPlatformContract } from './useContract'
import { PETH_ADDRESS, PUSD_ADDRESS } from '../constants/addresses'
import { useActiveWeb3React } from './web3'
import { parseToBigNumber } from '../utils/bignumberUtil'
import { ERROR, PROCESSING, SUCCESS } from '../constants/misc'
import { isAddress } from '../utils'

export const useCreateChannel = () => {
  const quotationTokenList = useRecoilValue(quotationTokenListAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const miningTokenAddress = useRecoilValue(miningTokenAddressAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)
  const [status, setStatus] = useRecoilState(statusAtom)

  const [invalidTokenAddress, setInvalidTokenAddress] = useRecoilState(invalidTokenAddressAtom)
  const [invalidConfiguration, setInvalidConfiguration] = useRecoilState(invalidConfigurationAtom)

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

  useEffect(() => {
    if (
      isAddress(miningTokenAddress) &&
      (priceTokenName === 'PETH' || priceTokenName === 'PUSD' || priceTokenName === 'PBTC') &&
      quotationTokenList.length > 0
    ) {
      setInvalidTokenAddress(false)
    } else {
      setInvalidTokenAddress(true)
    }
  }, [quotationTokenList, priceTokenName, miningTokenAddress, setInvalidTokenAddress, priceTokenAddress])

  useEffect(() => {
    if (priceTokenUnit === '0') {
      setInvalidConfiguration(true)
    } else if (priceTokenName === 'PETH') {
      setInvalidConfiguration(priceTokenUnit !== '1' && priceTokenUnit !== '2' && priceTokenUnit !== '3')
    } else if (priceTokenName === 'PUSD') {
      setInvalidConfiguration(priceTokenUnit !== '1000' && priceTokenUnit !== '2000' && priceTokenUnit !== '3000')
    }
  }, [priceTokenName, priceTokenUnit, setInvalidConfiguration])

  const create = async () => {
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
            break
          case 1:
            setStatus(SUCCESS)
            break
        }
      }
    } catch (e) {
      setStatus(ERROR)
    }
  }

  return {
    invalidTokenAddress,
    invalidConfiguration,
    create,
    status,
    priceTokenAddress,
  }
}
