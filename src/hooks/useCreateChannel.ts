import {
  attenuationFactorAtom,
  isConfigurationValidAtom,
  isTokenAddressValidAtom,
  miningTokenAtom,
  priceCallingFeeAtom,
  priceTokenAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenAtom,
  standardOutputAtom,
} from '../state/Create/form'
import {useRecoilState, useRecoilValue} from 'recoil'
import { useEffect } from 'react'
import { isAddress } from '../utils'
import {useNestOpenPlatform} from "./useContract";
import {NEST_OPEN_PLATFORM} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";

const useCreateChannel = () => {
  const quotationToken = useRecoilValue(quotationTokenAtom)
  const priceToken = useRecoilValue(priceTokenAtom)
  const miningToken = useRecoilValue(miningTokenAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)

  const [isTokenAddressValid, setIsTokenAddressValid] = useRecoilState(isTokenAddressValidAtom)
  const [isConfigurationValid, setIsConfigurationValid] = useRecoilState(isConfigurationValidAtom)

  const { chainId } = useActiveWeb3React()

  const nestOpenPlatform = useNestOpenPlatform(NEST_OPEN_PLATFORM[chainId ?? 1], true)

  console.log(nestOpenPlatform)

  useEffect(() => {
    if (isAddress(quotationToken) === false || isAddress(priceToken) === false || isAddress(miningToken) === false) {
      setIsTokenAddressValid(true)
    } else {
      setIsTokenAddressValid(false)
    }
  }, [quotationToken, priceToken, miningToken, setIsTokenAddressValid])

  useEffect(() => {
    if (
      priceTokenUnit === '' ||
      standardOutput === '' ||
      quotationFee === '' ||
      priceCallingFee === '' ||
      attenuationFactor === ''
    ) {
      setIsConfigurationValid(true)
    } else {
      setIsConfigurationValid(false)
    }
  }, [attenuationFactor, priceCallingFee, priceTokenUnit, quotationFee, setIsConfigurationValid, standardOutput])


  // Todo: create channel
  const create = async () => {

    if (nestOpenPlatform) {
      nestOpenPlatform.open({
        // 计价代币地址 address
        token0: "",
        // 计价单位 uint96
        unit: "",
        // 报价代币地址 address
        token1: "",
        // 标准出矿量 uint96
        rewardPerBlock: "",
        // 出矿代币地址 address
        reward: "",
        // post fee uint16
        postFeeUnit: "",
        // singleFee uint16
        singleFee: "",
        // 衰减系数 uint16，万分制
        reductionRate: "",
      })
    }

  }

  return {
    isTokenAddressValid,
    isConfigurationValid,
    create,
  }
}

export default useCreateChannel
