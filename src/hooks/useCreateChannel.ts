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
    console.log('Create Channel')
  }

  return {
    isTokenAddressValid,
    isConfigurationValid,
    create,
  }
}

export default useCreateChannel
