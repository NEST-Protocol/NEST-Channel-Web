import {
  attenuationFactorAtom, isConfigurationValidAtom, isTokenAddressValidAtom,
  miningTokenAtom, priceCallingFeeAtom,
  priceTokenAtom,
  priceTokenUnitAtom, quotationFeeAtom,
  quotationTokenAtom,
  standardOutputAtom
} from "../state/Create/form";
import {useRecoilState} from "recoil";
import {useEffect} from "react";
import {isAddress} from "../utils";

const useCreateChannel = () => {
  const [quotationToken, setQuotationToken ] = useRecoilState(quotationTokenAtom)
  const [priceToken, setPriceToken] = useRecoilState(priceTokenAtom)
  const [miningToken, setMiningToken] = useRecoilState(miningTokenAtom)
  const [priceTokenUnit, setPriceTokenUnit] = useRecoilState(priceTokenUnitAtom)
  const [standardOutput, setStandardOutput] = useRecoilState(standardOutputAtom)
  const [quotationFee, setQuotationFee] = useRecoilState(quotationFeeAtom)
  const [priceCallingFee, setPriceCallingFee] = useRecoilState(priceCallingFeeAtom)
  const [attenuationFactor, setAttenuationFactor] = useRecoilState(attenuationFactorAtom)

  const [isTokenAddressValid, setIsTokenAddressValid] = useRecoilState(isTokenAddressValidAtom)
  const [isConfigurationValid, setIsConfigurationValid] = useRecoilState(isConfigurationValidAtom)

  useEffect(()=>{
    if (isAddress(quotationToken) === false || isAddress(priceToken) === false || isAddress(miningToken) === false){
      setIsTokenAddressValid(true)
    } else {
      setIsTokenAddressValid(false)
    }
  }, [quotationToken, priceToken, miningToken, setIsTokenAddressValid])

  useEffect(()=> {
    if (priceTokenUnit === "" || standardOutput === "" || quotationFee === "" || priceCallingFee === "" || attenuationFactor === ""){
      setIsConfigurationValid(true)
    } else {
      setIsConfigurationValid(false)
    }
  }, [attenuationFactor, priceCallingFee, priceTokenUnit, quotationFee, setIsConfigurationValid, standardOutput])

  // Todo: verify parameter type and default value
  const resetConfig = () => {
    setQuotationToken("")
    setPriceToken("")
    setMiningToken("")
    setPriceTokenUnit("")
    setStandardOutput("")
    setQuotationFee("")
    setPriceCallingFee("")
    setAttenuationFactor("")
  }

  // Todo: create channel
  const create = () => {
    console.log("Create Channel")
  }

  return {
    resetConfig,
    setQuotationToken,
    setPriceToken,
    setMiningToken,
    setPriceTokenUnit,
    setStandardOutput,
    setQuotationFee,
    setPriceCallingFee,
    setAttenuationFactor,
    quotationToken,
    priceToken,
    miningToken,
    priceTokenUnit,
    standardOutput,
    quotationFee,
    priceCallingFee,
    attenuationFactor,
    isTokenAddressValid,
    isConfigurationValid,
  }
}

export default useCreateChannel
