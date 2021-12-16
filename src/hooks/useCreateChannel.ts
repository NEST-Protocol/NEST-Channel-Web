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
import { useEffect } from 'react'
import { isAddress } from '../utils'
import {useNestOpenPlatformContract} from "./useContract";
import {NEST_OPEN_PLATFORM} from "../constants/addresses";
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

  // Todo: create channel
  const create = async () => {
    const args = {
      // 计价代币地址 address
      token0: priceTokenName,
      // 计价单位 uint96
      unit: parseToBigNumber(priceTokenUnit),
      // 报价代币地址 address
      token1: quotationTokenAddress,
      // 标准出矿量 uint96
      rewardPerBlock: parseToBigNumber(standardOutput),
      // 出矿代币地址 address
      reward: miningTokenAddress,
      // post fee uint16
      postFeeUnit: parseToBigNumber(quotationFee),
      // singleFee uint16
      singleFee: parseToBigNumber(priceCallingFee),
      // 衰减系数 uint16，万分制
      reductionRate: parseToBigNumber(attenuationFactor).multipliedBy(100),
    }

    if (nestOpenPlatform) {
      // await nestOpenPlatform.open()
      console.log(args)
    }
  }

  return {
    invalidTokenAddress,
    invalidConfiguration,
    create,
  }
}

export default useCreateChannel
