import { Link, Spacer, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import useCreateChannel from "../../hooks/useCreateChannel";

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
      <ConfirmDetail title={'Price Token:'} value={priceToken} link={'eeee'} />
      <ConfirmDetail title={'Quotation Token:'} value={quotationToken} link={'eeee'} />
      <ConfirmDetail title={'Mining Token:'} value={miningToken} link={'eeee'} />
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
  value: string | number
  unit?: string
  link?: string
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  return (
    <Stack direction={'row'} w={'full'}>
      <Text color={'secondary.500'} fontWeight={'600'}>
        {props.title}
      </Text>
      <Spacer />
      {props.link ? (
        <Link href={props.link} isExternal color={'link.500'} fontWeight={'bold'}>
          {props.value} {props.unit}
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
