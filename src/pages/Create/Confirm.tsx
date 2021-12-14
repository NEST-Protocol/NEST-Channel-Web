import { Link, Spacer, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import useCreateChannel from "../../hooks/useCreateChannel";
import {isAddress} from "../../utils";

const Confirm = () => {
  const {
    quotationToken,
    priceToken,
    miningToken,
    priceTokenUnit,
    standardOutput,
    quotationFee,
    priceCallingFee,
    attenuationFactor
  } = useCreateChannel()

  return (
    <Stack pt={'60px'} pb={'30px'} w={'600px'} spacing={'20px'}>
      <ConfirmDetail title={'Price Token:'} value={priceToken} link={'eeee'} isAddress/>
      <ConfirmDetail title={'Quotation Token:'} value={quotationToken} link={'eeee'} isAddress/>
      <ConfirmDetail title={'Mining Token:'} value={miningToken} link={'eeee'} isAddress/>
      <ConfirmDetail title={'Price Token Unit:'} value={priceTokenUnit} unit={'ETH'} />
      <ConfirmDetail title={'Standard Output:'} value={standardOutput} unit={'NEST/Block'} />
      <ConfirmDetail title={'Quotation Fee:'} value={quotationFee} unit={'ETH'} />
      <ConfirmDetail title={'Price Calling Fee:'} value={priceCallingFee} unit={'ETH'} />
      <ConfirmDetail title={'Attenuation Factor:'} value={attenuationFactor} unit={'%'} />
    </Stack>
  )
}

type ConfirmDetailProps = {
  title: string
  value: string
  unit?: string
  link?: string
  isAddress?: boolean
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  const addressValid = (value: string) => {
    const address = isAddress(value)
    return !address;
  }

  return (
    <Stack direction={'row'} w={'full'}>
      <Text color={'secondary.500'} fontWeight={'600'}>
        {props.title}
      </Text>
      <Spacer />
      {props.link ? (
        <Link href={props.link} isExternal color={props.isAddress ? (addressValid(props.value) ? 'red' : 'link.500') : 'link.500'} fontWeight={'bold'}>
          {props.value}
        </Link>
      ) : (
        <Text fontWeight={'bold'}>
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
