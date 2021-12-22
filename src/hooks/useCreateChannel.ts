import {
  attenuationFactorAtom,
  invalidConfigurationAtom,
  invalidTokenAddressAtom,
  miningTokenAddressAtom,
  priceCallingFeeAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenAddressAtom,
  standardOutputAtom, statusAtom,
} from '../state/Create/form'
import {useRecoilState, useRecoilValue} from 'recoil'
import {useEffect, useState} from 'react'
import { isAddress } from '../utils'
import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM_ADDRESS, PETH_ADDRESS, PUSD_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {ERROR, PROCESSING, SUCCESS} from "../constants/misc";

export const useCreateChannel = () => {
  const quotationTokenAddress = useRecoilValue(quotationTokenAddressAtom)
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

  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM_ADDRESS[chainId ?? 1], true)

  const [priceTokenAddress, setPriceTokenAddress] = useState("")

  useEffect(()=>{
    if (priceTokenName === "PETH") {
      setPriceTokenAddress(PETH_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === "PUSD") {
      setPriceTokenAddress(PUSD_ADDRESS[chainId ?? 1])
    } else {
      setPriceTokenAddress("Invalid Token")
    }
  }, [chainId, priceTokenName])

  useEffect(() => {
    if (isAddress(quotationTokenAddress) && isAddress(miningTokenAddress) && (priceTokenName === "PETH" || priceTokenName === "PUSD")) {
      setInvalidTokenAddress(false)
    } else {
      setInvalidTokenAddress(true)
    }
  }, [quotationTokenAddress, priceTokenName, miningTokenAddress, setInvalidTokenAddress])

  useEffect(() => {
    if (
      priceTokenUnit === '' ||
      standardOutput === '' ||
      quotationFee === '' ||
      priceCallingFee === '' ||
      attenuationFactor === ''
    ) {
      setInvalidConfiguration(true)
    } else {
      setInvalidConfiguration(false)
    }
  }, [attenuationFactor, priceCallingFee, priceTokenUnit, quotationFee, setInvalidConfiguration, standardOutput])

  const create = async () => {
    setStatus(PROCESSING)
    const args = {
      // 计价代币地址 address
      token0: priceTokenAddress,
      // 计价单位 uint96
      unit: parseToBigNumber(priceTokenUnit).shiftedBy(18).toFixed(0),
      // 报价代币地址 address
      token1: quotationTokenAddress,
      // 标准出矿量 uint96
      rewardPerBlock: parseToBigNumber(standardOutput).shiftedBy(18).toFixed(0),
      // 出矿代币地址 address
      reward: miningTokenAddress,
      // postFee uint16
      postFeeUnit: parseToBigNumber(quotationFee).shiftedBy(4).toFixed(0),
      // singleFee uint16
      singleFee: parseToBigNumber(priceCallingFee).shiftedBy(4).toFixed(0),
      // 衰减系数 uint16，万分制
      reductionRate: parseToBigNumber(attenuationFactor).shiftedBy(2).toFixed(0),
    }

    console.log(args)
    try {
      if (nestOpenPlatform) {
        const tx = await nestOpenPlatform.open(args, {
          gasLimit: 1000000,
        })
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
    }catch (e) {
      setStatus(ERROR)
    }
  }

  return {
    invalidTokenAddress,
    invalidConfiguration,
    create,
    status,
  }
}
