import {
  attenuationFactorAtom, isInvalidConfigurationAtom, isInvalidTokenAddressAtom,
  miningTokenAtom, priceCallingFeeAtom,
  priceTokenAtom,
  priceTokenUnitAtom, quotationFeeAtom,
  quotationTokenAtom,
  standardOutputAtom
} from "../state/Create/form";
import {useRecoilState, useRecoilValue} from "recoil";
import {ZERO_ADDRESS} from "../constants/misc";


const useCreateChannel = () => {
  const [quotationToken, setQuotationToken ] = useRecoilState(quotationTokenAtom)
  const [priceToken, setPriceToken] = useRecoilState(priceTokenAtom)
  const [miningToken, setMiningToken] = useRecoilState(miningTokenAtom)
  const [priceTokenUnit, setPriceTokenUnit] = useRecoilState(priceTokenUnitAtom)
  const [standardOutput, setStandardOutput] = useRecoilState(standardOutputAtom)
  const [quotationFee, setQuotationFee] = useRecoilState(quotationFeeAtom)
  const [priceCallingFee, setPriceCallingFee] = useRecoilState(priceCallingFeeAtom)
  const [attenuationFactor, setAttenuationFactor] = useRecoilState(attenuationFactorAtom)
  const isInvalidTokenAddress = useRecoilValue(isInvalidTokenAddressAtom)
  const isInvalidConfiguration = useRecoilValue(isInvalidConfigurationAtom)

  // Todo: verify parameter type and default value
  const resetConfig = () => {
    setQuotationToken(ZERO_ADDRESS)
    setPriceToken(ZERO_ADDRESS)
    setMiningToken(ZERO_ADDRESS)
    setPriceTokenUnit(1)
    setStandardOutput(1)
    setQuotationFee("1")
    setPriceCallingFee("1")
    setAttenuationFactor(0.8)
  }

  // Todo: create channel
  const create = () => {
    console.log("Create Channel")
  }

  return {
    resetConfig,
    isInvalidTokenAddress,
    isInvalidConfiguration,
  }
}

export default useCreateChannel
