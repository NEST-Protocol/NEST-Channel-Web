import {Link, Spacer, Stack, Text} from '@chakra-ui/react'
import {FC, useEffect, useState} from 'react'
import {isAddress} from '../../utils'
import {ExplorerDataType, getExplorerLink} from '../../utils/getExplorerLink'
import {useActiveWeb3React} from '../../hooks/web3'
import {useRecoilValue} from "recoil";
import {
  attenuationFactorAtom,
  miningTokenAddressAtom,
  priceCallingFeeAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenAddressAtom,
  standardOutputAtom
} from "../../state/Create/form";
import {useTokenSymbol} from "../../hooks/Tokens";
import {PETH_ADDRESS, PUSD_ADDRESS} from "../../constants/addresses";

const Confirm = () => {
  const quotationTokenAddress = useRecoilValue(quotationTokenAddressAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const miningTokenAddress = useRecoilValue(miningTokenAddressAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)

  const quotationTokenName = useTokenSymbol(quotationTokenAddress)
  const miningTokenName = useTokenSymbol(miningTokenAddress)
  const [priceTokenAddress, setPriceTokenAddress] = useState("")
  const { chainId } = useActiveWeb3React()

  useEffect(()=>{
    if (priceTokenName === "PETH") {
      setPriceTokenAddress(PETH_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === "PUSD") {
      setPriceTokenAddress(PUSD_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === "") {
      setPriceTokenAddress("NaN")
    } else {
      setPriceTokenAddress("Invalid Token")
    }
  }, [chainId, priceTokenName])

  return (
    <Stack pt={'60px'} pb={'30px'} w={'680px'} spacing={'20px'}>
      <ConfirmDetail
        title={`Price Token (${priceTokenName === "" ? "NaN" : priceTokenName})`}
        value={priceTokenAddress}
        link={getExplorerLink(chainId || 1, priceTokenName, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail
        title={`Quotation Token (${quotationTokenName})`}
        value={quotationTokenAddress === '' ? 'NaN' : quotationTokenAddress}
        link={getExplorerLink(chainId || 1, quotationTokenAddress, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail
        title={`Mining Token (${miningTokenName})`}
        value={miningTokenAddress === '' ? 'NaN' : miningTokenAddress}
        link={getExplorerLink(chainId || 1, miningTokenAddress, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail title={'Price Token Unit'} value={priceTokenUnit === '' ? 'NaN' : priceTokenUnit} unit={priceTokenName} />
      <ConfirmDetail
        title={'Standard Output'}
        value={standardOutput === '' ? 'NaN' : standardOutput}
        unit={'NEST/Block'}
      />
      <ConfirmDetail title={'Quotation Fee'} value={quotationFee === '' ? 'NaN' : quotationFee} unit={'BNB'} />
      <ConfirmDetail
        title={'Price Calling Fee'}
        value={priceCallingFee === '' ? 'NaN' : priceCallingFee}
        unit={'BNB'}
      />
      <ConfirmDetail
        title={'Attenuation Factor'}
        value={attenuationFactor === '' ? 'NaN' : attenuationFactor}
        unit={'%'}
      />
    </Stack>
  )
}

type ConfirmDetailProps = {
  title: string
  value: string
  unit?: string
  link?: string
  isToken?: boolean
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  const addressValid = (value: string) => {
    const address = isAddress(value)
    return !address
  }

  return (
    <Stack direction={'row'} w={'full'} spacing={"40px"}>
      <Text color={'secondary.500'} fontWeight={'600'}>
        {props.title}:
      </Text>
      <Spacer />
      {props.link ? (
        <Link
          href={props.link}
          isExternal
          color={props.isToken ? (addressValid(props.value) ? 'red' : 'link.500') : 'link.500'}
          fontWeight={'bold'}
        >
          {props.value}
        </Link>
      ) : (
        <Text fontWeight={'bold'} color={props.value === 'NaN' ? 'red' : 'black'}>
          {props.value} {props.unit}
        </Text>
      )}
    </Stack>
  )
}

export const ConfirmTip = () => {
  return <></>
}

export default Confirm
