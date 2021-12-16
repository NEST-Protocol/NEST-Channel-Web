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
  standardOutputAtom,
} from '../state/Create/form'
import {useRecoilState, useRecoilValue} from 'recoil'
import {useEffect, useState} from 'react'
import { isAddress } from '../utils'
import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM, PETH_ADDRESS, PUSD_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {parseToBigNumber} from "../utils/bignumberUtil";

const useCreateChannel = () => {
  const quotationTokenAddress = useRecoilValue(quotationTokenAddressAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const miningTokenAddress = useRecoilValue(miningTokenAddressAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)

  const [invalidTokenAddress, setInvalidTokenAddress] = useRecoilState(invalidTokenAddressAtom)
  const [invalidConfiguration, setInvalidConfiguration] = useRecoilState(invalidConfigurationAtom)

  const { chainId } = useActiveWeb3React()

  const nestOpenPlatform = useNestOpenPlatformContract(NEST_OPEN_PLATFORM[chainId ?? 1], true)

  const [args, setArgs] = useState<{
    token0: string
    unit: string
    token1: string
    rewardPerBlock: string
    reward: string
    postFeeUnit: string
    singleFee: string
    reductionRate: string
  }>()

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

  const newArgs = {
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
    postFeeUnit: parseToBigNumber(quotationFee).shiftedBy(6).toFixed(0),
    // singleFee uint16
    singleFee: parseToBigNumber(priceCallingFee).shiftedBy(6).toFixed(0),
    // 衰减系数 uint16，万分制
    reductionRate: parseToBigNumber(attenuationFactor).multipliedBy(100).toFixed(0),
  }

  if (JSON.stringify(newArgs) !== JSON.stringify(args)) {
    setArgs(newArgs)
  }

  // Todo: create channel
  const create = async () => {
    if (nestOpenPlatform) {
      const a = await nestOpenPlatform.open(args)
      console.log(a)
    }
  }

  return {
    invalidTokenAddress,
    invalidConfiguration,
    create,
  }
}

export default useCreateChannel
