import { Link, Spacer, Stack, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import {isAddress, shortenAddress} from '../../utils'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { useActiveWeb3React } from '../../hooks/web3'
import { useRecoilValue } from 'recoil'
import {
  attenuationFactorAtom,
  miningTokenAddressAtom,
  priceCallingFeeAtom,
  priceTokenNameAtom,
  priceTokenUnitAtom,
  quotationFeeAtom,
  quotationTokenListAtom,
  standardOutputAtom,
} from '../../state/Create/form'
import { PETH_ADDRESS, PUSD_ADDRESS } from '../../constants/addresses'
import { CHAIN_INFO } from '../../constants/chains'
import {TokenName} from "../../components/InputWithTokenName";

const Confirm = () => {
  const quotationTokenList = useRecoilValue(quotationTokenListAtom)
  const priceTokenName = useRecoilValue(priceTokenNameAtom)
  const miningTokenAddress = useRecoilValue(miningTokenAddressAtom)
  const priceTokenUnit = useRecoilValue(priceTokenUnitAtom)
  const standardOutput = useRecoilValue(standardOutputAtom)
  const quotationFee = useRecoilValue(quotationFeeAtom)
  const priceCallingFee = useRecoilValue(priceCallingFeeAtom)
  const attenuationFactor = useRecoilValue(attenuationFactorAtom)
  const [priceTokenAddress, setPriceTokenAddress] = useState('')
  const { chainId } = useActiveWeb3React()

  useEffect(() => {
    if (priceTokenName === 'PETH') {
      setPriceTokenAddress(PETH_ADDRESS[chainId ?? 1])
    } else if (priceTokenName === 'PUSD') {
      setPriceTokenAddress(PUSD_ADDRESS[chainId ?? 1])
    } else {
      setPriceTokenAddress('Error')
    }
  }, [chainId, priceTokenName])

  return (
    <Stack pt={'60px'} pb={'30px'} w={'680px'} spacing={'20px'}>
      <ConfirmDetail
        title={`Price Token`}
        token={priceTokenAddress}
      />
      <ConfirmDetail
        title={`Quotation Token`}
        tokens={quotationTokenList.length === 0 ? ['NaN'] : quotationTokenList}
        invalid={quotationTokenList.length === 0}
      />
      <ConfirmDetail
        title={`Mining Token`}
        token={miningTokenAddress === '' ? 'NaN' : miningTokenAddress}
        invalid={miningTokenAddress === ''}
      />
      <ConfirmDetail
        title={'Price Token Unit'}
        value={priceTokenUnit}
        unit={priceTokenName}
        invalid={true}
      />
      <ConfirmDetail
        title={'Standard Output'}
        value={standardOutput}
        unit={'NEST/Block'}
      />
      <ConfirmDetail
        title={'Quotation Fee'}
        value={quotationFee}
        unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
      />
      <ConfirmDetail
        title={'Price Calling Fee'}
        value={priceCallingFee}
        unit={CHAIN_INFO[chainId ?? 1].nativeSymbol}
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
  value?: string
  token?: string
  tokens?: string[]
  unit?: string
  invalid?: boolean
}

const ConfirmDetail: FC<ConfirmDetailProps> = ({ ...props }) => {
  const { chainId } = useActiveWeb3React()

  return (
    <Stack direction={'row'} w={'full'}>
      <Text color={'secondary.500'} fontWeight={'600'}>
        {props.title}:
      </Text>
      <Spacer />

      {props.token && (
        <Stack direction={"row"} w={'220px'} justifyContent={"space-between"}>
          <TokenName address={props.token} hasParentheses={props.token !== 'NaN'} color={'secondary.500'}/>
          <Link
            href={getExplorerLink(chainId || 1, props.token, ExplorerDataType.TOKEN)}
            isExternal
            color={!isAddress(props.token) || props.invalid ? 'primary.500' : 'link.500'}
            fontWeight={'bold'}
          >
            {shortenAddress(props.token, 6)}
          </Link>
        </Stack>
      )}

      {props.tokens && (
        <Stack spacing={'20px'}>
          { props.tokens.map((address, index)=> (
            <Stack key={index} direction={"row"} w={'220px'} justifyContent={"space-between"}>
              <TokenName address={address} hasParentheses={address !== 'NaN'} color={'secondary.500'}/>
              <Link
                href={getExplorerLink(chainId || 1, address, ExplorerDataType.TOKEN)}
                isExternal
                color={!isAddress(address) || props.invalid ? 'primary.500' : 'link.500'}
                fontWeight={'bold'}
              >
                {shortenAddress(address, 6)}
              </Link>
            </Stack>
          )) }
        </Stack>
      )}

      { props.value && (
        <Text fontWeight={'bold'} color={props.value === 'NaN' || props.invalid ? 'primary.500' : 'black'}>
          {props.value} {props.unit}
        </Text>
      ) }
    </Stack>
  )
}

export const ConfirmTip = () => {
  return <></>
}

export default Confirm
