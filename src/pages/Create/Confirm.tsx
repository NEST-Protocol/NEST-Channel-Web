import {Link, Spacer, Stack, Text} from '@chakra-ui/react'
import {FC} from 'react'
import {isAddress} from '../../utils'
import {ExplorerDataType, getExplorerLink} from '../../utils/getExplorerLink'
import {useActiveWeb3React} from '../../hooks/web3'
import {useRecoilValue} from "recoil";
import {
  attenuationFactorAtom,
  miningTokenAtom,
  priceCallingFeeAtom,
  priceTokenAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenAtom,
  standardOutputAtom
} from "../../state/Create/form";

const Confirm = () => {
  const quotationToken = useRecoilValue(quotationTokenAtom)
  const priceToken = useRecoilValue(priceTokenAtom)
  const miningToken = useRecoilValue(miningTokenAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)

  const { chainId } = useActiveWeb3React()

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <ConfirmDetail
        title={'Price Token:'}
        value={priceToken === '' ? 'NaN' : priceToken}
        link={getExplorerLink(chainId || 1, priceToken, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail
        title={'Quotation Token:'}
        value={quotationToken === '' ? 'NaN' : quotationToken}
        link={getExplorerLink(chainId || 1, quotationToken, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail
        title={'Mining Token:'}
        value={miningToken === '' ? 'NaN' : miningToken}
        link={getExplorerLink(chainId || 1, miningToken, ExplorerDataType.TOKEN)}
        isToken
      />
      <ConfirmDetail title={'Price Token Unit:'} value={priceTokenUnit === '' ? 'NaN' : priceTokenUnit} unit={'ETH'} />
      <ConfirmDetail
        title={'Standard Output:'}
        value={standardOutput === '' ? 'NaN' : standardOutput}
        unit={'NEST/Block'}
      />
      <ConfirmDetail title={'Quotation Fee:'} value={quotationFee === '' ? 'NaN' : quotationFee} unit={'ETH'} />
      <ConfirmDetail
        title={'Price Calling Fee:'}
        value={priceCallingFee === '' ? 'NaN' : priceCallingFee}
        unit={'ETH'}
      />
      <ConfirmDetail
        title={'Attenuation Factor:'}
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
    <Stack direction={'row'} w={'full'}>
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
